import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入elementui(按需)
import '@/imports/elementui'

//引入api
import api from '@/api';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate(){
    Vue.prototype.$API = api
  },
  render: h => h(App)
}).$mount('#app')
