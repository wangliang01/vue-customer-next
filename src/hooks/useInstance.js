import { getCurrentInstance } from 'vue'
export const useInstance = () => {
  const current = getCurrentInstance()
  console.log('appContext', current.appContext)
  setTimeout(() => {
    console.log('reload')
    current.appContext.reload()
  }, 2000)
  const self = getCurrentInstance().appContext.config.globalProperties
  return {
    self
  }
}
