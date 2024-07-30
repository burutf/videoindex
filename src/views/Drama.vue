<template>
  <div style="padding: 20px">
    <!-- 筛选列表组件 -->
    <Listfilter
      @clickfn="filterlist"
      title="风格"
      :list="stylelist"
      :value="style"
      name="style"
    ></Listfilter>
    <Listfilter
      @clickfn="filterlist"
      title="状态"
      :list="statuslist"
      :value="status"
      name="status"
    ></Listfilter>
    <Listfilter
      @clickfn="filterlist"
      title="类型"
      :list="typelist"
      :value="type"
      name="type"
    ></Listfilter>
    <!-- 排序组件 -->
    <div class="sortdiv">
      <Sort
        @sortfn="sortfn"
        :data="sortlist"
        :defaultvalue="sortvalue"
        :sortstatus="sortstatus"
      ></Sort>
    </div>
    <!-- 视频列表 -->
    <Videolist
      :list="videolist"
      :loading="loading"
    ></Videolist>

    <!-- 分页 -->
    <Pagination @regetlsit="regetlsit" :sumpage="sumnum" :pagesize="pagesize" :currentpage="pageindex"></Pagination>
  </div>
</template>

<script>
//筛选列表
import Listfilter from "@/components/filter/Listfilter.vue";
//排序组件
import Sort from "@/components/filter/Sort.vue";
//视频展示组件
import Videolist from "@/components/list/Videolist.vue";
//引入分页组件
import Pagination from "@/components/Pagination.vue";

export default {
  name: "Drama",
  data() {
    return {
      //风格
      stylelist: [],
      style: "全部",
      //状态
      statuslist: ["已完结", "连播中"],
      status: "全部",
      //类型
      typelist: ["剧集", "剧场"],
      type: "全部",
      //排序的列表数组
      sortlist: [
        { title: "更新日期", value: "lastupdate" },
        { title: "开播日期", value: "soubdate" },
      ],
      //排序状态
      sortstatus: -1,
      //排序激活项
      sortvalue: "lastupdate",
      //列表
      videolist: [],
      //加载状态
      loading: false,
      //分页
      //第几页
      pageindex: 1,
      //每次查出的数量
      pagesize: 20,
      //总共多少条
      sumnum:null
    };
  },
  created() {
    this.getvideolistzs();
    this.getclassifylist();
  },
  methods: {
    //获取视频列表
    async getvideolistzs() {
      try {
        this.loading = true;
        const { data,sumnum } = await this.$API.findapi.getvideolistzs(
          {
            style: this.style,
            status: this.status,
            type: this.type,
          },
          {
            [this.sortvalue]: this.sortstatus,
          },
          this.pagesize,
          this.pageindex
        );
        this.videolist = data
        this.sumnum = sumnum
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    //获取风格列表
    async getclassifylist() {
      try {
        const { data } = await this.$API.findapi.getclassifylist();
        this.stylelist = data;
      } catch (error) {}
    },
    //列表点击
    filterlist(obj) {
      //如果是一样的就中断
      if (this[obj.name] === obj.value) return;
      //更换值
      this[obj.name] = obj.value;
      //重新获取视频列表
      this.getvideolistzs();
    },
    //排序点击
    sortfn(obj) {
      this.sortvalue = obj.value;
      this.sortstatus = obj.status;
      //重新获取视频列表
      this.getvideolistzs();
    },
    //分页的点击事件
    regetlsit(i){
      this.pageindex = i
      //重新获取视频列表
      this.getvideolistzs();
    }
  },
  components: {
    Sort,
    Listfilter,
    Videolist,
    Pagination
  },
};
</script>

<style lang="less" scoped>
.rowdiv {
  display: flex;
  font-size: 0.8em;
  margin-bottom: 10px;
  user-select: none;
  span {
    text-wrap: nowrap;
    color: rgb(148, 148, 148);
  }
  ul {
    text-wrap: nowrap;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    li {
      text-wrap: nowrap;
      cursor: pointer;
      padding: 0 8px 8px 0;
    }
  }
  .active {
    color: #00aeec !important;
  }
}
.sortdiv {
  display: flex;
  flex-wrap: wrap;
}
.loading {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: rgba(255, 255, 255, 0);
}
</style>
