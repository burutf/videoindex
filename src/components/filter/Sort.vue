<template>
  <div>
    <div
      class="sort"
      v-for="e of data"
      :key="e.title"
      @click="fn"
      :data-value="e.value"
    >
      <span :data-value="e.value" :class="{ active: acttitle === e.value }">{{
        e.title
      }}</span>
      <i
        :data-value="e.value"
        class="el-icon-caret-top"
        :class="{ active: sorta === 1 && acttitle === e.value }"
      ></i>
      <i
        :data-value="e.value"
        class="el-icon-caret-bottom"
        :class="{ active: sorta === -1 && acttitle === e.value }"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sort",
  props: [
    //传来的数据列表
    "data",
    //默认激活的项
    "defaultvalue",
    //怎么排序
    "sortstatus",
  ],
  data() {
    return {
      //当前激活的项
      acttitle: "",
      //当前的排序状态
      sorta:''
    };
  },
  mounted() {
    //接收当前排序的项
    this.acttitle = this.defaultvalue;
    //接收当前的排序状态
    this.sorta = +this.sortstatus
  },
  methods: {
    fn({ target }) {
      if (this.acttitle === target.dataset.value) {
        if (this.sorta===1) {
          this.sorta = -1
        }else{
          this.sorta = 1
        }
      } else {
        //点击时激活项
        this.acttitle = target.dataset.value;
      }
      this.$emit('sortfn',{
        value:this.acttitle,
        status:this.sorta
      })
    },
  },
};
</script>

<style lang="less" scoped>
.sort {
  position: relative;
  height: 23px;
  line-height: 23px;
  cursor: pointer;
  display: inline-block;
  font-size: 0.9em;
  margin-right: 20px;
  text-wrap: nowrap;
  user-select: none;
  .active {
    color: #00aeec !important;
  }
  .el-icon-caret-top {
    position: absolute;
    top: 0;
    color: rgb(168, 168, 168);
  }
  .el-icon-caret-bottom {
    position: absolute;
    bottom: 0;
    color: rgb(168, 168, 168);
  }
}
</style>
