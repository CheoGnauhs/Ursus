<template>
  <el-card>
    <div slot="header">
      <span>用户资料</span>
    </div>
    <el-form :model="userInfo">
      <el-form-item label="用户名">
        <el-input v-model="userInfo.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="userInfo.name" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="userInfo.telephone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确认更改</el-button>
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
        telephone: ""
      }
    };
  }
};
</script>

<style scoped>
</style>
