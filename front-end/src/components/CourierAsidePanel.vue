<template>
  <el-menu
    background-color="#6583B4"
    text-color="white"
    active-text-color="#CC7321"
  >
    <el-menu-item @click="jumpTo('/courier/get-new-express')" index="1">配送新快递</el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <span>快递管理</span>
      </template>
      <el-menu-item @click="jumpTo('/courier/in-process')" index="2-1">进行中</el-menu-item>
      <el-menu-item @click="jumpTo('/courier/need-comment')" index="2-2">待评价</el-menu-item>
      <el-menu-item @click="jumpTo('/courier/finished')" index="2-3">已完成</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <span>个人信息</span>
      </template>
      <el-menu-item-group>
        <el-menu-item @click="jumpTo('/courier/user-info')" index="3-1">个人资料</el-menu-item>
        <el-menu-item @click="jumpTo('/courier/block-info')" index="3-2">区块信息</el-menu-item>
        <el-menu-item @click="jumpTo('/courier/credit-info')" index="3-3">信用信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item @click="jumpTo('/courier/notifications')" index="4">消息中心</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "CourierAsidePanel",
  methods: {
    jumpTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
.el-menu {
  height: 100%;
}
</style>