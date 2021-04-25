<template>
  <div class="cell">
    <div class="label">{{ label }}</div>
    <div class="value y-line-2">{{ value }}</div>
  </div>
</template>

<script>
export default {
  name: 'Cell',
  components: {
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.cell {
  display: flex;
  justify-content: space-between;
  padding: 0 24px 0 30px;
  margin-bottom: 28px;
  background-color: #fff;
  .label {
    width: 200px;
    font-size: 26px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #999999;
    line-height: 36px;
  }
  .value {
    flex: 1;
    font-size: 26px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #292929;
    line-height: 40px;
    text-align: right;
  }
}
</style>
