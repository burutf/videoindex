<template>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div v-for="(e, i) of list" :key="i" class="swiper-slide">
        <!-- 图片展示区 -->
        <img
          v-show="e.coverurl"
          class="imgcls"
          :src="ossclassurl(e.coverurl)"
        />
        <!-- 没有设置图片时展示的 -->
        <div v-show="!e.coverurl" class="pla">
          <span>暂无图片</span>
        </div>
        <!-- 文字展示区 -->
        <div class="introduce">
          <h2>{{ e.aggarr.title }}</h2>
          <span>{{ e.aggarr.status }}</span>
          <p>
            {{ e.aggarr.desc }}
          </p>
        </div>
        <!-- 只有当前激活的才会显示这里 -->
        <div class="topupdate" v-show="actindex === i">

        </div>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";

export default {
  name: "Swiper",
  props: ["list"],
  data() {
    return { swiper: null };
  },
  mounted() {
    this.initswiper();
  },
  methods: {
    //进行初始化
    initswiper() {
      let isloop = false;
      //大于3张才会开启循环
      if (this.list.length > 3) {
        isloop = true;
      }
      this.swiper = new Swiper(".swiper", {
        //无缝滚动
        loop: isloop,
        //选择的样式种类
        effect: "coverflow",
        //居中
        centeredSlides: true,
        slidesPerView: "auto",
        //样式设置
        coverflowEffect: {
          rotate: 50,
          stretch: 10,
          depth: 600,
          modifier: 1,
          slideShadows: true,
        },
        pagination: true,
        //自动轮播
        autoplay: {
          delay: 5000,
        },
        // 分页
        pagination: {
          el: ".swiper-pagination",
        },

        // 左右按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    },
    //重新建立
    reinit() {
      this.$nextTick(() => {
        //重新初始化swiper
        // this.initswiper();
        this.swiper.update();
      });
    },
    //进行轮播图处理图片oss样式
    ossclassurl(url){
      return url + process.env.VUE_APP_OSSSLICLASS
    }
  },
  //离开销毁
  beforeDestroy() {
    if (this.swiper) {
      this.swiper.destroy();
    }
  },
  watch:{
    //传来的值改变就重新初始化swiper
    list:{
      handler(){
        this.reinit()
      }
    }
  },
  computed: {
    //当前激活的索引，初始化时设置为0
    actindex() {
      try {
        return this.swiper.realIndex;
      } catch (error) {
        return 999;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  height: 40vw;
  max-height: 400px;
}

.swiper-slide {
  position: relative;
  background-position: center;
  background-size: cover;
  width: 60vw;
  border-radius: 10px;
  box-shadow: 2px 2px 3px 0px #0000008f;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgba(118, 118, 118, 0.329);
  .imgcls {
    position: absolute;
    width: 100%;
    height: 100%;
    
  }

  .imgcls::before {
    content: "图片加载出错，请重新上传";
    display: block;
    width: 100%;
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 0, 0, 0.592)
  }
  .topupdate {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(26, 26, 26, 0.192);
    opacity: 0;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
    //中间更改按钮
    .updatebutton {
      font-size: 3em;
      color: rgb(74, 74, 74);
      padding: 10px;
      background-color: #ffffffc0;
      border-radius: 50px;
      overflow: hidden;
      &:hover {
        color: rgb(18, 243, 78);
        cursor: pointer;
      }
    }
    .delcover {
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 1.5em;
      color: rgb(74, 74, 74);
      background-color: #ffffffc0;
      border-radius: 50px;
      &:hover {
        color: red;
        cursor: pointer;
      }
    }
  }
  .introduce {
    position: absolute;
    bottom: 5px;
    left: 5px;
    width: 50%;
    height: 40%;
    // background-color: rgb(0, 0, 0);
    overflow: hidden;
    h2 {
      color: rgba(255, 255, 255, 0.89);
      margin: 10px 0;
      text-overflow: ellipsis;
      text-wrap: nowrap;
    }
    span {
      color: rgba(255, 255, 255, 0.914);
    }
    p {
      margin: 8px 0;
      color: rgba(255, 255, 255, 0.914);
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; //多行在这里修改数字即可
      overflow: hidden;
      /* autoprefixer: ignore next */
      -webkit-box-orient: vertical;
    }
  }
}
.pla {
  background-color: rgba(26, 26, 26, 0.192);
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(77, 77, 77);
  font-size: 1.5em;
}

.swiper-pagination {
  //鼠标穿透
  pointer-events: none;
}

@media (max-width:540px){
  .introduce{
    
  }
}
</style>
