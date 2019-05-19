<template>
  <ExpressList
    title="配送中的快递"
    type="courierProcessing"
    :expressList="expressList"
    :courierInfo="courierInfo"
  ></ExpressList>
</template>

<script>
/* eslint-disable */
import ExpressList from "./ExpressList";
export default {
  name: "CourierInProcess",
  components: { ExpressList },
  data() {
    return {
      expressList: [],
      courierInfo: []
    };
  },
  methods: {
    getExpressInfo() {
      fetch(
        "/user_status_contracts?uid=" +
          this.$route.params.uid +
          "&status=delivering"
      ).then(res => {
        if (res.ok) {
          res.json().then(res => {
            console.log(res);
            res.forEach(e => {
              this.expressList.push(e);
            });
            this.getCourierInfo();
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
    }
  },
  mounted() {
    this.getExpressInfo();
  }
};
</script>

<style>
</style>
