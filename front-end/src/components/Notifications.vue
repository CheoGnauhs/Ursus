<template>
  <el-card>
    <div slot="header">通知中心</div>
    <el-card>
      <div class="title">您的快递已经被快递员接受了！</div>
      <div class="text">2019-05-13 13:43:01</div>
    </el-card>
  </el-card>
</template>

<script>
export default {
  name: "Notifications"
};
</script>

<style scoped>
.title {
  font-size: 16px;
  color: #6583b4;
  margin-top: 5px;
}
.text {
  font-size: 14px;
  color: #606266;
}
</style>
