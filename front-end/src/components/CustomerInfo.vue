<template>
  <el-card>
    <div slot="header">快递单号{{eid}}的客户联系信息</div>
    <el-collapse>
      <el-collapse-item title="用户姓名" name="1">
        <div>{{userInfo.realname}}</div>
      </el-collapse-item>
      <el-collapse-item title="用户电话" name="2">
        <div>{{userInfo.telephone}}</div>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
export default {
  name: "CustomerInfo",
  data() {
    return {
      eid: "",
      userInfo: {
        realname: "",
        telephone: ""
      }
    };
  },
  methods: {
    getUserInfo() {
      fetch("/express?eid=" + this.$route.params.eid).then(res => {
        if (res.ok) {
          res.json().then(res => {
            this.eid = res.eid;
            fetch("/user?id=" + res.uid).then(res => {
              if (res.ok) {
                res.json().then(res => {
                  this.userInfo.realname = res.realname;
                  this.userInfo.telephone = res.telephone;
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
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>

<style>
</style>
