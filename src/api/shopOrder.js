import request from '@/utils/request'
// 商家订单列表
export const getShopOrderLists = data => {
  return request({
    method: 'POST',
    url: '/Shopmanage/order_lists',
    data
  })
}
// 商家详情
export const getShopOrderDetail = data => {
  return request({
    method: 'POST',
    url: '/Shopmanage/order_details',
    data
  })
}
// 快递公司
export const getExpressList = data => {
  return request({
    method: 'POST',
    url: '/Shoporder/express_list',
    data
  })
}
// 发货
export const getOrderSend = data => {
  return request({
    method: 'POST',
    url: '/Shopmanage/order_send',
    data
  })
}
// 售后
export const getOrderAftersale = data => {
  return request({
    method: 'POST',
    url: '/Shopmanage/order_aftersale',
    data
  })
}
// 退款
export const getOrderRefund = data => {
  return request({
    method: 'POST',
    url: '/Shopmanage/order_refund',
    data
  })
}
