<template>
  <ExpressList
    title="已完成的快递"
    type="finished"
    :expressList="expressList"
    :courierInfo="courierInfo"
    :commentContent="commentContent"
    :imgInfo="imgInfo"
  ></ExpressList>
</template>

<script>
/* eslint-disable */
import ExpressList from "./ExpressList";
export default {
  name: "Finished",
  components: { ExpressList },
  data() {
    return {
      expressList: [],
      courierInfo: [],
      commentContent: [],
      imgInfo: []
    };
  },
  methods: {
    getExpressInfo() {
      fetch(
        "/user_status_expresses?uid=" +
          this.$route.params.uid +
          "&status=finished"
      ).then(res => {
        if (res.ok) {
          res.json().then(res => {
            res.forEach(e => {
              if (e != null) {
                this.expressList = res;
              }
            });
            this.getCourierInfo();
            this.getCommentInfo();
            this.getImgInfo();
          });
        } else {
          console.log("request error");
        }
      });
    },
    getCourierInfo() {
      let promiseArray = [];
      if (this.expressList[0] != null) {
        this.expressList.forEach(e => {
          promiseArray.push(fetch("/eid_to_courier?eid=" + e.eid));
        });
        Promise.all(promiseArray).then(results => {
          results.forEach(e => {
            e.json().then(res => {
              this.courierInfo.push(res);
            });
          });
        });
      }
    },
    getCommentInfo() {
      let promiseArray = [];
      if (this.expressList[0] != null) {
        this.expressList.forEach(e => {
          promiseArray.push(
            fetch("/type_eid_comments", {
              headers: new Headers({ "Content-Type": "application/json" }),
              method: "POST",
              body: JSON.stringify({
                commentType: "o2c",
                eid: e.eid
              })
            })
          );
        });
        Promise.all(promiseArray).then(results => {
          results.forEach(e => {
            e.json().then(res => {
              this.commentContent.push(res);
            });
          });
        });
      }
    },
    getImgInfo() {
      let promiseArray = [];
      if (this.expressList[0] != null) {
        this.expressList.forEach(e => {
          promiseArray.push(fetch("/attachments?eid=" + e.eid));
        });
        Promise.all(promiseArray).then(results => {
          results.forEach(e => {
            e.json().then(res => {
              this.imgInfo.push(res);
            });
            console.log(this.imgInfo);
          });
        });
      }
    }
  },
  mounted() {
    this.getExpressInfo();
  }
};
</script>

<style>
</style>
