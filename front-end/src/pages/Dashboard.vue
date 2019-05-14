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
import UserPanel from "../components/UserPanel";
export default {
  name: "Dashboard",
  components: { HeaderBar, AsidePanel, UserPanel }
};
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
}
</style>
