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
  components: { HeaderBar, AsidePanel },
  data() {
    return {
      location: {
        accuracy: "",
        latitude: "",
        longitude: ""
      }
    };
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        // eslint-disable-next-line
        console.log(position);
        this.location.accuracy = position.coords.accuracy;
        this.location.latitude = position.coords.latitude;
        this.location.longitude = position.coords.longitude;
      });
    }
  }
};
</script>

<style scoped>
.el-main {
  overflow: scroll;
  height: 100%;
}
.dashboard {
  width: 100%;
  height: 100%;
}
.header {
  height: 7vh;
}
.content {
  height: 92vh;
}
</style>
