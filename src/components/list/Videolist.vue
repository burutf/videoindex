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
    <div class="listcl" v-if="list.length > 0">
      <div class="divlist" v-for="e of list" :key="e.videoid">
        <div class="imgdiv">
          <el-image :src="urlclassoss(e.cover.url)"></el-image>
          <span class="statuslist" :style="{backgroundColor:statuscolor(e.status)}">{{ e.status }}</span>
          <span v-if="e.status==='连播中'" class="bottomlist">最新：第{{ e.updatenum }}集</span>
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
        <p>
          <el-tag size="mini" v-for="(tag, i) of e.classify" :key="i">{{
            tag
          }}</el-tag>
        </p>
      </div>
    </div>
    <div v-else v-loading="loading">
      <el-empty :image-size="120" :description="blankmessage"></el-empty>
    </div>
  </div>
</template>

<script>
export default {
  name: "Videolist",
  props: ["title", "right", "list", "blankmessage","loading"],
  methods: {
    //url添加处理样式
    urlclassoss(url) {
      return url + process.env.VUE_APP_OSSIMGCLASS;
    },
    //根据完结状态切换颜色
    statuscolor(status){
      if (status==='已完结') {
        return 'rgba(255, 192, 33, 0.8)'
      }else{
        return 'rgba(33, 255, 44, 0.8)'
      }
    }
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
  grid-template-columns: repeat(auto-fill, minmax(100px, 180px));
  justify-content: center;
  padding: 10px;
  gap: 15px;
  .divlist {
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    min-width: 100px;
    max-width: 200px;
    .imgdiv {
      position: relative;
      font-size: 1.1em;
      .statuslist {
        position: absolute;
        top: 5px;
        left: 5px;
        font-size: 0.8em;
        color: rgba(255, 255, 255, 1);
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
      .bottomlist {
        position: absolute;
        bottom: 10px;
        right: 5px;
        font-size: 0.8em;
        color: rgb(253, 253, 253);
        background-color: rgba(80, 80, 80, 0.514);
        border-radius: 5px;
        padding: 0 2px;
      }
    }

    .listtitle {
      font-size: 15px;
      font-weight: 500;
      white-space: nowrap;
    }
  }
}




@media (max-width: 1800px) {
  .listcl {
    grid-template-columns: repeat(5, 1fr);
    // grid-template-rows: repeat(1, 1fr);
  }
}

@media (max-width: 900px) {
  .listcl {
    // display: flex;
    grid-template-columns: repeat(4, minmax(100px, 180px));
  }
}
@media (max-width: 700px) {
  .listcl {
    // display: flex;
    grid-template-columns: repeat(3, minmax(100px, 180px));
  }
}
@media (max-width: 560px) {
  .listcl {
    // display: flex;
    grid-template-columns: repeat(2, minmax(100px, 180px));
  }
}
</style>
