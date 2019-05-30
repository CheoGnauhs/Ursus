<template>
  <el-card>
    <div slot="header">{{title}}</div>
    <!-- 处理expressList为空的情况 -->
    <div class="info" v-if="expressList==null||expressList.length==0||expressList[0]==null">暂无数据...</div>
    <el-card
      v-else
      class="express-holder"
      v-for="(item,index) in expressList"
      :key="index"
      shadow="hover"
    >
      <!-- 快递基本信息以及对应操作按钮 -->
      <div slot="header" class="detail-header">
        <div class="header-info">
          <el-tag type="success">快递单号：{{item.eid}}</el-tag>
          <el-tag type="warning">快递物品：{{item.content}}</el-tag>
          <el-tag type="info">订单日期：{{item.createdAt.split('T')[0]}}</el-tag>
        </div>

        <!-- 用户操作 -->
        <!-- in-process状态需要细分 -->
        <div v-if="type=='in-process'" class="header-panel">
          <!-- 运送中的快递，用户可以查看定位、确认送达 -->
          <el-button
            @click="confirmCheck(item)"
            v-if="item.status=='delivering'||'courierChecked'"
            type="primary"
          >确认送达</el-button>
          <el-button
            v-if="item.status=='delivering'||'courierChecked'"
            @click="jumpTo('/dashboard/'+$route.params.uid+'/express-location/'+item.eid)"
          >快递定位</el-button>

          <!-- 还未匹配到快递员的快递用户可以取消 -->
          <el-button @click="cancelCheck(item)" v-if="item.status=='searching'" type="danger">取消订单</el-button>
        </div>

        <!-- 还未提交的快递用户可以提交或者取消 -->
        <div v-if="type=='unsubmitted'" class="header-panel">
          <el-button @click="submitCheck(item)" type="primary">提交需求</el-button>
          <el-button type="danger">取消需求</el-button>
        </div>

        <!-- 等待评价的快递用户可以评价 -->
        <div
          @click="dialogVisible = true"
          v-if="type=='needComment'||type=='courierNeedComment'"
          class="header-panel"
        >
          <el-button type="primary">评价</el-button>
        </div>

        <!-- 快递员操作 -->
        <!-- 匹配中的快递快递员可以接单 -->
        <div v-if="type=='newExpress'" class="header-panel">
          <el-button @click="deliveryCheck(item)" type="primary">确认接单</el-button>
        </div>

        <!-- 运送中的快递快递员可以上传凭证和确认送达 -->
        <div v-if="type=='courierProcessing'" class="header-panel">
          <el-button @click="uploadCheck(item)">上传凭证</el-button>
          <el-button @click="courierConfirmCheck(item)" type="primary">确认送达</el-button>
        </div>
      </div>

      <!-- 快递详情 -->
      <div class="express-detail">
        <div
          v-if="type.indexOf('courier')==-1&&item.status!='created'&&item.status!='searching'&&item.status!='cancelled'"
          class="courier-info"
        >
          <div class="title">
            快递员：
            <!-- courierInfo一开始为空会报错 -->
            <!-- 虽然不影响结果但是还是加个判断 -->
            <div class="text">{{courierInfo[index]==null?"":courierInfo[index].realname}}</div>
          </div>
          <div class="title">
            联系电话：
            <div class="text">{{courierInfo[index]==null?"":courierInfo[index].telephone}}</div>
          </div>
        </div>
        <div class="delivery-area">
          <div class="title">配送起点：</div>
          <div class="text">{{getRegionText(item.getRegion.split(","))}}{{item.getAddress}}</div>
          <div class="title">配送终点：</div>
          <div class="text">{{getRegionText(item.sendRegion.split(","))}}{{item.sendAddress}}</div>
        </div>
        <div class="delivery-time title">
          配送时间段：
          <div class="text">{{item.deliveryDate}} {{item.deliveryFrom}}</div>
          <div class="title">至</div>
          <div class="text">{{item.deliveryDate}} {{item.deliveryTo}}</div>
        </div>
        <div class="delivery-fee title">
          配送费用：
          <div class="text">{{item.deliveryFee}}ETH</div>
        </div>
      </div>

      <!-- 用户评价部分 -->
      <el-dialog
        v-if="type=='needComment'||type=='courierNeedComment'"
        :visible.sync="dialogVisible"
        :title="'评价'"
      >
        <el-form :model="commentInfo">
          <el-form-item label="评分">
            <br>
            <el-rate v-model="commentInfo.value" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
          </el-form-item>
          <el-form-item label="评价">
            <el-input v-model="commentInfo.comment" placeholder="在此输入想要评论的内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="commentCheck(item,index)" type="primary">确认评价</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 上传凭证部分 -->
      <el-dialog
        v-if="type=='courierProcessing'&&item.status=='delivering'"
        title="上传附件"
        :visible.sync="uploadVisible"
      >
        <el-upload
          action="/postfile"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="imageVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-dialog>

      <!-- 快递评价详情 -->
      <el-collapse v-if="type=='finished'" class="comment-detail">
        <el-collapse-item title="评价详情" class="rate">
          <el-rate
            v-model="commentContent[index].value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
          <div class="comment">{{commentContent[index].content}}</div>
        </el-collapse-item>
      </el-collapse>

      <el-collapse
        v-if="(type=='finished'||type=='needComment'||type=='in-process'||type=='courierFinished'||type=='courierProcessing')&&imgInfo.length!=0"
        class="comment-detail"
      >
        <el-collapse-item v-for="(pic,i) in imgInfo[index]" :key="i" title="快递图片" class="pic">
          <el-image v-if="pic.url!=null" :src="'http://localhost:9527/ipfs/'+pic.url"></el-image>
          <p v-if="pic.url==null">数据暂缺</p>
        </el-collapse-item>
      </el-collapse>

      <!-- 快递进展 -->
      <el-steps
        v-if="item.status!='cancelled'"
        class="express-steps"
        :active="getStepIndex(item)"
        finish-status="success"
        process-status="finish"
      >
        <el-step title="提交需求"></el-step>
        <el-step title="匹配快递员"></el-step>
        <el-step title="运送中"></el-step>
        <el-step title="评价"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </el-card>
  </el-card>
