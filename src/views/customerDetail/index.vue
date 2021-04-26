<template>
  <div v-if="showDetail" class="customer-detail">
    <section class="section">
      <y-cell label="所属组织" :value="orgName"></y-cell>
      <y-cell label="父级一/父级二" :value="form.parentName"></y-cell>
      <y-cell label="客户名称" :value="form.name"></y-cell>
      <y-cell label="客户地址" :value="customerAddress"></y-cell>
      <y-cell label="联系人" :value="form.customerName"></y-cell>
      <y-cell label="联系电话" :value="form.phone"></y-cell>
      <y-cell label="固定电话" :value="form.fixedPhone"></y-cell>
      <y-cell label="邮箱" :value="form.mailbox"></y-cell>
      <y-cell label="分析账户" :value="form.analyticAccount"></y-cell>
      <y-cell label="税号" :value="form.tax"></y-cell>
      <y-cell label="是否为实际节点" :value="isNeedConfirmation"></y-cell>
    </section>
    <section class="section">
      <y-cell label="收货地址" :value="receiptAddress"></y-cell>
      <y-cell label="开票公司" :value="form.billingCompany"></y-cell>
      <y-cell label="报价单" :value="form.quotationName"></y-cell>
      <y-cell label="绑定仓库" :value="form.storageName"></y-cell>
      <y-cell label="收货时间" :value="receiveTime"></y-cell>
      <y-cell label="配送天数" :value="deliveryDays"></y-cell>
      <y-cell label="提前配送天数" :value="advanceOrderDay"></y-cell>
      <y-cell label="外部门店ID" :value="form.externalStoresId"></y-cell>
      <y-cell label="是否只卖库存" :value="qty"></y-cell>
      <y-cell label="是否显示库存" :value="showStock"></y-cell>
    </section>
    <!-- 客户LOGO -->
    <y-image v-if="form.node===1" title="客户LOGO" tips="提示：将作为客户商城的LOGO"></y-image>
    <!-- 商城背景图 -->
    <y-image v-if="form.node===1" title="商城背景图" tips="提示：将作为客户商城的背景图，非必传，不传则背景图为默认"></y-image>
  </div>
  <div v-else class="disabled">该客户已禁用，无法查看。</div>
</template>

<script>
import { getQueryString } from '@/utils/getQueryString'
import { useStore } from 'vuex'
import { transNumberToBoolean } from '@/utils'
import { reactive, ref } from 'vue'
import api from '@/api'
export default {
  name: '',
  components: {
  },
  props: {
  },
  setup() {
    const id = getQueryString('id')
    const orgId = getQueryString('orgId')
    const showDetail = ref(true)
    const getCustomerDetail = async() => {
      const res = await api.customer.getCustomer({ id }, { orgId })

      if (res.success) {
        if (res.data) {
          showDetail.value = true
          return reactive(res.data)
        }
        showDetail.value = false
        return reactive({})
      }
      showDetail.value = false
      return reactive({})
    }
    const form = getCustomerDetail()

    // 获取orgName
    const store = useStore()
    const orgName = store.getters.orgInfo.find(item => item.orgId === orgId)?.orgName || ''

    // 客户地址
    const customerAddress = `${form.addressName ? form.addressName : ''} ${form.address ? form.address : ''}`

    // 收货地址
    const receiptAddress = `${form.shippingAddressName ? form.shippingAddressName : ''} ${form.shippingAddress ? form.shippingAddress : ''}`

    // 收货时间
    let receiveTime = ''
    if (form.startTime && form.endTime) {
      receiveTime = form.startTime?.slice(-8) + '至' + form.endTime?.slice(-8)
    }

    // 配送天数
    const deliveryDays = form.deliveryDays ? `${form.deliveryDays}天` : ''

    // 配送天数
    const advanceOrderDay = form.advanceOrderDay ? `${form.advanceOrderDay}天` : ''

    // 是否需要手动收货
    const isNeedConfirmation = transNumberToBoolean(form.isNeedConfirmation)

    // 是否为实际节点
    const node = transNumberToBoolean(form.node)

    // 是否只卖库存
    const qty = transNumberToBoolean(form.qty)

    // 是否显示库存
    const showStock = transNumberToBoolean(form.showStock)
    return {
      form,
      orgName,
      customerAddress,
      receiptAddress,
      receiveTime,
      isNeedConfirmation,
      node,
      qty,
      showStock,
      deliveryDays,
      advanceOrderDay,
      showDetail
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
.disabled{
  line-height: 100vh;
  color: #292929;
  text-align: center;
}
</style>
