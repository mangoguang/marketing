<template>
  <div class="oneMonth">
    <div class="monthHeader">
        <div @click="prev">
          <img src="../../../assets/imgs/prev.png" alt="">
        </div>
        <span>{{year}}.{{month < 10 ? `0${month}`:month}}</span>
        <div @click="next">
          <img src="../../../assets/imgs/next.png" alt="">
        </div>
    </div>
    <weekHeader />
    <ul class="weekDay">
          <li class="hasPlan" v-for="(item,index) in 42" :key="index">
            <span 
            :class="`${year}-${month<10?`0${month}`:month}-${item-BeginDay}`===selectDate?'active':''" 
            v-if="item-BeginDay>0&&item-BeginDay <= endDay"
            @click="getSelectDate(`${year}-${month<10?`0${month}`:month}-${item-BeginDay}`)"
            >
              {{item-BeginDay}}
            </span>
          </li>
    </ul>
  </div>
</template>
<script>
import weekHeader from './weekHeader'
export default {
  name: 'monthDay',
  components:{
    weekHeader
  },
  props:[''],
  data(){
    return{
      year: null,
      month: null,
      day: null,
      selectDate:'',
      curDay:''
    }
  },
  created() {
    this.getDate()
    
  },
  computed: {
    BeginDay(){
      return new Date(this.year,this.month-1,1).getDay()
    },
    endDay(){
      return new Date(this.year,this.month,0).getDate()
    },
    prevDay(){
      return new Date(this.year,this.month-1,0).getDate()
    }
  },
  methods:{
    getDate(){
      this.year=new Date().getFullYear()
      this.month=new Date().getMonth()+1
      this.day=new Date().getDate()
      this.curDay=`${this.year}-${this.month<10?`0${this.month}`:this.month}-${this.day<10?`0${this.day}`:this.day}`
      this.selectDate=`${this.year}-${this.month<10?`0${this.month}`:this.month}-${this.day<10?`0${this.day}`:this.day}`
    },
    prev(){
      if(this.month===1){
        this.year--
        this.month=12
      }else{
        this.month--
        
      }
    },
    next(){
      if(this.month===12){
        this.year++
        this.month=1
      }else{
        this.month++
      }
    },
    getSelectDate(date){
      this.selectDate=date
    }
    
  }
}
</script>

<style lang="scss" scoped>
.oneMonth{
  margin:0 4.266vw;
  background: #fff;
  border-radius: 2vw;
  padding-bottom: 4.8vw;
  .monthHeader{
    display: flex;
    line-height: 10.66vw;
    border-bottom: 1px solid #E1E1E1;
    box-sizing: border-box;
    div{
      width:14.28%;
      text-align: center;
    }
    span{
      flex:1;
      text-align: center;
      color:#363636;
      font-size: 4.8vw;
      font-weight: bold;
    }
    img{
      width:2.933vw;
    }
  }
}
.weekDay{
   display: flex;
   flex-direction: row;
   align-items: center;
   flex-wrap: wrap;
   li{
       display: inline-block;
       width:14.28%;
       text-align: center;
       color:#363636;
       font-size: 4.8vw;
       padding-top:2.66vw;
   }
   span:after{
            content: '';
            display: block;
            width:6px;
            height:6px;
            border-radius: 50%;
            background: #ccc;
            text-align: center;
            position: absolute;
            left:50%;
            bottom:-4vw;
            transform: translate(-50%)
    }
    span{
        display: inline-block;
        width:8.53vw;
        height:8.53vw;
        border-radius: 50%;
        background: transparent;
        position: relative;
        margin-bottom: 4.8vw;
    }
    span.active{
        background:#007AFF;
        color:#fff;
    }
    li.hasPlan{
        span:after{
            background: #007AFF    
        }
    }   
    
   
}
</style>
