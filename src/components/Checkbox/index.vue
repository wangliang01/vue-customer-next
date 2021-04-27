<template>
  <van-checkbox v-bind="$attrs">
    <slot></slot>
  </van-checkbox>
</template>

<script>
export default {
  name: 'Checkbox',
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
::v-deep(.van-checkbox__label) {
  margin-left: 14px;
  font-size: 28px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #292929;
  line-height: 40px;
}
::v-deep(.van-checkbox__icon--checked .van-icon){
  background: linear-gradient(45deg, #26C164 0%, #60DB89 100%);
  border-color: #26C164;

}
</style>
