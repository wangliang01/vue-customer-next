import request from '@/utils/request'
export const getCustomer = async(params, header) => {
  return request.get('/sales/custmer/getCustomerById', params, header)
}
export const getAnalysis = async(params, header) => {
  return request.get('/sales/analytic/account/get', params, header)
}
export const searchList = async(params, header) => {
  return request.get('/sales/invoice/list', params, header)
}
export const getWarehouse = async(params, header) => {
  return request.get('/warehouse/warehouse_info/listPageToCustomer', params, header)
}
export const getQuotationNameList = async(params, header) => {
  return request.get('/sales/quotation/getQuotationNameList', params, header)
}
export const add = async(params, header) => {
  return request.post('/sales/custmer/customerInsert', params, header)
}
