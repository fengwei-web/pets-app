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

// 提交订单第一步：返回订单的信息详情
export const getWriteOrder = data => {
  return request({
    method: 'POST',
    url: '/Shop/write_order_unify',
    data
  })
}

// 提交订单第二步：提交生成订单
export const getCommitOrder = data => {
  return request({
    method: 'POST',
    url: '/Shop/commit_order_unify',
    data
  })
}

// 文件上传
export const getHome = data => {
  return request({
    method: 'POST',
    url: '/Home/upload_file',
    data
  })
}

// 文件上传
export const getExpres = data => {
  return request({
    method: 'POST',
    url: '/Shoporder/get_express',
    data
  })
}
