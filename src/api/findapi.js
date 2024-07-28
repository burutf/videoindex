import http from "@/config/axios";

//根据传来的字符串搜索所有的视频
export const searchall = (text)=>{
    return http.get('/searchall',{params:{text}})
}

//获取轮播图列表
export const getbslideshow = ()=>{
    return http.get('/getbslideshow')
}

//获取今日更新列表
export const gettodaylist = (pagesize=0)=>{
    return http.get('/gettodaylist',{params:{pagesize}})
}

//获取猜你喜欢列表(要获取几条，和当前的第几次获取)
export const getlikelist = (pagesize=0,pageindex=1)=>{
    return http.get('/getlikelist',{params:{pagesize,pageindex}})
}