<template>
  <div class="add-customer">
    <y-steps v-if="step" :step="step"></y-steps>
    <div v-if="step <= 1" class="section-step">
      <section class="section">
        <y-field label="所属组织" required placeholder="请选择所属组织" is-link></y-field>
        <y-field label="父级一/父级二" model-value="芭芭拉/巴布洛塔罗夫斯基" readonly></y-field>
        <y-field label="客户名称" required placeholder="请输入客户名称"></y-field>
        <y-field label="客户地址" required placeholder="请输入客户名称" is-link></y-field>
        <y-field label="详细地址" required placeholder="请输入具体地址"></y-field>
      </section>
      <section class="section">
        <y-field label="联系人" required placeholder="请输入联系人姓名"></y-field>
        <y-field label="联系电话" required placeholder="请输入客户联系电话" type="tel"></y-field>
        <y-field label="固定电话" placeholder="请输入客户固定电话" type="number"></y-field>
        <y-field label="邮箱" placeholder="请输入客户邮箱"></y-field>
        <y-field label="分析账户" required placeholder="请选择分析账户" is-link></y-field>
        <y-field label="税号" required placeholder="请输入税号"></y-field>
        <y-field label="是否为实际节点" required>
          <template #right-icon>
            <y-switch v-model="form.switch"></y-switch>
          </template>
        </y-field>
      </section>
      <y-tips>提示：非实际节点客户仅需配置基础信息</y-tips>
    </div>
    <div v-if="step === 2" class="section-step">
      <section class="section">
        <y-field label="收货地址" required placeholder="请选择省/市/区" is-link readonly></y-field>
        <y-field label="详细地址" required placeholder="请输入收货地址"></y-field>
        <y-field readonly class="block">
          <template #label>
            <y-checkbox v-model="form.switch">同步客户地址</y-checkbox>
          </template>
        </y-field>
      </section>
      <section class="section">
        <y-field label="开票公司" required placeholder="请选择开票公司" is-link readonly></y-field>
        <y-field label="报价单" required placeholder="请选择报价单" is-link readonly></y-field>
        <y-field label="绑定仓库" required placeholder="请选择仓库" is-link readonly></y-field>
        <y-field label="收货时间" required placeholder="请选择收货时间" is-link readonly></y-field>
        <y-field readonly class="block">
          <template #label>
            <y-checkbox v-model="form.switch">避开高峰时间</y-checkbox>
          </template>
        </y-field>
      </section>
      <section class="section">
        <y-field label="配送天数" placeholder="请输入配送天数"></y-field>
        <y-field label="提前配送天数" placeholder="请输入提前配送天数"></y-field>
        <y-field label="外部门店ID" placeholder="请输入外部门店ID"></y-field>
        <y-field label="是否只卖库存" required>
          <template #right-icon>
            <y-switch v-model="form.switch"></y-switch>
          </template>
        </y-field>
        <y-field readonly class="block">
          <template #label>
            <y-checkbox v-model="form.switch">显示库存</y-checkbox>
          </template>
        </y-field>
      </section>
      <section class="section">
        <y-upload v-model="fileList" :after-read="afterRead" :max-count="1" title="客户LOGO" tips="提示：将作为客户商城的LOGO"></y-upload>
      </section>
      <section class="section">
        <y-upload v-model="fileList" :after-read="afterRead" :max-count="1" title="商城背景图" tips="提示：将作为客户商城的背景图，非必传，不传则背景图为默认"></y-upload>
      </section>
    </div>
    <y-button>确认创建</y-button>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
export default {
  name: 'AddCustomer',
  components: {
  },
  props: {
  },
  setup() {
    const form = reactive({
      switch: true
    })
    const step = ref(2) // 0 : 初始状态, 1: 表示第一步, 2: 表示第二步
    const fileList = ref([])
    const afterRead = file => {
      console.log('file', file)
    }

    watch(fileList, (newVal, oldVal) => {
      console.log(newVal, oldVal)
    })
    return {
      form,
      step,
      fileList,
      afterRead
    }
  }
}
</script>

<style lang="scss" scoped>
.add-customer{
  padding-bottom: 144px;
  overflow: hidden;
  .section{
    margin-top: 24px;
  }
  .block {
    ::v-deep(.van-field__label) {
      width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
