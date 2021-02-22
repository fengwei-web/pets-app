<template>
  <div class="after">
    <div class="after_head flex flex--align-items--center flex--justify-content--space-between">
      <h3>售后原因</h3>
      <p>{{ detailObj.reason }}</p>
    </div>
    <div v-if="detailObj.remark != null && detailObj.imgs.length > 0">
      <h3 class="after_remarks">备注</h3>
      <p class="after_reason">{{ detailObj.remark }}</p>
      <div class="after_imgs flex flex--wrap">
        <van-image
          v-for="(img, index) in detailObj.reason_imgs"
          :key="index"
          :src="img"
        />
      </div>
    </div>

    <div class="after_foot flex flex--align-items--center flex--justify-content--space-between">
      <div class="after_foot_term" @click="isAgree(2)">不同意</div>
      <div class="after_foot_term" @click="isAgree(1)">同意</div>
    </div>
  </div>
</template>

<script>
import { getShopOrderDetail, getOrderAftersale } from '@/api/shopOrder'
export default {
  name: 'afterSales',
  data () {
    return {
      orderSn: '',
      detailObj: null
    }
  },
  created () {
    this.orderSn = this.$route.query.orderSn
    this.getShopOrderDetails()
  },
  methods: {
    // 商家详情
    async getShopOrderDetails () {
      const { data } = await getShopOrderDetail({
        token: '5748c39c8381ad3fd323ba55283cc809cfbebf82',
        order_sn: this.orderSn
      })
      this.detailObj = data.response_data
    },
    // 是否同意
    async isAgree (type) {
      const { data } = await getOrderAftersale({
        token: '5748c39c8381ad3fd323ba55283cc809cfbebf82',
        order_sn: this.orderSn,
        type: type
      })
      if (data.status === 0) {
        this.$toast(data.error_msg)
        return
      }
      this.$toast(data.msg)
    }
  }
}
</script>

<style lang="less" scoped>
  .after{
    height: 100%;
    background: #fff;
    padding: 0 15px;
    .after_head{
      padding: 15px 0;
      border-bottom: 1px solid #eee;
      h3{
        font-size: 14px;
        color: #333;
      }
      p{
        font-size: 14px;
        color: #666;
      }
    }
    .after_remarks{
      font-size: 13px;
      color: #999;
      margin-top: 16px;
    }
    .after_reason{
      font-size: 13px;
      font-weight: 500;
      color: #333;
      margin-top: 6px;
    }
    .after_imgs{
      padding-top: 30px;
      .van-image{
        width: 108px;
        height: 108px;
        margin: 0 10px 10px 0;
      }
      .van-image:nth-child(3n+3){
        margin-right: 0;
      }
    }
    .after_foot{
      width: 100%;
      padding-top: 74px;
      .after_foot_term{
        width: 164px;
        height: 36px;
        background: #949CDF;
        border-radius: 2px;
        line-height: 36px;
        text-align: center;
        font-size: 14px;
        color: #fff;
      }
    }
  }
</style>
