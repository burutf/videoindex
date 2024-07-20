<template>
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="在这里搜索你想看的~"
    :trigger-on-focus="false"
    @select="searchfn"
    suffix-icon="el-icon-search"
    class="searchcss"
  ></el-autocomplete>
</template>

<script>


export default {
  name: "Searchinput",
  data() {
    return {
      //这里接收从服务器查来的数据
      restaurants: [],
      state: "",
      timeout: null,
    };
  },
  methods: {
    //进行全局搜索
    searchfn() {
      console.log("state");
    },
    //搜索建议
    async querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      console.log(this.state);
      try {
        const arr = await this.$API.findapi.searchall(this.state);
        cb(arr);
      } catch (error) {
        console.log(error);
      }

    },
  },
  components:{
    
  }
};
</script>

<style lang="less" scoped>
.searchcss{
  width: 500px;
  margin-right: 20px
}


@media (max-width: 560px) {
  .searchcss{
    display: none
  }
}

</style>
