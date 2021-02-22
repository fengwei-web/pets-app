<template>
  <div class="takeOut">
    <div class="takeOut_head flex flex--row flex--justify-content--space-between">
      <div class="takeOut_head_price flex flex--align-items--end">
        <p>¥</p>
        <span>{{ userInfo.balance }}</span>
      </div>
      <div class="takeOut_head_tit">我的总收入</div>
    </div>
    <div class="takeOut_box">
      <div class="takeOut_box_list flex flex--align-items--center flex--justify-content--space-between">
        <div class="takeOut_box_list_left">
          <h3>店铺收入</h3>
          <p>￥{{ userInfo.shop_balance }}</p>
        </div>
        <van-button
          class="takeOut_box_list_btn"
          @click="shopTakeOut(userInfo.shop_balance, 1)"
          slot="default"
        >提现</van-button>
      </div>
      <div class="takeOut_box_list flex flex--align-items--center flex--justify-content--space-between">
        <div class="takeOut_box_list_left">
          <h3>送养收入</h3>
          <p>￥{{ userInfo.send_balance }}</p>
        </div>
        <van-button
          class="takeOut_box_list_btn"
          @click="shopTakeOut(userInfo.send_balance, 2)"
          slot="default"
        >提现</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { myDetail } from '@/api/withdrawal'
export default {
  name: 'takeOut',
  data () {
    return {
      userInfo: {}, // 用户个人信息
      token: ''
    }
  },
  created () {
    this.token = this.$route.query.token
    // 获取用户个人信息
    this.getUserInfo()
  },
  methods: {
    // 获取用户个人信息
    async getUserInfo () {
      const { data } = await myDetail({ token: this.token })
      this.userInfo = data.response_data
    },
    shopTakeOut (money, desc) {
      const param = {
        money: money,
        desc: desc
      }
      const sn = navigator.userAgent.toLowerCase()
      if (sn.indexOf('android') !== -1) {
        window.androidJs.goTiXianInfo(JSON.stringify(param))
      } else if (sn.indexOf('iphone') !== -1) {
        window.webkit.messageHandlers.goTiXianInfo.postMessage(JSON.stringify(param))
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .takeOut{
    height: 100%;
    background: #fff;
    padding: 0 15px;
    .takeOut_head{
      width: 100%;
      height: 104px;
      background: #949CDF;
      border-radius: 6px;
      padding: 24px 18px;
      box-sizing: border-box;
      .takeOut_head_price{
        p{
          font-size: 19px;
          color: #fff;
          margin-bottom: 2px;
        }
        span{
          font-size: 27px;
          color: #fff;
        }
      }
      .takeOut_head_tit{
        font-size: 13px;
        color: #fff;
      }
    }
    .takeOut_box{
      padding-top: 20px;
      .takeOut_box_list{
        width: 100%;
        // height: 70px;
        padding: 15px 0;
        border-bottom: 1px solid #F4F5F7;
        .takeOut_box_list_left{
          h3{
            font-size: 14px;
            color: #333;
          }
          p{
            font-size: 11px;
            color: #E41F35;
            margin-top: 2px;
          }
        }
        .takeOut_box_list_btn{
          height: 20px;
          font-size: 12px;
          background: #949CDF;
          color: #fff;
          border: none;
        }
      }
    }
  }
</style>
