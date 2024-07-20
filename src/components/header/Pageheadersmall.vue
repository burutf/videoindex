<template>
  <!-- 小屏显示 -->
  <ul class="headlist" @click="navfn">
    <li
      v-for="e of navdata"
      :key="e.path"
      :id="e.meta.id"
      :data-name="e.name"
    >
      <!-- <i :class="e.iconClass" style="margin-right: 5px"></i> -->
      {{ e.name }}
    </li>
    <div
      :style="{ left: actleft + 'px', width: actlong + 'px' }"
      class="actcl"
    ></div>
  </ul>
</template>

<script>
//引入导航栏数组
import { navroutes } from "@/router/routes";

export default {
  name: "Pageheadersmall",
  data() {
    return {
      //路由数组
      navdata: [],
      //小屏显示时列表底下的线条
      //位置左
      actleft: 10,
      //长度
      actlong: 0,
    };
  },
  mounted() {
    this.navdata = navroutes;
    this.navactrouter();
  },
  methods: {
    //开始时拿到当前的路由，根据路由激活现在的导航
    navactrouter() {
      this.$nextTick(() => {
        const ever = document.getElementById(this.$route.meta.id);
        this.actlong = ever.clientWidth * 0.8;
        this.actleft = ever.offsetLeft + ever.clientWidth * 0.1;
      });
    },
    //选中跳转处理
    navfn(e) {
      const { target } = e;
      //处理选择条的位置
      //   this.actlong = target.clientWidth * 0.8;
      //   this.actleft = target.offsetLeft + target.clientWidth * 0.1;
      //跳转
      if (this.$route.name === target.dataset.name ) return
      this.$router.push({ name: target.dataset.name });
    },
  },
  watch: {
    $route() {
      this.navactrouter();
    },
  },
};
</script>

<style lang="less" scoped>


.headlist {
  flex-wrap: nowrap;
  position: absolute;
  display: flex;
  width: 0;
  overflow-x: hidden;
  text-wrap: nowrap;
  li {
    padding: 0 10px;
    cursor: pointer;
  }
  .activate {
    border-bottom: 1px solid black;
  }
  .actcl {
    position: absolute;
    bottom: 15px;
    width: 10px;
    height: 2px;
    background-color: red;
    transition: all 0.3s;
  }
}
.headlist::-webkit-scrollbar {
  display: none;
}


@media (max-width: 560px) {
  .headlist {
    display: flex;
    position: relative;
    overflow: auto;
    width: unset;
  }
}
</style>
