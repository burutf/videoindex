<template>
  <div ref="videolist" style="width: 100%">
    <!-- 标题栏 -->
    <div class="title" v-if="title || right">
      <span class="left">
        <slot>
          {{ title }}
        </slot>
      </span>
      <el-link :underline="false" class="right" v-if="right"
        >{{ right }}<i class="el-icon-view el-icon--right"></i
      ></el-link>
    </div>
    <hr class="hra" v-if="title || right" />
    <!-- 列表栏 -->
    <div class="listcl" v-if="list.length > 0" @click="routerfn">
      <div class="divlist" v-for="e of list" :key="e.videoid">
        <div class="imgdiv">
          <el-image
            :src="urlclassoss(e.cover.urlname)"
            :data-videoid="e.videoid"
            :lazy="true"
          >
            <!-- 图片加载中的样式 -->
            <div slot="placeholder" class="image-slot-loading">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </div>
            <!-- 图片加载错误的 -->
            <div slot="error" class="image-slot-error">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <span
            class="statuslist"
            :style="{ backgroundColor: statuscolor(e.status) }"
            >{{ e.status }}</span
          >
          <span v-if="e.status === '连播中'" class="bottomlist"
            >最新：第{{ e.updatenum }}集</span
          >
        </div>
        <el-tooltip
          :enterable="false"
          :open-delay="260"
          :content="e.title"
          placement="bottom"
          effect="light"
        >
          <span class="listtitle" :data-videoid="e.videoid">{{ e.title }}</span>
        </el-tooltip>
        <p>
          <el-tag size="mini" v-for="(tag, i) of e.classify" :key="i">{{
            tag
          }}</el-tag>
        </p>
      </div>
    </div>

    <div
      v-else
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0)"
      element-loading-text="加载中..."
      style="height: 200px"
    >
      <el-empty
        v-if="!loading"
        :image-size="100"
        :description="blankmessage"
      ></el-empty>
    </div>
  </div>
</template>

<script>
export default {
  name: "Videolist",

  props: [
    //标题
    "title",
    //标题右侧文字
    "right",
    //列表
    "list",
    //空状态描述
    "blankmessage",
    //开启滚动加载必须要下面的参数
    //加载状态
    "loading",
    //是否开启滚动加载
    "isscroll",
    //每次要加载的数量（通过这个来判断移除监听滚动事件）
    "numlist",
  ],
  data() {
    return {
      //节流的id
      idtime: null,
    };
  },
  // 滚动监听
  mounted() {
    if (this.isscroll) {
      window.addEventListener("scroll", this.throttle); // 监听页面滚动
    }
  },
  methods: {
    //url添加处理样式
    urlclassoss(url) {
      return (
        process.env.VUE_APP_CN + "/" + url + process.env.VUE_APP_OSSIMGCLASS
      );
    },
    //根据完结状态切换颜色
    statuscolor(status) {
      if (status === "已完结") {
        return "rgba(255, 192, 33, 0.8)";
      } else {
        return "rgba(33, 255, 44, 0.8)";
      }
    },
    //节流
    throttle() {
      //节流
      if (this.idtime) return;
      const id = setTimeout(() => {
        this.handleScroll();
        this.idtime = null;
      }, 500);
      this.idtime = id;
    },
    //页面滚动事件
    handleScroll() {
      //如果是加载中就中断
      if (this.loading) return;

      // const windowscroll = window.scrollY || document.documentElement.scrollTop;
      //获取元素
      const el = this.$refs.videolist;
      //等待页面渲染完成再通知父组件
      this.$nextTick(() => {
        //获取元素底部距离视口底部的距离
        const bottomlength =
          el.getBoundingClientRect().bottom - window.innerHeight;
        if (+bottomlength < 300) {
          this.$emit("scrollload");
        }
      });
    },
    routerfn({ target: { dataset } }) {
      //代理点击事件，没有设置videoid自定义属性的就中断
      if (!dataset.videoid) return;
      //进行跳转到播放页
      this.$router.push({ path: `/videoplayer/${dataset.videoid}/1` });
    },
  },
  //组件销毁前清除滚动事件，清除定时器
  beforeDestroy() {
    window.removeEventListener("scroll", this.throttle);
    clearTimeout(this.idtime);
  },
  watch: {
    //监听传来的数组长度变化，当这次更新的长度小于设置要返回的长度时，就代表着没有多余的数据了
    //这时清除滚动事件，清除定时器
    "list.length": {
      handler(newdata, olddata) {
        if (olddata === 0) return;
        //这次加载的数量
        const numthis = newdata - olddata;
        if (this.numlist > numthis) {
          window.removeEventListener("scroll", this.throttle);
          clearTimeout(this.idtime);
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.hra {
  height: 2px;
  border: 0;
  background-color: rgb(200, 200, 200);
  border-radius: 20px;
  box-shadow: 0px 0px 2px 0px rgba(98, 98, 98, 0.527);
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 0 5px 5px;
  color: rgb(92, 92, 92);
  // border-bottom: 3px solid rgb(186, 186, 186);
  // border-radius: 5px;
  .left {
    font-size: 1.5em;
    font-weight: 600;
  }
  .right {
    font-size: 1.05em;
  }
}
.listcl {
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 180px));
  justify-content: center;
  padding: 10px;
  gap: 15px;

  .divlist {
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    min-width: 100px;
    max-width: 200px;
    .imgdiv {
      position: relative;
      font-size: 1.1em;
      cursor: pointer;
      .statuslist {
        position: absolute;
        top: 5px;
        left: 5px;
        font-size: 0.8em;
        color: rgba(255, 255, 255, 1);
        border-radius: 5px;
        padding: 0 2px;
        pointer-events: none;
      }
      .el-image {
        border-radius: 10px;
        width: 100%;
        height: 100%;
        //加载出错的样式
        .image-slot-error {
          position: relative;
          padding-top: 133.33%;
          border: 1px solid rgb(68, 68, 68);
          border-radius: 10px;
          .el-icon-picture-outline {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            font-size: 1.5em;
          }
        }
        //加载中的样式
        .image-slot-loading {
          position: relative;
          padding-top: 133.33%;
          border: 1px solid rgb(68, 68, 68);
          border-radius: 10px;
          .image-slot {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            font-size: 1.1em;
          }
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .bottomlist {
        position: absolute;
        bottom: 10px;
        right: 5px;
        font-size: 0.8em;
        color: rgb(253, 253, 253);
        background-color: rgba(80, 80, 80, 0.514);
        border-radius: 5px;
        padding: 0 2px;
        pointer-events: none;
      }
    }

    .listtitle {
      font-size: 15px;
      font-weight: 500;
      white-space: nowrap;
      cursor: pointer;
    }
  }
}
.el-empty {
  padding: 10px 0;
}

@media (max-width: 1800px) {
  .listcl {
    grid-template-columns: repeat(5, 1fr);
    // grid-template-rows: repeat(1, 1fr);
  }
}

@media (max-width: 900px) {
  .listcl {
    // display: flex;
    grid-template-columns: repeat(4, minmax(100px, 180px));
  }
}
@media (max-width: 700px) {
  .listcl {
    // display: flex;
    grid-template-columns: repeat(3, minmax(100px, 180px));
  }
}
@media (max-width: 560px) {
  .listcl {
    // display: flex;
    grid-template-columns: repeat(2, minmax(100px, 180px));
  }
}
</style>
