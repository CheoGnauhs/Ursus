<template>
  <el-container class="dashboard">
    <el-header class="header">
      <HeaderBar :userInfo="userInfo" :type="'courier'"></HeaderBar>
    </el-header>
    <el-container class="content">
      <el-aside width="200px">
        <CourierAsidePanel :userInfo="userInfo"></CourierAsidePanel>
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
import CourierAsidePanel from "../components/CourierAsidePanel";
export default {
  name: "Courier",
  components: { HeaderBar, CourierAsidePanel },
  data() {
    return {
      id: "",
      userInfo: {
        id: "",
        telephone: "",
        bcAddress: "",
        type: ""
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
          this.userInfo.telephone = res.telephone;
          this.userInfo.bcAddress = res.bcAddress;
          this.userInfo.type = res.type;
        });
      } else {
        console.log("Request error");
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
