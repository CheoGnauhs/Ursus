<template>
  <ExpressList title="配送新快递" type="newExpress" :expressList="expressList"></ExpressList>
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
      fetch("/status_expresses?status=searching").then(res => {
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
