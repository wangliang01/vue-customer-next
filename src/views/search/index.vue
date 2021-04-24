<template>
  <div class="search">
    <y-pull-refresh class="pull-fresh-container" @refresh="handleRefresh">
      <!-- 搜索 -->
      <y-search focus @search="handleSearch"></y-search>
      <!-- 客户列表 -->
      <y-empty v-if="showEmpty"></y-empty>
      <van-list
        v-else
        v-model:loading="state.loading"
        :finished="state.finished"
        :immediate-check="false"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        loading-text="加载中"
        offset="0"
        @load="handdleLoad"
      >
        <y-customer-item v-for="(item, index) in customerList" :key="index" :customer="item"></y-customer-item>
        <template #loading>
          <van-loading type="spinner" size="20px">加载中</van-loading>
        </template>
      </van-list>
    </y-pull-refresh>

  </div>
</template>

<script>
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
      customer: '',
      orgIdList: []
    }

    const state = ref({
      loading: false,
      finished: false,
      error: false
    })

    const showEmpty = ref(false) // 是否展示空组件

    const curOrgId = ref('') // 全部

    const customerList = ref([])

    const store = useStore()

    const userInfo = store.state.userInfo

    // 组织信息
    const orgInfoList = userInfo?.orgInfoList
    const orgIdList = orgInfoList.map(item => item.orgId)

    const setQueryParams = ({ customer, size, current, orgIdList }) => {
      if (size) {
        queryParams.size = size
      }
      if (current) {
        queryParams.current = current
      }
      if (customer) {
        queryParams.customer = customer
      }
      if (orgIdList) {
        queryParams.orgIdList = orgIdList
      }
    }

    const handleSearch = async(content) => {
      customerList.value = []
      const curOrg = store.state.curOrg
      if (curOrg) {
        setQueryParams({ customer: content, orgIdList: [curOrg], current: 1 })
      } else {
        setQueryParams({ customer: content, orgIdList: orgIdList.join(','), current: 1 })
      }
      await loadData()
    }

    // 获取数据
    const loadData = async() => {
      try {
        showEmpty.value = false
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

          // 如果total等于0，则显示空组件
          if (total === 0) {
            showEmpty.value = true
          }
        }
      } catch (error) {
        state.value.error = true
        showEmpty.value = true
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
      cb && cb()
    }

    // 重新请求数据
    const handleReload = (selectOrg) => {
      if (!selectOrg) return
      curOrgId.value = selectOrg.orgId
      handleRefresh()
    }

    const handdleLoad = () => {
      // 优化加载效果，作一延迟，展示加载中的字样，提高用户体验
      setTimeout(() => {
        loadData()
      }, 300)
    }

    return {
      customerList,
      handleRefresh,
      handleReload,
      state,
      loadData,
      handdleLoad,
      showEmpty,
      handleSearch
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  min-height: 100vh;
  overflow-y: auto;
}
.pull-fresh-container {
  padding-top: 125px;
  padding-bottom: 60px;

}
</style>
