<template>
  <div class="field-wrapper">
    <van-field v-bind="$attrs" class="field" v-on="$liseners"></van-field>
  </div>
</template>

<script>
export default {
  name: 'Field',
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
.field-wrapper{
  padding: 0 32px;
  width: 750px;
  height: 94px;
  background: #FFFFFF;
  .field{
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    border-bottom: 1px solid #eee;
    ::v-deep(.van-field__label) {
      width: 204px;
    }
  }
  ::v-deep(.van-cell--required) {
    &::before {
      position: absolute;
      content: '*';
      left: 2.4em;
      font-size: 28px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #FA3321;
      line-height: 32px;
    }
  }

}

</style>
