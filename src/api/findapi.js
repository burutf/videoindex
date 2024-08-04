import http from "@/config/axios";

//根据传来的字符串获取搜索建议
export const searchall = (text) => {
  return http.get("/searchallasdasd", { params: { text } });
};
//根据传来的字符串获取搜索视频列表
export const getsearchlist = (text) => {
  return http.get("/getsearchlist", { params: { text } });
};

//获取轮播图列表
export const getbslideshow = () => {
  return http.get("/getbslideshow");
};

//获取今日更新列表
export const gettodaylist = (pagesize = 0) => {
  return http.get("/gettodaylist", { params: { pagesize } });
};

//获取猜你喜欢列表(要获取几条，和当前的第几次获取)
export const getlikelist = (pagesize = 0, pageindex = 1) => {
  return http.get("/getlikelist", { params: { pagesize, pageindex } });
};

//获取番剧类型列表
export const getclassifylist = () => {
  return http.get("/getclassifylist");
};

//获取视频列表（筛选排序）
export const getvideolistzs = (
  objvalue,
  sortobj,
  pagesize = 0,
  pageindex = 1
) => {
  return http.get("/getvideolistzs", {
    params: { objvalue, sortobj, pagesize, pageindex },
  });
};

//根据视频id拿到视频信息
export const getvideo = (videoid) => {
  return http.get("/getvideo", { params: { videoid } });
};

//获取相关推荐
export const getcorrelation = (videoid,pagesize=10) =>{
    return http.get("/getcorrelation",{params:{videoid,pagesize}})
}

//视频临时视频链接
export const geturlvideo = (videoid,serial) =>{
  return http.post('/geturlvideo',{videoid,serial})
}

//获取收藏的列表
export const getmfavoritelist = (arr) =>{
  return http.get('/getmfavoritelist',{params:{arr}})
}