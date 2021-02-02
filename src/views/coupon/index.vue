<template>
  <div class="coupon">
    <div
      class="coupon_list flex flex--align-items--center flex--justify-content--space-between"
      v-for="(item,index) in couponList"
      :key="index"
    >
      <div class="coupon_list_price flex flex--align-items--end">
        <p><b>¥</b>{{ item.price.split('.')[0] }}<b>.{{ item.price.split('.')[1] }}</b></p>
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
      >{{ item.user_status === 0 ? '立即领取': ''  }}</van-button>
    </div>
    <div class="coupon_title">我的优惠卷</div>
    <div
      class="coupon_list flex flex--align-items--center flex--justify-content--space-between"
      v-for="(item,index) in couponList"
      :key="index"
    >
      <div class="coupon_list_price flex flex--align-items--end">
        <p><b>¥</b>{{ item.price.split('.')[0] }}<b>.{{ item.price.split('.')[1] }}</b></p>
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
      >{{ item.user_status === 0 ? '立即领取': ''  }}</van-button>
    </div>
  </div>
</template>

<script>
import { getCouponList } from '@/api/coupon.js'
export default {
  name: 'couponList',
  data () {
    return {
      couponList: [] // 优惠券列表
    }
  },
  created () {
    this.getCouponList()
  },
  methods: {
    async getCouponList () {
      const { data } = await getCouponList({ token: '5748c39c8381ad3fd323ba55283cc809cfbebf82' })
      if (data.status === 1) {
        this.couponList = data.response_data
      } else {
        this.$toast(data.error_msg)
        setTimeout(() => this.$router.go(-1), 1500)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .coupon{
    height: 100%;
    padding: 0 18px;
    background: #fff;
    overflow-y: auto;
    .coupon_list{
      height: 96px;
      border: 2px solid #000;
      padding: 0 10px;
      margin-bottom: 11px;
      &:last-of-type{
        margin-bottom: 0;
      }
      .coupon_list_price{
        color: #F7B500;
        p{
          font-size: 33px;
          font-weight: bold;
          b{
            font-size: 11px;
            &:nth-child(2){
              font-size: 18px;
            }
          }
        }
      }
      .coupon_list_info{
        color: #333;
        h3{
          font-size: 18px;
        }
        p{
          font-size: 10px;
          margin: 7px 0;
        }
        span{
          font-size: 14px;
        }
      }
      .coupon_list_state{
        // width: 54px;
        height: 21px;
        background: #95E2F4;
        border: none;
        /deep/ .van-button__content{
          span{
            font-size: 12px;
            color: #333;
          }
        }
      }
    }
    .coupon_title{
      font-size: 14px;
      color: #333;
      padding-bottom: 10px;
    }
  }
</style>
