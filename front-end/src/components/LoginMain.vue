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
        <el-button type="primary">登录</el-button>
        <el-button @click="toRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
</style>
