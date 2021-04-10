import request from '@/utils/request'

/**
 * 登录
 */
export const login = async (params) => {
  return request.post('/oauth/token', params, {
    'content-Type': 'application/x-www-form-urlencoded'
  })
} 

/**
 * 获取当前登录员工信息
 */
export const  getUserInfo = async () => {
  return request.get('/system/staff/loginStaffInfo')
}