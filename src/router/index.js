import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/order'
  },
  // 用户订单列表
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/order')
  },
  // 用户订单详情
  {
    path: '/order/detail',
    name: 'orderDetail',
    component: () => import('../views/order/detail')
  },
  // 申请退款
  {
    path: '/order/refund',
    name: 'applyForARefund',
    component: () => import('../views/order/applyForARefund')
  },
  // 查看物流
  {
    path: '/order/viewLog',
    name: 'viewLogistics',
    component: () => import('../views/order/viewLogistics')
  },
  // 商家订单列表
  {
    path: '/shopOrder',
    name: 'shopOrder',
    component: () => import('../views/shopOrder/')
  },
  // 商家订单列表
  {
    path: '/shopOrder/detail',
    name: 'shopOrderDetail',
    component: () => import('../views/shopOrder/detail')
  },
  // 优惠券列表
  {
    path: '/coupon',
    name: 'coupon',
    component: () => import('../views/coupon/')
  },
  // 购物车
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cart/')
  },
  // 钱包
  {
    path: '/wallet',
    name: 'wallet',
    component: () => import('../views/wallet/')
  },
  // 提现
  {
    path: '/wallet/takeOut',
    name: 'takeOut',
    component: () => import('../views/wallet/takeOut')
  },
  // 充值记录
  {
    path: '/wallet/rechargeRecord',
    name: 'rechargeRecord',
    component: () => import('../views/wallet/rechargeRecord')
  },
  // 提现明细
  {
    path: '/wallet/takeOutRecord',
    name: 'takeOutRecord',
    component: () => import('../views/wallet/takeOutRecord')
  },
  // 店铺提现（悬赏提现）
  {
    path: '/wallet/shopTakeOut',
    name: 'shopTakeOut',
    component: () => import('../views/wallet/shopTakeOut')
  }
]

export default new VueRouter({
  routes
})
