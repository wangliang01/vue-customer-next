import request from '@/utils/request'
import qs from 'qs'

/**
 * 登录
 */
export const login = async(params) => {
  const _params = qs.stringify(params)
  return request.post('/oauth/token', _params)
}

/**
 * 获取当前登录员工信息
 */
export const getUserInfo = async() => {
  return request.get('/system/staff/loginStaffInfo')
}
