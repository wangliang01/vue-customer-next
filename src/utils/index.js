import { divide } from 'lodash'
import { Toast } from 'vant'
import router from '../router'
/**
 *
 * @param {String} title
 * @description 设置页面标题
 */
export const setTitle = title => {
  document.title = title
}

/**
 *
 * @param {String} str 传入的字符串
 * @param {String} separator 分割符
 * @description 将字符串分割成数组
 */
export const toArray = (str, separator = ',') => {
  if (typeof str !== 'string') {
    throw new Error('参数传入不正确，请传入字符串类型的数据')
  }
  return str.split(separator)
}

/**
 *
 * @param {Number | String} originPrice 原始价格
 * @description 转换价格 将分转换为元
 */
export const transferPrice = originPrice => {
  // DONE
  return divide(originPrice, 100)?.toFixed(2)
}

/**
 *
 * @param {Boolean} boolean
 * @description 将布尔类型的值转换为数值类型的字符串
 */
export const transferBooleanToNumString = boolean => {
  if (typeof boolean !== 'boolean') {
    throw new Error('参数传入不正确，请传入布尔类型的数据')
  }
  return boolean ? 'ENABLE' : 'DISABLE'
}

/**
 *
 * @param {String} str
 * @description 将数值类型的字符串转换为布尔值类型
 */
export const transferNumStringToBoolean = str => {
  switch (str) {
    case 'ENABLE':
      return true
    case 'DISABLE':
      return false
    default:
      throw new Error('参数传入不正确，请传入字符串类型的数据')
  }
}

/**
 * 获取缩略图
 * @param {String} imgUrl // 原图地址
 * @param {String} mode 模式：lfit， fixed, fill, pad
 * @param {String|Number} width 缩放图宽度
 * @param {String|Number} height 缩放图高度
 */
export const getThumb = (imgUrl, mode = 'fill', width = 100, height = 100) => {
  if (imgUrl && imgUrl.includes('http')) {
    return `${imgUrl}?x-oss-process=image/resize,m_${mode},h_${height},w_${width}`
  }
}
/**
 *
 * @param {*} number 传入的值
 * @param {*} places 保留的小位数
 * @param {*} symbol 前面表示的标志是￥
 * @param {*} thousand 每几位用,隔开,是货币标识
 * @param {*} decimal 小数点
 */
export function formatPrice(number, places, symbol, thousand, decimal) {
  number = number || 0
  // 保留的小位数 可以写成 formatMoney(542986,3) 后面的是保留的小位数，否则默 认保留两位
  places = !isNaN((places = Math.abs(places))) ? places : 2
  // symbol表示前面表示的标志是￥ 可以写成 formatMoney(542986,2,"$")
  symbol = symbol !== undefined ? symbol : '¥'
  // thousand表示每几位用,隔开,是货币标识
  thousand = thousand || ','
  // decimal表示小数点
  decimal = decimal || '.'
  // negative表示如果钱是负数有就显示“-”如果不是负数 就不显示负号
  // i表示处理过的纯数字
  var negative = number < 0 ? '-' : ''
  var i = parseInt((number = Math.abs(+number || 0)?.toFixed(places)), 10) + ''
  var j = (j = i.length) > 3 ? j % 3 : 0
  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
    (places
      ? decimal +
      Math.abs(number - i)
        ?.toFixed(places)
        .slice(2)
      : '')
  )
}
export function payHandle(url, isReplace) {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i)?.toString() === 'micromessenger' || ua.match(/_SQ_/i)?.toString() === '_sq_') {
    if (isReplace) {
      window.location.replace(url)
    } else {
      window.location.href = url
    }
  } else {
    setTimeout(() => {
      router.push({
        name: 'Order'
      })
    }, 1000)
    Toast.fail('无法调用微信支付，请前往微信浏览器中重新支付')
  }
}

export function getComponentName(name, prefix = 'y') {
  if (!name) return
  return `${prefix}${name.replace(/[A-Z]/g, val => {
    return `-${val.toLowerCase()}`
  })}`
}
