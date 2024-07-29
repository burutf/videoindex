<template>
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="在这里搜索你想看的~"
    :trigger-on-focus="false"
    @select="searchfn"
    :select-when-unmatched="true"
  >
    <template v-slot:suffix>
      <i @click="searchfn" class="el-icon-search"></i>
    </template>
  </el-autocomplete>
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
      if (!this.state) return;
      this.$router.push({ path: "/search", query: { state: this.state } });
    },
    //搜索建议
    async querySearchAsync(queryString, cb) {
      console.log(this.state);
      try {
        const { data } = await this.$API.findapi.searchall(this.state);
        cb(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
</style>
