<template>
  <div class="add-customer">
    <section class="section">
      <y-field label="所属组织" required placeholder="请选择所属组织" is-link></y-field>
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
    <y-button>确认创建</y-button>
  </div>
</template>

<script>
import { reactive } from 'vue'
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
    return {
      form
    }
  }
}
</script>

<style lang="scss" scoped>
.add-customer{
  overflow: hidden;
  .section{
    margin-top: 24px;
  }
}
</style>
