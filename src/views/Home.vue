<template>
  <div>
    <Swiper :list="list"></Swiper>
    <div class="bodyw">
      <Videolist
        :list="todaylist"
        :right="'更多'"
        :blankmessage="'今天暂未更新'"
        class="listv"
        :loading="todaylistload"
      >
        <template v-slot>
          <el-badge value="new" class="item">
            <span class="todaylistclass">今日更新</span>
          </el-badge>
        </template>
      </Videolist>
      <Videolist
        :list="likelist"
        :right="'更多'"
        class="listv"
        id="likeref"
        :loading="likelistload"
      >
        <template v-slot>
          <span class="likelistclass">猜你喜欢❤</span>
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
      likeindex: 1,
      //每次查出的数量
      numlist: 10,
      //节流的id
      idtime: null,
      //猜你喜欢列表是否加载中
      isloading: false,
      loadingmessage: "加载中 . . .",
    };
  },
  created() {
    this.getbslideshow();
    this.gettodaylist();
    this.getlikelist();
  },
  // 滚动监听
  mounted() {
    window.addEventListener("scroll", this.throttle); // 监听页面滚动
  },
  methods: {
    //获取轮播图列表
    async getbslideshow() {
      this.todaylistload = true;
      try {
        const { data } = await this.$API.findapi.getbslideshow();
        this.list = data;
        this.todaylistload = false;
      } catch (error) {}
    },
    //获取今日更新列表
    async gettodaylist() {
      try {
        const { data } = await this.$API.findapi.gettodaylist(this.numlist);
        this.todaylist = data;
      } catch (error) {}
    },
    //获取猜你喜欢列表
    async getlikelist() {
      try {
        //区分开来
        //如果有已经获取到数据了，就让isloading（更多）加载，没有就让likelistload（首次）加载
        if (this.likelist.length > 0) {
          this.isloading = true;
        } else {
          this.likelistload = true;
        }
        const { data } = await this.$API.findapi.getlikelist(
          10,
          this.likeindex
        );
        //如果拿到的数据小于这次要获取的数据，就移除监听滚动并清除定时器
        if (data.length < this.numlist) {
          window.removeEventListener("scroll", this.throttle);
          clearTimeout(this.idtime);
          this.loadingmessage = "没有更多啦";
        }
        //首次加载关闭
        this.likelistload = false;
        //更多加载关闭
        this.isloading = false;
        this.likeindex += 1;
        this.likelist.push(...data);
      } catch (error) {}
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
      if (this.isloading) return;
      const windowscroll = window.scrollY || document.documentElement.scrollTop;
      //获取猜你喜欢元素
      const el = document.getElementById("likeref");
      //获取猜你喜欢元素底部距离视口底部的距离
      const bottomlength =
        el.getBoundingClientRect().bottom - window.innerHeight;
      if (+bottomlength < 300) {
        this.getlikelist();
      }
    },
  },
  watch: {},
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
