<template>
  <div class="shopTake">
    <div class="shopTake_head">
      <h3>当前可提现金额</h3>
      <b>{{ money }}</b>
    </div>
    <div class="shopTake_form">
      <input type="number" v-model="amount" placeholder="输入提现金额">
      <div
        class="shopTake_form_whole flex flex--justify-content--end"
      >
        <p @click="setWholeTake">提现全部</p>
      </div>
      <div class="shopTake_form_options flex flex--justify-content--space-between">
        <div
          class="shopTake_form_options_term flex flex--align-items--center flex--justify-content--center"
          :class="{shopTake_form_options_term_active: type == 1}"
          @click="changeType(1)"
        >
          <i class="icon iconfont icon_weixinzhifu"></i>
          微信支付
        </div>
        <div
          class="shopTake_form_options_term flex flex--align-items--center flex--justify-content--center"
          :class="{shopTake_form_options_term_active: type == 2}"
          @click="changeType(2)"
        >
          <i class="icon iconfont iconzhifubaozhifu" style="color: #1676fd;"></i>
          支付宝支付
        </div>
      </div>
    </div>
    <van-button
      class="shopTake_btn"
      type="info"
      @click="setSubmit"
    >提交</van-button>
  </div>
</template>

<script>
import { withdrawDeposit } from '@/api/withdrawal'
export default {
  name: 'shopTake',
  data () {
    return {
      money: '', // 可提现金额
      desc: 1, // 提现类型
      token: '',
      type: 0, // 提现方式
      amount: '' // 提现金额
    }
  },
  created () {
    // 获取参数
    this.getData()
  },
  methods: {
    // 获取参数
    getData () {
      this.token = this.$route.query.token
      this.money = this.$route.query.money
      this.desc = this.$route.query.desc
    },
    // 提现全部
    setWholeTake () {
      this.amount = this.money
    },
    // 选择支付方式
    changeType (type) {
      this.type = type
    },
    // 提交
    async setSubmit () {
      if (this.amount === '') {
        this.$toast('请输入金额！')
        return
      }
      if (parseFloat(this.amount) <= 0) {
        this.$toast('金额必须大于0')
        return
      }
      if (parseFloat(this.amount) > parseFloat(this.money)) {
        this.$toast('余额不足！')
        return
      }
      if (!this.type) {
        this.$toast('请选择提现方式！')
        return
      }
      const parame = {
        token: this.token,
        desc: this.desc,
        type: this.type,
        amount: this.amount
      }
      const { data } = await withdrawDeposit(parame)
      if (data.status === 0) {
        this.$toast(data.error_msg)
        return
      }
      this.$toast('提现成功')
      setTimeout(() => this.$router.go(-1), 1000)
    }
  }
}
</script>

<style lang="less" scoped>
  .shopTake{
    height: 100%;
    background: #fff;
    padding: 10px 15px;
    box-sizing: border-box;
    .shopTake_head{
      background: #949cdf;
      border-radius: 6px;
      padding: 29px 23px;
      h3{
        font-size: 18px;
        color: #fff;
      }
      b{
        display: block;
        font-size: 25px;
        color: #fff;
        margin-top: 12px;
      }
    }
    .shopTake_form{
      padding-top: 14px;
      input{
        width: 100%;
        height: 50px;
        background: #FAFAFB;
        font-size: 14px;
        padding: 0 16px;
        box-sizing: border-box;
        border: none;
        outline: none;
      }
      .shopTake_form_whole{
        padding-top: 9px;
        p{
          font-size: 13px;
          color: #666;
        }
      }
      .shopTake_form_options{
        padding-top: 30px;
        .shopTake_form_options_term{
          width: 150px;
          height: 48px;
          background: #ffffff;
          border-radius: 7px;
          box-shadow: 1px 3px 4px 1px rgba(218,221,226,0.50);
          font-size: 16px;
          font-weight: 500;
          font-family: 微软雅黑;
          color: #333;
          &.shopTake_form_options_term_active{
            border: 1px solid #949CDF;
          }
          i{
            font-size: 30px;
            color: #44cd7c;
            margin-right: 15px;
          }
        }
      }
    }
    .shopTake_btn{
      width: 265px;
      background: #949CDF;
      border: none;
      position: fixed;
      bottom: 93px;
      left: 50%;
      margin-left: -132px;
    }
  }
</style>
