<template>
  <div>
    <a href=""
      ><h1 class="logoh1">
        <img src="../assets/logo.png" style="width: 40px; height: 40px" />Yfeng
      </h1></a
    >

    <!-- 把路由数组渲染出来 -->
    <el-menu
      :default-active="routeindex"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :router="true"
    >
      <!-- 动态渲染路由 -->
      <template v-for="(item, index) in navdata">
        <el-menu-item :key="index" :index="'/' + item.path">
          <i :class="item.iconClass"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { navroutes } from "@/router/routes";

export default {
  name: "Aside",
  data() {
    return {
      //路由数组
      navdata: [],
      isCollapse: false,
    };
  },
  mounted() {
    this.navdata = navroutes;
  },
  computed:{
    //获取当前的url，并点亮对应的导航
    routeindex() {
      return this.$route.path;
    },
  }
};
</script>

<style lang="less" scoped>
@media (max-width: 559px) {
}
@media (min-width: 560px) and (max-width: 1024px) {
  .el-menu-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    line-height: normal;
    height: auto;
    padding-top: 12px;
    padding-bottom: 12px;
    i {
      margin-right: 0;
      margin-bottom: 5px;
    }
    span {
      font-weight: 700;
    }
  }
}
@media (min-width: 1025px) {
  .el-menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.logoh1 {
  display: flex;
  color: #00a29a;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

//删掉右边边框
.el-menu {
  border: 0;
}
</style>
