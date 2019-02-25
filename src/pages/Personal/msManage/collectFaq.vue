<template>
  <div>
    <yan-cell-arrow v-for="(item,index) in list" :key="index">{{item.title}}</yan-cell-arrow>
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
          {
            title: '床垫除螨哪种工具最好？', // 问题标题
            questionId: '20190220123' // 问题id
          },
           {
            title: '客户投诉怎么处理？', // 问题标题
            questionId: '20190220123'// 问题id
          },
           {
            title: '按摩椅怎么安装？', // 问题标题
            questionId: '20190220123' // 问题id
          },
           {
            title: '床架怎么安装？', // 问题标题
            questionId: '20190220123' // 问题id
          },
           {
            title: '床垫除螨哪种工具最好？', // 问题标题
            questionId: '20190220123'// 问题id
          },
           {
            title: '客户投诉怎么处理？', // 问题标题
            questionId: '20190220123' // 问题id
          },
           {
            title: '客户投诉怎么处理？', // 问题标题
            questionId: '20190220123' // 问题id
          },
           {
            title: '按摩椅怎么安装？', // 问题标题
            questionId: '20190220123' // 问题id
          },
           {
            title: '床架怎么安装？', // 问题标题
            questionId: '20190220123' // 问题id
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
