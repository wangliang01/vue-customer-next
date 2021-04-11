import request from '@/utils/request'

export const getCustomerList = async(params) => {
  return request.get('/sales/custmer/userList', params, { hideLoading: true })
}
