<template>
  <el-container class="dashboard">
    <el-header class="header">
      <HeaderBar></HeaderBar>
    </el-header>
    <el-container class="content">
      <el-aside width="200px">
        <AsidePanel></AsidePanel>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderBar from "../components/HeaderBar";
import AsidePanel from "../components/AsidePanel";
export default {
  name: "Dashboard",
  components: { HeaderBar, AsidePanel }
};
</script>

<style scoped>
.el-main {
  overflow:scroll;
  height: 100%;
}
.dashboard {
  width: 100%;
  height: 100%;
}
.header{
  height: 7vh;
}
.content{
  height: 92vh;
}
</style>
