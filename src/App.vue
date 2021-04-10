<template>
  <!-- 开启顶部安全区适配 -->
  <van-nav-bar safe-area-inset-top></van-nav-bar>

  <router-view></router-view>

  <!-- 开启底部安全区适配 -->
  <van-number-keyboard safe-area-inset-bottom></van-number-keyboard>
</template>

<style lang="scss">
@import url('./styles/reset.scss');
@import url('./styles/iconfont.scss');
</style>
