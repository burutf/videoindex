<template>
  <div>
    <Swiper :list="list"></Swiper>
    <div class="bodyw">
      <Videolist
        :todaylist="todaylist"
        :title="'今日更新'"
        :right="'更多'"
        class="listv"
      ></Videolist>
    </div>
  </div>
</template>

<script>
import Swiper from "@/components/home/Swiper.vue";

//引入视频列表组件
import Videolist from "@/components/list/Videolist.vue";

export default {
  name: "Home",
  data() {
    return {
      //轮播图列表
      list: [],
      //今日更新列表
      todaylist: [],
    };
  },
  created() {
    this.getbslideshow();
    this.gettodaylist();
  },
  methods: {
    //获取轮播图列表
    async getbslideshow() {
      try {
        const { data } = await this.$API.findapi.getbslideshow();
        this.list = data;
      } catch (error) {}
    },
    //获取今日更新列表
    async gettodaylist() {
      try {
        const { data } = await this.$API.findapi.gettodaylist(10);
        this.todaylist = data;
        console.log(this.todaylist);
      } catch (error) {}
    },
  },
  components: {
    Swiper,
    Videolist,
  },
};
</script>

<style lang="less" scoped>
.listv {
  margin: 10px 0;
}
.bodyw {
  padding: 0 20px;
}
@media (max-width: 540px) {
  .bodyw {
    padding: 0 10px;
  }
}
</style>
