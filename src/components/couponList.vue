<template>
  <div>
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
</template>

<script>
export default {
  name: 'couponList',
  props: {
    item: {
      type: Object
    }
  }
}
</script>

<style lang="less">
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
</style>
