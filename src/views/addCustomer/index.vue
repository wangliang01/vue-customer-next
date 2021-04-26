<template>
  <div class="add-customer">
    新增客户页面
    <y-field label="文本" model-value="输入框只读" readonly required></y-field>
    <y-field label="文本" model-value="输入框已禁用" disabled></y-field>
    <y-button>新建</y-button>
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

</style>
