<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import "@/assets/css/iconfont.css"; /*引入图标字体公共样式*/

export default {
  name: "App"
};
</script>
<style>
img {
  /* 图片兼容性处理 */
  content: normal !important;
  pointer-events: none;
}

html,
body {
  /* 去滚动条 */
  overflow: scroll;
  overflow-x: hidden;
  /* -webkit-overflow-scrolling: touch; */
  user-select: none;
  background: white;
}
body{
  padding-top: constant(safe-area-inset-top);
  padding-bottom: constant(safe-area-inset-bottom);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

@font-face {
  font-family: "dinm";
  src: url("/static/font/DINMittelschrift.otf") format("opentype");
  font-weight: normal;
  font-style: normal;
}

a {
  text-decoration: none;
}

#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.bodyRel {
  position: relative;
}
.bodyFixed {
  position: fixed;
  width: 100%;
}

/*bankbanner*/
.bank-banner {
  background-color: none;
  & .swiper-container {
    & .swiper-pagination {
      & .swiper-pagination-bullet {
        width: 10px;
        height: 5px;
        background-color: #6b3ae3;
        border-radius: 1rem;
      }
    }
  }
}
.border-bottom {
  background-image: linear-gradient(
    180deg,
    #e6e6e6,
    #e6e6e6 50%,
    transparent 50%
  );
  background-repeat: no-repeat;
  background-size: 120% 1px;
  background-position: 0 100%;
}
.border-right {
  background-image: linear-gradient(
    90deg,
    #e6e6e6,
    #e6e6e6 50%,
    transparent 50%
  );
  background-repeat: no-repeat;
  background-size: 1px 100%;
  background-position: right top;
}
.single-image img {
  vertical-align: middle;
}
</style>
