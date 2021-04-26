<template>
  <div class="field-wrapper">
    <div class="field">
      <div class="field-label">
        客户名称
      </div>
      <div class="field-value">
        12211321
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Field',
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
.field-wrapper{
  padding: 0 32px;
  width: 750px;
  height: 94px;
  background: #FFFFFF;
  .field{
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    border-bottom: 1px solid #eee;
    .field-label {
      width: 216px;
    }
    .field-value {
      flex: 1;
    }
  }
}
</style>
