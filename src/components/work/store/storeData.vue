<template>
  <div class="dailyBox">
    <div class="dailyBj">
      <div class="daily">
       <TimeSelect
        @changeDateInterVal="changeDateInterVal" class="time"/>
        <DailyUl
        :list="dailyList"/>
      </div>  
    </div>
  </div>
</template>

<script>
import mango from '../../../js'
import TimeSelect from '../daily/timeSelect'
import DailyUl from '../daily/dailyUl'
import { IndexModel } from "../../../utils/";
import { mapState } from 'vuex';
const indexModel = new IndexModel();
export default {
  name: 'storeData',
  props: ['id','type'],
  components: {TimeSelect, DailyUl},
  data() {
    return{
      dailyList: {
        "cus": 0,   //接待客户数
        "cusBusiness": 0,    //成交客户数
        "guestSingleValue": 0,    //客单值
        "opp": 0,     //新增意向数
        "tourist": 0,    //游客数
        "trackRecord": 0,   //跟进客户
        "turnoverRatio": 0, // 成交率
        "volumeBusiness": 0   //成交金额
      }
    
    }
  },
  computed: {
    ...mapState({
      dateInterVal: state => state.common.dateInterVal
    })
  },
  watch: {
    dateInterVal(val) {
        
        if(this.type==='shop'){
            let temp=Object.assign({},{shopId:this.id},val)
            this.getPerStore(temp)
        }else{
            let temp=Object.assign({},{userId:this.id,QueryYourself:1},val)
            this.getPerEmployee(temp)
        }
    }
  },
  mounted(){
  },
  created(){
    this.initData()
  },
  methods:{
    changeDateInterVal(obj) {
      if(this.type==='shop'){
           let temp=Object.assign({},{shopId:this.id},obj)
           this.getPerStore(temp)
      }else{
          let temp=Object.assign({},{userId:this.id,QueryYourself:1},obj)
          this.getPerEmployee(temp)
      }
     
    },
    getPerStore(obj) {
      indexModel.getPerStore(obj).then((res) => {
        if (res.data) {
          // 更改数据
          this.dailyList = res.data
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.getPerStore(obj)
        }
      })
    },
    getPerEmployee(obj){
        indexModel.getDailyStoreReport(obj).then((res) => {
        if (res.data) {
          // 更改数据
          this.dailyList = res.data
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.getPerEmployee(obj)
        }
      })
    },
    initData(){
        let date = new Date()
        const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
        this.curDay = `${year}-${month}-${day}`
        if(this.type==="shop"){
            this.getPerStore({
                shopId:this.id,
                startDate: this.curDay,
                endDate: this.curDay
            })
        }else{
            this.getPerEmployee({
                userId:this.id,
                startDate: this.curDay,
                endDate: this.curDay,
                QueryYourself:1
            })
        }
        
      
    }
   
   
  }
}
</script>

<style lang="scss" scoped>
.dailyBox{
  .dailyBj{
    width:100vw;
    .daily{
      margin: 0 4.8vw;
      border-radius: 2vw;
      background: #fff;
    }
    .time{
      background: #fff;
      border-top-left-radius:2vw;
      border-top-right-radius:2vw;
    }
    
  }

  
  
}
  
</style>

