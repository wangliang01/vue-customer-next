import axios from 'axios'
import { toNumber, get as _get } from 'lodash'
import router from '@/router'
import { get, remove } from './local'
import { Toast } from 'vant'
import store from '@/store'
import {
  // SUCCESS,
  UN_AUTHORIZED,
  // LOGIN_SUCCESS,
  // LOGOUT_SUCCESS,
  CREDENTIALS_EXPIRED,
  UNAUTHORIZED_HEADER_IS_EMPTY,
  INVALID_TOKEN,
  FORBIDDEN,
  TOKEN_EXPIRED,
  TOKEN_PASS_OUT
} from './statusCode'
const show = () => {
  // 自定义加载图标
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 20000
  })
}
const hide = () => {
  Toast.clear()
}
let reqCount = 0
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/pron' : 'api',
  timeout: 10000,
  headers: {
    common: {
      'Content-Type': 'application/json',
      tenantId: 1
    }
  }
})
const errorHandler = (error) => {
  hide()
  reqCount = 0
  const status = toNumber(_get(error, 'response.status'))
  const msg = _get(error, 'response.data.msg')

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
      error.message = '未知异常'
      break
  }

  if (error.message) {
    Toast(error.message)
  }
  return Promise.reject(error.message)
}

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (!navigator.onLine) {
      store.commit('setLoadingStatus', 'NET_ERROR')
      return config
    }

    reqCount++
    // 显示loading
    show()
    const token = get('token')
    if (token) {
      // bearer 是前缀，后端要求加的
      config.headers['Authorization'] = `bearer ${token}`
    } else {
      config.headers['Authorization'] =
        'Basic ' + window.btoa('h5' + ':' + 'h5')
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
  reqCount--
  if (reqCount <= 0) {
    // 当某个接口异常后，reqCount赋值为0，其他接口正常响应后会变成负数
    // 当请求数量为0时，关闭loading
    hide()
  }
  return resolveResponse(response)
}, errorHandler)

/**
 *
 * @param {Number | String} code 状态码
 * @param {Object | Array} data 数据
 * @param {String} msg 返回消息
 * @description 解决response
 */
const resolveResponse = (response) => {
  const { data: { code, success, msg }} = response
  console.log(code, success, msg)
  return new Promise((resolve, reject) => {
    if (success) {
      resolve(response.data)
    } else {
      if (
        code === UN_AUTHORIZED ||
        code === CREDENTIALS_EXPIRED ||
        code === UNAUTHORIZED_HEADER_IS_EMPTY ||
        code === INVALID_TOKEN ||
        code === FORBIDDEN ||
        code === TOKEN_EXPIRED ||
        code === TOKEN_PASS_OUT
      ) {
        // Toast(msg || '请求未授权')
        remove('token')
        router.replace('/login')
      } else {
        // Toast(msg)
        reject(msg)
      }
    }
  })
}

export default {
  get: function(url, data, header) {
    return instance.get(url, { params: data }, header)
  },
  post: function(url, data, header) {
    return instance.post(url, data, header)
  },
  put: function(url, data, header) {
    return instance.put(url, data, header)
  },
  delete: function(url, data, header) {
    return instance.delete(url, { params: data }, header)
  }
}

const serviceName =
  process.env.NODE_ENV === 'production' ? 'yyx-mall' : 'yyx-mall' // 后端配置的服务名
export { serviceName }
