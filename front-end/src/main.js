import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import ElementUI from 'element-ui';
import router from './router';
import Gravatar from "vue-gravatar";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import VueAMap from "vue-amap";
import Web3 from "web3";
import ExpressContract from "../../build/contracts/ExpressContract.json";
import './theme/index.css';

/* eslint-disable */

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

Vue.prototype.initWeb3 = function () {
  window.ethereum.enable();
  var Eth = require('ethjs-query');
  var EthContract = require('ethjs-contract');
  let ExpressContractAdd = "0x91eaF31e7D8d0a30c654295C6797C24C047FC2f1";
  Vue.prototype.web3js = window.web3;
  Vue.prototype.web3 = new Web3(window.web3.currentProvider);
  if (typeof this.web3js != "undefined") {
    let eth = new Eth(this.web3js.currentProvider);
    let contract = new EthContract(eth);
    let ExpressContractInstance = contract(ExpressContract.abi);
    Vue.prototype.ExpressContract = ExpressContractInstance.at(ExpressContractAdd);
    console.log(this.ExpressContract);
  }
  else {
    console.log("No currentProvider for web3");
  }
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
