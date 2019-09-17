<!--  -->
<template>
  <div class="index"
       ref="starCheck">
    <Header :storeClass="$route.query.starLevel" />
    <StarContentBox />
  </div>
</template>

<script>
import Header from '@/components/4s/index/header'
import StarContentBox from '@/components/4s/starCheck/StarContentBox'

export default {
  components: {
    Header,
    StarContentBox
  },
  data() {
    return {}
  },
  mounted() {
    document.querySelector('#app').addEventListener('scroll', this.setScrollTop)
    setTimeout(() => {
      let scrtop = sessionStorage.getItem('starCheckScrollTop')
      document.querySelector('#app').scrollTop = scrtop
    }, 200)
  },
  beforeDestroy() {
    document
      .querySelector('#app')
      .removeEventListener('scroll', this.setScrollTop)
  },
  methods: {
    setScrollTop(e) {
      sessionStorage.setItem('starCheckScrollTop', e.target.scrollTop)
    }
  }
}
</script>
<style lang='scss' scoped>
.index {
  width: 100vw;
}
</style>