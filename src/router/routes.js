//这里是导航栏需要的
export const navroutes = [
  {
    path: "home",
    name: "首页",
    iconClass: "el-icon-s-home",
    meta: { title: "首页", id: "home" },
    component: () => import("@/views/Home"),
  },
  {
    path: "drama",
    name: "番剧",
    iconClass: "el-icon-video-camera-solid",
    meta: { title: "番剧", id: "drama" },
    component: () => import("@/views/Drama"),
  },
  {
    path: "movie",
    name: "电影",
    iconClass: "el-icon-video-camera",
    meta: { title: "电影", id: "movie" },
    component: () => import("@/views/Movie"),
  },
  {
    path: "todaydata",
    name: "今日更新",
    iconClass: "el-icon-orange",
    meta: { title: "今日更新", id: "todaydata" },
    component: () => import("@/views/Todaydata"),
  },
];

export default [
  //这一块会动态渲染到侧边导航栏
  {
    path: "/",
    name: "layout",
    redirect:{name:'首页'},
    component: () => import("@/layout"),
    children: navroutes,
  },
  {
    path: "/404",
    name: "error",
    component: () => import("@/error"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];
