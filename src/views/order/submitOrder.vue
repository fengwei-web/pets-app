<template>
  <div class="submit flex flex--row">
    <div class="submit_con">
      <div
        class="submit_con_address"
        @click="setAddress"
      >
        <div
          class="submit_con_address_yes flex flex--align-items--center flex--justify-content--space-between"
          v-if="submitDetail.address_info.id !== 0"
        >
          <div class="submit_con_address_yes_left">
            <div class="submit_con_address_yes_left_top flex flex--align-items--center">
              <h3 class="one_wap">{{ submitDetail.address_info.consignee_name }}</h3>
              <p class="one_wap">{{ submitDetail.address_info.consignee_phone }}</p>
            </div>
            <div
              class="submit_con_address_yes_left_bot one_wap"
            >
              收货地址：{{ submitDetail.address_info.region }} {{ submitDetail.address_info.address }}
            </div>
          </div>
          <div class="submit_con_address_yes_right flex flex--align-items--center">
            <i class="icon iconfont iconyoubianxiaojiantou"></i>
          </div>
        </div>
        <div
          class="submit_con_address_nothing flex flex--justify-content--center"
          v-else
        >请选择地址...</div>
      </div>

      <div class="submit_con_info">
        <div
          class="info_shop"
          v-for="(submit, key) in submitDetail.c_order_lists"
          :key="key"
        >
          <div
            class="info_shop_head flex flex--align-items--center"
            v-if="submit.shop_info.shop_id != 0"
          >
            <img :src="submit.shop_info.shop_logo" alt="">
            <h3>{{ submit.shop_info.shop_name }}</h3>
          </div>
          <div class="info_shop_box">
            <div
              class="info_shop_box_list flex flex--align-items--center"
              v-for="(item, index) in submit.pet_list"
              :key="index"
            >
              <div class="info_shop_box_list_left">
                <van-image :src="item.cover" fit="cover"></van-image>
              </div>
              <div class="info_shop_box_list_right">
                <h3>{{ item.name }}</h3>
                <p>
                  {{ item.age }}
                  <span>{{ item.sex }}</span>
                </p>
                <div class="info_shop_box_list_right_price flex flex--align-items--center flex--justify-content--space-between">
                    <h3>¥ {{ item.price }}</h3>
                    <!-- <p>x1</p> -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="info_message">
          <van-field v-model="message" placeholder="选填：给商家留言（45字以内） " maxlength="45" />
        </div>

        <div class="info_cell">
          <van-cell title="商品金额" :value="'¥' + submitDetail.order_info.total_price" :border="false"/>
          <van-cell title="运费" :value="'¥' + submitDetail.order_info.distribution_way_freight" :border="false"/>
        </div>
      </div>
    </div>
    <div class="submit_gou" @click="goGouChongXieYi">购宠协议</div>
    <div class="submit_foot flex flex--align-items--center flex--justify-content--space-between">
      <div class="submit_foot_left flex flex--align-items--end">
        ￥{{ submitDetail.order_info.true_price }}
        <!-- <p>00</p> -->
      </div>
      <van-button
        type="info"
        @click="submitOrder"
      >提交订单</van-button>
    </div>
  </div>
</template>

