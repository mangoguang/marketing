<template>
    <div class="workPlan" ref="workPlan">
        <banner title='工作计划' class="header">
            <button type="button" class="addPlan" @click="newPlan"></button>
        </banner>
        <div class="planContent" v-show="!showList">
            <monthDay @getMonthDate="getMonthDate" :dateList="dateList" @getSelectDate="getSelectDate"/>
            <planTime :list="list"/>
            <div class="btn-box">
                <button type="button" class="switch" ref="switch" @click="switchList"><span>切换至列表</span></button>
            </div>
            
        </div>
        <div class="planContent" v-show="showList">
            <planList :dateList="dateList" :month="month" :year="year" :day="day"/>
            <div class="btn-box"><button type="button" class="switchCalendar" ref="switchCalendar" @click="switchList"><span>切换至日历</span></button></div>
        </div>        
    </div>
</template>
<script>
import banner from '../../components/banner'
import monthDay from '../../components/work/plan/monthDay'
import planTime from '../../components/work/plan/planTime'
import planList from '../../components/work/plan/planList'
import { IndexModel } from '../../utils'
const indexModel = new IndexModel()
export default {
    name:'workPlan',
    data(){
        return {
            showList:false,
            selectDate:'',
            dateList:[],
            list:[],
            year:null,
            month:null,
            day:null
        }
    },
    components:{
        banner,
        monthDay,
        planTime,
        planList
    },
    beforeRouteEnter(to,from,next){
       if(from.name === "work"){
            next(vm => {
                vm.year = new Date().getFullYear();
                vm.month = new Date().getMonth()+1;
                vm.day = new Date(vm.year,vm.month,0).getDate()
                vm.showList = false
            })
        }else{
            next(vm => {
                vm.getPlanList({
                    startDate:`${vm.year}-${vm.month<10?`0${vm.month}`:vm.month}-01`,
                    endDate:`${vm.year}-${vm.month<10?`0${vm.month}`:vm.month}-31`
                })
                vm.getPlanList({
                    startDate:vm.selectDate,
                    endDate:vm.selectDate
                })
            })
           
        }
    },
    created(){
        
    },
    computed:{
        
    },
    mounted(){
        this.$refs.switch.addEventListener('touchstart',function(){
            this.className="switch on"
        },false)
        this.$refs.switch.addEventListener('touchend',function(){
            this.className="switch"
        },false)
        this.$refs.switchCalendar.addEventListener('touchstart',function(){
            this.className="switchCalendar on"
        },false)
        this.$refs.switchCalendar.addEventListener('touchend',function(){
            this.className="switchCalendar"
        },false)
        
    },
    methods:{
        switchList(){
            this.showList=!this.showList;
            this.$refs.workPlan.scrollTop=0;
        },
        newPlan(){
            this.$router.push({path:'/newWorkPlan'})
        },
        getPlanList(obj){
            indexModel.getPlanList(obj).then((res) => {
                //console.log(res)
                if(obj.startDate===obj.endDate){
                    if(res.data.length>0){
                        this.list=res.data[0].dataList
                    }else{
                        console.log(this.list)
                        this.list=[]
                    }
                }else{
                    if(res.data.length>0){
                        this.dateList=res.data
                    }else{
                        this.dateList=[]
                    }
                }
                
            }).catch((reject) => {
                if(reject===510){
                    this.getPlanList(obj)
                }
            })
        },
        getMonthDate(dateObj){
            this.year = dateObj.startDate.split('-')[0]
            this.month = dateObj.startDate.split('-')[1]
            this.day = new Date(this.year,this.month,0).getDate()
            this.getPlanList(dateObj)
        },
        getSelectDate(date){
            if(this.selectDate===date){
                return;
            }
            this.selectDate=date
            this.getPlanList({
                startDate:date,
                endDate:date
            })
        }


    }
}
</script>
<style lang="scss" scoped>
.workPlan{
    height: 100vh;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    position: relative;
    text-align: center;
   .planContent{
       margin-top:19.12vw;
       padding-bottom: 16vw;
   }
    .header{
    background: #fff;
    border: none;
  }
  .addPlan{
    width:17px;
    height:17px;
    background: url("../../assets/imgs/add_02.png") no-repeat;
    background-size: 17px 17px;
  }
  .planTimeList{
      background: #fff;
      border-radius: 2vw;
      margin:1.33vw 4vw 9.06vw;
      text-align: left;
  }
  .switch{
      width:34.866vw;
      height:8.8vw;
      border-radius: 4.4vw;
      border:1px solid #007AFF;
      color:#909090;
      font-size: 15px;
      padding-left:8.533vw;
      background: url('../../assets/imgs/listIcon.png') no-repeat 3.2vw center;
      background-size: 5.33vw 5.33vw;
      margin-bottom:9.06vw;
      background-color:#fff;
  }
  .switch.on{
      background-image:url('../../assets/imgs/listIcon_01.png');
      background-color:#007AFF;
      color:#fff;
  }
  .switchCalendar{
        margin:0 9.06vw;
        width:34.866vw;
        height:8.8vw;
        border-radius: 4.4vw;
        border:1px solid #FF4800;
        color:#909090;
        font-size: 15px;
        padding-left:8.533vw;
        background: url('../../assets/imgs/date_01.png') no-repeat 3.2vw center;
        background-size: 5.33vw 5.33vw;
        margin-bottom:9.06vw;
        background-color:#fff;
  }
  .switchCalendar.on{
      background-image:url('../../assets/imgs/date_02.png');
      background-color:#FF4800;
      color:#fff;
  }
  .btn-box{
      position: fixed;
      bottom:0;
      left:0;
      right:0;
  }
}
 
</style>
