<template>
  <div class="video">
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
          message: '请用浏览器打开可跳转！'
        })
        return
      }
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        var loadDateTime = new Date()
        // schema链接或者universal link
        window.location = 'xingchongapp://'
        window.setTimeout(() => {
          // 如果没有安装app,便会执行setTimeout跳转下载页
          var timeOutDateTime = new Date()
          if (timeOutDateTime - loadDateTime < 5000) {
            window.location = 'http://fx.yqlapp.com/index.php/Home/Help/down' // ios下载地址
          } else {
            window.close()
          }
        }, 500)
      } else if (navigator.userAgent.match(/android/i)) {
        try {
          window.location = 'xingchong://android/attr' // schema链接或者universal link
          window.setTimeout(function () {
            window.location = 'http://fx.yqlapp.com/index.php/Home/Help/down' // android下载地址
          }, 500)
        } catch (e) {}
      } else {
        try {
          window.location = 'xingchong://android/attr' // schema链接或者universal link
          window.setTimeout(() => {
            window.location = 'http://fx.yqlapp.com/index.php/Home/Help/down' // android下载地址
          }, 500)
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
</style>
