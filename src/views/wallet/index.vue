<template>
  <div class="wallet">
    <div class="wallet_head flex flex--row">
      <div class="wallet_head_title flex flex--align-items--center flex--justify-content--space-between">
        <div class="wallet_head_title_return">
          <i class="icon iconfont iconzuobian"></i>
        </div>
        <h3>钱包</h3>
        <van-button class="wallet_head_title_btn" round>提现</van-button>
      </div>
      <div class="wallet_head_box flex flex--align-items--center flex--justify-content--space-between">
        <div class="wallet_head_box_list flex flex--row flex--align-items--center flex--justify-content--space-between">
          <h3>12</h3>
          <p>我的宠物币</p>
        </div>
        <div class="wallet_head_box_list flex flex--row flex--align-items--center flex--justify-content--space-between">
          <b>￥ 0.00</b>
          <p>我的资金</p>
        </div>
      </div>
    </div>

    <div class="wallet_record flex flex--align-items--center flex--justify-content--space-between">
      <p>宠物币充值</p>
      <span>充值记录</span>
    </div>

    <div class="wallet_grid">
      <van-grid
        :column-num="3"
        :gutter="10"
      >
        <van-grid-item
          class="wallet_grid_term"
          v-for="value in 6"
          :key="value"
          text="文字"
        >
          <div
            class="wallet_grid_term_solt wallet_grid_term_solt_active flex flex--row flex--align-items--center"
            slot="default"
          >
            <h3 class="flex flex--align-items--end">
              30
              <span>元</span>
            </h3>
            <p>（10宠物币）</p>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="wallet_agreement">
      <p>
        充值即代表同意
        <span>《用户充值协议》</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wallet'
}
</script>

<style lang="less" scoped>
  .wallet{
    height: 100%;
    .wallet_head{
      height: 169px;
      background: #949cdf;
      border-radius: 0 0 6px 6px;
      .wallet_head_title{
        padding: 3px 15px;
        .wallet_head_title_return{
          width: 50px;
          font-size: 25px;
          color: #fff;
        }
        h3{
          font-size: 17px;
          color: #fff;
        }
        .wallet_head_title_btn{
          height: 24px;
          font-size: 13px;
          font-weight: bold;
          color: #949CDF;
        }
      }
      .wallet_head_box{
        padding: 0 33px;
        flex: 1;
        padding-bottom: 20px;
        .wallet_head_box_list{
          height: 67px;
          h3{
            height: 44px;
            font-size: 31px;
            color: #ffffff;
            line-height: 44px;
            letter-spacing: -1px;
          }
          b{
            font-size: 13px;
            font-weight: normal;
            color: #ffffff;
            letter-spacing: 0px;
            padding-top: 22px;
          }
          p{
            font-size: 13px;
            color: #ffffff;
            line-height: 18px;
          }
        }
      }
    }
    .wallet_record{
      width: 345px;
      margin: 0 auto;
      margin-top: -20px;
      height: 42px;
      background: #3b4279;
      border-radius: 8px 8px 0px 0px;
      padding: 0 18px;
      box-sizing: border-box;
      p,span{
        font-size: 13px;
        color: #f0d2b2;
      }
    }
    .wallet_grid{
      width: 345px;
      margin: 0 auto;
      padding: 12px 0;
      background: #ffffff;
      border-radius: 14px;
      .wallet_grid_term{
        /deep/ .van-grid-item__content--center{
          background: #fff;
          border-radius: 4px;
          padding: 0;
          &::after{
            border: none;
          }
          .wallet_grid_term_solt{
            width: 100%;
            padding: 20px 0;
            border-radius: 4px;
            &.wallet_grid_term_solt_active{
              background: #FEF4E3;
              h3,p{
                color: #E15909;
              }
            }
            h3{
              font-size: 24px;
              color: #E41F35;
              span{
                display: block;
                font-size: 14px;
                margin-left: 3px;
                margin-bottom: 4px;
              }
            }
            p{
              font-size: 11px;
              color: #999999;
              margin-top: 5px;
            }
          }
        }
      }
    }
    .wallet_agreement{
      padding: 24px 15px;
      p{
        font-size: 12px;
        color: #333;
      }
    }
  }
</style>
