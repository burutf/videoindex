<template>
  <div>
    <video-player
      ref="videoPlayer"
      class="player vjs-custom-skin"
      :playsinline="true"
      :options="playerOptions"
    >
    </video-player>
  </div>
</template>

<script>
//引入视频播放器组件
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import { videoPlayer } from "vue-video-player";

export default {
  name: "Playervideo",
  props: {
    urlvideo: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      playerOptions: {
        autoplay: false, // 如果为true,浏览器准备好时开始回放
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        // sources: [
        //   {
        //     type: "video/mp4",
        //     src: "https://www.w3schools.com/html/mov_bbb.mp4",
        //   },
        // ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
      // isFullscreen: false,
    };
  },
  mounted() {},
  methods: {
    //全屏事件
    // onFullscreenChange() {
    //   const player = this.$refs.videoPlayer.player;
    //   console.log(player.isFullscreen());
    //   //是否全屏
    //   this.isFullscreen = player.isFullscreen();
    // },
  },
  watch: {
    urlvideo: {
      handler(newdata) {
        this.$refs.videoPlayer.player.src({ type: "video/mp4", src: newdata });
      },
    },
  },
  components: {
    videoPlayer,
  },
};
</script>

<style lang="less">


.video /*可不设置*/ {
  // margin: 48px 0;
}
.vjs-poster {
  background-color: #aaaaaa00;
}

/*播放按钮设置成宽高一致，圆形，居中*/
.vjs-custom-skin > .video-js .vjs-big-play-button {
  outline: none;
  border: none;
  border-radius: 100%;
  width: 66px;
  height: 66px !important;
  background-color: rgba(3, 159, 250, 0.555) !important;
  text-align: center !important;
}

.vjs-custom-skin > .video-js .vjs-big-play-button {
  transform: translateX(-50%);
  margin-left: 0;
}
.video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  text-align: center !important;
}

/*control-bar布局时flex，通过order调整剩余时间的位置到进度条右边*/
.vjs-custom-skin > .video-js .vjs-control-bar .vjs-remaining-time {
  order: 3 !important;
}

/* 进度条下面的播放按钮 */
.vjs-custom-skin > .video-js .vjs-control-bar .vjs-play-control {
  margin: 0;
  line-height: 20px;
  height: 94px;
  padding: 50px 0 24px 0;
}
.vjs-custom-skin
  > .video-js
  .vjs-control-bar
  .vjs-play-control
  .vjs-icon-placeholder:before {
  position: absolute;
  font-size: 20px;
  top: 44px;
  left: 24px;
  width: 20px;
  height: 20px;
}

/** 时间组件 */
.vjs-custom-skin > .video-js .vjs-control-bar .vjs-time-control {
  margin: 0;
  line-height: 20px;
  height: 94px;
  padding: 50px 0 24px 0;
  min-width: auto;
}
/* 时间-左 */
.video-js .vjs-current-time,
.vjs-no-flex .vjs-current-time {
  min-width: 32px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 20px;
  margin: 0 0 0 24px !important;
}
/* 下面控件的时间分割线 */
.vjs-custom-skin > .video-js .vjs-control-bar .vjs-time-divider {
  min-width: 6px;
  margin: 0 8px !important;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.2);
  line-height: 20px;
}
/* 时间-右 */
.video-js .vjs-duration,
.vjs-no-flex .vjs-duration {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 20px;
}
.video-js .vjs-control-bar {
  height: 94px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
}
/*进度条单独放置一行*/
.vjs-custom-skin > .video-js .vjs-progress-control.vjs-control {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 68px;
  width: 100%;
  height: 2px;
  padding: 0 24px;
}
/* 进度条背景轨道 */
.video-js .vjs-slider {
  border-radius: 1em;
  background-color: rgba(255, 255, 255, 0.2);
}
/* 加载进度条背景色 */
.video-js .vjs-load-progress {
  background: rgba(255, 255, 255, 0.1);
}
/* 进度条进度 */
.vjs-custom-skin > .video-js .vjs-play-progress,
.vjs-custom-skin > .video-js .vjs-volume-level {
  border-radius: 1px;
  background: #ffffff;
}

/*鼠标进入播放器后，播放按钮颜色会变*/
// .video-js:hover .vjs-big-play-button, .vjs-custom-skin>.video-js .vjs-big-play-button:active, .vjs-custom-skin>.video-js .vjs-big-play-button:focus{
//   background-color: rgba(0,0,0,0);
// }

/*control bar*/
.video-js .vjs-control-bar {
  background-color: rgba(0, 0, 0, 0.2) !important;
}

/*点击按钮时不显示蓝色边框*/
.video-js .vjs-control-bar button {
  outline: none;
}
.vjs-volume-panel .vjs-control .vjs-volume-panel-horizontal {
  width: 0;
  display: none;
}
/** 隐藏倍速 */
.vjs-custom-skin > .video-js .vjs-control-bar .vjs-playback-rate {
  display: none;
}
/** 音量按钮 */
.video-js .vjs-volume-panel {
  /* display: none; */
  position: absolute;
  right: 60px;
  bottom: 24px;
  width: 20px;
  height: 20px;
}
.vjs-icon-volume-high:before,
.video-js .vjs-mute-control .vjs-icon-placeholder:before {
  font-size: 20px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.9);
}
.video-js .vjs-volume-bar {
  margin: 8px 16px 8px 0;
}
.video-js .vjs-volume-level {
  left: -21px;
}
/* 全屏组件 */
.vjs-custom-skin > .video-js .vjs-control-bar .vjs-fullscreen-control {
  position: absolute;
  right: 24px;
  bottom: 24px;
  width: 20px;
  height: 20px;
}

/* 全屏按钮图标 */
.vjs-icon-fullscreen-enter:before,
.video-js .vjs-fullscreen-control .vjs-icon-placeholder:before {
  content: "\f108";
  width: 30px;
  height: 30px;
  line-height: initial;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}
/* 全屏播放后隐藏自定义全屏图标 */
.vjs-icon-fullscreen-exit:before,
.video-js.vjs-fullscreen .vjs-fullscreen-control .vjs-icon-placeholder:before {
  background: url("");
  line-height: 20px;
  margin-right: 10px;
}
</style>
