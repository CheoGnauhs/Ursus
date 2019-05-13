<template>
  <el-container class="dashboard">
    <el-header>
      <HeaderBar></HeaderBar>
    </el-header>
    <el-container class="content-holder">
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
.dashboard {
  width: 100%;
  height: 100%;
}
</style>
