<template>
  <div>
    <yan-cell-arrow v-for="(item,index) in list" :key="index">{{item}}</yan-cell-arrow>
  </div>
    
</template>

<script>
import yanCellArrow from "../../../components/msManage/yanCellArrow"
export default {
  components:{
   yanCellArrow
  },
  data(){
    return{
        list:[
          "床垫除螨哪种工具最好？",
          "客户投诉怎么处理？",
          "按摩椅怎么安装？",
          "床架怎么安装？",
          "床垫除螨哪种工具最好？",
          "客户投诉怎么处理？",
          "按摩椅怎么安装？",
          "床架怎么安装？",
          "床垫除螨哪种工具最好？"
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
