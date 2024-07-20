<template>
  <div class="header">
    <!-- 占位，侧边栏是固定定位，不占位会被挡住 -->
    <span class="placeholdercl"></span>
    <div class="headcon">
      <!-- 搜索组件 -->
      <Searchinput></Searchinput>
      <!-- 小屏导航栏 -->
      <Pageheadersmall></Pageheadersmall>
      <!-- 用户相关组件 -->
      <User></User>
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
import Pageheadersmall from "@/components/header/Pageheadersmall.vue"

export default {
  name: "Header",
  components: {
    Searchinput,
    User,
    Pageheadersmall
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
    padding: 0 20px
  }
}
</style>
