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