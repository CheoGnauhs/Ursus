<template>
  <el-card>
    <div slot="header">
      <span>区块信息</span>
    </div>
    <div>
      <el-collapse>
        <el-collapse-item name="1">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            用户名：
          </template>
          <span class="text">邱超凡</span>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <i class="el-icon-s-finance"></i>
            钱包余额：
          </template>
          <span class="text">100.00ETH</span>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <i class="el-icon-paperclip"></i>
            区块链钱包地址：
          </template>
          <span class="text">0xB22ca5601532DD25407D767769ECDe75a7DF3E1A</span>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <i class="el-icon-view"></i>
            钱包地址二维码：
          </template>
          <qrcode
            class="qrcode"
            value="0xB22ca5601532DD25407D767769ECDe75a7DF3E1A"
            :options="{width: 150, color:{dark:'#6583b4'}}"
          ></qrcode>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "BlockInfo"
};
</script>

<style scoped>
.qrcode {
  display: block;
}
</style>
