<template>
  <div>
    <Swiper :list="list"></Swiper>
    <div class="bodyw">
      <Videolist
        :list="todaylist"
        :title="'今日更新'"
        :blankmessage="'今天暂未更新'"
        class="listv"
        :loading="todaylistload"
      >
        <template v-slot>
          <!-- <el-badge value="new" class="item"> -->
            <span class="todaylistclass">今日更新</span>
          <!-- </el-badge> -->
        </template>
      </Videolist>
      <Videolist
        :list="likelist"
        :right="'更多'"
        :isscroll="true"
        :numlist="numlist"
        class="listv"
        id="likeref"
        :loading="likelistload"
        @scrollload="getlikelist"
      >
        <template v-slot>
          <span class="likelistclass">猜你喜欢</span>
        </template>
      </Videolist>
      <div class="loading">{{ loadingmessage }}</div>
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
      todaylistload: false,
      //猜你喜欢列表
      likelist: [],
      likelistload: false,
      //当前第几次查询
      likeindex: 1,
      //每次查出的数量
      numlist: 10,

      //猜你喜欢列表是否加载中
      loadingmessage: "加载中 . . .",
    };
  },
  created() {
    this.getbslideshow();
    this.gettodaylist();
    this.getlikelist();
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
      this.todaylistload = true;
      try {
        const { data } = await this.$API.findapi.gettodaylist(this.numlist);
        this.todaylist = data;
        this.todaylistload = false;
      } catch (error) {
        this.todaylistload = false;
      }
    },
    //获取猜你喜欢列表
    async getlikelist() {
      try {
        //设置为加载状态
        this.likelistload = true;
        const { data } = await this.$API.findapi.getlikelist(
          10,
          this.likeindex
        );
        //如果拿到的数据小于这次要获取的数据，就移除监听滚动并清除定时器
        if (data.length < this.numlist) {
          this.loadingmessage = "没有更多啦";
        }
        //加载关闭
        this.likelistload = false;
        //查下一页的数据
        this.likeindex += 1;
        //数组追加
        this.likelist.push(...data);
      } catch (error) {
        this.likelistload = false;
      }
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
.loading {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: rgba(255, 255, 255, 0);
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.todaylistclass {
  color: rgb(238, 104, 104);
}
.likelistclass {
  color: rgb(236, 189, 95);
}

@media (max-width: 540px) {
  .bodyw {
    padding: 0 10px;
  }
}
</style>
