<template>
  <el-card>
    <div slot="header">{{title}}</div>
    <el-card shadow="hover">
      <!-- 快递基本信息以及对应操作按钮 -->
      <div slot="header" class="detail-header">
        <div class="header-info">
          <el-tag type="success">快递单号：805599362415999999</el-tag>
          <el-tag type="warning">快递物品：鞋子</el-tag>
          <el-tag type="info">订单日期：2019-05-14</el-tag>
        </div>
        <div v-if="type=='in-process'" class="header-panel">
          <el-button type="primary">确认送达</el-button>
          <el-button @click="jumpTo('/dashboard/express-location')">快递定位</el-button>
        </div>
        <div v-if="type=='unsubmitted'" class="header-panel">
          <el-button type="primary">提交需求</el-button>
        </div>
        <div @click="dialogVisible = true" v-if="type=='need-comment'" class="header-panel">
          <el-button type="primary">评价</el-button>
        </div>
      </div>
      <!-- 快递详情 -->
      <div class="express-detail">
        <div class="courier-info">
          <div class="title">
            快递员：
            <div class="text">邱超凡</div>
          </div>
          <div class="title">
            联系电话：
            <div class="text">17612340000</div>
          </div>
          <div>
            <div class="title">总体评分</div>
            <el-rate
              v-model="value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </div>
        </div>
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
      <!-- 评价部分 -->
      <el-dialog v-if="type=='need-comment'" :visible.sync="dialogVisible" title="评价快递员邱超凡">
        <el-form :model="commentInfo">
          <el-form-item label="评分">
            <br>
            <el-rate v-model="commentInfo.value" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
          </el-form-item>
          <el-form-item label="评价">
            <el-input v-model="commentInfo.comment" placeholder="在此输入想要评论的内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">确认评价</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 快递评价详情 -->
      <el-collapse v-if="type=='finished'" class="comment-detail">
        <el-collapse-item title="评价详情" class="rate">
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
      <!-- 快递进展 -->
      <el-steps class="express-steps" :active="0" finish-status="success" process-status="finish">
        <el-step title="未提交">
          <template slot="description">提交时间</template>
        </el-step>
        <el-step title="匹配快递员">
          <template slot="description">接单时间</template>
        </el-step>
        <el-step title="运送中">
          <template slot="description">送达时间</template>
        </el-step>
        <el-step title="评价">
          <template slot="description">评价时间</template>
        </el-step>
        <el-step title="完成">
          <template slot="description">完成时间</template>
        </el-step>
      </el-steps>
    </el-card>
  </el-card>
</template>

<script>
export default {
  name: "ExpressList",
  props: {
    title: String,
    type: String
  },
  data() {
    return {
      commentInfo: {
        value: 0,
        comment: ""
      },
      value: 3.5,
      dialogVisible: false
    };
  },
  methods: {
    jumpTo(route) {
      this.$router.push(route);
    }
  }
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
.comment-detail {
  margin-top: 15px;
}
.comment {
  margin-top: 10px;
}
.express-steps {
  margin-top: 20px;
}
</style>
