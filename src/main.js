import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入api
import api from '@/api';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate(){
    Vue.prototype.$API = api
  },
  render: h => h(App)
}).$mount('#app')
