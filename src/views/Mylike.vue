<template>
  <div style="padding: 20px">
    <Videolist :title="'我的收藏'" :list="mylikelist" :blankmessage="'您还没有收藏'">
      <template v-slot>
        <!-- <el-badge value="new" class="item"> -->
        <span class="mylikeclass">我的收藏</span>
        <!-- </el-badge> -->
      </template></Videolist
    >
  </div>
</template>

<script>
import Videolist from "@/components/list/Videolist.vue";

export default {
  name: "Mylkie",
  data() {
    return {
      mylikelist: [],
    };
  },
  components: {
    Videolist,
  },
};
</script>

<style lang="less" scoped>
.mylikeclass{
    color: rgb(255, 115, 0);
}
</style>
