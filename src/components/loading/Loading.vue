<template>
  <teleport to="body">
    <div class="loading">
      <div class="wrapper">
        <van-loading type="spinner" class="loading-icon"></van-loading>
        <p class="loading-text">加载中...</p>
      </div>
    </div>
  </teleport>
</template>

<script>
import { Teleport } from 'vue'
import { Loading } from 'vant'
export default {
  name: 'Loading',
  components: {
    Teleport,
    VanLoading: Loading
  },
  props: {
  },
  setup() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.loading{
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: transparent;
  z-index: 1;
  .wrapper{
    width: 240px;
    height: 240px;
    background-color: rgba(0, 0, 0, .7);
    text-align: center;
    color: #fff;
    border-radius: 40px;
    padding: 40px;
    .loading-icon{
      margin: 40px;
    }
  }
}
</style>
