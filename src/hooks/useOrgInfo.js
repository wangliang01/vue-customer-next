import { useStore } from 'vuex'

export const useOrgInfo = () => {
  const store = useStore()
  const orgInfo = store.getters.orgInfo
  // 将全部也插入orgInfo中
  orgInfo.unshift({ orgId: '', orgName: '全部' })
  return {
    orgInfo
  }
}
