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

export const getReason = data => {
  return request({
    method: 'POST',
    url: '/Shoporder/get_reason',
    data
  })
}

export const getUpdateStatus = data => {
  return request({
    method: 'POST',
    url: '/Shoporder/update_status',
    data
  })
}

export const getDetail = data => {
  return request({
    method: 'POST',
    url: '/Shoporder/details',
    data
  })
}
