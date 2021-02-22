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
    <!-- 上传图片 -->
    <div
      class="refund_imgs flex flex--wrap"
      v-if="type == 3"
    >
      <van-image
        class="refund_imgs_list"
        v-for="(img, index) in imageArr"
        :key="index"
        :src="img"
        fit="cover"
      />
      <img
        src="../../../static/formal/shangchuantupian.png"
        alt=""
        @click="onChangeFile"
        v-if="imageArr.length < 9"
      />
      <input type="file" hidden ref="file" @change="onFileChange"/>
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
import { getReason, getUpdateStatus, getHome } from '@/api/order'
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
      show: false,
      imageArr: [],
      newImageArr: []
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
        reason_desc: this.message,
        reason_imgs: this.newImageArr.join(',')
      })
      if (data.status === 0) {
        this.$toast(data.error_msg)
        return
      }
      this.$toast(data.msg)
      setTimeout(() => {
        this.$router.go(-1)
      }, 1500)
    },
    // onChangeFile
    onChangeFile () {
      this.$refs.file.click()
    },
    // onFileChange
    async onFileChange () {
      if (this.imageArr.length >= 9) {
        this.$toast('1111')
        return
      }
      const url = window.URL.createObjectURL(this.$refs.file.files[0])
      this.imageArr.push(url)
      const res = await new Promise((resolve, reject) => {
        const readers = new FileReader()
        readers.readAsDataURL(this.$refs.file.files[0])
        readers.onload = function () {
          resolve(readers)
        }
        readers.onerror = reject
      })
      const { data } = await getHome({
        token: '5748c39c8381ad3fd323ba55283cc809cfbebf82',
        file: res.result
      })
      this.newImageArr.push(data.response_data.url)
      console.log(this.imageArr)
      console.log(this.newImageArr)
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
      padding: 20px 16px;
      // position: fixed;
      // bottom: 109px;
      // left: 0;
      // right: 0;
    }
    .refund_imgs{
      padding: 0 15px;
      .refund_imgs_list{
        width: 108px;
        height: 108px;
        margin-right: 10px;
        margin-top: 10px;
      }
      .refund_imgs_list:nth-child(3n+3){
        margin-right: 0;
      }
      img{
        width: 108px;
        height: 108px;
        margin-top: 10px;
      }
    }
  }
</style>
