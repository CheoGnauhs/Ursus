<template>
  <el-container class="dashboard">
    <el-header class="header">
      <HeaderBar :userInfo="userInfo"></HeaderBar>
    </el-header>
    <el-container class="content">
      <el-aside width="200px">
        <AsidePanel :userInfo="userInfo"></AsidePanel>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
/* eslint-disable */
import HeaderBar from "../components/HeaderBar";
import AsidePanel from "../components/AsidePanel";
export default {
  name: "Dashboard",
  components: { HeaderBar, AsidePanel },
  data() {
    return {
      id: "",
      userInfo: {
        id: "",
        realname: "",
        telephone: ""
      },
      location: {
        accuracy: "",
        latitude: "",
        longitude: ""
      }
    };
  },
  mounted() {
    this.id = this.$route.params.uid;
    fetch("/user?id=" + this.id).then(res => {
      if (res.ok) {
        res.json().then(res => {
          console.log(res);
          this.userInfo.id = res.id;
          this.userInfo.realname = res.realname;
          this.userInfo.telephone = res.telephone;
        });
      } else {
        console.log("request error!");
      }
    });
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
