<template>
  <div style="padding: 20px">
    <Searchinput ref="searchinpt" class="searchcssvv"></Searchinput>
    <Videolist
      v-show="this.$route.query.state"
      :list="list"
      :title="'搜索结果'"
      :blankmessage="'目前还没有这个'"
    >
      <template v-slot>
        <span>{{`搜索结果-${list.length}条`}}</span>
      </template>
    </Videolist>
  </div>
</template>

<script>
import Videolist from "@/components/list/Videolist.vue";

//引入全局搜索框
import Searchinput from "@/components/header/Searchinput.vue";

export default {
  name: "Searchvideo",
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getsearchlist();
  },
  mounted(){
    //获取焦点
    // console.log(this.$refs.searchinpt);
    const el = document.querySelector('.searchcssvv .el-input__inner')
    el.focus()
  },
  methods: {
    //获取搜索列表
    async getsearchlist() {
      //拿到搜索内容
      const state = this.$route.query.state;
      //没有输入内容的话就不执行
      if (!state) return
      try {
        const {data} = await this.$API.findapi.getsearchlist(state);
        this.list = data
      } catch (error) {}
    },
  },
  watch:{
    '$route.query.state':{
        handler(){
            this.getsearchlist()
        }
    }
  },
  components: {
    Videolist,
    Searchinput
  },
};
</script>

<style lang="less" scoped>

.searchcssvv {
  display: none;
  // max-width: 500px;
  width: 100%;
  // margin-right: 20px;
  margin-bottom: 20px;
  /deep/.el-icon-search {
    height: 40px;
    width: 40px;
    cursor: pointer;
    line-height: 40px;
    &:hover {
      color: rgb(81, 175, 238);
    }
  }
}

@media (max-width: 560px) {
  .searchcssvv{
    display: block;
  }
}

</style>
