import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import "lib-flexible/flexible.js"
import api from './api' // 导入api接口
import directives from './directives'
import filter from './filter'
import '@/permission' // permission control
import './assets/css/reset.css' //重置样式
import VantComponents from './vant.js';
import 'vant/lib/index.css';
import 'velocity-animate'
Vue.use(directives)
Vue.use(filter)
Vue.use(VantComponents)
Vue.config.productionTip = false
Vue.prototype.$api = api; // 将api挂载到vue的原型上
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
