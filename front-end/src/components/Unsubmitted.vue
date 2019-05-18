<template>
  <ExpressList title="未提交的快递" type="unsubmitted" :expressList="expressList"></ExpressList>
</template>

<script>
/* eslint-disable */
import ExpressList from "./ExpressList";
export default {
  name: "Unsubmitted",
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
          "&status=created"
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

<style scoped>
</style>
