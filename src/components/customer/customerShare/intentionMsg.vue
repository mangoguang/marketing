<template>
  <div class="intentionMsg">
    <ul>
      <intentionLi 
        v-for="(item, index) in list" :key="index" 
        :list='item' 
        @click.native='toIntentionDetails(index)'/>
    </ul>
    <button @click="newCustomer" class="new" v-if="isedit==='no'?false:true"></button>
  </div>
</template>

<script>
import intentionLi from './intentionLi'
import { mapMutations } from 'vuex'
export default {
  props: ['list','phone','orgId','isedit'],
  components: { intentionLi },
  data(){
    return {
      show:true
    }
  },
  methods: {
     ...mapMutations(['setCheckedList']),
    toIntentionDetails(index) {
      // this.$router.push({path:`/intention/${this.list[index].oppId}`})
      this.$router.push({
        name:'intention',
        params: {
          opportunityId: this.list[index].oppId
        },
        query:{
          phone:this.phone,
          edit:this.isedit
        }
      })
    },
    newCustomer() {
       this.$router.push({path:'newIntention',query: {id:this.$route.query.id,orgId:this.orgId}})
      // this.$router.push({
      //   name:'addintention',
      //   params: {
      //     customerId: this.$route.query.id
      //   },
      //   query:{
      //     url:this.$route.fullPath
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
