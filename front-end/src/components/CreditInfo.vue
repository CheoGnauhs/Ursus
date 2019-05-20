<template>
  <div>
    <el-card class="details">
      <div slot="header">过往评价</div>
      <el-collapse v-for="(comment,index) in comments" :key="index" class="comment-detail">
        <el-collapse-item class="rate">
          <template slot="title">
            <div class="time">{{comment.UpdatedAt.split('T')[0]}}</div>
            <div class="from">{{comment.UpdatedAt.split('T')[1].split('.')[0]}}</div>
          </template>
          <el-rate
            v-model="comment.value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
          <div class="comment">{{comment.content}}</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "CreditInfo",
  data() {
    return {
      value: 3.5,
      comments: []
    };
  },
  methods: {
    getComments() {
      fetch("/from_user_comments", {
        headers: new Headers({ "Content-Type": "application/json" }),
        method: "POST",
        body: JSON.stringify({
          fromID: this.$route.params.uid
        })
      }).then(res => {
        if (res.ok) {
          res.json().then(res => {
            res.forEach(e => {
              if (e != null) {
                this.comments.push(e);
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
    this.getComments();
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
