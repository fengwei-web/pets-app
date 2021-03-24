import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/privacy'
  },
  // 隐私政策
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/privacy')
  },
  // 视频
  {
    path: '/video',
    name: 'video',
    component: () => import('../views/video')
  },
  // 分享
  {
    path: '/share',
    name: 'share',
    component: () => import('../views/share')
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
  // 提交订单
  {
    path: '/order/submit',
    name: 'submitOrder',
    component: () => import('../views/order/submitOrder')
  },
  // 订单支付
  {
    path: '/order/payment',
    name: 'orderPayment',
    component: () => import('../views/order/orderPayment')
  },
  // 支付结果
  {
    path: '/order/result',
    name: 'orderResult',
    component: () => import('../views/order/orderResult')
  },
  // 商家订单列表
  {
    path: '/shopOrder',
    name: 'shopOrder',
    component: () => import('../views/shopOrder/')
  },
  // 商家订单详情
  {
    path: '/shopOrder/detail',
    name: 'shopOrderDetail',
    component: () => import('../views/shopOrder/detail')
  },
  // 商家发货
  {
    path: '/shopOrder/deliverGoods',
    name: 'deliverGoods',
    component: () => import('../views/shopOrder/deliverGoods')
  },
  // 商家售后
  {
    path: '/shopOrder/afterSales',
    name: 'afterSales',
    component: () => import('../views/shopOrder/afterSales')
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
