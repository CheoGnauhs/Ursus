<template>
  <ExpressList
    title="待评价的快递"
    type="needComment"
    :expressList="expressList"
    :courierInfo="courierInfo"
    :imgInfo="imgInfo"
  ></ExpressList>
</template>

<script>
/* eslint-disable */
import ExpressList from "./ExpressList";
export default {
  name: "NeedComment",
  components: { ExpressList },
  data() {
    return {
      expressList: [],
      courierInfo: [],
      imgInfo: []
    };
  },
  methods: {
    getExpressInfo() {
      fetch(
        "/user_status_expresses?uid=" +
          this.$route.params.uid +
          "&status=needComment"
      ).then(res => {
        if (res.ok) {
          res.json().then(res => {
            res.forEach(e => {
              if (e != null) {
                this.expressList = res;
              }
            });
            this.getCourierInfo();
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
