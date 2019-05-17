<template>
  <div class="register-main">
    <DisplayPanel></DisplayPanel>
    <el-form :model="regInfo">
      <el-form-item required label="用户类型">
        <br>
        <el-select v-model="regInfo.type" placeholder="请选择用户类型">
          <el-option
            v-for="item in typeOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item required label="用户名">
        <el-input v-model="regInfo.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item required label="真实姓名">
        <el-input v-model="regInfo.name" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item required label="手机号">
        <el-input v-model="regInfo.telephone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item required label="密码">
        <el-input type="password" v-model="regInfo.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item required label="确认密码">
        <el-input type="password" v-model="regInfo.repeatPassword" placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="register" type="primary">确认注册</el-button>
      </el-form-item>
      <el-form-item>
        已有帐号？
        <router-link to="/">点击此处登录</router-link>
      </el-form-item>
      <el-form-item>
        <span class="error">{{errorInfo}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable */
import DisplayPanel from "./DisplayPanel";
export default {
  name: "RegisterMain",
  components: { DisplayPanel },
  data() {
    return {
      errorInfo: "",
      regInfo: {
        type: "",
        name: "",
        username: "",
        password: "",
        repeatPassword: "",
        telephone: ""
      },
      typeOpts: [
        {
          label: "寄件人",
          value: "owner"
        },
        {
          label: "快递员",
          value: "courier"
        }
      ]
    };
  },
  methods: {
    register() {
      fetch("/user", {
        headers: new Headers({ "Content-Type": "application/json" }),
        method: "POST",
        body: JSON.stringify({
          usertype: this.regInfo.type,
          username: this.regInfo.username,
          realname: this.regInfo.name,
          password: this.regInfo.password,
          telephone: this.regInfo.telephone
        })
      }).then(res => {
        console.log(res.ok);
        if (res.ok) {
          res.json().then(res => {
            this.$message.success("注册成功");
            if (this.regInfo.type == "owner") {
              this.$router.push("/dashboard/" + res.id);
            } else {
              this.$router.push("/courier/" + res.id);
            }
          });
        } else {
          res.json().then(res => {
            this.$message.error("注册失败");
            if (res.error == "username must be unique") {
              this.errorInfo = "用户名已被注册";
            } else this.errorInfo = res.error;
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.el-select {
  width: 100%;
}
.register-main {
  width: 350px;
  background: white;
  padding: 20px;
  margin: 0 auto;
  border-radius: 5px;
  margin-bottom: 10px;
}
.el-form-item:last-child {
  margin-bottom: 0;
}
.error {
  color: red;
}
</style>
