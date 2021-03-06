import request from '@/utils/request'

export const getCouponList = data => {
  return request({
    method: 'POST',
    url: '/My/coupon',
    data
  })
}

export const receiveCouponList = data => {
  return request({
    method: 'POST',
    url: '/My/get_coupon',
    data
  })
}
