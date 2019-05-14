<template>
  <el-card>
    <div slot="header">新增快递</div>
    <el-form :model="expressInfo">
      <el-form-item label="快递单号">
        <el-input v-model="expressInfo.eid" placeholder="请输入快递单号"></el-input>
      </el-form-item>
      <el-form-item label="快递物品">
        <el-input v-model="expressInfo.cargo" placeholder="请输入快递内的物品"></el-input>
      </el-form-item>
      <el-form-item label="取货区域">
        <el-cascader :options="regionData" v-model="getRegion" class="full-length"></el-cascader>
      </el-form-item>
      <el-form-item label="取货地址">
        <el-input v-model="expressInfo.getAddress" placeholder="请输入详细地址"></el-input>
      </el-form-item>
      <el-form-item label="送货区域">
        <el-cascader :options="regionData" v-model="sendRegion" class="full-length"></el-cascader>
      </el-form-item>
      <el-form-item label="派件地址">
        <el-input v-model="expressInfo.sendAddress" placeholder="请输入详细地址"></el-input>
      </el-form-item>
      <el-form-item label="派件日期">
        <el-date-picker v-model="expressInfo.date" placeholder="请选择送达日期" style="width: 100%"></el-date-picker>
      </el-form-item>
      <el-form-item label="派件时间段">
        <div class="time-picker-holder">
          <el-time-picker
            class="time-picker"
            v-model="expressInfo.deliveryFrom"
            placeholder="请选择开始时间"
          ></el-time-picker>
          <div class="line">至</div>
          <el-time-picker
            class="time-picker"
            v-model="expressInfo.deliveryTo"
            placeholder="请选择结束时间"
          ></el-time-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { regionData } from "element-china-area-data";
export default {
  name: "NewExpress",
  data() {
    return {
      regionData,
      expressInfo: {
        eid: "",
        cargo: "",
        date: "",
        getRegion: "",
        sendRegion: "",
        getAddress: "",
        sendAddress: "",
        deliveryFrom: "",
        deliveryTo: ""
      }
    };
  }
};
</script>

<style scoped>
.full-length {
  width: 100%;
}
.time-picker-holder {
  width: 100%;
  display: flex;
}
.time-picker {
  width: 47% !important;
}
.line {
  width: 6%;
  text-align: center;
}
</style>
