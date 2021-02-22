<template>
  <div>
    <div class="order_list" v-if="items.status == 0">
      <div
        class="order_list_head flex flex--align-items--center flex--justify-content--space-between"
      >
        <div class="order_list_head_left flex flex--align-items--center">
          <van-image :src="items.shop_logo" />
          <p>{{ items.shop_name }}</p>
        </div>
        <span>{{ items.status | status }}</span>
      </div>

      <div class="order_list_box" @click="goDetail(items.p_order_sn)">
        <div
          class="order_list_box_term flex flex--align-items--center"
          v-for="(item, index) in items.order_pet"
          :key="index"
        >
          <div class="order_list_box_term_pic">
            <van-image :src="item.pet_cover" />
          </div>
          <div class="order_list_box_term_rig">
            <h3>{{ item.pet_name }}</h3>
            <div class="order_list_box_term_rig_info flex flex--align-items--center">
              {{ item.pet_age }}<span>{{ item.pet_sex }}</span>
            </div>
            <div class="order_list_box_term_rig_price flex flex--justify-content--space-between">
              ¥{{ item.pet_price }}
            </div>
          </div>
        </div>
        <div class="order_list_box_actual_payment flex flex--justify-content--end">实付款：￥{{ items.p_true_price }}</div>
      </div>
      <div
        class="order_list_foot flex flex--align-items--center flex--justify-content--end"
        v-if="type == 'order'"
      >
        <div class="order_list_foot_term" @click="goRefund(1, items.p_order_sn)">取消订单</div>
        <div class="order_list_foot_term" @click="toZhiFu(items.p_order_sn, items.p_true_price)">去付款</div>
      </div>
      <div
        class="order_list_foot flex flex--align-items--center flex--justify-content--end"
        v-else
      >
        <div class="shopOrder_list_foot_term">查看</div>
        <div class="shopOrder_list_foot_term">发货</div>
        <div class="shopOrder_list_foot_term">退款</div>
      </div>
    </div>
    <div class="order_list" v-else>
      <div
        class="order_list_head flex flex--align-items--center flex--justify-content--space-between"
      >
        <div class="order_list_head_left flex flex--align-items--center">
          <van-image :src="items.shop_logo" />
          <p>{{ items.shop_name }}</p>
        </div>
        <span>{{ items.status | status }}</span>
      </div>

      <div class="order_list_box"  @click="goDetail(items.order_sn)">
        <div
          class="order_list_box_term flex flex--align-items--center"
          v-for="(item, index) in items.order_pet"
          :key="index"
        >
          <div class="order_list_box_term_pic">
            <van-image :src="item.pet_cover" />
          </div>
          <div class="order_list_box_term_rig">
            <h3>{{ item.pet_name }}</h3>
            <div class="order_list_box_term_rig_info flex flex--align-items--center">
              {{ item.pet_age }}<span>{{ item.pet_sex }}</span>
            </div>
            <div class="order_list_box_term_rig_price flex flex--justify-content--space-between">
              ¥{{ item.pet_price }}
            </div>
          </div>
        </div>
        <div class="order_list_box_actual_payment flex flex--justify-content--end">实付款：￥{{ items.true_price }}</div>
      </div>
      <div
        class="order_list_foot flex flex--align-items--center flex--justify-content--end"
        v-if="type == 'order'"
      >
        <div
          class="order_list_foot_term"
          v-if="items.status == 2"
          @click="seeLogistics(items.order_sn)"
        >查看物流</div>
        <div
          class="order_list_foot_term"
          v-if="items.status == 2"
          @click="goRefund(3, items.order_sn)"
        >申请售后</div>
        <div
          class="order_list_foot_term"
          v-if="items.status == 2"
          @click="confirmReceiving(items.order_sn)"
        >确认收货</div>
      </div>
      <div
        class="order_list_foot flex flex--align-items--center flex--justify-content--end"
        v-else
      >
        <div class="shopOrder_list_foot_term">查看</div>
        <div class="shopOrder_list_foot_term">发货</div>
        <div class="shopOrder_list_foot_term">退款</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getConfirmReceiving } from '@/api/order'
