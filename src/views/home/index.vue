<template>
  <div class="home">
    <y-pull-refresh class="pull-fresh-container" @refresh="handleRefresh">
      <!-- 搜索 -->
      <y-search @click="goSearch"></y-search>
      <!-- 组织 -->
      <y-select-org></y-select-org>
      <!-- 客户列表 -->

      <y-customer-item v-for="(item, index) in customerList" :key="index" :customer="item"></y-customer-item>
    </y-pull-refresh>

  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import api from '@/api'
import { get } from 'lodash'
export default {
  name: 'Home',
  components: {
  },
  props: {
  },
  setup() {
    const queryParams = {
      current: 1,
      size: 10,
      orgIdList: []
    }

    const customerList = ref([])

    const store = useStore()

    const userInfo = store.state.userInfo

    // 组织信息
    const orgInfoList = userInfo?.orgInfoList
    const orgIdList = orgInfoList.map(item => item.orgId)

    const setQueryParams = ({ orgIdList, size, current }) => {
      if (size) {
        queryParams.size = size
      }
      if (current) {
        queryParams.current = current
      }
      if (orgIdList) {
        queryParams.orgIdList = orgIdList.join(',')
      }
    }
    setQueryParams({ orgIdList })
    // 获取数据
    const loadData = async() => {
      const res = await api.home.getCustomerList(queryParams)
      if (res.success) {
        console.log(res.data)
        const total = res.data.count // 总数
        if (customerList.value.length >= total) return
        const list = get(res, 'data.saleCustomerDetail.records', [])
        customerList.value = [...customerList.value, ...list]
      }
    }

    // 刷新数据
    const handleRefresh = async(cb) => {
      // 先清空数据
      customerList.value = []
      setQueryParams({
        current: 1,
        orgIdList
      })
      await loadData()
      cb()
    }

    const router = useRouter()
    // 前往搜索页
    const goSearch = () => {
      router.push({
        path: '/search'
      })
    }

    loadData()
    return {
      customerList,
      handleRefresh,
      goSearch
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
}
.pull-fresh-container {
  padding-top: 125px;
}
</style>
