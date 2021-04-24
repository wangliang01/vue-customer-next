import { ref } from 'vue'
import { useStore } from 'vuex'
export const usePicker = (show, ctx) => {
  const curOrg = ref({
    orgId: '',
    orgName: '全部'
  })
  const store = useStore()
  const handleConfirm = (selected, cb) => {
    curOrg.value = selected
    show.value = false
    if (typeof cb === 'function') {
      cb(selected)
    }
    store.commit('SET_CUR_ORG', selected)
    ctx.emit('select', selected)
  }
  const handleCancel = () => {
    show.value = false
  }
  return {
    curOrg,
    handleConfirm,
    handleCancel
  }
}
