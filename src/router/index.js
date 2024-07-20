import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from '@/router/routes'

const vuepush = VueRouter.prototype.push
//重写push方法，阻止报错
VueRouter.prototype.push = function push(location) {
  return vuepush.call(this, location).catch(err => err)
}


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
