<template>
  <el-card>
    <div slot="header">通知中心</div>
    <div v-if="notifications.length!=0">
      <el-card v-for="(item,index) in notifications" :key="index">
        <div class="title">{{item.content}}</div>
        <div class="text">{{item.updatedAt}}</div>
      </el-card>
    </div>
    <div v-else class="text">暂无未读消息...</div>
  </el-card>
</template>

<script>
/* eslint-disable */
export default {
  name: "Notifications",
  data() {
    return {
      notifications: []
    };
  },
  methods: {
    getNotifications() {
      fetch("/notification?uid=" + this.$route.params.uid).then(res => {
        if (res.ok) {
          res.json().then(notifications => {
            notifications.data.forEach(e => {
              if (e != null) {
                this.notifications.push(e);
              }
            });
          });
        } else {
          console.log("request error");
        }
      });
    }
  },
  mounted() {
    this.getNotifications();
  }
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
.el-card {
  margin-bottom: 10px;
}
</style>
