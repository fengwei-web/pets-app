import request from '@/utils/request'

export const getCouponList = data => {
  return request({
    method: 'POST',
    url: '/My/coupon',
    data
  })
}
