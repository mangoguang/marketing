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
import { mapState } from 'vuex'
import mybanner from '../../../components/banner'
export default {
  components: {
    mybanner
  },
  data() {
    return {
      // msg: '',
      title: '检查标准'
    }
  },
  mounted() {
    // this.msg = this.$route.query.remark.replace(/\\n/g, '<br>')
    document.querySelector('#app').scrollTop = 0
  },
  computed: {
    ...mapState({
      checkingMsg(state) {
        return state.eggRecordDetails.checkingMsg
      },
      checkLevelMsg(state) {
        return state.eggRecordDetails.checkLevelMsg
      },
      msg() {
        if (this.$route.query.name == 'level') {
          return this.checkLevelMsg.replace(/\\n/g, '<br>')
        } else {
          return this.checkingMsg.replace(/\\n/g, '<br>')
        }
      }
    })
  },
  methods: {}
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
    word-break: break-all;
  }
}
</style>