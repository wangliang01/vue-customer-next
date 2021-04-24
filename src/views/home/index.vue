<template>
  <div class="home">
    <y-pull-refresh class="pull-fresh-container" @refresh="handleRefresh">
      <!-- 搜索 -->
      <y-search @click="goSearch"></y-search>
      <!-- 组织 -->
      <y-select-org @select="handleReload"></y-select-org>
      <!-- 客户列表 -->

      <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="loadData"
      >
        <y-customer-item v-for="(item, index) in customerList" :key="index" :customer="item"></y-customer-item>
      </van-list>
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

    const state = ref({
      loading: false,
      finished: false,
      refreshing: false
    })

    const curOrgId = ref('') // 全部

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

    // 获取数据
    const loadData = async() => {
      const res = await api.home.getCustomerList(queryParams)
      if (res.success) {
        const total = res.data.count // 总数
        const list = get(res, 'data.saleCustomerDetail.records', [])
        customerList.value = [...customerList.value, ...list]
        // 加载状态结束
        state.value.loading = false

        // 数据全部加载完成
        if (customerList.value.length >= total) {
          state.value.finished = true
        }
      }
    }

    // 刷新数据
    const handleRefresh = async(cb) => {
      // 先清空数据
      customerList.value = []
      setQueryParams({
        current: 1,
        orgIdList: curOrgId.value ? [curOrgId.value] : orgIdList // orgId为空，表示选择全部
      })
      await loadData()
      cb()
    }

    // 重新请求数据
    const handleReload = (selectOrg) => {
      if (!selectOrg) return
      curOrgId.value = selectOrg.orgId
      handleRefresh()
    }

    const router = useRouter()
    // 前往搜索页
    const goSearch = () => {
      router.push({
        path: '/search'
      })
    }

    setQueryParams({ orgIdList })
    loadData()

    return {
      customerList,
      handleRefresh,
      goSearch,
      handleReload,
      state,
      loadData
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  overflow-y: auto;
}
.pull-fresh-container {
  padding-top: 125px;
  padding-bottom: 60px;

}
</style>