export default {
  name: 'OrderList',
  props: {
    type: {
      type: String,
      default: 'order'
    },
    items: {
      type: Object,
      default: null
    },
    token: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
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
    // 确认收货
    async confirmReceiving (orderSn) {
      const { data } = await getConfirmReceiving({
        token: this.token,
        order_sn: orderSn
      })
      if (data.status === 1) {
        this.$toast(data.msg)
        this.$emit('confirmReceiving')
      } else {
        this.$toast(data.error_msg)
      }
    },
    // 取消订单/订单退款/订单售后
    goRefund (type, orderSn) {
      this.$router.push({
        path: '/order/refund',
        query: {
          type: type,
          orderSn: orderSn
        }
      })
    },
    // 进入详情
    goDetail (orderSn) {
      const sn = navigator.userAgent.toLowerCase()
      if (sn.indexOf('android') !== -1) {
        window.androidJs.goOrderInfo(orderSn)
      } else if (sn.indexOf('iphone') !== -1) {
        window.webkit.messageHandlers.goOrderInfo.postMessage(orderSn)
      }
    },
    // 查看物流
    seeLogistics (orderSn) {
      this.$router.push({
        path: '/order/viewLog',
        query: {
          orderSn: orderSn
        }
      })
    },
    // 去付款
    toZhiFu (orderSn, price) {
      const param = {
        order_sn: orderSn,
        true_price: price
      }
      const sn = navigator.userAgent.toLowerCase()
      if (sn.indexOf('android') !== -1) {
        window.androidJs.toZhiFu(JSON.stringify(param))
      } else if (sn.indexOf('iphone') !== -1) {
        window.webkit.messageHandlers.toZhiFu.postMessage(JSON.stringify(param))
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .order_list{
    // height: 205px;
    background: #ffffff;
    border-radius: 11px;
    margin-top: 10px;
    padding: 0 15px;
    .order_list_head{
      width: 100%;
      height: 54px;
      border-bottom: 1px solid #eee;
      .order_list_head_left{
        .van-image{
          width: 18px;
          height: 18px;
          margin-left: 5px;
        }
        p{
          font-size: 14px;
          color: #333;
          margin-left: 10px;
        }
      }
      span{
        font-size: 13px;
        color: #949CDF;
      }
    }
    .order_list_box{
      .order_list_box_term{
        margin-top: 22px;
        .order_list_box_term_pic{
          width: 90px;
          height: 90px;
          .van-image{
            width: 100%;
            height: 100%;
          }
        }
        .order_list_box_term_rig{
          flex: 1;
          height: 90px;
          padding-left: 16px;
          box-sizing: border-box;
          h3{
            width: 220px;
            font-size: 14px;
            color: #333;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .order_list_box_term_rig_info{
            font-size: 12px;
            color: #AAAEB7;
            margin-top: 8px;
            span{
              margin-left: 14px;
            }
          }
          .order_list_box_term_rig_price{
            font-size: 20px;
            color: #E41F35;
            margin-top: 23px;
            span{
              font-size: 14px;
              color: #5C5C5C;
            }
          }
        }
      }
      .order_list_box_actual_payment{
        padding: 20px 0;
        font-size: 14px;
        font-weight: bold;
        color: #081425;
      }
    }
    .order_list_foot{
      // height: 63px;
      padding: 15px 0;
      border-top: 1px solid #eee;
      .order_list_foot_term{
        padding: 7px;
        margin: 15px 0;
        box-sizing: border-box;
        border: 1px solid #949cdf;
        border-radius: 4px;
        font-size: 13px;
        color: #949CDF;
        margin-right: 9px;
        &:last-of-type{
          margin-right: 0;
        }
      }
      .shopOrder_list_foot_term{
        padding: 7px 19px;
        box-sizing: border-box;
        border: 1px solid #949cdf;
        border-radius: 4px;
        font-size: 13px;
        color: #949CDF;
        margin-right: 9px;
        &:last-of-type{
          margin-right: 0;
        }
      }
    }
  }
</style>
