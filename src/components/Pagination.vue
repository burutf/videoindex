<template>
  <div class="block">
    <el-pagination
      layout="total,prev, pager, next"
      :total="sumpage"
      :pager-count="5"
      :page-size="pagesize"
      :current-page="currentpage"
      @current-change="changepage"
      v-show="isshow"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  //总条数
  props: [
    //总条数
    "sumpage",
    //每页显示条数
    "pagesize",
    //当前页数
    "currentpage",
  ],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    changepage(i) {
      this.$emit("regetlsit", i);
    },
  },
  computed: {
    //是否显示分页
    isshow() {
      return this.sumpage > this.pagesize;
    },
  },
};
</script>

<style lang="less" scope>
.block {
  margin-top: 20px;
  // overflow: hidden;
  //分页功能条样式
  .el-pagination {
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    z-index: 300;
    padding: 0;
    //会挡住下面，设置个鼠标穿透
    pointer-events: none;

    //左边的箭头
    .btn-prev {
      background: none;
      pointer-events: auto;
      .el-icon-arrow-left:before {
        content: "\e792";
        font-size: 1.3em;
      }
    }

    .el-pager {
      //中间的按钮
      .number {
        background-color: rgb(255, 255, 255);
        box-shadow: 1px 1px 5px rgb(184, 184, 184);
        border-radius: 50%;
        margin: 0 5px;
        height: 30px;
        width: 30px;
        min-width: auto;
        line-height: 30px;
        transition: all 0.2s;
        pointer-events: auto;
        //激活的按钮
        &.active {
          box-shadow: 0px 0px 3px rgb(192, 192, 192);
        }
      }
    }

    //右边的箭头
    .btn-next {
      background: none;
      pointer-events: auto;
      .el-icon-arrow-right:before {
        content: "\e791";
        font-size: 1.3em;
      }
    }
  }
}

@media (max-width: 560px) {
  //最左边的信息
  .el-pagination__total {
    position: absolute;
    bottom: -30px;
  }
}
</style>
