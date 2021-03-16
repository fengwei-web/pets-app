<template>
  <div class="share">
    <div class="share_head flex flex--align-items--center">
      <img :src="articleData.user_portrait" alt="">
      <div class="share_head_right">
        <h3>{{ articleData.user_name }}</h3>
        <p>{{ articleData.ctime }}</p>
      </div>
    </div>
    <div class="share_title">{{ articleData.content }}</div>
    <div class="share_image flex flex--wrap">
      <van-image
        v-for="(item, index) in articleData.url"
        :key="index"
        :src="item"
        fit="cover"
      ></van-image>
    </div>
    <!-- 评论 -->
    <div class="share_box">
      <div
        class="share_box_list"
        v-for="(item, index) in evaluateList"
        :key="index"
      >
        <div class="share_heads flex flex--align-items--center">
          <img :src="item.user_portrait" alt="">
          <div class="share_head_right">
            <h3>{{ item.user_name }}</h3>
            <p>{{ item.ctime }}</p>
          </div>
        </div>
        <div class="share_titles">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCircleArticleDetails, getEvaluateList } from '@/api/circle'
export default {
  name: 'share',
  data () {
    return {
      token: '',
      id: '',
      articleData: null,
      evaluateList: []
    }
  },
  created () {
    this.token = this.$route.query.token
    this.id = this.$route.query.id
    this.getCircleDetail()
    this.getEvaluateLists()
  },
  methods: {
    async getCircleDetail () {
      const { data } = await getCircleArticleDetails({
        token: this.token,
        id: this.id
      })
      console.log(data)
      this.articleData = data.response_data
    },
    async getEvaluateLists () {
      const { data } = await getEvaluateList({
        token: this.token,
        id: this.id
      })
      this.evaluateList = data.response_data
    }
  }
}
</script>

<style lang="less" scoped>
.share {
  height: 100%;
  // padding: 0 17px;
  background: #fff;
  .share_head {
    padding: 16px 17px;
    img {
      width: 34px;
      height: 34px;
      border-radius: 50%;
    }
    .share_head_right {
      margin-left: 10px;
      h3 {
        font-size: 13px;
        color: #666;
      }
      p {
        font-size: 13px;
        color: #999;
        margin-top: 10px;
      }
    }
  }
  .share_title {
    padding: 0 17px;
    font-size: 13px;
    color: #333;
    line-height: 20px;
  }
  .share_image {
    margin-top: 10px;
    padding: 0 17px;
    .van-image {
      width: 108px;
      height: 108px;
      margin-right: 8px;
      margin-top: 10px;
    }
    .van-image:nth-child(3n) {
      margin-right: 0;
    }
  }
  .share_box {
    margin-top: 30px;
    padding: 0 17px;
    background: #fff;
    .share_box_list {
      padding: 15px 0;
      border-bottom: 1px solid #EEEEEE;
      .share_heads {
        padding: 16px 0;
        img {
          width: 34px;
          height: 34px;
          border-radius: 50%;
        }
        .share_head_right {
          margin-left: 10px;
          h3 {
            font-size: 13px;
            color: #666;
          }
          p {
            font-size: 13px;
            color: #999;
            margin-top: 10px;
          }
        }
      }
      .share_titles {
        padding: 0 17px;
        font-size: 13px;
        color: #333;
        line-height: 20px;
      }
    }
  }
}
</style>
