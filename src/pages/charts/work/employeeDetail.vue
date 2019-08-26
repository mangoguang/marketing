<template>
  <div class="storeDetail">
    <banner :title="`${name}详情`" class="header"></banner>
    <tabUI :list="tabList" @getIndex="getIndex" />
    <div class="content" v-if="tabList[0].status">
      <storeData :id="id" :shopId="shopId"/>
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
  props:['id','name','shopId'],
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
    ...mapMutations('storeHeader',['setSubHeaderStatus']),
    getIndex(i){
     /*  console.log(i) */
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
  },
  beforeRouteEnter(to,from,next){
    if(from.name==='/CustomerInfo' || from.name === '/enquiryInfo'){
      console.log('customerInfo');
      next(vm => {
        vm.getIndex(1)
      })
    }else{
      next(vm => {
        vm.getIndex(0)
        let array = [
          {
            name:'意向客户',
            status:true
          },
          {
            name:'成交客户',
            status:false
          },
          {
            name:'流失客户',
            status:false
          },
          {
            name:'所有客户',
            status:false
          }
        ]
        vm.setSubHeaderStatus(array);
      })
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
