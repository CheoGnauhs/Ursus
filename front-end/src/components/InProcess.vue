<template>
  <ExpressList
    title="进行中的快递"
    type="in-process"
    :expressList="expressList"
    :courierInfo="courierInfo"
  ></ExpressList>
</template>

<script>
/* eslint-disable */
import ExpressList from "./ExpressList";
export default {
  name: "InProcess",
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
        "/user_status_expresses?uid=" +
          this.$route.params.uid +
          "&status=searching"
      ).then(res => {
        if (res.ok) {
          res.json().then(res => {
            res.forEach(e => {
              this.expressList.push(e);
            });
            fetch(
              "/user_status_expresses?uid=" +
                this.$route.params.uid +
                "&status=delivering"
            ).then(res => {
              if (res.ok) {
                res.json().then(res => {
                  res.forEach(e => {
                    this.expressList.push(e);
                  });
                  this.getCourierInfo();
                });
              }
            });
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
    getCourierID(eid) {
      fetch("/contract?eid=" + eid).then(res => {
        if (res.ok) {
          res.json().then(res => {
            fetch("/user?id=" + res.courierID).then(res => {
              if (res.ok) {
                res.json().then(res => {
                  console.log(res);
                  return res;
                });
              } else {
                console.log("request error");
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
