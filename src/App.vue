<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
body,
html {
  background-color: #fafafa;
  //让滚动条提前占位
  // scrollbar-gutter: stable;
}
ul,
li {
  padding: 0;
  list-style: none;
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}
#app {
  max-width: 1920px;
  margin: 0 auto;
}
</style>
