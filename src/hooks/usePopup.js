import { ref } from 'vue'
export const usePopup = () => {
  const show = ref(false)
  const handleShow = () => {
    show.value = true
  }
  const handleClose = () => {
    show.value = false
  }
  return {
    show,
    handleShow,
    handleClose
  }
}
