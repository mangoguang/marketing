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
import { mapMutations } from 'vuex'
export default {
  props: ['list'],
  components: { intentionLi },
  methods: {
     ...mapMutations(['setCheckedList']),
    toIntentionDetails(index) {
      // this.$router.push({path:`/intention/${this.list[index].oppId}`})
      this.$router.push({
        name:'intention',
        params: {
          opportunityId: this.list[index].oppId
        }
      })
    },
    newCustomer() {
      // this.$router.push({path:`/addintention/${this.$route.query.id}`})
      this.$router.push({
        name:'addintention',
        params: {
          customerId: this.$route.query.id
        },
        query:{
          url:this.$route.fullPath
        }
      })
    }
  },
  beforeRouteLeave(to,from,next){
    if(to.name==='addintention'){
      this.setCheckedList([]);
      to.meta.keepAlive=false;
      next();
    }
    next();
  }
}
</script>

<style lang="scss" scoped>
.intentionMsg {
  margin-top: 4vw;
}
</style>
