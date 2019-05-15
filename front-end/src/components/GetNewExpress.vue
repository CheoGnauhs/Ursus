<template>
  <el-card>
    <el-card shadow="hover">
      <!-- 快递基本信息以及对应操作按钮 -->
      <div slot="header" class="detail-header">
        <div class="header-info">
          <el-tag type="success">快递单号：805599362415999999</el-tag>
          <el-tag type="warning">快递物品：鞋子</el-tag>
          <el-tag type="info">订单日期：2019-05-14</el-tag>
        </div>
        <div class="header-panel">
          <el-button type="primary">确认选择</el-button>
        </div>
      </div>
      <div class="express-detail">
        <div class="delivery-area">
          <div class="title">配送起点：</div>
          <div class="text">上海市杨浦区中通杨浦分公司</div>
          <div class="title">配送终点：</div>
          <div class="text">上海市杨浦区四平路1239号同济大学</div>
        </div>
        <div class="delivery-time title">
          配送时间段：
          <div class="text">2019-05-14 14:00</div>
          <div class="title">至</div>
          <div class="text">2019-05-14 17:00</div>
        </div>
        <div class="delivery-fee title">
          配送费用：
          <div class="text">10.00ETH</div>
        </div>
      </div>
    </el-card>
  </el-card>
</template>

<script>
export default {
  name: "GetNewExpress"
};
</script>

<style scoped>
.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-tag {
  margin-right: 5px;
}
.express-detail {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
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
