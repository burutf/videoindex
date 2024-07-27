<template>
  <div>
    <!-- 标题栏 -->
    <div class="title">
      <span class="left">{{ title }}</span>
      <el-link :underline="false" class="right"
        >{{ right }}<i class="el-icon-view el-icon--right"></i
      ></el-link>
    </div>
    <!-- 列表栏 -->
    <div class="listcl">
      <div class="divlist" v-for="e of todaylist" :key="e.videoid">
        <div>
          <el-image :src="urlclassoss(e.cover.url)"></el-image>
          <span class="statuslist">{{ e.status }}</span>
        </div>
        <el-tooltip
          :enterable="false"
          :open-delay="260"
          :content="e.title"
          placement="bottom"
          effect="light"
        >
          <span class="listtitle">{{ e.title }}</span>
        </el-tooltip>
        <p class="bottomlist">更新到第{{ e.updatenum }}集</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Videolist",
  props: ["title", "right", "todaylist"],
  methods: {
    //url添加处理样式
    urlclassoss(url) {
      return url + process.env.VUE_APP_OSSIMGCLASS;
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 0 5px 5px;
  color: rgb(92, 92, 92);
  border-bottom: 3px solid rgb(186, 186, 186);
  border-radius: 5px;
  .left {
    font-size: 1.5em;
    font-weight: 600;
  }
  .right {
    font-size: 1.05em;
  }
}
.listcl {
  overflow: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 240px));
  justify-content: center;
  padding: 10px;
  gap: 15px;
  .divlist {
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    .statuslist {
      position: absolute;
      top: 5px;
      left: 5px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.955);
      background-color: rgba(80, 80, 80, 0.514);
      border-radius: 5px;
      padding: 0 2px;
    }
    .el-image {
      border-radius: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .listtitle {
      font-size: 15px;
      font-weight: 500;
      white-space: nowrap;
    }
    .bottomlist {
      font-size: 14px;
      color: rgb(99, 99, 99);
    }
  }
}
@media (max-width: 1800px) {
  .listcl {
    grid-template-columns: repeat(5, minmax(100px, 240px));
  }
}

@media (max-width: 900px) {
  .listcl {
    // display: flex;
    grid-template-columns: repeat(4, minmax(100px, 240px));
  }
}
@media (max-width: 700px) {
  .listcl {
    // display: flex;
    grid-template-columns: repeat(3, minmax(100px, 240px));
  }
}
@media (max-width: 560px) {
  .listcl {
    // display: flex;
    grid-template-columns: repeat(2, minmax(100px, 240px));
  }
}
</style>
