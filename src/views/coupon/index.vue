<template>
  <div class="coupon">
    <div
      class="coupon_list flex flex--align-items--center flex--justify-content--space-between"
      v-for="(item, index) in couponList"
      :key="index"
    >
      <div class="coupon_list_price flex flex--align-items--end">
        <p>
          <b>¥</b>{{ item.price | price1 }}<b>.{{ item.price | price2 }}</b>
        </p>
      </div>
      <div class="coupon_list_info flex flex--row">
        <h3>{{ item.name }}</h3>
        <p>{{ item.start_time }}-{{ item.end_time }}</p>
        <span>{{ item.desc }}</span>
      </div>
      <van-button
        class="coupon_list_state"
        round
        type="info"
        @click="setReceive(item.id)"
      >{{ item.user_status | userStatus }}</van-button>
    </div>
    <div class="coupon_title">我的优惠卷</div>
    <div
      class="coupon_list flex flex--align-items--center flex--justify-content--space-between"
      v-for="(item, index) in newCouponList"
      :key="index"
      @click="selectYouHui(item.id, item.price)"
    >
      <div class="coupon_list_price flex flex--align-items--end">
        <p>
          <b>¥</b>{{ item.price | price1 }}<b>.{{ item.price | price2 }}</b>
        </p>
      </div>
      <div class="coupon_list_info flex flex--row">
        <h3>{{ item.name }}</h3>
        <p>{{ item.start_time }}-{{ item.end_time }}</p>
        <span>{{ item.desc }}</span>
      </div>
      <van-button class="coupon_list_state" round type="info">{{
        item.user_status | userStatus
      }}</van-button>
    </div>
  </div>
</template>

<script>
import { getCouponList, receiveCouponList } from '@/api/coupon.js'
export default {
  name: 'couponList',
  data () {
    return {
      couponList: [], // 优惠券列表
      newCouponList: [], // 领取之后数据的列表
      token: '',
      type: 0
    }
  },
  created () {
    this.token = this.$route.query.token
    this.type = this.$route.query.type
    this.getCouponList()
  },
  filters: {
    price1 (val) {
      return val.split('.')[0]
    },
    price2 (val) {
      return val.split('.')[1]
    },
    userStatus (val) {
      let str = ''
      switch (val) {
        case 0:
          str = '立即领取'
          break
        case 1:
          str = '未使用'
          break
        case 2:
          str = '已过期'
          break
      }
      return str
    }
  },
  methods: {
    async getCouponList () {
      const { data } = await getCouponList({
        token: this.token
      })
      if (data.status === 1) {
        data.response_data.forEach((v) => {
          if (v.user_status === 0) {
            this.couponList.push(v)
          } else {
            this.newCouponList.push(v)
          }
        })
      } else {
        this.$toast(data.error_msg)
        setTimeout(() => this.$router.go(-1), 1500)
      }
    },
    // 立即领取
    async setReceive (id) {
      const { data } = await receiveCouponList({
        token: this.token,
        id: id
      })
      this.couponList = []
      this.$toast(data.msg)
      this.getCouponList()
    },
    selectYouHui (id, price) {
      const data = {
        id: id,
        freight: parseFloat(price)
      }
      if (this.type !== '1') {
        return
      }
      const sn = navigator.userAgent.toLowerCase()
      if (sn.indexOf('android') !== -1) {
        window.androidJs.selectYouHui(JSON.stringify(data))
        window.androidJs.goback()
      } else if (sn.indexOf('iphone') !== -1) {
        window.webkit.messageHandlers.selectYouHui.postMessage(JSON.stringify(data))
        window.webkit.messageHandlers.goback.postMessage({})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.coupon {
  height: 100%;
  padding: 0 18px;
  background: #fff;
  overflow-y: auto;
  .coupon_list {
    height: 96px;
    border: 2px solid #000;
    padding: 0 10px;
    margin-bottom: 11px;
    &:last-of-type {
      margin-bottom: 0;
    }
    .coupon_list_price {
      color: #f7b500;
      p {
        font-size: 33px;
        font-weight: bold;
        b {
          font-size: 11px;
          &:nth-child(2) {
            font-size: 18px;
          }
        }
      }
    }
    .coupon_list_info {
      color: #333;
      h3 {
        font-size: 18px;
      }
      p {
        font-size: 10px;
        margin: 7px 0;
      }
      span {
        font-size: 14px;
      }
    }
    .coupon_list_state {
      // width: 54px;
      height: 21px;
      background: #95e2f4;
      border: none;
      /deep/ .van-button__content {
        span {
          font-size: 12px;
          color: #333;
        }
      }
    }
  }
  .coupon_title {
    font-size: 14px;
    color: #333;
    padding: 10px 0;
  }
}
</style>
