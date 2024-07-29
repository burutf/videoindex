<template>
  <div class="header">
    <!-- 占位，侧边栏是固定定位，不占位会被挡住 -->
    <span class="placeholdercl"></span>
    <div class="headcon">
      <!-- 小屏导航栏 -->
      <Pageheadersmall></Pageheadersmall>
      <!-- 搜索组件 -->
      <Searchinput class="showsearch searchcss"></Searchinput>
      <!-- 用户相关组件 -->
      <!-- <User></User> -->
      <div class="rightsearch">
        <el-button
          @click="showsearch"
          class="buttonsearch"
          icon="el-icon-search"
          >搜索</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
//引入占位符媒体查询
import "@/mediacss/placeholdercl.css";

//搜索组件
import Searchinput from "@/components/header/Searchinput.vue";
//用户相关组件
import User from "@/components/header/User.vue";
//小屏导航栏
import Pageheadersmall from "@/components/header/Pageheadersmall.vue";

export default {
  name: "Header",
  methods: {
    //小屏展示搜索框
    showsearch() {
      this.$router.push({ path: "/search"});
    },
  },
  components: {
    Searchinput,
    User,
    Pageheadersmall,
  },
};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  height: 60px;
  line-height: 60px;
  background-color: white;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
  .headcon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: auto;
    flex: 1;
    padding: 0 20px;
  }
}
.rightsearch {
  display: none;
}

.searchcss {
  max-width: 500px;
  width: 50vw;
  margin-right: 20px;
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
  .showsearch{
    display: none;
  }
  .rightsearch {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-shadow: -20px 0px 13px -22px rgba(95, 95, 95, 0.664);
    .buttonsearch {
      box-shadow: 1px 1px 3px rgba(130, 130, 130, 0.466);
      // background-color: rgb(233, 255, 229);
    }
  }
}
</style>
