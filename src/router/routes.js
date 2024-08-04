//这里是导航栏需要的
export const navroutes = [
  {
    path: "home",
    name: "首页",
    iconClass: "el-icon-s-home",
    meta: { title: "首页", id: "home",shownav:true },
    component: () => import("@/views/Home"),
  },
  {
    path: "drama",
    name: "番剧",
    iconClass: "el-icon-video-camera-solid",
    meta: { title: "番剧", id: "drama" ,shownav:true},
    component: () => import("@/views/Drama"),
  },
  {
    path: "favorite",
    name: "我的收藏",
    iconClass: "el-icon-orange",
    meta: { title: "我的收藏", id: "favorite" ,shownav:true},
    component: () => import("@/views/Favorite"),
  },

  //搜索组件
  {
    path:"search",
    name:'搜索',
    meta: { title: "搜索", id: "search" ,shownav:false},
    component:()=>import("@/views/Searchvideo.vue")
  },


  //进行播放
  {
    path: "videoplayer/:videoid/:serial",
    name:"播放",
    meta: {  id: "videoplayer" ,shownav:false},
    props:true,
    component: () => import("@/views/Videoplayer"),
  }
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
