import { cloneDeep } from 'lodash'
import { useStore } from 'vuex'

export const useOrgInfo = () => {
  const store = useStore()
  const orgInfo = store.getters.orgInfo
  const originalOrgInfo = cloneDeep(orgInfo)
  // 将全部也插入orgInfo中
  if (!orgInfo.find(item => item.orgName === '全部')) {
    orgInfo.unshift({ orgId: '', orgName: '全部' })
  }
  return {
    orgInfo,
    originalOrgInfo
  }
}
