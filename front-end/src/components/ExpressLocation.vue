<template>
  <el-card>
    <div slot="header">快递定位</div>
    <div class="content-holder">
      <el-amap vid="amap" :zoom="15" :plugin="plugin" :center="courier.position">
        <el-amap-marker vid="courier" :position="courier.position"></el-amap-marker>
        <el-amap-circle
          vid="courier-range"
          fill-opacity="0.3"
          :center="courier.position"
          :radius="courier.accuracy"
        ></el-amap-circle>
        <el-amap-info-window :position="courier.position" content="你的快递员目前在这里！" :visible="true"></el-amap-info-window>
      </el-amap>
    </div>
  </el-card>
</template>

<script>
/* eslint-disable */
export default {
  name: "ExpressLocation",
  data() {
    let self = this;
    return {
      location: {
        longitude: "",
        latitude: "",
        accuracy: ""
      },
      courier: {
        position: [0, 0],
        accuracy: 0
      },
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [
        {
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition(async (status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            }
          }
        }
      ]
    };
  },
  methods: {
    getCourierLocation() {
      fetch("/contract?eid=" + this.$route.params.eid).then(res => {
        if (res.ok) {
          res.json().then(res => {
            console.log(res);
            fetch("/location?uid=" + res.courierID).then(res => {
              if (res.ok) {
                res.json().then(res => {
                  console.log(res);
                  this.location.longitude = res.longitude;
                  this.location.latitude = res.latitude;
                  this.location.accuracy = res.accuracy;
                  this.courier.position = [
                    parseFloat(res.longitude),
                    parseFloat(res.latitude)
                  ];
                  this.courier.accuracy = parseInt(res.accuracy);
                });
              }
            });
          });
        }
      });
    }
  },
  mounted() {
    this.getCourierLocation();
  }
};
</script>

<style scoped>
.content-holder {
  width: 100%;
  height: 500px;
}
</style>
