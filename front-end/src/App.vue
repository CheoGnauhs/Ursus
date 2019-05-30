<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  methods: {},
  mounted() {
    this.initWeb3();
  }
};
</script>

<style>
html {
  height: 100vh;
}
body {
  margin: 0;
  height: 100vh;
}
#app {
  height: 100vh;
  width: 100vw;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
