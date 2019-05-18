<template>
  <ExpressList
    title="已经完成的快递"
    type="courierFinished"
    :expressList="expressList"
    :courierInfo="courierInfo"
  ></ExpressList>
</template>

<script>
/* eslint-disable */
import ExpressList from "./ExpressList";
export default {
  name: "CourierFinished",
  components: { ExpressList },
  data() {
    return {
      expressList: [],
      courierInfo: {}
    };
  },
  methods: {
    getExpressInfo() {
      fetch(
        "/user_status_contracts?uid=" +
          this.$route.params.uid +
          "&status=finished"
      ).then(res => {
        if (res.ok) {
          res.json().then(res => {
            console.log(res);
            this.expressList = res;
          });
        } else {
          console.log("request error");
        }
      });
    },
    getCourierInfo() {
      fetch("/user?id=" + this.$route.params.uid).then(res => {
        if (res.ok) {
          res.json().then(res => {
            this.courierInfo = res;
          });
        } else {
          console.log("Request error");
        }
      });
    }
  },
  mounted() {
    this.getExpressInfo();
    this.getCourierInfo();
  }
};
</script>

<style>
</style>
