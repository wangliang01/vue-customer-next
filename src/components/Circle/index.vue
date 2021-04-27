<template>
  <div class="circle" :class="{active: active}">
    <div class="inner-circle">
      <slot>1</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Circle',
  components: {
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.circle {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(180deg, rgba(236, 244, 239, 0.25) 0%, rgba(193, 193, 193, 0.25) 100%);
  border-radius: 34px;
  &.active {
    background: linear-gradient(180deg, rgba(195, 255, 215, 0.25) 0%, rgba(38, 193, 100, 0.25) 100%);
    .inner-circle {
      background: linear-gradient(135deg, #60DB89 0%, #26C164 100%);
    }

  }

  .inner-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
    background: #BBBDC0;
    color: #fff;
    border-radius: 24px;
    opacity: 1;
  }
}
</style>