</template>

<script>
/* eslint-disable */
import { CodeToText } from "element-china-area-data";
export default {
  name: "ExpressList",
  props: {
    title: String,
    type: String,
    expressList: Array,
    courierInfo: Array,
    commentContent: Array,
    imgInfo: Array
  },
  data() {
    return {
      CodeToText,
      commentInfo: {
        value: 0,
        comment: ""
      },
      balance: "",
      uploadEID: "",
      value: 3.5,
      dialogVisible: false,
      uploadVisible: false,
      imageVisible: false,
      dialogImageUrl: ""
    };
  },
  methods: {
    testContract() {
      console.log(this.web3js.eth.accounts[0]);
      console.log(this.ExpressContract);
      this.ExpressContract.createExpress(
        9527,
        {
          from: this.web3js.eth.accounts[0],
          value: this.web3.utils.toWei(express.deliveryFee + "", "ether")
        },
        (error, hash) => {
          if (!error) {
            console.log(hash);
          } else {
            this.$message.error("交易失败");
          }
        }
      );
    },
    uploadCheck(item) {
      this.uploadEID = item.eid;
      this.uploadVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleUploadSuccess(response, file, fileList) {
      fetch("/attachment", {
        headers: new Headers({ "Content-Type": "application/json" }),
        method: "POST",
        body: JSON.stringify({
          eid: this.uploadEID,
          url: response.file[0].path
        })
      }).then(res => {
        if (res.ok) {
          res.json().then(res => {
            this.$message.success(res.info);
          });
        } else {
          console.log("request error");
        }
      });
    },
    // 跳转至某一路径
    jumpTo(route) {
      this.$router.push(route);
    },
    // 评论前用户确认
    commentCheck(item, index) {
      if (this.commentInfo.value == 0 || this.commentInfo.comment == "") {
        this.$message.error("评分与评论内容不得为空");
        return;
      }
      this.$confirm(
        "提交评价之后，相关数据将写入区块链，将不能更改，并对评分造成影响。是否确认",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.commentSubmit(item, index);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 提交评论
    commentSubmit(item, index) {
      let toID, commentType;
      // 用户评价快递员
      if (this.type == "needComment") {
        toID = this.courierInfo[index].id;
        commentType = "o2c";// owner to courier
      }
      // 快递员评价用户
      else {
        toID = item.uid;
        commentType = "c2o";// courier to owner
      }
      fetch("/comment", {
        headers: new Headers({ "Content-Type": "application/json" }),
        method: "POST",
        body: JSON.stringify({
          eid: item.eid,
          fromID: this.$route.params.uid,
          toID: toID,
          content: this.commentInfo.comment,
          value: this.commentInfo.value,
          commentType: commentType
        })
      }).then(res => {
        if (res.ok) {
          res.json().then(res => {
            this.$message.success(res.info);
          });
        } else {
          this.$message.error("评论失败");
        }
      });
    },
    // 将表示区域的数组转换为文字
    getRegionText(regionArray) {
      return (
        this.CodeToText[regionArray[0]] +
        this.CodeToText[regionArray[1]] +
        this.CodeToText[regionArray[2]]
      );
    },
    // 将快递状态转换为进度
    getStepIndex(item) {
      switch (item.status) {
        case "created":
          return 0;
          break;
        case "searching":
          return 1;
          break;
        case "needComment":
          return 3;
          break;
        case "finished":
          return 5;
          break;
        default:
          return 2;
      }
    },
    // 提交需求前用户确认
    submitCheck(express) {
      this.$confirm(
        "将开始匹配快递员，若成功匹配后数据将写入区块链。之后若违约将会影响您的信用。" +
          "<br>" +
          "您的账户中现有<em>" +
          this.balance +
          "</em>以太币, 该操作将从您的账户中扣除<em>" +
          express.deliveryFee +
          "</em>以太币" +
          "<br>" +
          "是否确认？",
        "提示",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.submitRequest(express);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 提交需求
    submitRequest(express) {
      this.ExpressContract.createExpress(
        express.eid,
        {
          from: this.web3js.eth.accounts[0],
          value: this.web3.utils.toWei(express.deliveryFee + "", "ether")
        },
        (error, hash) => {
          if (!error) {
            fetch("/express", {
              headers: new Headers({ "Content-Type": "application/json" }),
              method: "PUT",
              body: JSON.stringify({ eid: express.eid, status: "searching" })
            }).then(res => {
              if (res.ok) {
                res.json().then(res => {
                  this.$message.success(res.info);
                  this.$router.push("/dashboard/" + this.$route.params.uid);
                });
              } else {
                console.log("Request error");
                this.$message.error("请求出错");
              }
            });
          } else {
            this.$message.error("交易失败");
          }
        }
      );
    },
    // 用户确认收货前确认
    confirmCheck(express) {
      this.$confirm(
        "确认要收货吗？确认后以太币将打入对方账户，该操作不可更改。",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.confirmRequest(express);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 用户确认收货
    confirmRequest(express) {
      this.ExpressContract.ownerCheck(
        express.eid,
        {
          from: this.web3js.eth.accounts[0]
        },
        (error, hash) => {
          if (!error) {
            fetch("/user_confirm", {
              headers: new Headers({ "Content-Type": "application/json" }),
              method: "POST",
              body: JSON.stringify({
                eid: express.eid
              })
            }).then(res => {
              if (res.ok) {
                this.$message.success(res.info);
                this.$router.push("/dashboard/" + this.$route.params.uid);
              } else {
                console.log("request error");
                this.$message.error("操作失败");
              }
            });
          } else {
            this.$message.error("交易失败");
          }
        }
      );
    },
    // 快递员确认收货前确认
    courierConfirmCheck(express) {
      this.$confirm(
        "确认要收货吗？该操作记录将写入区块链并影响您的信用值",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.courierConfirmRequest(express);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 快递员确认收货
    courierConfirmRequest(express) {
      this.ExpressContract.expressmanCheck(
        express.eid,
        {
          from: this.web3js.eth.accounts[0]
        },
        (error, hash) => {
          if (!error) {
            fetch("/courier_confirm", {
              headers: new Headers({ "Content-Type": "application/json" }),
              method: "POST",
              body: JSON.stringify({
                eid: express.eid
              })
            }).then(res => {
              if (res.ok) {
                this.$message.success(res.info);
                this.$router.push("/dashboard/" + this.$route.params.uid);
              } else {
                console.log("request error");
                this.$message.error("操作失败");
              }
            });
          } else {
            this.$message.error("交易失败");
          }
        }
      );
    },
    // 快递员确认配送前确认
    deliveryCheck(express) {
      this.$confirm(
        "将确认接单，若成功接单后数据将写入区块链。之后若违约将会影响您的信用。是否确认？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.deliveryRequest(express);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 快递员确认配送
    deliveryRequest(express) {
      this.ExpressContract.findExpressman(
        express.eid,
        {
          from: this.web3js.eth.accounts[0]
        },
        (error, hash) => {
          if (!error) {
            fetch("/contract", {
              headers: new Headers({ "Content-Type": "application/json" }),
              method: "POST",
              body: JSON.stringify({
                eid: express.eid,
                ownerID: express.uid,
                courierID: this.$route.params.uid,
                deliveryFee: express.deliveryFee
              })
            }).then(res => {
              if (res.ok) {
                res.json().then(res => {
                  this.$message.success(res.info);
                  this.$router.push("/courier/" + this.$route.params.uid);
                });
              } else {
                this.$message.error("操作失败");
              }
            });
          } else {
            this.$message.error("交易失败");
          }
        }
      );
    },
    // 用户取消需求前确认
    cancelCheck(express) {
      this.$confirm("正在为您火速搜索快递员，确定取消吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.cancelRequest(express);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 用户取消需求
    cancelRequest(express) {
      fetch("/express", {
        headers: new Headers({ "Content-Type": "application/json" }),
        method: "PUT",
        body: JSON.stringify({ eid: express.eid, status: "cancelled" })
      }).then(res => {
        if (res.ok) {
          res.json().then(res => {
            this.$message.success(res.info);
            this.$router.push("/dashboard/" + this.$route.params.uid);
          });
        } else {
          console.log("Request error");
          this.$message.error("请求出错");
        }
      });
    },
    // 获取用户账户余额
    getUserBalance() {
      fetch("/balance?id=" + this.$route.params.uid).then(res => {
        if (res.ok) {
          res.json().then(res => {
            this.balance = parseFloat(res.balance).toFixed(2);
          });
        } else {
          console.log(res);
          console.log("Request error");
        }
      });
    }
  },
  mounted() {
    this.getUserBalance();
  }
};
</script>

<style scoped>
.info {
  color: #606266;
  font-size: 14px;
}
.express-holder {
  margin-bottom: 15px;
}
.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-tag {
  margin-right: 5px;
}
.express-detail {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.title {
  font-size: 16px;
  color: #6583b4;
  margin-top: 5px;
}
.text {
  font-size: 14px;
  color: #606266;
}
.comment-detail {
  margin-top: 15px;
}
.comment {
  margin-top: 10px;
}
.express-steps {
  margin-top: 20px;
}
</style>
