<template>
  <div class="video">
    <div class="video_content flex flex--row flex--align-items--center">
      <h3>星宠视频</h3>
      <div class="flex flex--align-items--center">
        <img :src="videoData.user_info.portrait" alt="">
        <p>{{ videoData.user_info.name }}</p>
      </div>
      <p class="video_content_title">{{ videoData.title }}放哪了独守空房第三方简单来时发动机了疯狂送快递反馈第三方科技</p>
    </div>
    <video
      width="100%"
      class="video_play"
      :src="videoData.url"
      poster=""
      :controls="true"
    ></video>

    <div class="video_btn" @click="clickDownLoad">立即前往APP</div>
  </div>
</template>

<script>
import { videoDetail } from '@/api/cart'
export default {
  name: 'video',
  data () {
    return {
      token: '',
      id: '',
      videoData: ''
    }
  },
  created () {
    this.token = this.$route.query.token
    this.id = this.$route.query.id
    this.getVideoDetail()
  },
  methods: {
    async getVideoDetail () {
      const { data } = await videoDetail({
        token: this.token,
        id: this.id
      })

      console.log(data)
      this.videoData = data.response_data[0]
    },
    clickDownLoad () {
      if (navigator.userAgent.match(/MicroMessenger/i)) {
        this.$dialog.alert({
          message: '请用浏览器打开可跳转！',
          overlay: true,
          closeOnClickOverlay: true
        })
        return
      }

      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        const loadDateTime = new Date()
        // schema链接或者universal link
        window.location = 'xingchongapp://'
        // window.setTimeout(() => {
        //   // 如果没有安装app,便会执行setTimeout跳转下载页
        var timeOutDateTime = new Date()
        if (timeOutDateTime - loadDateTime < 5000) {
        //     window.location = '' // ios下载地址
        } else {
        //     window.close()
        }
        // }, 500)
      } else if (navigator.userAgent.match(/android/i)) {
        try {
          window.location = 'xingchong://android/attr' // schema链接或者universal link
          // setTimeout(function () {
          //   window.location = '' // android下载地址
          // }, 500)
        } catch (e) {}
      } else {
        try {
          window.location = 'xingchong://android/attr' // schema链接或者universal link
          // setTimeout(() => {
          //   window.location = '' // android下载地址
          // }, 500)
        } catch (e) {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.video_btn {
  width: 265px;
  height: 36px;
  background: #949cdf;
  border-radius: 2px;
  text-align: center;
  line-height: 36px;
  font-size: 16px;
  color: #fff;
  position: fixed;
  bottom: 120px;
  left: 50%;
  margin-left: -132px;
}
.video_content {
  background: #fff;
  padding: 0 15px;
  width: 100%;
  box-sizing: border-box;
  h3 {
    width: 100%;
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
  }
  div {
    width: 100%;
    box-sizing: border-box;
    img {
      width: 50px;
      border-radius: 50%;
    }
    p {
      font-size: 16px;
      color: #333;
      margin-left: 15px;
    }
  }
  .video_content_title {
    width: 100%;
    font-size: 15px;
    color: #333;
    padding: 0 0 15px 0;
  }
}
</style>
