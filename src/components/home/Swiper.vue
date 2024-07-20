<template>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        style="
          background-image: url(https://swiperjs.com/demos/images/nature-1.jpg);
        "
      ></div>
      <div
        class="swiper-slide"
        style="
          background-image: url(https://swiperjs.com/demos/images/nature-2.jpg);
        "
      ></div>
      <div
        class="swiper-slide"
        style="
          background-image: url(https://swiperjs.com/demos/images/nature-3.jpg);
        "
      ></div>
      <div
        class="swiper-slide"
        style="
          background-image: url(https://swiperjs.com/demos/images/nature-4.jpg);
        "
      ></div>
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
  data() {
    return {};
  },
  mounted() {
    const swiper = new Swiper(".swiper", {
      //无缝滚动
      loop: true,
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
  methods: {},
  components: {},
};
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  height: 40vw;
  max-height: 400px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 60vw;
  border-radius: 10px;
  box-shadow: 2px 2px 3px 0px #0000008f;
}
</style>
