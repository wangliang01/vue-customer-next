import { useStore } from 'vuex'

export const useOrgInfo = () => {
  const store = useStore()
  console.log(store.state.userInfo)
  const orgInfo = store.getters.orgInfo
  return {
    orgInfo
  }
}
