<template>
  <div>
    <el-container>
      <el-aside class="sidebar" width="">
        <!-- 侧边栏 -->
        <Aside></Aside>
      </el-aside>
      <el-container class="rightbox">
        <!-- 头部 -->
        <el-header>
          <Header></Header>
        </el-header>
        <!-- 主体 -->
        <el-main style="padding: 20px; position: relative">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//侧边栏
import Aside from "@/layout/Aside.vue";
//头部
import Header from "@/layout/Header.vue";

export default {
  name: "layout",
  data() {
    return {};
  },
  components: {
    Aside,
    Header,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  z-index: 999;
  padding: 0;
  margin: 0;
}

//左边的侧边栏盒子
.el-aside {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  padding-top: 10px;
  background-color: #ffffff;
  color: #333;
  text-align: center;
  height: 100vh;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
}

.el-main {
  height: 1000px
}


//侧边栏
.sidebar {
  width: 200px;
}
//右边的头部和主体盒子
.rightbox {
  margin-left: 200px;
}

@media (max-width: 1025px) {
  //侧边栏
  .sidebar {
    height: 100vh;
    width: 100px;
  }
  //右边的头部和主体盒子
  .rightbox {
    margin-left: 100px;
  }
}
@media (max-width: 560px) {
  //侧边栏
  .sidebar {
    display: none;
  }
  //右边的头部和主体盒子
  .rightbox {
    margin-left: 0px;
  }
}
</style>
