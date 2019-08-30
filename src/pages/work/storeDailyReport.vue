<template>
  <div class="dailyReport">
    <banner :title="`${_localAjax().typename==='Store Manager'?'日报':'员工日报'}`" class="header">
      <button @click="newPlan" class="newDailyReport" v-if="_localAjax().typename==='Store Manager'&&tabList[0].status"></button>
    </banner>
    <tabUI :list="tabList" @getIndex="getIndex" v-if="_localAjax().typename==='Store Manager'"/>
    <!-- 日历组件 -->
    <div class="perDaily" v-if="_localAjax().typename==='Store Manager'&&tabList[0].status" >
      <storeDailyReport @changeDailySummaryTextarea="changeDailySummaryTextarea" @changeDailyPlanTextarea="changeDailyPlanTextarea"/>
    </div>
    <div v-else >
      <employeeDailyList/>
    </div>
  </div>
</template>
<script>
import banner from '../../components/banner'
import tabUI from '../../components/work/storeDailyReport/tabUI'
import employeeDailyList from '../../components/work/storeDailyReport/employeeDailyList'
import storeDailyReport from '../../components/work/storeDailyReport/storeDailyReport'
import { IndexModel } from "../../utils/"
import mango from "../../js"
import Bus from '../../utils/Bus'
import { mapMutations } from 'vuex';
const indexModel = new IndexModel()
let Base64 = require('js-base64').Base64
export default {
  name: 'dailyReporxt',
  components:{
    banner,
    tabUI,
    employeeDailyList,
    storeDailyReport
  },
  props:[],
  data(){
    return{
      tabList:[{title:'个人日报',status:true},{title:'员工日报',status:false}],
      dailySummaryTextarea:'',
      dailyPlanTextarea:''
    }
  },
  computed: {

  },
  created() {
  },
  mounted() {
    
  },
  methods:{
     // 当日总结子组件触发更改数据
    changeDailySummaryTextarea(str) {
      this.dailySummaryTextarea = str
    },
    // 明日目标及重点工作安排子组件触发更改文本
    changeDailyPlanTextarea(str) {
      this.dailyPlanTextarea = str
    },
    // 跳转新建计划页面
    newPlan() {
      if (this.dailySummaryTextarea === '' && this.dailyPlanTextarea === '') {
        this.$router.push({path: '/newPlan'})
      } else  {
        mango.tip('当日已提交日报，请勿重复提交！')
        return
      }
    },
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
  },
  beforeRouteEnter(to,from,next){
    if(from.name==='employeeDailyReport'){
      next(vm => {
        vm.getIndex(1)
      })
    }else{
      next(vm => {
        vm.getIndex(0)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.dailyReport{
  padding-top: 1px;
  padding-bottom: 4.8vw;
  .perDaily{
     margin-top:30.85vw;
  }
  .header{
    background: #fff;
    border: none;
  }

  .newDailyReport{
    width:17px;
    height:17px;
    background: url("../../assets/imgs/add_02.png") no-repeat center center;
    background-size:17px 17px;
  }
}
</style>
