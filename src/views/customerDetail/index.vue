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
import { ref } from 'vue'
import api from '@/api'
export default {
  name: '',
  components: {
  },
  props: {
  },
  setup() {
    const store = useStore()
    const id = getQueryString('id')
    const orgId = getQueryString('orgId')
    const showDetail = ref(true)

    const form = ref({})
    const orgName = ref('')
    const customerAddress = ref('')
    const receiptAddress = ref('')
    const receiveTime = ref('')
    const isNeedConfirmation = ref('')
    const node = ref('')
    const qty = ref('')
    const showStock = ref('')
    const deliveryDays = ref('')
    const advanceOrderDay = ref('')

    const getCustomerDetail = async() => {
      const res = await api.customer.getCustomer({ id }, { orgId })
      if (res.success) {
        if (res.data) {
          const data = res.data
          showDetail.value = true
          form.value = data

          // 获取orgName
          orgName.value = store.getters.orgInfo.find(item => item.orgId === orgId)?.orgName || ''

          // 客户地址
          customerAddress.value = `${data.addressName ? data.addressName : ''} ${data.address ? data.address : ''}`

          // 收货地址
          receiptAddress.value = `${data.shippingAddressName ? data.shippingAddressName : ''} ${data.shippingAddress ? data.shippingAddress : ''}`

          // 收货时间
          if (data.startTime && data.endTime) {
            receiveTime.value = data.startTime?.slice(-8) + '至' + data.endTime?.slice(-8)
          }

          // 配送天数
          deliveryDays.value = data.deliveryDays ? `${data.deliveryDays}天` : ''

          // 配送天数
          advanceOrderDay.value = data.advanceOrderDay ? `${data.advanceOrderDay}天` : ''

          // 是否需要手动收货
          isNeedConfirmation.value = transNumberToBoolean(data.isNeedConfirmation)

          // 是否为实际节点
          node.value = transNumberToBoolean(data.node)

          // 是否只卖库存
          qty.value = transNumberToBoolean(data.qty)

          // 是否显示库存
          showStock.value = transNumberToBoolean(data.showStock)
        } else {
          showDetail.value = false
        }
      } else {
        showDetail.value = false
      }
    }

    getCustomerDetail()

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
