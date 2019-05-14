<template>
  <el-menu class="header-bar">
    <el-col :span="18">
      <DisplayPanel></DisplayPanel>
    </el-col>
    <el-col :span="6" class="panel">
      <div class="control-panel">
        <el-button :style="{'margin-right': '15px'}" type="text">首页</el-button>
        <el-badge value="0" :hidden="true">
          <el-button size="small">消息</el-button>
        </el-badge>
      </div>
      <div class="menu-panel">
        <el-dropdown>
          <v-gravatar
            class="avatar"
            email="123456@qq.com"
            :size="30"
            alt="avatar"
            default-img="robohash"
          ></v-gravatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-menu>
</template>

<script>
import DisplayPanel from "./DisplayPanel";
export default {
  name: "HeaderBar",
  components: { DisplayPanel }
};
</script>

<style scoped>
.el-col {
  align-items: center;
  display: flex;
}
.el-menu {
  height: 100%;
}
.header-bar {
  display: flex;
  border: 0;
  border-bottom: 1px solid lightgray;
}
.display-panel {
  justify-content: left;
  padding-left: 5%;
}
.panel {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.control-panel {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.menu-panel {
  display: flex;
  align-items: center;
}
.avatar {
  border-radius: 50%;
  border: 1px solid lightgray;
}
</style>
