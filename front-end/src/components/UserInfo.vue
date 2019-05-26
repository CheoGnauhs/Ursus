<template>
  <el-card>
    <div slot="header">
      <span>用户资料</span>
    </div>
    <el-form :model="userInfo">
      <el-form-item label="真实姓名">
        <el-input :disabled="true" v-model="userInfo.name" placeholder="真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="区块链地址">
        <el-input :disabled="true" v-model="userInfo.bcAddress" placeholder="区块链上地址"></el-input>
      </el-form-item>
      <el-form-item label="以太币余额">
        <el-input :disabled="true" v-model="balance" placeholder="区块链上地址"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input :disabled="true" v-model="userInfo.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input :disabled="true" v-model="userInfo.telephone" placeholder="请输入手机号"></el-input>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
/* eslint-disable */
export default {
  name: "UserInfo",
  data() {
    return {
      id: "",
      userInfo: {
        username: "",
        name: "",
        telephone: "",
        bcAddress: ""
      },
      balance: 0
    };
  },
  methods: {
    getUserInfo() {
      fetch("/user?id=" + this.$route.params.uid).then(res => {
        if (res.ok) {
          res.json().then(res => {
            this.userInfo.username = res.username;
            this.userInfo.name = res.realname;
            this.userInfo.bcAddress = res.bcAddress;
            this.userInfo.telephone = res.telephone;
          });
        } else {
          console.log(res);
          console.log("Request error!");
        }
      });
    },
    getUserBalance() {
      fetch("/balance?id=" + this.$route.params.uid).then(res => {
        if (res.ok) {
          res.json().then(res => {
            this.balance = res.balance;
          });
        } else {
          console.log(res);
          console.log("Request error!");
        }
      });
    }
  },
  mounted() {
    this.getUserBalance();
    this.getUserInfo();
  }
};
</script>

<style scoped>
</style>
