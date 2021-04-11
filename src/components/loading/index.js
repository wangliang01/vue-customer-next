// import Loading from './Loading.vue'
import { Toast } from 'vant'
export const show = () => {
  // if (!instance) {
  //   instance = createApp(Loading)
  //   const parent = document.createElement('div')
  //   console.log('instance', instance)
  //   instance.mount(parent)
  // } else {
  //   return instance
  // }
  // 自定义加载图标
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 10000
  })
}

export const hide = () => {
  // if (instance) {
  //   instance.unmount()
  // }
  Toast.clear()
}
