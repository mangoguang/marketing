<template>
    <div class="workPlan" ref="workPlan">
        <banner title='工作计划' class="header">
            <button type="button" class="addPlan" @click="newPlan">+</button>
        </banner>
        <div class="planContent" v-show="!showList">
            <monthDay/>
            <planTime/>
            <button type="button" class="switch" ref="switch" @click="switchList"><span>切换至列表</span></button>
        </div>
        <div class="planContent" v-show="showList">
            <planList/>
            <button type="button" class="switchCalendar" ref="switchCalendar" @click="switchList"><span>切换至日历</span></button>
        </div>
        
    </div>
</template>
<script>
import banner from '../../components/banner'
import monthDay from '../../components/work/plan/monthDay'
import planTime from '../../components/work/plan/planTime'
import planList from '../../components/work/plan/planList'
export default {
    name:'workPlan',
    data(){
        return {
            showList:false
        }
    },
    components:{
        banner,
        monthDay,
        planTime,
        planList
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
   }
    .header{
    background: #fff;
    border: none;
  }
  .addPlan{
    font-size: 36px;
    width: 10vw;
    margin-right: 4.8vw;
    font-weight: 300;
  }
  .planTimeList{
      background: #fff;
      border-radius: 2vw;
      margin:1.33vw 4vw 9.06vw;
      text-align: left;
  }
  .switch{
      width:33.866vw;
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
        width:33.866vw;
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
}
 
</style>
