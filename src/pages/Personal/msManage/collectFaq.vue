<template>
  <div>
    <yan-cell-arrow v-for="(item,index) in list" :key="index" :path="{name:'/questionDetail',query:{questionId:item.id}}">{{item.title}}</yan-cell-arrow>
  </div>
    
</template>

<script>
import { mapState } from 'vuex'
import yanCellArrow from "../../../components/msManage/yanCellArrow"
export default {
  components:{
   yanCellArrow
  },
  data(){
    return{
        
    }
  },
  computed:{
   ...mapState({
     list: state => state.collect.FaqList
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
