<template>
  <!-- 下拉刷新 -->
  <div
    ref="pullRefresh"
    class="pull-refresh"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    <div
      :style="`height: ${top}px; display: ${top >= 20 ? 'block' : 'none'}`"
      class="refresh-text y-text-center"
    >
      <van-loading type="spinner" size="20px">下拉刷新</van-loading>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
export default {
  name: 'PullRefresh', // 下拉刷新
  setup(props, ctx) {
    const data = reactive({
      top: 0,
      state: 0,
      startY: 0, // 保存Y轴点的位置
      touching: false // 是否开启下拉刷新行为
    })

    const pullRefresh = ref(null)

    const touchStart = (e) => {
      data.startY = e.touches[0].pageY
      console.log('startY', data.startY, e)

      // 开启下拉刷新状态
      data.touching = true
    }

    const touchMove = e => {
      // 这个touchMove，只要页面在动，都会发生，所以touching就起作用了，
      // 如果touching为false,说明这个正在移动的页面不是我们想要的下拉刷新，有可能是用户随意拉了一下页面而已，或者其他
      if (!data.touching) return
      // 获取移动的距离
      const diff = e.touches[0].pageY - data.startY
      const scrollTop = pullRefresh.value.scrollTop
      // 判断是上拉还是下拉
      if (diff > 0) {
        // 下拉
        if (scrollTop === 0) {
          // 位于滚动元素顶部并且向下滑动时,下拉刷新
          e.preventDefault()
        } else {
          // 向下滚动
          return
        }
      } else {
        // 上拉时，则什么也不做
        return
      }

      // 这个state.top 要对应绑定到该元素的高度，否则无法拉动
      data.top = Math.floor(diff * 0.25) + (data.state === 2 ? 20 : 0)

      if (data.top > 20) {
        data.state = 1 // 代表正在拉取
      } else {
        data.state = 0 // 代表初始状态
      }
    }

    const touchEnd = e => {
      data.touching = false
      if (data.state === 2) {
        // 这里可以调用父组件的方法去请求刷新接口
        data.top = 20
        return
      }
      if (data.top > 20) {
        refresh()
      } else {
        data.state = 0
        data.top = 0
      }
    }

    // 刷新
    const refresh = () => {
      data.state = 2
      data.top = 20
      // 这里可以调用父组件的方法去请求刷新接口
      ctx.emit('refresh', () => {
        data.state = 0
        data.top = 0
      })
    }

    return {
      ...toRefs(data),
      touchStart,
      touchMove,
      touchEnd,
      refresh,
      pullRefresh
    }
  }
}
</script>

<style lang="scss" scoped>
.pull-refresh{
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;
}
.refresh-text {
  display: none;
  padding: 20px 20px 0;
}
</style>
