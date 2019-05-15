import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import ElementUI from 'element-ui';
import router from './router';
import Gravatar from "vue-gravatar";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import './theme/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.component('v-gravatar', Gravatar);
Vue.component(VueQrcode.name, VueQrcode);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
