<template>
  <div class="customer-item">
    <div class="customer-item-wrapper ">
      <div class="item-row">
        <div class="label y-line-2">客户名称：</div>
        <div class="value y-line-2">蜡笔小新</div>
      </div>
      <div class="item-row">
        <div class="label y-line-2">联系人：</div>
        <div class="value y-line-2">小白</div>
      </div>
      <div class="item-row">
        <div class="label y-line-2">联系电话：</div>
        <div class="value y-line-2">19922289201</div>
      </div>
      <div class="item-row">
        <div class="label y-line-2">客户地址：</div>
        <div class="value y-line-2">北京市市辖区东城区109号18栋17楼9号</div>
      </div>
      <div class="van-hairline--bottom"></div>
    </div>
    <div class="customer-btn-wrapper">
      <button class="view-btn y-reset-button">查看详情</button>
      <button class="add-child-btn y-reset-button">新增子级客户</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerItem',
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
.customer-item {
  height: 348px;
  background: #FFFFFF;
  border-radius: 16px;
  margin: 0 24px 24px;
  .customer-item-wrapper {
    padding: 24px 24px 20px;
    .item-row {
      margin-bottom: 20px;
      padding: 0 6px;
      display: flex;
      font-size: 26px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #666666;
      line-height: 36px;
      text-align: left;
      &:last-child {
        margin-bottom: 28px;
      }
      .label {
        min-width: 140px;
      }
      .value {
        color: #292929;
      }
    }
  }
  .customer-btn-wrapper {
    padding: 0 18px;
    text-align: right;
    .view-btn{
      width: 160px;
      height: 54px;
      background: #E1FFE8;
      border-radius: 32px;
      font-size: 26px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #0CAA4B;
      line-height: 36px;
    }
    .add-child-btn {
      margin-left: 18px;
      width: 200px;
      height: 54px;
      background: #FEF1E6;
      border-radius: 32px;
      font-size: 26px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #F66A02;
      line-height: 36px;
    }
  }
}
</style>
