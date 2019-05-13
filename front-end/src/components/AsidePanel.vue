<template>
  <el-menu
    default-active="1"
    background-color="#6583B4"
    text-color="white"
    active-text-color="#CC7321"
  >
    <el-submenu index="1">
      <template slot="title">
        <span>快递管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">新增快递</el-menu-item>
        <el-submenu index="1-2">
          <template slot="title">所有快递</template>
          <el-menu-item index="1-2-1">进行中</el-menu-item>
          <el-menu-item index="1-2-2">未提交</el-menu-item>
          <el-menu-item index="1-2-3">已完成</el-menu-item>
        </el-submenu>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <span>个人信息</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">个人资料</el-menu-item>
        <el-menu-item index="2-2">区块信息</el-menu-item>
        <el-menu-item index="2-3">信用信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="3">消息中心</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "AsidePanel"
};
</script>

<style scoped>
.el-menu {
  height: 100%;
}
</style>
