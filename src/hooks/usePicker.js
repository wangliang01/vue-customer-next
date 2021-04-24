import { ref } from 'vue'
export const usePicker = (show, ctx) => {
  const curOrg = ref({
    orgId: '',
    orgName: '全部'
  })
  const handleConfirm = (selected, cb) => {
    curOrg.value = selected
    show.value = false
    if (typeof cb === 'function') {
      cb(selected)
    }
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
