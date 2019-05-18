<template>
  <ExpressList title="已取消的快递" type="cancelled" :expressList="expressList"></ExpressList>
</template>

<script>
/* eslint-disable */
import ExpressList from "./ExpressList";
export default {
  name: "Cancelled",
  components: { ExpressList },
  data() {
    return {
      expressList: []
    };
  },
  methods: {
    getExpressInfo() {
      fetch(
        "/user_status_expresses?uid=" +
          this.$route.params.uid +
          "&status=cancelled"
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
    }
  },
  mounted() {
    this.getExpressInfo();
  }
};
</script>

<style>
</style>
