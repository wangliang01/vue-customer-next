<template>
  <van-switch v-bind="$attrs"></van-switch>
</template>

<script>
export default {
  name: 'Switch',
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
.van-switch{
  width: 76px;
  height: 48px;
  background: #E9E9EB;
  border-radius: 24px;
  font-size: 36px;
  &.van-switch--on{
    background: linear-gradient(90deg, #33DB6B 0%, #26C164 100%);
    .van-switch__node{
      transform: translateX(1em);
    }
  }
  ::v-deep(.van-switch__node){
    position: absolute;
    top: 4px;
    width: 40px;
    height: 40px;
    background: #FFFFFF;
    box-shadow: 0px 2px 8px 0px rgba(199,199,199,0.5);
  }
}
</style>
