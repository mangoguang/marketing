<template>
  <div class="storeDetail">
    <banner :title="`${name}详情`" class="header"></banner>
    <tabUI :list="tabList" @getIndex="getIndex" />
    <div class="content" v-if="tabList[0].status">
      <storeData :id="id"/>
    </div>
   <div v-else >
     <employeeIntention :id="id"/>
   </div>
  </div>
</template>

<script>
import banner from '../../components/banner'
import tabUI from '../../components/work/storeDailyReport/tabUI'
import storeData from '../../components/work/store/storeData'
import employeeIntention from '../customer/storeCustomer/employeeIntention'
import { IndexModel } from "../../utils/"
import mango from "../../js"
import { mapMutations } from 'vuex';
const indexModel = new IndexModel()
export default {
  name: 'employeeDetail',
  components:{
    banner,
    tabUI,
    storeData,
    employeeIntention
  },
  props:['id','name'],
  data(){
    return{
      tabList:[{title:'员工数据',status:true},{title:'意向客户',status:false}]
    }
  },
  computed: {

  },
  created() {
    
  },
  mounted() {
    
  },
  methods:{
    getIndex(i){
      console.log(i)
      let array=this.tabList.map((item,index) => {
        if(index===i){
          item.status=true
        }else{
          item.status=false
        }
        return item;
      })
      this.tabList=array;
    }
  }
}
</script>

<style lang="scss" scoped>

.storeDetail{
  padding-top: 1px;
  padding-bottom: 4.8vw;
  .header{
    background: #fff;
    border: none;
  }
  .content{
    margin-top:33vw;
  }
  
}
</style>
