<template>
  <div class="payment">
    <div class="payment_head flex flex--align-items--center flex--justify-content--space-between">
      <div class="payment_head_left">支付金额</div>
      <div class="payment_head_right flex flex--align-items--end">
        <b>¥</b>
        <h3>{{ truePrice | truePrice1 }}</h3>
        <p>.{{ truePrice | truePrice2 }}</p>
      </div>
    </div>
    <div class="payment_tab">
      <div
        class="payment_tab_list flex flex--align-items--center flex--justify-content--space-between"
        v-for="item in tabList"
        :key="item.id"
      >
        <div class="payment_tab_list_left flex flex--align-items--center">
          <i class="icon iconfont" :class="item.icon"></i>
          <p>{{ item.text }}</p>
        </div>
        <div
          class="payment_tab_list_right"
          @click="setTabIsShow(item)"
        >
          <i class="icon iconfont icondanxuanxuanzhong" v-if="!item.isShow"></i>
          <i class="icon iconfont iconxuanzhong" v-else></i>
        </div>
      </div>
    </div>

    <van-button class="payment_btn">确认</van-button>
  </div>
</template>

<script>
export default {
  name: 'orderPayment',
  data () {
    return {
      tabList: [
        {
          id: 1,
          icon: 'icon_weixinzhifu',
          text: '微信支付',
          isShow: false
        },
        {
          id: 2,
          icon: 'iconzhifubaozhifu',
          text: '支付宝支付',
          isShow: false
        }
      ], // 这是存放支付方式的数组
      truePrice: 0
    }
  },
  created () {
    this.truePrice = this.$route.query.truePrice
  },
  filters: {
    truePrice1 (val) {
      return val.split('.')[0]
    },
    truePrice2 (val) {
      return val.split('.')[1]
    }
  },
  methods: {
    // 选择支付方式
    setTabIsShow (item) {
      if (!item.isShow) {
        this.tabList.forEach(v => {
          v.isShow = false
        })
      }
      item.isShow = !item.isShow
    }
  }
}
</script>

<style lang="less" scoped>
.payment{
  .payment_head{
    height: 58px;
    background: #fff;
    padding: 0 15px;
    .payment_head_left{
      font-size: 13px;
      color: #333;
    }
    .payment_head_right{
      color: #F23E10;
      b{
        font-size: 11px;
        margin-bottom: 5px;
      }
      h3{
        font-size: 33px;
      }
      p{
        font-size: 18px;
        margin-bottom: 3px;
      }
    }
  }
  .payment_tab{
    height: 132px;
    background: #fff;
    margin-top: 9px;
    .payment_tab_list{
      height: 50%;
      padding: 0 15px;
      &:last-of-type{
        .payment_tab_list_left{
          i{
            color: #1676fd;
          }
        }
      }
      .payment_tab_list_left{
        i{
          font-size: 30px;
          color: #44cd7c;
        }
        p{
          margin-left: 15px;
          font-size: 16px;
          color: #333;
        }
      }
      .payment_tab_list_right{
        i{
          font-size: 15px;
          color: #A2A2A2;
        }
      }
    }
  }
  .payment_btn{
    width: 265px;
    height: 36px;
    background: #949cdf;
    border-radius: 2px;
    color: #fff;
    position: fixed;
    bottom: 21px;
    left: 50%;
    margin-left: -132px;
  }
}
</style>
