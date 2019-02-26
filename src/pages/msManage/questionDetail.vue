<template>
  <div class="question">
    questionDetail
  </div>
</template>

<script>
import Vuex, { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
     
    })
  },
  created() {
    
     //获取收藏列表常见问题路由"/collectList"传过来的常见问题questionId
    console.log(this.$route.params.questionId);
  }
}
</script>

<style lang="scss" scoped>

</style>
