<template>
  <div class="login-panel">
    <div class="display-panel">
      <img class="logo" src="../assets/logo.png" alt="logo">
      <span>浣熊-区块链人人快递</span>
    </div>
    <el-form :model="loginInfo">
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
        <el-button type="primary">登录</el-button>
        <el-button>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginInfo: {
        type: "",
        username: "",
        password: ""
      },
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
  }
};
</script>

<style scoped>
.login-panel {
  width: 350px;
  background: white;
  padding: 20px;
  margin: 0 auto;
  border-radius: 5px;
  position: relative;
  top: -50px;
  margin-bottom: 10px;
}
.display-panel {
  color: #6583b4;
  font-size: 18px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}
.logo {
  height: 50px;
  display: inline-block;
  margin-right: 10px;
}
</style>
