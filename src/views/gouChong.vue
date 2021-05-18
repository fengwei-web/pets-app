<template>
  <div class="gou">
    <div v-html="content"></div>
  </div>
</template>

<script>
import { getPrivacy } from '@/api/cart'
export default {
  data () {
    return {
      content: ''
    }
  },
  created () {
    this.getGouChong()
  },
  methods: {
    async getGouChong () {
      const { data } = await getPrivacy({
        id: 6
      })
      this.content = data.response_data.value
    }
  }
}
</script>

<style>
  .gou {
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    background: #fff;
    overflow: auto;
  }
</style>
