<template>
  <div style="padding: 20px">
    <Videolist :title="'我的收藏'" :list="favoritelist" :blankmessage="'您还没有收藏'">
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
  name: "Favorite",
  data() {
    return {
      favoritelist: [],
    };
  },
  created(){
    this.getmfavoritelist()
  },
  methods:{
    //加载完成的收藏的列表
    async getmfavoritelist(){
      if (this.favoritelocal.length===0) return
      try {
        const {data} = await this.$API.findapi.getmfavoritelist(this.favoritelocal)
        console.log(data);
        this.favoritelist = data
      } catch (error) {}
    }
  },
  computed:{
    //拿到本地里的收藏列表
    favoritelocal(){
      if (!localStorage.hasOwnProperty("favorite")) return [];
      return JSON.parse(localStorage.getItem('favorite'))
    }
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
