<template>
  <ExpressList title="配送新快递" type="newExpress" :expressList="expressList"></ExpressList>
</template>

<script>
/* eslint-disable */
import ExpressList from "./ExpressList";
export default {
  name: "GetNewExpress",
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
            res.forEach(e => {
              if (e != null) {
                this.expressList.push(e);
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
    this.getExpressInfo();
  }
};
</script>

<style>
</style>
