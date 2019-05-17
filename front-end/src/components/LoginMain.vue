<template>
  <div class="login-main">
    <el-form :model="loginInfo">
      <DisplayPanel></DisplayPanel>
      <el-form-item label="选择登录身份">
        <br>
        <el-radio-group v-model="loginInfo.type">
          <el-radio label="owner">寄件人</el-radio>
          <el-radio label="courier">快递员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="loginInfo.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginInfo.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login" type="primary">登录</el-button>
        <el-button @click="toRegister">注册</el-button>
      </el-form-item>
      <el-form-item>
        <span class="error">{{errorInfo}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable */
import DisplayPanel from "../components/DisplayPanel";
export default {
  name: "LoginMain",
  components: { DisplayPanel },
  data() {
    return {
      loginInfo: {
        type: "",
        username: "",
        password: ""
      },
      errorInfo: "",
      typeOpts: [
        {
          value: "owner",
          label: "收件人"
        },
        {
          value: "courier",
          label: "快递员"
        }
      ]
    };
  },
  methods: {
    toRegister() {
      this.$router.push("/register");
    },
    login() {
      fetch("/login", {
        headers: new Headers({ "Content-Type": "application/json" }),
        method: "POST",
        body: JSON.stringify({
          username: this.loginInfo.username,
          password: this.loginInfo.password
        })
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.error != null) {
            this.errorInfo = res.error;
          } else {
            if (this.loginInfo.type == "owner") {
              this.$router.push("/dashboard");
            } else {
              this.$router.push("/courier");
            }
          }
        });
    }
  }
};
</script>

<style scoped>
.login-main {
  width: 350px;
  background: white;
  padding: 20px;
  margin: 0 auto;
  border-radius: 5px;
  margin-bottom: 10px;
}
.error {
  color: red;
}
</style>
