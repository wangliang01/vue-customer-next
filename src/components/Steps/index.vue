<template>
  <div class="steps">
    <div v-for="item in steps" :key="item.id" class="step-item">
      <div class="step-text">
        <y-circle :active="step >= item.id">{{ item.id }}</y-circle>
        <div class="text" :class="{active: step >= item.id}">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'Steps',
  components: {
  },
  props: {
    step: {
      type: [Number, String],
      default: 1
    }
  },
  setup() {
    const steps = reactive([
      {
        id: 1,
        text: '基础信息'
      },
      {
        id: 2,
        text: '销售信息'
      }
    ])

    return {
      steps
    }
  }
}
</script>

<style lang="scss" scoped>
.steps{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  .step-item{
    padding: 32px 136px 34px;
    overflow: hidden;
    &:last-child{
      .step-text{
        &:after{
          width: 0;
        }
      }
    }
    &:first-child{
      .step-text{
        &:before{
          width: 0;
        }
      }
    }
  }
  .step-text{
    text-align: center;
    .text {
      margin-top: 12px;
      font-size: 24px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #999999;
      line-height: 34px;
      &.active {
        color: #0CAA4B;
      }
    }
    &:before{
      position: relative;
      top: 31px;
      left: -192px;
      display: block;
      content: ' ';
      width: 192px;
      height: 0;
      border-bottom: 4px solid #E9E9EB;
    }
    &:after{
      position: relative;
      bottom: 82px;
      right: -100px;
      display: block;
      content: ' ';
      width: 192px;
      height: 0;
      border-bottom: 4px solid #E9E9EB;
    }
  }
}
</style>
