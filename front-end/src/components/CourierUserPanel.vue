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
        <el-badge :value="inProExpressList.length" :hidden="inProExpressList.length==0">
          <el-button @click="jumpTo('/in-process')" type="text">正在进行中</el-button>
        </el-badge>
      </span>
      <span class="badge-holder">
        <el-badge :value="needComExpressList.length" :hidden="needComExpressList.length==0">
          <el-button @click="jumpTo('/need-comment')" type="text">待评价</el-button>
        </el-badge>
      </span>
      <span class="badge-holder">
        <el-badge :value="finishedExpressList.length" :hidden="finishedExpressList.length==0">
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
      inProExpressList: [],
      needComExpressList: [],
      finishedExpressList: [],
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
      this.$router.push("/courier/" + this.userInfo.id + route);
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
    getInProcessExp() {
      fetch(
        "/user_status_contracts?uid=" +
          this.$route.params.uid +
          "&status=searching"
      ).then(res => {
        if (res.ok) {
          res.json().then(res => {
            res.forEach(e => {
              if (e != null) {
                this.inProExpressList.push(e);
              }
            });
            fetch(
              "/user_status_contracts?uid=" +
                this.$route.params.uid +
                "&status=delivering"
            ).then(res => {
              if (res.ok) {
                res.json().then(res => {
                  res.forEach(e => {
                    if (e != null) {
                      this.inProExpressList.push(e);
                    }
                  });
                  fetch(
                    "/user_status_contracts?uid=" +
                      this.$route.params.uid +
                      "&status=ownerChecked"
                  ).then(res => {
                    if (res.ok) {
                      res.json().then(res => {
                        res.forEach(e => {
                          if (e != null) {
                            this.inProExpressList.push(e);
                          }
                        });
                        fetch(
                          "/user_status_contracts?uid=" +
                            this.$route.params.uid +
                            "&status=courierChecked"
                        ).then(res => {
                          if (res.ok) {
                            res.json().then(res => {
                              res.forEach(e => {
                                if (e != null) {
                                  this.inProExpressList.push(e);
                                }
                              });
                            });
                          }
                        });
                      });
                    }
                  });
                });
              }
            });
          });
        } else {
          console.log("request error");
        }
      });
    },
    getNeedCommentExp() {
      fetch(
        "/user_status_contracts?uid=" +
          this.$route.params.uid +
          "&status=needComment"
      ).then(res => {
        if (res.ok) {
          res.json().then(res => {
            res.forEach(e => {
              if (e != null) {
                this.needComExpressList.push(e);
              }
            });
            fetch(
              "/user_status_contracts?uid=" +
                this.$route.params.uid +
                "&status=courierCommented"
            ).then(res => {
              if (res.ok) {
                res.json().then(res => {
                  res.forEach(e => {
                    if (e != null) {
                      this.needComExpressList.push(e);
                    }
                  });
                  fetch(
                    "/user_status_contracts?uid=" +
                      this.$route.params.uid +
                      "&status=ownerCommented"
                  ).then(res => {
                    if (res.ok) {
                      res.json().then(res => {
                        res.forEach(e => {
                          if (e != null) {
                            this.needComExpressList.push(e);
                          }
                        });
                      });
                    } else {
                      console.log("request error");
                    }
                  });
                });
              } else {
                console.log("request error");
              }
            });
          });
        } else {
          console.log("request error");
        }
      });
    },
    getFinishedCommentExp() {
      fetch(
        "/user_status_contracts?uid=" +
          this.$route.params.uid +
          "&status=finished"
      ).then(res => {
        if (res.ok) {
          res.json().then(res => {
            console.log(res);
            res.forEach(e => {
              if (e != null) {
                this.finishedExpressList.push(e);
              }
            });
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
    this.getInProcessExp();
    this.getNeedCommentExp();
    this.getFinishedCommentExp();
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
