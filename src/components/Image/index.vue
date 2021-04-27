<template>
  <div class="image">
    <h3>{{ title }}</h3>
    <div class="image-wrapper">
      <van-uploader v-model="fileList" class="uploader" v-bind="$attrs" :deletable="false" disabled :max-count="1">
      </van-uploader>
      <p class="tips">{{ tips }}</p>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
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
    const fileList = ref([{ url: imgUrl }])
    return {
      fileList
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
   .uploader{
    width: 100%;
    height: 268px;
    padding: 0 118px;
    box-sizing: border-box;
    ::v-deep(.van-uploader__wrapper){
      width: 100%;
      height: 100%;
    }
    ::v-deep(.van-uploader__preview-image){
      width: 100%;
      height: 100%;
    }
    ::v-deep(.van-uploader__preview){
      margin: 0;
      width: 100%;
      height: 100%;
    }
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
