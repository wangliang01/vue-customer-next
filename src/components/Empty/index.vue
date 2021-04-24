<template>
  <div class="empty">
    <van-image class="empty-img"></van-image>
    <div class="empty-tips y-block">未搜索到客户信息</div>
    <button class="y-reset-button empty-btn">新增客户</button>
  </div>
</template>

<script>
export default {
  name: 'Empty',
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
.empty {
  text-align: center;
  .empty-img {
    width: 292px;
    height: 292px;
    margin-top:108px;
  }
  .empty-tips {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 48px;
  }
  .empty-btn{
    margin-top: 50px;
    width: 240px;
    height: 80px;
    background: linear-gradient(90deg, #33DB6B 0%, #26C164 100%);
    border-radius: 40px;
    font-size: 32px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 44px;
  }
}
</style>
