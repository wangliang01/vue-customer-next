<template>
  <div id="app">
    <!-- 开启顶部安全区适配 -->
    <!-- <van-nav-bar safe-area-inset-top></van-nav-bar> -->

    <router-view></router-view>

    <!-- 开启底部安全区适配 -->
    <van-number-keyboard safe-area-inset-bottom></van-number-keyboard>
  </div>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
  background-color: #f3f3f3;
}
</style>
