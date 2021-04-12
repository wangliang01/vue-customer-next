/**
 * 封装对本地存储的操作
 */
import packageJson from '../../package.json'

const serviceName = (packageJson.name || 'vue-customer-next') + '_'

export const get = key => {
  return JSON.parse(localStorage.getItem(serviceName + key))
}

export const set = (key, value) => {
  localStorage.setItem(serviceName + key, JSON.stringify(value))
}

export const remove = key => {
  localStorage.removeItem(serviceName + key)
}

export const clear = () => {
  Object.keys(localStorage).forEach(key => {
    if (key.includes(serviceName)) {
      localStorage.removeItem(key)
    }
  })
}

export default {
  get,
  set,
  remove,
  clear
}
