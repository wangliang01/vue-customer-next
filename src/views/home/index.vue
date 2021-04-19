<template>
  <div class="home">
    <!-- 搜索 -->
    <y-search></y-search>
    <!-- 组织 -->
    <y-select-org></y-select-org>
    <!-- 客户列表 -->
    <y-customer-item></y-customer-item>
  </div>
</template>

<script>
export default {
  name: 'Home',
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
