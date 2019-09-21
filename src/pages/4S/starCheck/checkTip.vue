<!--  -->
<template>
  <div class="checkTip">
    <mybanner :title='title' />
    <div class="content">
      <p v-html="msg"
         v-if="msg"></p>
      <p v-else
         class="no-data">无记录</p>
    </div>
  </div>
</template>

<script>
import mybanner from '../../../components/banner'
export default {
  components: {
    mybanner
  },
  data() {
    return {
      msg: '',
      title: '检查标准'
    }
  },
  mounted() {
    this.msg = this.$route.query.remark
    document.querySelector('#app').scrollTop = 0
  }
}
</script>
<style lang='scss' scoped>
.no-data {
  text-align: center;
}
.checkTip {
  width: 100vw;
  .content {
    padding-top: 61px;
    padding-bottom: 107px;
  }
  p {
    color: #666;
    margin-top: 6vw;
    line-height: 1.6em;
    font-size: 14px;
    padding: 0 6vw;
  }
}
</style>