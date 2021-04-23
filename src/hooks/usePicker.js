export const usePicker = (show) => {
  console.log('show', show)
  const handleConfirm = (selected) => {
    console.log('confirm', selected)
    show.value = false
  }
  const handleCancel = (selected) => {
    console.log('cancel', selected)
    show.value = false
  }
  return {
    handleConfirm,
    handleCancel
  }
}
