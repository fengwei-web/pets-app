import request from '@/utils/request'

export const getShoppingList = data => {
  return request({
    method: 'POST',
    url: '/My/shopping_list',
    data
  })
}

export const delShopping = data => {
  return request({
    method: 'POST',
    url: '/My/del_shopping',
    data
  })
}
// 视频详情
export const videoDetail = data => {
  return request({
    method: 'POST',
    url: '/Video/details',
    data
  })
}
// 用户协议 隐私政策
export const getPrivacy = data => {
  return request({
    method: 'POST',
    url: '/Notice/privacy',
    data
  })
}
