<template>
  <div class="videoplayer">
    <!-- 左边栏 -->
    <div class="left">
      <!-- 播放器 -->
      <div class="player">
        <Playervideo :urlvideo="urlvideo"></Playervideo>
      </div>
      <!-- 视频信息 -->
      <div class="messagevideo">
        <el-image :src="ossimgurl" fit="contain">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <div class="messageright">
          <div class="title">
            <h2>{{ title }}</h2>
            <div class="rightcc" @click="favorite" v-if="!isfavorite">
              <i class="el-icon-star-on"></i>收藏
            </div>
            <div class="rightcc rightdd" @click="favorite" v-else>
              <i class="el-icon-star-on"></i>取消
            </div>
          </div>

          <p>{{ status }}-{{ type }}-{{ createdatecc }}</p>
          <p>{{ stringclassify }} · {{ videoid }}</p>
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
          <ul @click="switchfn">
            <li
              v-for="(e, i) of videolist"
              :class="{ active: serialnow === i + 1 }"
              :data-id="i + 1"
              :key="e.name"
            >
              {{ i + 1 }}
            </li>
          </ul>
        </div>
      </div>

      <!-- 相关推荐 -->
      <div class="correlation">
        <Videolist @clickfn="clickfn" :title="'相关推荐'" :list="correlationlist"></Videolist>
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
          <ul @click="switchfn">
            <li
              v-for="(e, i) of videolist"
              :class="{ active: serialnow === i + 1 }"
              :data-id="i + 1"
              :key="e.name"
            >
              {{ i + 1 }}
            </li>
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

//引入视频播放器
import Playervideo from "@/components/player/Playervideo.vue";

export default {
  name: "Videoplayer",
  data() {
    return {
      //视频url
      urlvideo: "",
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
      //视频列表
      videolist: [],
      //相关列表
      correlationlist: [],
      isfavorite: null,
    };
  },
  //路由更新时进行的操作
  beforeRouteUpdate(to, from, next) {
    next();
    //更新后执行
    console.log(this.serialnow);
    this.geturlvideo();
  },
  //从别的页面跳转过来时执行
  created() {
    //获取视频信息
    this.getvideo();
    this.geturlvideo();
    this.getcorrelation();
  },
  methods: {
    //获取视频信息
    async getvideo() {
      try {
        //拿到videoid
        const { data } = await this.$API.findapi.getvideo(this.videoid);
        this.datat(data);
        //拿到收藏信息
        this.isfavoritefn();
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
        videolist,
      } = data;
      this.classify = classify;
      this.cover = cover;
      this.soubdate = soubdate;
      this.desc = desc;
      this.status = status;
      this.title = title;
      this.type = type;
      this.videolist = videolist;
    },
    //获取临时视频url
    async geturlvideo() {
      try {
        const { data } = await this.$API.findapi.geturlvideo(
          this.videoid,
          this.serialnow
        );
        this.urlvideo = data;
      } catch (error) {}
    },
    //获取相关推荐
    async getcorrelation() {
      try {
        const { data } = await this.$API.findapi.getcorrelation(
          this.videoid,
          10
        );
        this.correlationlist = data;
      } catch (error) {}
    },
    //打开关闭简介
    openclose() {
      if (this.desctext === "展开") {
        this.descheight = "";
        this.desctext = "收起";
      } else {
        this.descheight = "36px";
        this.desctext = "展开";
      }
    },
    //选集
    switchfn({ target }) {
      const { id } = target.dataset;
      if (!id) return;
      const {
        params: { videoid },
      } = this.$route;
      //进行跳转
      this.$router.push({ path: `/videoplayer/${videoid}/${id}` });
    },
    //收藏
    favorite() {
      if (localStorage.hasOwnProperty("favorite")) {
        //有的话就先判断是要删除还是收藏
        const arr = JSON.parse(localStorage.getItem("favorite"));
        if (this.isfavorite) {
          //删除
          arr.splice(arr.indexOf(e=>e===this.videoid),1)
        } else {
          //收藏
          arr.push(this.videoid);
        }
        localStorage.setItem("favorite", JSON.stringify(arr));
        //反向收藏状态
        this.isfavorite = !this.isfavorite
        console.log(arr);
      } else {
        //还没有存储到收藏夹的视频时，直接存
        localStorage.setItem("favorite", JSON.stringify([this.videoid]));
      }
    },
    //是否已经收藏
    isfavoritefn() {
      if (!localStorage.hasOwnProperty("favorite")) return false;
      const arr = JSON.parse(localStorage.getItem("favorite"));
      this.isfavorite = arr.some((e) => e === this.videoid);
    },
    //相关推荐点击事件
    clickfn(){
      this.toTop()
    },
    //滚动到顶部
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
  },
  computed: {
    //视频总集数
    videolistnum() {
      return this.videolist.length;
    },
    // //视频列表排序
    // videolistsort() {
    //   return this.videolist.sort((a, b) => {
    //     return a.serial - b.serial;
    //   });
    // },
    //设置oss的图片处理后的封面url
    ossimgurl() {
      if (!this.cover.urlname) return "";
      return process.env.VUE_APP_CN + "/" + this.cover.urlname + process.env.VUE_APP_OSSIMGCLASS;
    },
    //标签转字符串
    stringclassify() {
      return this.classify.join(" / ");
    },
    //返回开播年月
    createdatecc() {
      return moment(this.soubdate).format("YYYY/MM");
    },
    //返回当前路由的集号
    serialnow() {
      return +this.$route.params.serial;
    },
    //返回当前路由的videoid
    videoid() {
      return this.$route.params.videoid;
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
    Playervideo,
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
      // background-color: rgb(167, 28, 28);
      // height: 500px;
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
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .rightcc {
            display: flex;
            align-items: center;
            overflow: hidden;
            width: 35px;
            text-wrap: nowrap;
            direction: rtl;
            transition: all 0.3s;
            padding: 10px;
            border-radius: 10px;
            cursor: pointer;
            flex-shrink: 0;
            i {
              font-size: 1.6em;
              color: rgb(126, 126, 126);
              margin-left: 5px;
            }
            &:hover {
              width: 100px;
              background-color: rgb(255, 174, 0);
              color: white;
            }
          }
          .rightdd {
            i {
              color: rgb(237, 201, 20);
            }
            &:hover {
              background-color: rgb(255, 117, 117);
            }
          }
        }
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
      .active {
        background-color: #1c7ddf;
        color: white;
      }
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
