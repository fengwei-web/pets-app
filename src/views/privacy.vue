<template>
  <div class="privacy">
    <div v-html="privacy.value"></div>
  </div>
</template>

<script>
import { getPrivacy } from '@/api/cart'
export default {
  name: 'privacy',
  data () {
    return {
      privacy: {},
      id: ''
    }
  },
  created () {
    this.getPrivacys()
  },
  methods: {
    async getPrivacys () {
      this.id = this.$route.query.id
      const { data } = await getPrivacy({
        id: this.id
      })
      this.privacy = data.response_data
    }
  }
}
</script>

<style lang="less" scoped>
  .privacy{
    padding: 30px;
  }
</style>
