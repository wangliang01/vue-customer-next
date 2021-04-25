<template>
  <div class="image">
    <h3>客户LOGO</h3>
    <div class="image-wrapper">
      <van-image></van-image>
      <p class="tips">提示：将作为客户商城的LOGO</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Image',
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
