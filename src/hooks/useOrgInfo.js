import { useStore } from 'vuex'

export const useOrgInfo = () => {
  const store = useStore()
  const orgInfo = store.getters.orgInfo
  // 将全部也插入orgInfo中
  if (!orgInfo.find(item => item.orgName === '全部')) {
    orgInfo.unshift({ orgId: '', orgName: '全部' })
  }
  return {
    orgInfo
  }
}
