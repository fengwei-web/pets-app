import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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
  // 优惠券列表
  {
    path: '/coupon',
    name: 'coupon',
    component: () => import('../views/coupon/')
  }
]

export default new VueRouter({
  routes
})
