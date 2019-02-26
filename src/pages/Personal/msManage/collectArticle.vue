<template>
  <div>   
    <yan-list-swipe :dataList="data" class="list"></yan-list-swipe>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import yanListSwipe from "../../../components/msManage/yanListSwipe"
export default {
  components:{
   yanListSwipe
  },
  data(){
    return{
     
    }
  },
  computed:{
   ...mapState({
     data: state => state.collect.articleData
   })
  },
  watch:{
   
  },
  created() {
   
  },
  methods:{
   
  }
}
</script>

<style lang="scss" scoped>


</style>
