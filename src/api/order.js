import request from '@/utils/request'

export const getOrderLists = data => {
  return request({
    method: 'POST',
    url: '/Shoporder/lists',
    data
  })
}

export const getConfirmReceiving = data => {
  return request({
    method: 'POST',
    url: '/Shoporder/confirm',
    data
  })
}
