import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import carApi from './api/carInfo/carInfo'
import userApi from './api/user/user'
import orderApi from './api/order/order'
import itemApi from './api/item/item'
// 全局组件
import "./components/back/index"
// 高德插件
import "./plugin/aMap"

// 轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false;
Vue.prototype.$carApi = carApi;
Vue.prototype.$userApi = userApi;
Vue.prototype.$itemApi = itemApi;
Vue.prototype.$orderApi = orderApi;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
