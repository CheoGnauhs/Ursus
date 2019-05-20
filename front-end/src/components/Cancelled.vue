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
