import request from '@/utils/request'

export const getShopOrderLists = data => {
  return request({
    method: 'POST',
    url: '/Shopmanage/order_lists',
    data
  })
}

export const getShopOrderDetail = data => {
  return request({
    method: 'POST',
    url: '/Shopmanage/order_details',
    data
  })
}
