<template>
  <!-- 申请退款页面 -->
  <div class="refund">
    <div class="refund_cell">
      <van-cell title="退款方式" is-link value="不想要了" @click="show = true">
        <p slot="title">{{ type | types }}</p>
        <span slot="default">{{ desc }}</span>
      </van-cell>
    </div>
    <div class="refund_title">
      <h3>描述</h3>
    </div>
    <div class="refund_text">
      <van-field
        v-model="message"
        rows="5"
        type="textarea"
        maxlength="200"
        placeholder="请输入店铺简介，不超过200字"
      />
    </div>
    <div class="refund_btn">
      <van-button type="primary" color="#949CDF" block @click="setSubmit">提交</van-button>
    </div>
    <van-popup
      v-model="show"
      position="bottom"
    >
      <van-picker
        :title="type | types"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="show = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getReason, getUpdateStatus } from '@/api/order'
export default {
  name: 'applyForARefund',
  data () {
    return {
      message: '',
      type: 1,
      orderSn: '',
      desc: '请选择原因',
      descIndex: 0,
      columns: [],
      columnsId: [],
      show: false
    }
  },
  created () {
    this.type = this.$route.query.type
    this.orderSn = this.$route.query.orderSn
    // 获取原因数据
    this.getReasonList()
  },
  filters: {
    types (val) {
      let str = ''
      switch (val) {
        case '1':
          str = '取消方式'
          break
        case '2':
          str = '退款方式'
          break
        case '3':
          str = '售后方式'
      }
      return str
    }
  },
  methods: {
    // 获取原因数据
    async getReasonList () {
      const { data } = await getReason({
        token: '5748c39c8381ad3fd323ba55283cc809cfbebf82',
        type: this.type
      })
      data.response_data.forEach(element => {
        this.columns.push(element.name)
        this.columnsId.push(element.id)
      })
    },
    // 选择确定
    onConfirm (value, index) {
      this.show = false
      this.desc = value
      this.descIndex = index
    },
    // 提交
    async setSubmit () {
      if (this.desc === '请选择原因') {
        this.$toast('请选择原因')
        return
      }
      let status = ''
      switch (this.type) {
        case '1':
          status = 5
          break
        case '2':
          status = 6
          break
        case '3':
          status = 10
          break
      }
      const { data } = await getUpdateStatus({
        token: '5748c39c8381ad3fd323ba55283cc809cfbebf82',
        order_sn: this.orderSn,
        status: status,
        reason: this.columns[this.descIndex],
        reason_desc: this.message
      })
      this.$toast(data.msg)
      setTimeout(() => {
        this.$router.go(-1)
      }, 1500)
    }
  }
}
</script>

<style lang="less" scoped>
  .refund{
    height: 100%;
    background: #fff;
    .refund_cell{
      border-top: 7px solid #FAFAFB;
      padding: 0 16px;
      /deep/ .van-cell{
        border-bottom: 1px solid #EEEEEE;
        padding-left: 0;
        padding-right: 0;
        .van-cell__title{
          span{
            font-size: 14px;
            font-weight: bold;
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
    .refund_title{
      padding: 17px 16px;
      h3{
        margin-top: 5px;
        font-size: 15px;
        color: #333;
      }
    }
    .refund_text{
      /deep/ .van-cell__value{
        background: #F7F8FC;
        padding: 12px 13px;
      }
    }
    .refund_btn{
      padding: 0 16px;
      position: fixed;
      bottom: 109px;
      left: 0;
      right: 0;
    }
  }
</style>
