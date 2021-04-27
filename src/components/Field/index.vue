<template>
  <div class="field-wrapper">
    <van-field v-bind="$attrs" class="field" v-on="$liseners">
      <template v-if="$slots.label" #label>
        <slot name="label">
        </slot>
      </template>
      <template v-if="$slots.input" #input>
        <slot name="input">
        </slot>
      </template>
      <template v-if="$slots['left-icon']" #left-icon>
        <slot name="left-icon"></slot>
      </template>
      <template v-if="$slots['right-icon']" #right-icon>
        <slot name="right-icon"></slot>
      </template>
      <template v-if="$slots.button" #button>
        <slot name="button"></slot>
      </template>
      <template v-if="$slots.extra" #extra>
        <slot name="extra"></slot>
      </template>
    </van-field>
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
  },
  mounted() {
    console.log(this.$attrs, this.$slots)
  }
}
</script>

<style lang="scss" scoped>
.field-wrapper{
  padding: 0 32px;
  width: 750px;
  height: 94px;
  background: #FFFFFF;
  box-sizing: border-box;
  &:last-child{
    .field {
      border-bottom: 0;
    }
  }
  .field{
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    border-bottom: 1px solid #eee;
    ::v-deep(.van-field__label) {
      width: 204px;
      font-size: 28px;
    }
    ::v-deep(.van-field__value) {
      flex: 1;
      font-size: 28px;
    }
  }
  ::v-deep(.van-cell--required) {
    &:before {
      content: '';
    }
    .van-field__label>span::after {
      padding: 6px;
      position: absolute;
      content: '*';
      font-size: 28px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #FA3321;
      box-sizing: border-box;
    }
  }

}

</style>
