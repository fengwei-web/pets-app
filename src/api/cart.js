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
