<template>
  <div class="videoplayer">
    <!-- 左边栏 -->
    <div class="left">
      <!-- 播放器 -->
      <div class="player">


        <video src=""></video>



      </div>
      <!-- 视频信息 -->
      <div class="messagevideo">
        <el-image :src="ossimgurl" fit="contain">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <div class="messageright">
          <h2>{{ title }}</h2>
          <p>{{ status }}-{{ type }}-{{ createdatecc }}</p>
          <p>{{ stringclassify }}</p>
          <p class="descclass" :style="{ height: descheight }">
            简介：{{ desc }} <span @click="openclose">{{ desctext }}</span>
          </p>
        </div>
      </div>

      <!-- 小屏选集 -->
      <div class="selections noshow">
        <div class="title">
          <h4>选集</h4>
          <span>(1/{{ videolistnum }})</span>
        </div>
        <div class="body">
          <ul>
            <li v-for="e of videolistsort" :key="e.serial">{{ e.serial }}</li>
          </ul>
        </div>
      </div>

      <!-- 相关推荐 -->
      <div class="correlation">
        <Videolist :title="'相关推荐'" :list="correlationlist"></Videolist>
      </div>
    </div>
    <!-- 右边栏 -->
    <div class="right">
      <!-- 选集 -->
      <div class="selections">
        <div class="title">
          <h4>选集</h4>
          <span>(1/{{ videolistnum }})</span>
        </div>
        <div class="body">
          <ul>
            <li v-for="e of videolistsort" :key="e.serial">{{ e.serial }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入时间格式化插件
import moment from "moment";

import Videolist from "@/components/list/Videolist.vue";

export default {
  name: "Videoplayer",
  data() {
    return {
      //标签
      classify: [],
      //封面
      cover: {},
      //描述
      desc: "",
      //描述列表的展开高度
      descheight: "36px",
      //按钮文字
      desctext: "展开",
      //状态
      status: "",
      //标题
      title: "",
      //类型
      type: "",
      //开播日期
      soubdate: "",
      //id
      videoid: "",
      //视频列表
      videolist: [],
      //相关列表
      correlationlist: [],
    };
  },
  created() {
    //获取视频信息
    this.getvideo();
    this.getcorrelation();
  },
  methods: {
    //获取视频信息
    async getvideo() {
      try {
        const videoid = this.$route.params.videoid;
        const { data } = await this.$API.findapi.getvideo(videoid);
        this.datat(data);
      } catch (error) {}
    },
    //进行数据解构
    datat(data) {
      const {
        classify,
        soubdate,
        cover,
        desc,
        status,
        title,
        type,
        videoid,
        videolist,
      } = data;
      this.classify = classify;
      this.cover = cover;
      this.soubdate = soubdate;
      this.desc = desc;
      this.status = status;
      this.title = title;
      this.type = type;
      this.videoid = videoid;
      this.videolist = videolist;
    },
    //获取相关推荐
    async getcorrelation() {
      try {
        const videoid = this.$route.params.videoid;
        const { data } = await this.$API.findapi.getcorrelation(videoid, 10);
        this.correlationlist = data;
      } catch (error) {}
    },
    //打开关闭简介
    openclose() {
      if (this.desctext === "展开") {
        this.descheight = "";
        this.desctext = "收起";
      }else{
        this.descheight = "36px";
        this.desctext = "展开"
      }
    },
  },
  computed: {
    //视频总集数
    videolistnum() {
      return this.videolist.length;
    },
    //视频列表排序
    videolistsort(){
        return this.videolist.sort((a,b)=>{
            return a.serial - b.serial
        })
    },
    //设置oss的图片处理后的封面url
    ossimgurl() {
      if (!this.cover.url) return "";
      return this.cover.url + process.env.VUE_APP_OSSIMGCLASS;
    },
    //标签转字符串
    stringclassify() {
      return this.classify.join(" / ");
    },
    //返回开播年月
    createdatecc() {
      return moment(this.soubdate).format("YYYY/MM");
    },
  },
  watch: {
    "$route.params.videoid": {
      handler(newdata) {
        //获取视频信息
        this.getvideo();
        this.getcorrelation();
      },
    },
  },
  components: {
    Videolist,
  },
};
</script>

<style lang="less" scoped>
.videoplayer {
  padding: 20px;
  display: flex;
  //左边栏
  .left {
    // background-color: aqua;
    flex: 1;
    //播放器
    .player {
      background-color: rgb(167, 28, 28);
      height: 500px;
    }
    //视频信息
    .messagevideo {
      margin: 20px 0;
      //   background-color: rgb(28, 56, 167);
      //   height: 200px;
      display: flex;
      align-items: flex-start;
      .el-image {
        width: 20%;
        min-width: 100px;
        margin-right: 15px;
        border-radius: 5px;
      }
      .messageright {
        flex: 1;
        p {
          margin-top: 5px;
          font-size: 14px;
        }
        .descclass {
          position: relative;
          overflow: hidden;
          span {
            position: absolute;
            bottom: 0px;
            right: 0px;
            background-color: #f1f2f3;
            color: rgb(85, 129, 250);
            cursor: pointer;
          }
        }
      }
    }

    //相关推荐
    .correlation {
      margin-top: 20px;
    }
  }
  //右边栏
  .right {
    // background-color: rgb(67, 167, 28);
    width: 240px;
    height: 500px;
    margin-left: 20px;
  }
}
.noshow {
  display: none;
}

//选集
.selections {
  background-color: #f1f2f3;
  border-radius: 10px;
  .title {
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    h4 {
      margin-right: 10px;
    }
    span {
      font-size: 12px;
    }
  }
  .body {
    padding: 10px;
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      li {
        text-align: center;
        background-color: white;
        width: 35px;
        height: 35px;
        line-height: 35px;
        border-radius: 8px;
        color: #18191c;
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          border: 1px solid rgb(183, 195, 245);
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .right {
    display: none;
  }
  .noshow {
    display: block;
  }
}
</style>
