/**
 * 封装对本地存储的操作
 */

const serviceName = 'shopping_mall_'

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
