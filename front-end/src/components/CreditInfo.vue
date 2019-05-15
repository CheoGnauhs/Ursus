<template>
  <div>
    <el-card>
      <div slot="header">信用信息</div>
      <div>
        <div class="title">
          过往评价总数：
          <div class="text">1</div>
        </div>
        <div class="title">
          过往整体评级：
          <div class="text">
            <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="details">
      <div slot="header">过往评价</div>
      <el-collapse class="comment-detail">
        <el-collapse-item class="rate">
          <template slot="title">
            <div class="time">2019-05-13</div>
            <div class="from">来自于:0xB22ca5601532DD25407D767769ECDe75a7DF3E1A</div>
          </template>
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
          <div class="comment">师傅很不错，到达很准时，态度很棒！</div>
        </el-collapse-item>
      </el-collapse>
      <el-collapse class="comment-detail">
        <el-collapse-item class="rate">
          <template slot="title">
            <div class="time">2019-05-14</div>
            <div class="from">来自于:0xB22ca5601532DD25407D767769ECDe75a7DF3E1A</div>
          </template>
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
          <div class="comment">师傅很不错，到达很准时，态度很棒！</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CreditInfo",
  data() {
    return {
      value: 3.5
    };
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
.details {
  margin-top: 10px;
}
.comment-detail {
  margin-top: 15px;
}
.time {
  color: #67c23a;
  margin-right: 5px;
}
.from {
  color: #909399;
}
</style>
