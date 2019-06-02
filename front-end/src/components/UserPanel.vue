<template>
  <el-card>
    <div slot="header" class="header-panel">
      <span class="info">
        <v-gravatar
          class="avatar"
          :email="userInfo.telephone+'@123.com'"
          :size="50"
          alt="avatar"
          default-img="robohash"
        ></v-gravatar>
        <span class="text">{{userInfo.realname}}</span>
      </span>
      <span class="text">
        钱包地址:
        <el-tag type="warning">{{userInfo.bcAddress}}</el-tag>
      </span>
    </div>
    <div class="control-panel">
      <span class="badge-holder">
        <el-badge :value="expressNum.processing" :hidden="expressNum.processing==0">
          <el-button @click="jumpTo('/in-process')" type="text">正在进行中</el-button>
        </el-badge>
      </span>
      <span class="badge-holder">
        <el-badge :value="expressNum.unsubmitted" :hidden="expressNum.unsubmitted==0">
          <el-button @click="jumpTo('/unsubmitted')" type="text">未提交</el-button>
        </el-badge>
      </span>
      <span class="badge-holder">
        <el-badge :value="expressNum.needcomment" :hidden="expressNum.needcomment==0">
          <el-button @click="jumpTo('/need-comment')" type="text">待评价</el-button>
        </el-badge>
      </span>
      <span class="badge-holder">
        <el-badge :value="expressNum.finished" :hidden="expressNum.finished==0">
          <el-button @click="jumpTo('/finished')" type="text">已完成</el-button>
        </el-badge>
      </span>
    </div>
  </el-card>
</template>

<script>
/* eslint-disable */
export default {
  name: "UserPanel",
  data() {
    return {
      id: "",
      expressNum: {
        unsubmitted: "",
        processing: "",
        needcomment: "",
        finished: ""
      },
      userInfo: {
        realname: "",
        telephone: "",
        bcAddress: "",
        type: ""
      }
    };
  },
  methods: {
    jumpTo(route) {
      this.$router.push("/dashboard/" + this.userInfo.id + route);
    },
    getUserInfo() {
      fetch("/user?id=" + this.id).then(res => {
        if (res.ok) {
          res.json().then(res => {
            this.userInfo.id = res.id;
            this.userInfo.realname = res.realname;
            this.userInfo.telephone = res.telephone;
            this.userInfo.bcAddress = res.bcAddress;
            this.userInfo.type = res.usertype;
          });
        } else {
          console.log("request error");
        }
      });
    },
    getExpressCount() {
      fetch("/expressnum?uid=" + this.id).then(res => {
        if (res.ok) {
          res.json().then(res => {
            console.log(res);
            this.expressNum.unsubmitted = res.unsubmitted;
            this.expressNum.processing = res.processing;
            this.expressNum.needcomment = res.needcomment;
            this.expressNum.finished = res.finished;
          });
        } else {
          console.log("request error");
        }
      });
    }
  },
  mounted() {
    this.id = this.$route.params.uid;
    this.getUserInfo();
    this.getExpressCount();
  }
};
</script>

<style scoped>
.header-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.info {
  display: flex;
  align-items: center;
}
.avatar {
  border: solid 1px lightgray;
  border-radius: 50%;
  margin-right: 20px;
}
.text {
  font-size: 14px;
  color: #6583b4;
}
.control-panel,
.badge-holder {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.badge-holder {
  border-right: 1px solid lightgray;
}
.badge-holder:last-child {
  border: 0;
}
.badge-holder {
  width: 100%;
}
</style>
