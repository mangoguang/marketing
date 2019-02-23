<template>
  <div>   
    <yan-list-swipe :dataList="data" class="list"></yan-list-swipe>
  </div>
</template>

<script>
import yanListSwipe from "../../../components/msManage/yanListSwipe"

export default {
  components:{
   yanListSwipe
    
  },
  data(){
    return{
      data:[
          {
            title:'慕思产品三包服务政策详解',
            time:'2019-02-20',
            articleId:'201905201234',
            top:true
          },
          {
            title:'慕思产品三包服务政策详解2',
            time:'2019-02-21',
            articleId:'201905211234',
            top:false
          },
          {
            title:'慕思产品三包服务政策详解3',
            time:'2019-02-22',
            articleId:'201905221234',
            top:true
          }
        ]
    }
  },
  computed:{
   
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
