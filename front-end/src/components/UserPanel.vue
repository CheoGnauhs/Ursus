<template>
  <el-card>
    <div slot="header" class="header-panel">
      <span class="info">
        <v-gravatar
          class="avatar"
          email="123456@qq.com"
          :size="50"
          alt="avatar"
          default-img="robohash"
        ></v-gravatar>
        <span class="text">Ryan Tan</span>
      </span>
      <span class="text">
        钱包地址:
        <el-tag type="warning">0xB22ca5601532DD25407D767769ECDe75a7DF3E1A</el-tag>
      </span>
    </div>
    <div class="control-panel">
      <span class="badge-holder">
        <el-badge value="1" :hidden="true">
          <el-button type="text">正在进行中</el-button>
        </el-badge>
      </span>
      <span class="badge-holder">
        <el-badge value="1">
          <el-button type="text">未提交</el-button>
        </el-badge>
      </span>
      <span class="badge-holder">
        <el-badge value="1">
          <el-button type="text">待评价</el-button>
        </el-badge>
      </span>
      <span class="badge-holder">
        <el-badge value="1">
          <el-button type="text">已完成</el-button>
        </el-badge>
      </span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "UserPanel"
};
</script>

<style scoped>
.header-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.info {
  display: flex;
  align-items: center;
}
.avatar {
  border: solid 1px lightgray;
  border-radius: 50%;
  margin-right: 20px;
}
.text {
  font-size: 14px;
  color: #6583b4;
}
.control-panel,
.badge-holder {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.badge-holder {
  border-right: 1px solid lightgray;
}
.badge-holder:last-child {
  border: 0;
}
.badge-holder {
  width: 25%;
}
</style>
