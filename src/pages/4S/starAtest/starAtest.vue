<template>
  <div class="starCheckW">
    <AtestHeader title="申请认证"
                 @onSearch="onSearch" />
    <div class="content">
      <AtestCard @getMeg="getMeg"
                 ref="atestcard" />
    </div>

  </div>
</template>

<script>
import AtestHeader from '@/components/4s/starAtest/AtestHeader'
import AtestCard from '@/components/4s/starAtest/AtestCard'


export default {
  components: {
    AtestHeader,
    AtestCard
  },
  data () {
    return {
      name: "",
      tel: ''
    };
  },
  mounted () {
    this.isIPhoneX()
  },
  methods: {
    onSearch (searchVal) {
      this.$refs.atestcard._initData(1, searchVal)
    },
    //对接人信息
    getMeg (val) {
      const { name, tel } = val
      if (this.name === name && this.tel === tel) {
        return
      }
      this.name = name
      this.tel = tel
    },
    isIPhoneX () {
      let phone = this.phoneSize();
      if (phone === "iphonex") {
        this.top = "-5.86";
        this.height = `calc(100vh - 29.5vw)`
        this.headerHeight = 29.5
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.starCheckW {
  background: #f5f5f5;
  box-sizing: border-box;
  // overflow: hidden;
  .header {
    width: 100vw;
    height: 35.33vw;
  }
  .content {
    padding-top: 89.5px;
    width: 100vw;
    // height: calc(100vh - 89.5px);
    overflow: scroll;
  }
}
</style>