<template>
  <div class="shopOrder flex flex--row">
    <div class="shopOrder_search">
      <van-search
        v-model="massage"
        placeholder="请输入搜索关键词"
        @input="input"
      />
    </div>

    <div class="shopOrder_box" @scroll="listScroll">
      <div
        class="shopOrder_box_list"
        v-for="(item, index) in shopOrderLists"
        :key="index"
      >
        <div class="shopOrder_box_list_head flex flex--align-items--center flex--justify-content--space-between">
          <p>订单号：{{ item.order_sn }}</p>
          <span>{{ item.status | status }}</span>
        </div>
        <div class="shopOrder_box_list_center">
          <div
            class="shopOrder_box_list_center_term flex flex--align-items--center"
            v-for="(msg, key) in item.order_pet"
            :key="key"
          >
            <van-image :src="msg.pet_cover"></van-image>
            <div class="shopOrder_box_list_center_term_con flex flex--row">
              <h3>{{ msg.pet_name }}</h3>
              <p>
                {{ msg.pet_age }}
                <span>{{ msg.pet_sex }}</span>
              </p>
              <div>¥{{ msg.pet_price }}</div>
            </div>
          </div>
          <div class="shopOrder_box_list_center_box flex flex--justify-content--end">
            实付款：¥{{item.true_price}}
          </div>
        </div>
        <div class="shopOrder_box_list_foot flex flex--justify-content--end">
          <div
            class="shopOrder_box_list_foot_term"
            @click="goDetails(item.order_sn)"
          >查看</div>
          <div
            class="shopOrder_box_list_foot_term"
            v-if="item.status == 1"
            @click="deliverGoods(item.order_sn)"
          >发货</div>
          <div
            class="shopOrder_box_list_foot_term"
            v-if="item.status == 2"
            @click="logistics(item.order_sn)"
          >物流</div>
          <div
            class="shopOrder_box_list_foot_term"
            v-if="item.status == 6"
            @click="refund(item.order_sn)"
          >同意退款</div>
          <div
            class="shopOrder_box_list_foot_term"
            v-if="item.status == 10"
            @click="afterSales(item.order_sn)"
          >售后</div>
        </div>
      </div>
     </div>
  </div>
</template>

<script>
import { getShopOrderLists, getOrderRefund } from '@/api/shopOrder'
import { debounce } from 'lodash'
export default {
  name: 'orderSearch',
  data () {
    return {
      massage: '',
      page: 1,
      limit: 10,
      token: '',
      shopOrderLists: ''
    }
  },
  created () {
    this.token = this.$route.query.token
    this.getShopOrderList()
  },
  filters: {
    status (val) {
      let str = ''
      switch (val) {
        case 0:
          str = '待付款'
          break
        case 1:
          str = '待发货'
          break
        case 2:
          str = '待收货'
          break
        case 3:
          str = '已完成'
          break
        case 5:
          str = '已取消'
          break
        case 6:
          str = '申请退款'
          break
        case 7:
          str = '同意退款'
          break
        case 8:
          str = '完成退款'
          break
        case 9:
          str = '商家拒绝退款'
          break
        case 10:
          str = '申请售后'
          break
        case 11:
          str = '售后同意退款'
          break
        case 12:
          str = '售后完成退款'
          break
        case 13:
          str = '商家拒绝售后退款'
          break
      }
      return str
    }
  },
  methods: {
    // 获取列表数据
    async getShopOrderList () {
      const { data } = await getShopOrderLists({
        token: this.token,
        keywords: this.massage,
        page: this.page,
        limit: this.limit
      })
      this.shopOrderLists = data.response_data
    },
    // 查看 进入详情
    goDetails (orderSn) {
      const sn = navigator.userAgent.toLowerCase()
      if (sn.indexOf('android') !== -1) {
        window.androidJs.goShopOrderInfo(orderSn)
      } else if (sn.indexOf('iphone') !== -1) {
        window.webkit.messageHandlers.goShopOrderInfo.postMessage(orderSn)
      }
    },
    // 监听到底事件
    listScroll ($event) {
      if ((parseInt($event.target.clientHeight) + parseInt($event.target.scrollTop)) === parseInt($event.target.scrollHeight)) {
        if (this.shopOrderLists.length % this.limit === 0) {
          this.page++
          this.getShopOrderList()
        } else {
          this.$toast('暂无更多数据')
        }
      }
    },
    // 搜索
    input: debounce(function () {
      this.getShopOrderList()
    }, 200),
    // 发货
    deliverGoods (orderSn) {
      const sn = navigator.userAgent.toLowerCase()
      if (sn.indexOf('android') !== -1) {
        window.androidJs.toFaHuo(orderSn)
      } else if (sn.indexOf('iphone') !== -1) {
        window.webkit.messageHandlers.toFaHuo.postMessage(orderSn)
      }
    },
    // 物流
    logistics (orderSn) {
      const sn = navigator.userAgent.toLowerCase()
      if (sn.indexOf('android') !== -1) {
        window.androidJs.goWuLiu(orderSn)
      } else if (sn.indexOf('iphone') !== -1) {
        window.webkit.messageHandlers.goWuLiu.postMessage(orderSn)
      }
    },
    // 退款
    async refund (orderSn) {
      await getOrderRefund({
        token: this.token,
        order_sn: orderSn,
        type: 1
      })
      this.$toast('提交审核成功！')
    },
    // 售后
    afterSales (orderSn) {
      const sn = navigator.userAgent.toLowerCase()
      if (sn.indexOf('android') !== -1) {
        window.androidJs.goShouHou(orderSn)
      } else if (sn.indexOf('iphone') !== -1) {
        window.webkit.messageHandlers.goShouHou.postMessage(orderSn)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.shopOrder{
  height: 100%;
  .shopOrder_search{
    height: 67px;
    background: #fff;
    .van-search{
      height: 100%;
    }
  }
}

.shopOrder_box{
  flex: 1;
  overflow-y: auto;
  .shopOrder_box_list{
    background: #fff;
    border-radius: 11px;
    padding: 0 15px;
    margin-top: 10px;
    .shopOrder_box_list_head{
      padding: 17px 0 2px 0;
      p{
        font-size: 14px;
        color: #333333;
      }
      span{
        font-size: 13px;
        color: #949CDF;
      }
    }
    .shopOrder_box_list_center{
      padding-bottom: 20px;
      border-bottom: 2px solid #DEDEDE;
      .shopOrder_box_list_center_term{
        height: 90px;
        margin-top: 22px;
        .van-image{
          width: 90px;
          height: 100%;
        }
        .shopOrder_box_list_center_term_con{
          flex: 1;
          height: 90px;
          padding-left: 16px;
          h3{
            font-size: 14px;
            width: 100%;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          p{
            font-size: 12px;
            color: #AAAEB7;
            flex: 1;
            padding-top: 8px;
            span{
              margin-left: 14px;
            }
          }
          div{
            font-size: 20px;
            font-weight: bold;
            color: #E41F35;
          }
        }
      }
      .shopOrder_box_list_center_box{
        font-size: 14px;
        color: #333;
        margin-top: 20px;
      }
    }
    .shopOrder_box_list_foot{
      padding: 15px 0;
      .shopOrder_box_list_foot_term{
        border: 1px solid #949cdf;
        border-radius: 5px;
        padding: 7px 19px;
        font-size: 13px;
        color: #A1A8E2;
        margin-left: 10px;
      }
    }
  }
}
</style>
