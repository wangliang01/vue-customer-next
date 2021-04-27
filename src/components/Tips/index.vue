<template>
  <div ref="tips" class="tips" :style="`font-size: ${size}px`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tips',
  components: {
  },
  props: {
    size: {
      type: [String, Number],
      default: 12
    }
  },
  setup() {

  }
}
</script>

<style lang="scss" scoped>
.tips {
  padding: 10px 30px;
  font-size: 24px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #999999;
  line-height: 36px;
}
</style>
