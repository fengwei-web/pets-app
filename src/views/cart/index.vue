<template>
  <div class="cart flex flex--row">
    <div class="cart_con">
      <div
        class="cart_con_list"
        v-for="(item,index) in cartList"
        :key="index"
      >
        <div
          class="cart_con_list_head flex flex--align-items--center"
          @click="godianpu(item.shop_info.shop_id)"
        >
          <img src="" alt="">
          <van-image :src="item.shop_info.shop_logo"></van-image>
          <h3>{{ item.shop_info.shop_name }}</h3>
          <i class="icon iconfont iconyoubianxiaojiantou"></i>
        </div>

        <div class="cart_con_list_box">
          <div
            class="cart_con_list_box_term flex flex--align-items--center"
            v-for="(shop,key) in item.pet_list"
            :key="key"
          >
            <div
              class="cart_con_list_box_term_state flex flex--align-items--center"
              @click="setchoice(shop)"
            >
              <i class="icon iconfont icondanxuanxuanzhong" v-if="!shop.show"></i>
              <i class="icon iconfont iconxuanzhong--" style="color: #949CDF;" v-else></i>
            </div>
            <div
              class="cart_con_list_box_term_big flex flex--align-items--center"
              @click="goDetail(shop.pet_id)"
            >
               <van-image :src="shop.cover"/>
               <div class="cart_con_list_box_term_big_rig">
                 <h3>{{ shop.name }}</h3>
                 <p>{{ shop.age }}</p>
                 <b>¥{{ shop.price }}</b>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart_foot flex flex--align-items--center">
      <div class="cart_foot_state flex flex--align-items--center" @click="selectAll">
        <i class="icon iconfont icondanxuanxuanzhong" v-if="!isShow"></i>
        <i class="icon iconfont iconxuanzhong--" style="color: #949CDF;" v-else></i>
        <b>全选</b>
      </div>
      <div class="cart_foot_price flex flex--align-items--center flex--justify-content--center">
        <div class="cart_foot_price_txt">合计：</div>
        <div class="cart_foot_price_money flex flex--align-items--end">
          ￥{{ total }}
        </div>
      </div>
      <van-button
        class="cart_foot_btn"
        type="info"
        @click="goSettlement()"
        v-if="!isFlog"
      >去结算</van-button>
      <van-button
        class="cart_foot_btn"
        type="info"
        @click="deletes"
        v-else
      >删除</van-button>
    </div>
  </div>
</template>

