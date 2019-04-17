<template>
  <div class="intentionMsg">
    <ul>
      <intentionLi 
        v-for="(item, index) in list" :key="index" 
        :list='item' 
        @click.native='toIntentionDetails(index)'/>
    </ul>
    <button @click="newCustomer" class="new"></button>
  </div>
</template>

<script>
import intentionLi from './intentionLi'
export default {
  props: ['list'],
  components: { intentionLi },
  methods: {
    //0代表新增，1代表跟进,2代表战败，3代表成交       //未完成//传参数
    toIntentionDetails(index) {
      this.$router.push({path:`/intention/${this.list[index].oppId}/${this.$route.query.status}`})
      // this.$router.push({
      //   path:'/intention',
      //   params: {
      //     customerId: this.$route.query.id,
      //     // oppId: this.list[index].oppId,
      //     status: 0
      //   }
      // })
    },
    newCustomer() {
      this.$router.push({path:`/intention/${this.$route.query.id}/${0}`})
      // this.$router.push({
      //   path:'/intention',
      //   params: {
      //     customerId: this.$route.query.id ,
      //     status: 0
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.intentionMsg {
  margin-top: 4vw;
}
</style>
