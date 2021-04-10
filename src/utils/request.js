import axios from 'axios'
import { toNumber, get as Get } from 'lodash'
import router from '@/router'
import { get, remove } from './local'
import { Toast } from 'vant'
import store from '@/store'
import {
  SUCCESS,
  UN_AUTHORIZED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  CREDENTIALS_EXPIRED,
  UNAUTHORIZED_HEADER_IS_EMPTY,
  INVALID_TOKEN,
  FORBIDDEN,
  TOKEN_EXPIRED,
  TOKEN_PASS_OUT
} from './statusCode'
import { show, hide } from '@/components/loading'
let reqCount = 0
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/pron' : 'api',
  timeout: 5000,
  headers: {
    common: {
      'Content-Type': 'application/json',
      tenantId: 1
      // appId: 'yyx-mall',
      // appSecret: 'yyx-mall'
    }
  }
})
const errorHandler = (error) => {
  hide()
  reqCount = 0
  const status = toNumber(Get(error, 'response.status'))
  const msg = Get(error, 'response.data.msg')
  if (status === 401) {
    remove('token')
  }
  switch (status) {
    case 400:
      error.message = msg || '请求错误'
      break
    case 401:
      error.message = msg || '未授权，请登录'
      break
    case 403:
      error.message = msg || '拒绝访问'
      break
    case 404:
      error.message = msg || `请求地址出错:${error.response.config.url}`
      break
    case 408:
      error.message = msg || '请求超时'
      break
    case 500:
      error.message = msg || '服务器内部错误'
      break
    case 501:
      error.message = msg || '服务未实现'
      break
    case 502:
      error.message = msg || '网关错误'
      break
    case 503:
      error.message = msg || '服务不可用'
      break
    case 504:
      error.message = msg || '网关超时'
      break
    case 505:
      error.message = msg || 'HTTP版本不受支持'
      break
    default:
      break
  }
  if (error.message) {
    Toast.fail(error.message)
  }
  return Promise.reject(error)
}
const pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken = axios.CancelToken
const removePending = config => {
  for (const p in pending) {
    if (
      pending[p].u ===
      config.url +
        '&' +
        config.method +
        '&' +
        JSON.stringify(config.data) +
        '&' +
        JSON.stringify(config.params)
    ) {
      // 当当前请求在数组中存在时执行函数体
      pending[p].f() // 执行取消操作
      pending.splice(p, 1) // 把这条记录从数组中移除
    }
  }
}
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (!navigator.onLine) {
      store.commit('setLoadingStatus', 'NET_ERROR')
      return config
    }
    removePending(config) // 在一个ajax发送前执行一下取消操作
    config.cancelToken = new CancelToken(c => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({
        u:
          config.url +
          '&' +
          config.method +
          '&' +
          JSON.stringify(config.data) +
          '&' +
          JSON.stringify(config.params),
        f: c
      })
    })
    reqCount++
    // 显示loading
    show()
    const token = get('token')
    if (token) {
      // bearer 是前缀，后端要求加的
      config.headers['Authorization'] = `bearer ${token}`
    } else {
      config.headers['Authorization'] =
        'Basic ' + window.btoa('yyx-mall' + ':' + 'yyx-mall')
    }
    // 加入orgId
    const userInfo = store.getters.userInfo
    const orgId = Get(userInfo, 'orgId')
    if (orgId) {
      config.headers.orgId = orgId
    }
    return config
  },
  (err) => {
    hide()
    reqCount = 0
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use((response) => {
  const {
    data: { code, data, msg }
  } = response
  removePending(response.config)
  reqCount--
  if (reqCount <= 0) {
    // 当某个接口异常后，reqCount赋值为0，其他接口正常响应后会变成负数
    // 当请求数量为0时，关闭loading
    hide()
  }
  return resolveResponse(code, data, msg)
}, errorHandler)

// const ToastNetError = () => {
//   return Toast('网络异常，请稍候再试！')
// }

/**
 *
 * @param {Number | String} code 状态码
 * @param {Object | Array} data 数据
 * @param {String} msg 返回消息
 * @description 解决response
 */
const resolveResponse = (code, data, msg) => {
  return new Promise((resolve, reject) => {
    if (
      toNumber(code) === SUCCESS ||
      code === LOGIN_SUCCESS ||
      code === LOGOUT_SUCCESS
    ) {
      resolve(data)
    } else if (
      code === UN_AUTHORIZED ||
      code === CREDENTIALS_EXPIRED ||
      code === UNAUTHORIZED_HEADER_IS_EMPTY ||
      code === INVALID_TOKEN ||
      code === FORBIDDEN ||
      code === TOKEN_EXPIRED ||
      code === TOKEN_PASS_OUT
    ) {
      Toast(msg || '请求未授权')
      remove('token')
      if (get('TENANT') === 'SHENG_YI_YUAN') {
        router.replace('/provincial_hospital/login')
      } else {
        router.replace('/login')
      }
    } else {
      Toast(msg)
      reject(msg)
    }
  })
}

export default instance

const serviceName =
  process.env.NODE_ENV === 'production' ? 'yyx-mall' : 'yyx-mall' // 后端配置的服务名
export { serviceName }
