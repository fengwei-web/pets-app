import request from '@/utils/request'

// 个人信息
export const myDetail = data => {
  return request({
    method: 'POST',
    url: '/My/my_detail',
    data
  })
}
// 提现
export const withdrawDeposit = data => {
  return request({
    method: 'POST',
    url: '/My/withdraw_deposit',
    data
  })
}
// 提现明细
export const withdrawalRecord = data => {
  return request({
    method: 'POST',
    url: '/My/withdrawal_record',
    data
  })
}