<script>
import { getShoppingList, delShopping } from '@/api/cart'
export default {
  name: 'cart',
  data () {
    return {
      isShow: false,
      isFlog: false,
      page: 1,
      limit: 10,
      cartList: [], // 购物车列表
      allcount: 0,
      checkarr: [],
      total: '0.00',
      token: ''
    }
  },
  created () {
    this.token = this.$route.query.token
    this.getCartList()
  },
  mounted () {
    window.ifFootState = this.ifFootState
  },
  watch: {
    checkarr (newvalue) {
      // 计算总价
      this.setTotal()
      // 监听是否全选
      if (newvalue.length === this.allcount) {
        this.isShow = true
        return
      }
      this.isShow = false
    }
  },
  methods: {
    // 获取购物车数据
    async getCartList () {
      const { data } = await getShoppingList({
        token: this.token,
        page: this.page,
        limit: this.limit
      })
      data.response_data.forEach(v => {
        this.allcount += v.pet_list.length
        v.pet_list.forEach(m => {
          m.show = false
        })
      })
      this.cartList = data.response_data
    },
    // 改变选中状态
    setchoice (shop) {
      shop.show = !shop.show
      const index = this.checkarr.indexOf(shop.id)
      if (index === -1) {
        this.checkarr.push(shop.id)
        return
      }
      this.checkarr.splice(index, 1)
    },
    // 删除
    async deletes (index) {
      const { data } = await delShopping({
        token: this.token,
        ids: this.checkarr.join(',')
      })
      if (data.status === 1) {
        this.$toast('删除成功')
        this.getCartList()
      } else {
        this.$toast(data.error_msg)
      }
    },
    // 编辑
    ifFootState () {
      this.isFlog = !this.isFlog
    },
    // 全选
    selectAll () {
      this.isShow = !this.isShow
      if (this.isShow) {
        this.cartList.forEach((v, i) => {
          v.pet_list.forEach((item, key) => { item.show = true })
        })
      } else {
        this.cartList.forEach((v, i) => {
          v.pet_list.forEach((item, key) => { item.show = false })
        })
      }
      // 点击全选时改变价格
      this.setTotal()
    },
    // 计算总价
    setTotal () {
      let totalPrice = 0
      this.cartList.forEach(item => {
        item.pet_list.forEach((element, index) => {
          if (element.show) totalPrice += parseFloat(element.price)
        })
      })
      this.total = totalPrice.toFixed(2)
    },
    // 去店铺
    godianpu (id) {
      const sn = navigator.userAgent.toLowerCase()
      if (sn.indexOf('android') !== -1) {
        window.androidJs.goDianpu(parseInt(id))
      } else if (sn.indexOf('iphone') !== -1) {
        window.webkit.messageHandlers.goDianpu.postMessage(parseInt(id))
      }
    },
    // 去详情
    goDetail (id) {
      const sn = navigator.userAgent.toLowerCase()
      if (sn.indexOf('android') !== -1) {
        window.androidJs.goodInfo(parseInt(id))
      } else if (sn.indexOf('iphone') !== -1) {
        window.webkit.messageHandlers.goodInfo.postMessage(parseInt(id))
      }
    },
    // 去结算
    goSettlement () {
      const sn = navigator.userAgent.toLowerCase()
      if (sn.indexOf('android') !== -1) {
        window.androidJs.submitOrder(this.checkarr.join(','))
      } else if (sn.indexOf('iphone') !== -1) {
        window.webkit.messageHandlers.submitOrder.postMessage(this.checkarr.join(','))
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .cart{
    height: 100%;
    background: #fff;
    .cart_con{
      flex: 1;
      overflow-y: auto;
      .cart_con_list{
        border-bottom: 1px solid #EEEEEE;
        padding-bottom: 11px;
        .cart_con_list_head{
          padding: 16px 35px;
          .van-image{
            width: 22px;
            height: 22px;
            margin-right: 11px;
          }
          h3{
            font-size: 14px;
            color: #333;
          }
          i{
            font-size: 10px;
            color: #A6A6A6;
            margin-left: 17px;
          }
        }
        .cart_con_list_box{
          .cart_con_list_box_term{
            padding-bottom: 10px;
            .cart_con_list_box_term_state{
              padding: 0 10px;
              i{
                font-size: 13px;
                color: #d8d1d1;
              }
            }
            .cart_con_list_box_term_big{
              height: 100px;
              flex: 1;
              padding: 0 21px 0 3px;
              .van-image{
                width: 100px;
                height: 100%;
                border-radius: 10px;
                overflow: hidden;
              }
              .cart_con_list_box_term_big_rig{
                flex: 1;
                height: 100px;
                padding-left: 19px;
                h3{
                  font-size: 14px;
                  color: #333;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                }
                p{
                  font-size: 12px;
                  color: #AAAEB7;
                  margin-top: 8px;
                }
                b{
                  font-size: 20px;
                  color: #E41F35;
                }
              }
            }
          }
        }
      }
    }
    .cart_foot{
      height: 49px;
      background: #ffffff;
      box-shadow: 0px -1px 4px 0px rgba(215,219,225,0.50);
      padding: 0 7px 0 15px;
      .cart_foot_state{
        i{
          font-size: 18px;
          color: #D8D1D1;
        }
        b{
          font-size: 15px;
          color: #333;
          margin-left: 14px;
        }
      }
      .cart_foot_price{
        flex: 1;
        .cart_foot_price_txt{
          font-size: 12px;
          color: #999;
        }
        .cart_foot_price_money{
          font-size: 18px;
          font-weight: bold;
          color: #E41F35;
        }
      }
      .cart_foot_btn{
        width: 129px;
        height: 40px;
        background: #949cdf;
        border-radius: 3px;
        border: none;
      }
    }
  }
</style>
