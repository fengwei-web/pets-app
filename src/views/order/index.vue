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

    <div class="order_list">
      <div v-if="tabIndex == 0">
        <orderList></orderList>
      </div>

      <!-- <div v-if="tabIndex == 1">
        <orderList></orderList>
      </div>
      <div v-if="tabIndex == 2">
        <orderList></orderList>
      </div>
      <div v-if="tabIndex == 3">
        <orderList></orderList>
      </div>
      <div v-if="tabIndex == 4">
        <orderList></orderList>
      </div> -->
    </div>
  </div>
</template>

<script>
import orderList from '@/components/orderList.vue'
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
          title: '待评价 '
        }
      ],
      tabIndex: 0 // 当前tab下标
    }
  },
  created () {},
  methods: {
    // 点击切换tab
    setTab (index) {
      this.tabIndex = index
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
    }
  }
</style>
