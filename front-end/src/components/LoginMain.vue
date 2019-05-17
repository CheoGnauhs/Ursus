<template>
  <div class="login-main">
    <el-form :model="loginInfo" :rules="rules" ref="loginInfo">
      <DisplayPanel></DisplayPanel>
      <el-form-item prop="type" required label="选择登录身份">
        <br>
        <el-radio-group v-model="loginInfo.type">
          <el-radio label="owner">寄件人</el-radio>
          <el-radio label="courier">快递员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="username" required label="用户名">
        <el-input v-model="loginInfo.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password" required label="密码">
        <el-input type="password" v-model="loginInfo.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="isLoading" @click="onSubmit('loginInfo')" type="primary">登录</el-button>
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
    var validateUsername = (rule, value, callback) => {
      let reg = /^\w+$/;
      if (value.search(reg) === -1) {
        callback(new Error("用户名需由数字、字母、下划线构成"));
      } else {
        callback();
      }
    };
    return {
      loginInfo: {
        type: "",
        username: "",
        password: ""
      },
      isLoading: false,
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
      ],
      rules: {
        type: [
          { required: true, message: "请选择用户类型", trigger: "change" }
        ],
        username: [
          { validator: validateUsername, trigger: "change" },
          { required: true, message: "请填写用户名", trigger: "change" }
        ],
        password: [{ required: true, message: "请填写密码", trigger: "change" }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.isLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          this.isLoading = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
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
      }).then(res => {
        console.log(res.ok);
        if (res.ok) {
          this.$message.success("登陆成功");
          return res.json().then(res => {
            if (this.loginInfo.type == "owner") {
              this.$router.push("/dashboard/" + res.id);
            } else {
              this.$router.push("/courier/" + res.id);
            }
          });
        } else {
          this.isLoading = false;
          this.$message.error("登录失败");
          res.json().then(res => {
            this.errorInfo = res.error;
          });
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
