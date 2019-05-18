<template>
  <el-card>
    <div slot="header">新增快递</div>
    <el-form :model="expressInfo" :rules="rules" ref="expressInfo">
      <el-form-item prop="eid" required label="快递单号">
        <el-input v-model="expressInfo.eid" placeholder="请输入快递单号"></el-input>
      </el-form-item>
      <el-form-item prop="content" required label="快递物品">
        <el-input v-model="expressInfo.content" placeholder="请输入快递内的物品"></el-input>
      </el-form-item>
      <el-form-item prop="getRegion" required label="取货区域">
        <el-cascader :options="regionData" v-model="expressInfo.getRegion" class="full-length"></el-cascader>
      </el-form-item>
      <el-form-item prop="getAddress" required label="取货地址">
        <el-input v-model="expressInfo.getAddress" placeholder="请输入详细地址"></el-input>
      </el-form-item>
      <el-form-item prop="sendRegion" required label="送货区域">
        <el-cascader :options="regionData" v-model="expressInfo.sendRegion" class="full-length"></el-cascader>
      </el-form-item>
      <el-form-item prop="sendAddress" required label="派件地址">
        <el-input v-model="expressInfo.sendAddress" placeholder="请输入详细地址"></el-input>
      </el-form-item>
      <el-form-item prop="deliveryDate" required label="派件日期">
        <el-date-picker
          v-model="expressInfo.deliveryDate"
          placeholder="请选择送达日期"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item required label="派件时间段">
        <div class="form-holder">
          <el-form-item prop="deliveryFrom" required class="pick-holder">
            <el-time-picker
              class="time-picker"
              v-model="expressInfo.deliveryFrom"
              placeholder="请选择开始时间"
            ></el-time-picker>
          </el-form-item>
          <div class="line">至</div>
          <el-form-item prop="deliveryTo" required class="pick-holder">
            <el-time-picker
              class="time-picker"
              v-model="expressInfo.deliveryTo"
              placeholder="请选择结束时间"
            ></el-time-picker>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit('expressInfo')" :loading="isLoading" type="primary">提交</el-button>
        <el-button @click="resetForm('expressInfo')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
/* eslint-disable */
import { regionData } from "element-china-area-data";
export default {
  name: "NewExpress",
  data() {
    return {
      rules: {
        eid: [{ required: true, message: "请输入快递单号", trigger: "blur" }],
        content: [
          { required: true, message: "请输入快递寄送的物品", trigger: "change" }
        ],
        getRegion: [
          { required: true, message: "请选择收取快递的区域", trigger: "change" }
        ],
        getAddress: [
          {
            required: true,
            message: "请输入收取快递的详细地址",
            trigger: "change"
          }
        ],
        sendRegion: [
          { required: true, message: "请选择寄送快递的区域", trigger: "change" }
        ],
        sendAddress: [
          {
            required: true,
            message: "请选择寄送快递的详细地址",
            trigger: "change"
          }
        ],
        deliveryDate: [
          {
            required: true,
            message: "请选择快递员配送快递的日期",
            trigger: "change"
          }
        ],
        deliveryFrom: [
          {
            required: true,
            message: "请选择快递员配送快递的起始时间",
            trigger: "change"
          }
        ],
        deliveryTo: [
          {
            required: true,
            message: "请选择快递员配送快递的截止时间",
            trigger: "change"
          }
        ]
      },
      regionData,
      expressInfo: {
        eid: "",
        content: "",
        deliveryDate: "",
        getRegion: [],
        sendRegion: [],
        getAddress: "",
        sendAddress: "",
        deliveryFrom: "",
        deliveryTo: ""
      },
      isLoading: false
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.registerExp();
        } else {
          this.$message.error("字段验证失败");
          console.log("validate error");
        }
      });
    },
    registerExp() {
      let id = this.$route.params.uid;
      let data = this.expressInfo;
      data.getRegion = data.getRegion.toString();
      data.sendRegion = data.sendRegion.toString();
      data = Object.assign(data, { uid: id });
      fetch("/express", {
        headers: new Headers({ "Content-Type": "application/json" }),
        method: "POST",
        body: JSON.stringify(data)
      }).then(res => {
        if (res.ok) {
          res.json().then(res => {
            this.$message.success(res.info);
            this.$router.push(
              "/dashboard/" + this.$route.params.id + "/unsubmitted"
            );
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.full-length {
  width: 100%;
}
.form-holder {
  width: 100%;
  display: flex;
}
.pick-holder {
  width: 100%;
}
.time-picker {
  width: 100% !important;
}
.line {
  width: 6%;
  text-align: center;
}
</style>
