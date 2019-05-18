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
        <el-menu-item @click="jumpTo('/dashboard/'+userInfo.id+'/new-express')" index="1-1">新增快递</el-menu-item>
        <el-submenu index="1-2">
          <template slot="title">所有快递</template>
          <el-menu-item @click="jumpTo('/dashboard/'+userInfo.id+'/in-process')" index="1-2-1">进行中</el-menu-item>
          <el-menu-item @click="jumpTo('/dashboard/'+userInfo.id+'/unsubmitted')" index="1-2-2">未提交</el-menu-item>
          <el-menu-item @click="jumpTo('/dashboard/'+userInfo.id+'/need-comment')" index="1-2-3">待评价</el-menu-item>
          <el-menu-item @click="jumpTo('/dashboard/'+userInfo.id+'/finished')" index="1-2-4">已完成</el-menu-item>
          <el-menu-item @click="jumpTo('/dashboard/'+userInfo.id+'/cancelled')" index="1-2-5">已取消</el-menu-item>
        </el-submenu>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <span>个人信息</span>
      </template>
      <el-menu-item-group>
        <el-menu-item @click="jumpTo('/dashboard/'+userInfo.id+'/user-info')" index="2-1">个人资料</el-menu-item>
        <el-menu-item @click="jumpTo('/dashboard/'+userInfo.id+'/block-info')" index="2-2">区块信息</el-menu-item>
        <el-menu-item @click="jumpTo('/dashboard/'+userInfo.id+'/credit-info')" index="2-3">信用信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item @click="jumpTo('/dashboard/'+userInfo.id+'/notifications')" index="3">消息中心</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "AsidePanel",
  props: { userInfo: Object },
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
