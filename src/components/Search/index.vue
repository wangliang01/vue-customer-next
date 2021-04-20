<template>
  <div class="search-component">
    <div class="search-wrapper y-flex y-row-between">
      <input ref="input" v-model="content" type="text" class="y-reset-input search-input" @click="handleClick">
      <button class="y-reset-button search-btn" @click="handleSearch">搜索</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  name: 'Search',
  components: {
  },
  props: {
    focus: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const input = ref(null)
    const content = ref('')
    const handleSearch = () => {
      emit('search', content.value)
    }
    const handleClick = () => {
      emit('click')
    }

    // onMounted
    onMounted(() => {
      props.focus && input.value.focus()
    })
    return {
      input,
      content,
      handleSearch,
      handleClick
    }
  }
}
</script>

<style lang="scss" scoped>
.search-component{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 18px 24px 34px;
  background-color: #fff;
  .search-wrapper {
    height: 68px;
    background: #F7F7F7;
    border-radius: 34px;
    border: 2px solid #ECECEC;
    padding: 0 10px 0 30px;
    .search-input{
      flex: 1;
      line-height: 68px;
    }
    .search-btn {
      width: 98px;
      display: block;
      height: 56px;
      background: linear-gradient(135deg, #60DB89 0%, #26C164 100%);
      border-radius: 28px;
      color: #fff;
      cursor: pointer;
      font-size: 24px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 32px;
    }
  }
}
</style>
