<template>
  <div class="image">
    <h3>{{ title }}</h3>
    <div class="image-wrapper">
      <van-image :src="imgUrl" fit="cover"></van-image>
      <p class="tips">{{ tips }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'Image',
  components: {
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const imgUrl = computed(() => {
      if (props.src && props.src.includes('http')) {
        return props.src
      }
      return 'https://yyx-mall.oss-cn-chengdu.aliyuncs.com/customer-icon/pic-default.png'
    })
    return {
      imgUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.image{
  margin: 24px;
  background: #FFFFFF;
  border-radius: 16px;
  h3 {
    padding: 24px 30px 20px;
    font-size: 28px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #292929;
    line-height: 40px;
  }
  .image-wrapper {
    text-align: center;
    overflow: hidden;
  }
  ::v-deep(.van-image){
    width: 514px;
    height: 268px;
    background: #F4F5F6;
    border-radius: 12px;
    border: 2px solid #E6E6E6;
    box-sizing: border-box;
    overflow: hidden;
  }
  .tips {
    margin: 16px 0 28px;
    font-size: 24px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #999999;
    line-height: 36px;
  }
}
</style>
