<template>
  <div class="storeDetail">
    <banner title="门店详情" class="header"></banner>
    <tabUI :list="tabList" @getIndex="getIndex" />
    <div class="content" v-if="tabList[0].status">
      <storeData :id="id" type="shop" />
    </div>
    <storeEmployeeList :id="id"  v-else/>
  </div>
</template>

<script>
import banner from '../../components/banner'
import tabUI from '../../components/work/storeDailyReport/tabUI'
import storeData from '../../components/work/store/storeData'
import storeEmployeeList from '../../components/work/store/storeEmployeeList'
import { IndexModel } from "../../utils/"
import mango from "../../js"
import { mapMutations } from 'vuex';
const indexModel = new IndexModel()
export default {
  name: 'storeDetail',
  components:{
    banner,
    tabUI,
    storeData,
    storeEmployeeList
  },
  props:['id','name'],
  data(){
    return{
      tabList:[{title:'门店数据',status:true},{title:'门店员工',status:false}]
    }
  },
  computed: {

  },
  created() {
    
  },
  mounted() {
    
  },
  beforeRouteEnter(to,from,next){
    if(from.name==="employeeDetail"){
      next(vm => {
        vm.getIndex(1)
      })
    }else{
      next()
    }
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
    padding-top:33vw;
  }
  
}
</style>
