<template>
  <div class="upload">
    <h3 class="title">{{ title }}</h3>
    <van-uploader class="uploader" v-bind="$attrs" capture="camera">
      <div class="wrapper">
        <van-image src="https://yyx-mall.oss-cn-chengdu.aliyuncs.com/customer-icon/upload.png" fit="contain"></van-image>
      </div>
    </van-uploader>
    <y-tips class="tips">{{ tips }}</y-tips>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  components: {
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    tips: {
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
.upload{
  background-color: #fff;
  overflow: hidden;
  .title {
    padding: 24px 32px 20px;
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
    .van-uploader__wrapper{
      height: 100%;
    }
    ::v-deep(.van-uploader__preview-image){
      width: 100%;
      height: 100%;
    }
  }
  .tips{
    margin: 16px auto 28px;
    text-align: center;
  }
}
</style>
