import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import routes from "@/router/routes";

const vuepush = VueRouter.prototype.push;
//重写push方法，阻止报错
VueRouter.prototype.push = function push(location) {
  return vuepush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (to.name === from.name) {
        return {};
      } else {
        return { x: 0, y: 0 };
      }
    }
  },
});

//全局后置钩子（进行标题更换）
router.afterEach((to, from)=>{
  //拿到标题(播放页没有设置标题，根据传来的title设置标题)
  const {meta:{title}} = to
  if (title){
    document.title = title +" | Yfeng"
  }else{
    document.title = to.query.title +" | Yfeng"
  }
})

export default router;
