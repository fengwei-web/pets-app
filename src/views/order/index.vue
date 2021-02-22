<template>
  <!-- 我的订单页面 -->
  <div class="order flex flex--row">
    <!-- tab切换 -->
    <div class="order_tab flex flex--align-items--center">
      <div
        class="order_tab_list"
        :class="{order_tab_list_active: index == tabIndex}"
        v-for="(tab,index) in tabList"
        :key="index"
        @click="setTab(index)"
      >
        {{ tab.title }}
      </div>
    </div>

    <div class="order_list" @scroll="listScroll($event)">
      <div v-for="(item, index) in orderList" :key="index">
        <orderList
          v-for="msg in item"
          :key="msg.id"
          :items="msg"
          :token="token"
          @confirmReceiving = "confirmReceiving"
        ></orderList>
      </div>
      <div
        class="order_nothing flex flex--align-items--center flex--justify-content--center"
        v-if="orderList.length == 0">
        暂无数据
      </div>
    </div>
  </div>
</template>

<script>
import orderList from '@/components/orderList.vue'
import { getOrderLists } from '@/api/order'
export default {
  name: 'Order',
  components: {
    orderList
  },
  data () {
    return {
      tabList: [
        {
          title: '全部'
        },
        {
          title: '待支付'
        },
        {
          title: '待发货'
        },
        {
          title: '待收货'
        },
        {
          title: '已完成'
        }
      ],
      tabIndex: 0, // 当前tab下标
      status: null,
      page: 1,
      limit: 10,
      orderList: [],
      token: ''
    }
  },
  created () {
    this.token = this.$route.query.token
    // 获取订单列表数据
    this.getOrderList()
  },
  methods: {
    // 点击切换tab
    setTab (index) {
      this.tabIndex = index
      switch (index) {
        case 0:
          this.status = null
          break
        case 1:
          this.status = 0
          break
        case 2:
          this.status = 1
          break
        case 3:
          this.status = 2
          break
        case 4:
          this.status = 3
          break
      }
      this.orderList = []
      this.page = 1
      this.getOrderList()
    },
    // 获取列表数据
    async getOrderList () {
      const { data } = await getOrderLists({
        token: this.token,
        status: this.status,
        page: this.page,
        limit: this.limit
      })
      const responseData = data.response_data
      this.orderList.push(...responseData)
    },
    // 监听到底事件
    listScroll ($event) {
      if ((parseInt($event.target.clientHeight) + parseInt($event.target.scrollTop)) === parseInt($event.target.scrollHeight)) {
        if (this.orderList.length % this.limit === 0) {
          this.page++
          this.getOrderList()
        } else {
          this.$toast('暂无更多数据')
        }
      }
    },
    // 刷新页面
    confirmReceiving () {
      this.orderList = []
      this.getOrderList()
    }
  }
}
</script>

<style lang="less" scoped>
  .order{
    height: 100%;
    .order_tab{
      width: 100%;
      height: 55px;
      background: #fff;
      border-bottom: 1px solid #eee;
      justify-content: space-around;
      .order_tab_list{
        height: 100%;
        line-height: 55px;
        font-size: 14px;
        color: #9B9B9B;
        &.order_tab_list_active{
          color: #333;
          position: relative;
          &::after{
            content: "";
            width: 14px;
            height: 3px;
            background: #FF6F44;
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -7px;
          }
        }
      }
    }
    .order_list{
      flex: 1;
      overflow-y: auto;
      .order_nothing{
        height: 300px;
        font-size: 16px;
        color: #333;
      }
    }
  }
</style>
