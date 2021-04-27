<template>
  <div class="tips">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tips',
  components: {
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
.tips {
  padding: 10px 30px;
  font-size: 26px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #999999;
  line-height: 36px;
}
</style>
