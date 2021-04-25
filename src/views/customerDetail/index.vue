<template>
  <div class="customer-detail">
    <section class="section">
      <y-cell label="父级一/父级二" value="芭芭拉/巴布洛塔罗夫斯基"></y-cell>
      <y-cell label="客户名称" value="2020-10-30"></y-cell>
      <y-cell label="客户地址" value="四川省成都市天府新区华阳街道将军碑 社区滨河路二段99号蓝岸丽景"></y-cell>
      <y-cell label="联系人" value="新希望小白"></y-cell>
      <y-cell label="联系电话" value="17281918762"></y-cell>
      <y-cell label="固定电话" value="67676736662"></y-cell>
      <y-cell label="邮箱" value="987299@sina.cn"></y-cell>
      <y-cell label="分析账户" value="17281918762"></y-cell>
      <y-cell label="税号" value="67676736662"></y-cell>
      <y-cell label="是否为实际节点" value="是"></y-cell>
    </section>
    <section class="section">
      <y-cell label="收货地址" value="四川省成都市天府新区华阳街道将军碑 社区滨河路二段99号蓝岸丽景"></y-cell>
      <y-cell label="开票公司" value="新希望云优选"></y-cell>
      <y-cell label="报价单" value="新希望云优选报价单"></y-cell>
      <y-cell label="绑定仓库" value="新希望小白"></y-cell>
      <y-cell label="收货时间" value="2021-04-09至2021-04-11"></y-cell>
      <y-cell label="配送天数" value="2天"></y-cell>
      <y-cell label="提前配送天数" value="1天"></y-cell>
      <y-cell label="外部门店ID" value="2333333333"></y-cell>
      <y-cell label="是否只卖库存" value="是"></y-cell>
      <y-cell label="是否显示库存" value="是"></y-cell>
    </section>
    <y-image></y-image>
  </div>
</template>

<script>
export default {
  name: '',
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
.customer-detail{
  overflow: hidden;
}
.section{
  margin: 24px;
  padding: 36px 0 40px;
  background-color: #fff;
  border-radius: 16px;
}
</style>
