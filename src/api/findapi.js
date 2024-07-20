import http from "@/config/axios";

//根据传来的字符串搜索所有的视频
export const searchall = (text)=>{
    return http.get('/searchall',{params:{text}})
}