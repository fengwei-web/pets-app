<template>
  <!-- 订单详情页面 -->
  <div class="order_detail flex flex--row">
    <div class="order_detail_con">
      <div class="order_detail_head flex flex--align-items--center">
        <div class="order_detail_head_pic flex flex--justify-content--end">
          <p>{{ detailsObj.status | setStatus }}</p>
        </div>
        <div
          class="order_detail_head_tip"
          v-if="detailsObj.status == 0"
        >
          剩{{ detailsObj.remaining_time }}订单将自动关闭
        </div>
      </div>
      <div class="order_detail_address flex flex--align-items--center flex--justify-content--space-between">
        <div class="order_detail_address_position flex flex--row">
          <i class="icon iconfont iconFrame1"></i>
        </div>
        <div class="order_detail_address_box flex flex--row flex--justify-content--space-between">
          <div class="order_detail_address_box_top flex flex--justify-content--space-between">
            <h3 class="one_wap">{{ detailsObj.address_name }}</h3>
            <h3 class="one_wap">{{ detailsObj.address_phone }}</h3>
          </div>
          <div class="order_detail_address_box_bot one_wap">{{ detailsObj.address }}</div>
        </div>
        <i class="icon iconfont iconyoubianxiaojiantou"></i>
      </div>
      <div class="order_detail_shop">
        <div class="order_list_head flex flex--align-items--center flex--justify-content--space-between">
          <div class="order_list_head_left flex flex--align-items--center">
            <van-image :src="detailsObj.shop_logo" />
            <p>{{ detailsObj.shop_name }}</p>
          </div>
          <!-- <span>待付款</span> -->
        </div>
        <div class="order_list_box">
          <div
            class="order_list_box_term flex flex--align-items--center"
            v-for="(item, index) in detailsObj.order_pet"
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
              <div class="order_list_box_term_rig_price">
                ¥{{ item.pet_price }}
              </div>
            </div>
          </div>
          <div class="order_list_box_actual_payment flex flex--justify-content--end">
            实付款：￥{{ detailsObj.status == 0 ? detailsObj.p_true_price : detailsObj.true_price }}
          </div>
          <div class="order_list_box_info">
            <div class="order_list_box_info_term flex flex--align-items--center flex--justify-content--space-between">
              <p>运送快递</p>
              <span>￥{{ detailsObj.status == 0 ? detailsObj.p_distribution_way_freight : detailsObj.distribution_way_freight }}</span>
            </div>
            <div class="order_list_box_info_term flex flex--align-items--center flex--justify-content--space-between">
              <p>实付款</p>
              <span>￥{{ detailsObj.status == 0 ? detailsObj.p_true_price : detailsObj.true_price }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="order_detail_info">
        <van-cell
          :border="false"
          title="支付方式"
          :value="detailsObj.pay_method | payMethod"
          v-if="detailsObj.status != 0"
          size="large"
        />
        <van-cell
          :border="false"
          title="订单编号"
          :value="detailsObj.status == 0 ? detailsObj.p_order_sn : detailsObj.order_sn"
          size="large"
        />
        <van-cell
          :border="false"
          title="创建时间"
          :value="detailsObj.ctime"
          size="large"
        />
        <van-cell
          :border="false"
          title="付款时间"
          :value="detailsObj.pay_time"
          v-if="detailsObj.status != 0"
          size="large"
        />
        <van-cell
          :border="false"
          title="发货时间"
          :value="detailsObj.send_time"
          v-if="detailsObj.status != 0"
          size="large"
        />
        <van-cell
          :border="false"
          title="买家留言"
          :value="detailsObj.remark == null || detailsObj.remark == '' ? '暂无' : detailsObj.remark" size="large"
        />
      </div>
    </div>
    <div
      class="order_detail_foot flex flex--align-items--center flex--justify-content--end"
      v-if="detailsObj.status < 3"
    >
      <div
        class="order_detail_foot_ash"
        v-if="detailsObj.status == 0"
        @click="goRefund(1, detailsObj.order_sn)"
      >取消订单</div>
      <div
        class="order_detail_foot_ash"
        v-if="detailsObj.status == 1"
        @click="goRefund(2, detailsObj.order_sn)"
      >申请退款</div>
      <div
        class="order_detail_foot_ash"
        v-if="detailsObj.status == 2"
        @click="seeLogistics(detailsObj.order_sn)"
      >查看物流</div>
      <div
        class="order_detail_foot_ash"
        v-if="detailsObj.status == 2"
        @click="goRefund(3, detailsObj.order_sn)"
      >申请售后</div>
      <div
        class="order_detail_foot_purple"
        v-if="detailsObj.status == 0"
        @click="toZhiFu(detailsObj.p_order_sn, detailsObj.p_true_price)"
      >去支付</div>
      <div
        class="order_detail_foot_purple"
        v-if="detailsObj.status == 2"
        @click="confirmReceiving(detailsObj.order_sn)"
      >确认收货</div>
    </div>
  </div>
</template>

<script>
import { getDetail } from '@/api/order'
export default {
  name: 'OrderDetail',
  data () {
    return {
      orderSn: '',
      token: '',
      detailsObj: null
    }
  },
  created () {
    this.orderSn = this.$route.query.orderSn
    this.token = this.$route.query.token
    this.getOrderDetails()
  },
  filters: {
    setStatus (val) {
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
    },
    payMethod (val) {
      let str = ''
      switch (val) {
        case '1':
          str = '微信支付'
          break
        case '2':
          str = '支付宝支付'
          break
      }
      return str
    }
  },
  methods: {
    async getOrderDetails () {
      const { data } = await getDetail({
        token: this.token,
        order_sn: this.orderSn
      })
      this.detailsObj = data.response_data[0]
      console.log(this.detailsObj)
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
.order_detail{
  height: 100%;
  .order_detail_con{
    flex: 1;
    overflow-y: auto;
    .order_detail_head{
      height: 99px;
      background: #2A2C3B;
      padding: 0 24px;
      .order_detail_head_pic{
        width: 132px;
        height: 40px;
        background: url("../../../static/formal/order_detail_state.png") no-repeat;
        background-size: 100% 100%;
        p{
          width: 84px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          font-size: 13px;
          color: #fff;
        }
      }
      .order_detail_head_tip{
        font-size: 12px;
        color: #fff;
        margin-top: -15px;
        margin-left: 32px;
      }
    }
    .order_detail_address{
      padding: 20px 15px 16px 22px;
      background: #fff;
      border-radius: 4px 4px 0px 0px;
      .order_detail_address_position{
        height: 42px;
        .iconFrame1{
          margin-top: 2px;
          font-size: 16px;
          color: #333333;
        }
      }
      .order_detail_address_box{
        width: 286px;
        min-height: 42px;
        .order_detail_address_box_top{
          h3{
            width: 60%;
            font-size: 14px;
            font-weight: bold;
            color: #081425;
            &:last-of-type{
              width: 40%;
              text-align: right;
            }
          }
        }
        .order_detail_address_box_bot{
          font-size: 14px;
          color: #999999;
          width: 286px;
          margin-top: 10px;
        }
      }
      .iconyoubianxiaojiantou{
        font-size: 13px;
        color: #333333;
      }
    }
    .order_detail_shop{
      background: #ffffff;
      margin-top: 10px;
      padding: 0 15px;
      .order_list_head{
        width: 100%;
        height: 54px;
        border-bottom: 1px solid #eee;
        .order_list_head_left{
          .van-image{
            width: 12px;
            height: 12px;
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
            }
          }
        }
        .order_list_box_actual_payment{
          padding: 20px 0;
          font-size: 14px;
          font-weight: bold;
          color: #081425;
        }
        .order_list_box_info{
          padding-bottom: 26px;
          .order_list_box_info_term{
            margin-top: 16px;
            p{
              font-size: 14px;
              color: #333;
            }
            span{
              font-size: 13px;
              color: #081425;
            }
          }
        }
      }
    }
    .order_detail_info{
      width: 100%;
      margin: 10px 0;
      /deep/ .van-cell{
        .van-cell__title{
          span{
            font-size: 13px;
            color: #333;
          }
        }
        .van-cell__value{
          flex: 3;
          span{
            font-size: 13px;
            color: #999;
          }
        }
      }
    }
  }
  .order_detail_foot{
    height: 49px;
    background: #ffffff;
    border-top: 1px solid #eee;
    box-shadow: 0px -1px 4px 0px rgba(215,219,225,0.50);
    padding: 0 15px;
    div{
      padding: 8px 26px;
      font-size: 14px;
      margin-right: 10px;
      &:last-of-type{
        margin-right: 0;
      }
      &.order_detail_foot_purple{
        background: #949CDF;
        color: #fff;
      }
      &.order_detail_foot_ash{
        border: 1px solid #dfdfdf;
        color: #333333;
      }
    }
  }
}
</style>
