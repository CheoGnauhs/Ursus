import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import ElementUI from 'element-ui';
import router from './router';
import Gravatar from "vue-gravatar";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import VueAMap from "vue-amap";
import './theme/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueAMap);
Vue.component('v-gravatar', Gravatar);
Vue.component(VueQrcode.name, VueQrcode);

VueAMap.initAMapApiLoader({
  key: "56abf3e13f98b7370686e791545d0859",
  plugin: ["AMap.Geolocation"],
  v: '1.4.4'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
