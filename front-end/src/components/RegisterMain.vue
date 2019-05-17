<template>
  <div class="register-main">
    <DisplayPanel></DisplayPanel>
    <el-form :model="regInfo" ref="regInfo" :rules="rules">
      <el-form-item prop="type" required label="用户类型">
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
      <el-form-item prop="username" required label="用户名">
        <el-input v-model="regInfo.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="realname" required label="真实姓名">
        <el-input v-model="regInfo.realname" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item prop="telephone" required label="手机号">
        <el-input v-model="regInfo.telephone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password" required label="密码">
        <el-input type="password" v-model="regInfo.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword" required label="确认密码">
        <el-input type="password" v-model="regInfo.checkPassword" placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="isLoading" @click="onSubmit('regInfo')" type="primary">确认注册</el-button>
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
  realname: "RegisterMain",
  components: { DisplayPanel },
  data() {
    var usernameCheck = (rule, value, callback) => {
      let reg = /^\w+$/;
      if (value.search(reg) === -1) {
        callback(new Error("用户名只能包含数字、字母、下划线"));
      } else {
        callback();
      }
    };
    var passwordCheck = (rule, value, callback) => {
      let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/;
      if (value.search(reg) === -1) {
        callback(new Error("密码必须包括大小写字母和数字，可以包含特殊字符"));
      } else {
        callback();
      }
    };
    var checkPasswordCheck = (rule, value, callback) => {
      if (value != this.regInfo.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    var telephoneCheck = (rule, value, callback) => {
      let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[6|7|8]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (value.search(reg) === -1) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    var realnameCheck = (rule, value, callback) => {
      let reg = /^[\u4e00-\u9fa5]{0,}$/;
      if (value.search(reg) === -1) {
        callback(new Error("请输入中文字符"));
      } else {
        callback();
      }
    };
    return {
      isLoading: false,
      errorInfo: "",
      regInfo: {
        type: "",
        realname: "",
        username: "",
        password: "",
        checkPassword: "",
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
      ],
      rules: {
        type: [
          { required: true, message: "请选择用户类型", trigger: "change" }
        ],
        username: [
          { validator: usernameCheck, trigger: "change" },
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        password: [
          { validator: passwordCheck, trigger: "change" },
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 8,
            max: 16,
            message: "密码长度在8-16个字符之间",
            trigger: "change"
          }
        ],
        checkPassword: [
          { required: true, message: "请再次输入密码", trigger: "change" },
          { validator: checkPasswordCheck, trigger: "change" }
        ],
        telephone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          { validator: telephoneCheck, trigger: "change" }
        ],
        realname: [
          { required: true, message: "请输入您的真实姓名", trigger: "change" },
          { validator: realnameCheck, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.isLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.register();
        } else {
          this.isLoading = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
    register() {
      fetch("/user", {
        headers: new Headers({ "Content-Type": "application/json" }),
        method: "POST",
        body: JSON.stringify({
          usertype: this.regInfo.type,
          username: this.regInfo.username,
          realname: this.regInfo.realname,
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
          this.isLoading = false;
          this.errorInfo = "网络错误，请稍后重试";
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