<script>
import { getWriteOrder, getCommitOrder } from '@/api/order'
export default {
  name: 'submitOrder',
  data () {
    return {
      message: '',
      submitDetail: null,
      parameter: {
        token: '',
        order_type: 1,
        shopping_ids: '',
        pet_id: '',
        distribution_way_id: 0,
        distribution_way_freight: ''
      }
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    // 获取地址
    window.getAddress = this.getAddress
  },
  methods: {
    getData () {
      this.parameter.token = this.$route.query.token
      this.parameter.type = this.$route.query.type
      this.parameter.order_type = this.$route.query.order_type
      if (this.parameter.type === '1') {
        this.parameter.shopping_ids = this.$route.query.shopping_ids
      } else {
        this.parameter.pet_id = this.$route.query.pet_id
        this.parameter.distribution_way_id = this.$route.query.distribution_way_id
        this.parameter.distribution_way_freight = this.$route.query.distribution_way_freight
      }
      this.getWriteOrderDetail()
    },
    // 第一步
    async getWriteOrderDetail () {
      const { data } = await getWriteOrder({
        token: this.parameter.token,
        order_type: this.parameter.order_type,
        type: this.parameter.type,
        // type=1 必填
        shopping_ids: this.parameter.shopping_ids,
        // type=2 必填
        pet_id: this.parameter.pet_id,
        distribution_way_id: this.parameter.distribution_way_id,
        distribution_way_freight: this.parameter.distribution_way_freight
      })
      if (data.status === 0) {
        this.$toast(data.error_msg)
        setTimeout(() => {
          const sn = navigator.userAgent.toLowerCase()
          if (sn.indexOf('android') !== -1) {
            window.androidJs.goback()
          } else if (sn.indexOf('iphone') !== -1) {
            window.webkit.messageHandlers.goback.postMessage({})
          }
        }, 1500)
        return
      }
      this.submitDetail = data.response_data
    },
    goGouChongXieYi () {
      this.$router.push('/index')
    },
    // 提交订单
    async submitOrder () {
      if (this.submitDetail.address_info.id === 0) {
        this.$toast('请选择收货地址！')
        return
      }
      const address = this.submitDetail.address_info
      const { data } = await getCommitOrder({
        token: this.parameter.token,
        order_type: this.parameter.order_type,
        type: this.parameter.type,
        shopping_ids: this.parameter.shopping_ids,
        pet_id: this.parameter.pet_id,
        address_name: address.consignee_name,
        address_phone: address.consignee_phone,
        address: address.address,
        remark: this.message,
        distribution_way_id: this.parameter.distribution_way_id,
        distribution_way_freight: this.parameter.distribution_way_freight
      })
      const sn = navigator.userAgent.toLowerCase()
      const param = {
        order_sn: data.response_data.order_sn,
        true_price: data.response_data.true_price
      }
      if (data.status === 0) {
        this.$toast(data.error_msg)
        return
      }
      if (data.response_data.is_pay === 1) {
        this.$toast(data.msg)
        setTimeout(() => {
          if (sn.indexOf('android') !== -1) {
            window.androidJs.goback()
          } else if (sn.indexOf('iphone') !== -1) {
            window.webkit.messageHandlers.goback.postMessage()
          }
        }, 1000)
        return
      }

      if (sn.indexOf('android') !== -1) {
        window.androidJs.toZhiFu(JSON.stringify(param))
      } else if (sn.indexOf('iphone') !== -1) {
        window.webkit.messageHandlers.toZhiFu.postMessage(JSON.stringify(param))
      }
    },
    // 选择地址
    setAddress () {
      const sn = navigator.userAgent.toLowerCase()
      if (sn.indexOf('android') !== -1) {
        window.androidJs.selectAddress()
      } else if (sn.indexOf('iphone') !== -1) {
        window.webkit.messageHandlers.selectAddress.postMessage({})
      }
    },
    // 获取安卓传来的地址
    getAddress (str) {
      this.submitDetail.address_info = JSON.parse(str)
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="less" scoped>
.submit{
  height: 100%;
  .submit_con{
    flex: 1;
    overflow-y: auto;
    padding: 0 15px;
    padding-top: 12px;
    .submit_con_address{
      background: #ffffff;
      border-radius: 4px;
      box-shadow: 0px 2px 6px 6px rgba(242,244,250,0.50);
      .submit_con_address_yes{
        padding: 38px 17px;
        .submit_con_address_yes_left{
          width: 286px;
          margin-right: 20px;
          .submit_con_address_yes_left_top{
            h3{
              max-width: 50%;
              font-size: 15px;
              color: #081425;
            }
            p{
              width: 50%;
              font-size: 14px;
              color: #666666;
              margin-left: 20px;
              margin-top: 2px;
            }
          }
          .submit_con_address_yes_left_bot{
            width: 286px;
            font-size: 14px;
            font-weight: 500;
            color: #081425;
            margin-top: 16px;
          }
        }
        .submit_con_address_yes_right{
          i{
            font-size: 13px;
            color: #999999;
          }
        }
      }
      .submit_con_address_nothing{
        padding: 28px 17px;
        font-size: 14px;
        color: #081425;
      }
    }
    .submit_con_info{
      width: 345px;
      background: #ffffff;
      border-radius: 4px;
      margin-top: 8px;
      padding: 0 12px;
      padding-bottom: 33px;
      box-sizing: border-box;
      .info_shop{
        margin-top: 10px;
        padding-top: 10px;
        padding-bottom: 31px;
        .info_shop_head{
          padding: 15px 0;
          img{
            width: 12px;
            height: 12px;
          }
          h3{
            font-size: 13px;
            color: #333;
            margin-left: 8px;
          }
        }
        .info_shop_box{
          .info_shop_box_list{
            margin-top: 10px;
            .info_shop_box_list_left{
              width: 86px;
              height: 86px;
              .van-image{
                width: 100%;
                height: 100%;
                border-radius: 4px;
                overflow: hidden;
              }
            }
            .info_shop_box_list_right{
              flex: 1;
              height: 86px;
              margin-left: 15px;
              h3{
                font-size: 14px;
                color: #333;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              p{
                font-size: 12px;
                color: #AAAEB7;
                margin-top: 10px;
                span{
                  margin-left: 10px;
                }
              }
              .info_shop_box_list_right_price{
                margin-top: 8px;
                h3{
                  font-size: 13px;
                  color: #333;
                }
                p{
                  font-size: 12px;
                  color: #666666;
                  margin-top: 0;
                }
              }
            }
          }
        }
      }
      .info_message{
        background: #f9fafe;
        padding: 5px 8px;
        .van-cell{
          background: #f9fafe;
          padding: 0;
        }
      }
      .info_cell{
        margin-top: 10px;
      }
    }
  }
  .submit_gou {
    text-align: center;
    font-size: 13px;
    color: #333;
    padding: 20px 0;
  }
  .submit_foot{
    height: 50px;
    background: #ffffff;
    box-shadow: 0px -1px 4px 0px rgba(215,219,225,0.50);
    padding: 0 7px 0 15px;
    .submit_foot_left{
      font-size: 18px;
      font-weight: bold;
      color: #E41F35;
      p{
        font-size: 14px;
        margin-bottom: 1px;
      }
    }
  }
  .van-button{
    height: 40px;
    background: #949CDF;
    border-color: #949CDF;
  }
}
</style>
