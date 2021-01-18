import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/order')
  },
  {
    path: '/order/detail',
    name: 'orderDetail',
    component: () => import('../views/order/detail')
  }
]

export default new VueRouter({
  routes
})
