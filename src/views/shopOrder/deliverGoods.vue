<template>
  <div class="deliver">
    <div class="deliver_box">
      <div class="deliver_box_term flex flex--align-items--center" @click="show = true">
        <h3>物流公司</h3>
        <p>{{ columnsText }}</p>
        <i class="icon iconfont iconyoubianxiaojiantou"></i>
      </div>
      <div class="deliver_box_term flex flex--align-items--center">
        <h3>物流单号</h3>
        <input type="text" v-model="message" placeholder="请填写" style="text-align: right">
        <i class="icon iconfont iconyoubianxiaojiantou" style="opacity: 0;"></i>
      </div>
    </div>
    <div class="deliver_btn" @click="setSubmit">提交</div>
    <van-popup v-model="show" position="bottom">
      <van-picker
        title="标题"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="show = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getExpressList, getOrderSend } from '@/api/shopOrder'
export default {
  name: 'deliverGoods',
  data () {
    return {
      show: false,
      columns: [],
      columnsText: '请选择',
      message: '',
      orderSn: ''
    }
  },
  created () {
    this.orderSn = this.$route.query.orderSn
    this.getExpressLists()
  },
  methods: {
    // 获取快递公司列表
    async getExpressLists () {
      const { data } = await getExpressList({
        token: '5748c39c8381ad3fd323ba55283cc809cfbebf82'
      })
      data.response_data.forEach(v => {
        this.columns.push(v.title)
      })
    },
    // 弹出框点击了确定
    onConfirm (value) {
      this.columnsText = value
      this.show = false
    },
    // 提交
    async setSubmit () {
      if (this.columnsText === '请选择') {
        this.$toast('请选择快递公司！')
        return
      }
      if (!this.message) {
        this.$toast('请填写快递单号！')
        return
      }
      const { data } = await getOrderSend({
        token: '5748c39c8381ad3fd323ba55283cc809cfbebf82',
        order_sn: this.orderSn,
        express_name: this.columnsText,
        express_num: this.message
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
  .deliver{
    height: 100%;
    background: #fff;
    .deliver_box{
      padding: 0 17px;
      .deliver_box_term{
        padding: 16px 0;
        border-bottom: 1px solid #f2f4f7;
        h3{
          font-size: 13px;
          font-weight: 0;
          color: #999;
        }
        p{
          font-size: 13px;
          color: #999;
          flex: 1;
          text-align: right;
          padding-right: 10px;
        }
        input{
          flex: 1;
          border: none;
          font-size: 13px;
          padding-right: 10px;
          color: #999;
        }
        input::placeholder{
          color: #999;
        }
        i{
          font-size: 12px;
          color: #999;
        }
      }
    }
    .deliver_btn{
      width: 265px;
      height: 36px;
      line-height: 36px;
      background: #949cdf;
      border-radius: 2px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      position: fixed;
      bottom: 53px;
      left: 50%;
      margin-left: -132px;
    }
  }
</style>
