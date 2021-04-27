<template>
  <div class="btn-wrapper" @click="handleClick">
    <button class="y-reset-button" :class="['btn', `${type}-btn`]">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  components: {
  },
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  },
  setup(props, { emit }) {
    const handleClick = () => {
      emit('click')
    }
    return {
      handleClick
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-wrapper{
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 22px 24px;
  box-sizing: border-box;
  background-color: #fff;
  border-top: 2px solid #D9D9D9;
}
.btn {
  display: block;
  width: 100%;
  height: 80px;
  border-radius: 40px;
  font-size: 36px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  line-height: 50px;
  &.primary-btn {
    color: #FFFFFF;
    background: linear-gradient(90deg, #33DB6B 0%, #26C164 100%);
  }
  &.disabled-btn {
    background: #E4E6E6;
    color: #666666;
  }
}
</style>
