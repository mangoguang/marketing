<template>
  <div class="dailyBox">
    <ul class="dailyTab" v-if="isShow">
      <li v-for="(item,index) in tabList" :key="index" @click="changeStatus(index)" :class="item.status?'on':''">{{item.name}}</li>
    </ul>
    <div class="dailyBj" :class="isShow?'dailyOn':''">
      <div class="daily">
       <TimeSelect
        @changeDateInterVal="changeDateInterVal" class="time" :key="status"/>
        <DailyUl
        :list="dailyList"  class="dailyUI"/>
      </div>
      
    </div>
  </div>
</template>

<script>
import mango from '../../../js'
import TimeSelect from './timeSelect'
import DailyUl from './dailyUl'
import { IndexModel } from "../../../utils/";
import { mapState } from 'vuex';
const indexModel = new IndexModel();
export default {
  name: 'daily',
  props: [],
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
      },
      tabList:[],
      img:'./static/images/tab.png',
      isShow:false,
      status:''
    }
  },
  computed: {
    ...mapState({
      dateInterVal: state => state.common.dateInterVal
    })
  },
  watch: {
    dateInterVal(val) {
      this.getData(val)
    }
  },
  mounted(){
  },
  created(){
    this.getUser()
  },
  methods:{
    changeStatus(i){
      this.status=i
      let array=this.tabList.map((item,index) => {
        if(index===i){
          item.status=true
        }else{
          item.status=false
        }
        return item;
      })
      this.tabList=array
      this.initData()
    },
    changeDateInterVal(obj) {
      this.getData(obj)
    },
    getDailyData(obj) {
      indexModel.getDailyReport(obj).then((res) => {
        if (res.data) {
          // 更改数据
          this.dailyList = res.data
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.getDailyData(obj)
        }
      })
    },
    getDailyStoreReport(obj){
      indexModel.getDailyStoreReport(obj).then((res) => {
        if (res.data) {
          // 更改数据
          if(this.isShow&&this.tabList[0].status){
            this.dailyList = res.data
          }
          
        }
      }).catch((reject) => {
        if(reject===510){
          this.getDailyStoreReport(obj)
        }
      })
    },
    getUser(){
      let date = new Date()
      const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
      this.curDay = `${year}-${month}-${day}`
      if(this._localAjax().typename === 'Store Manager'){
        this.isShow=true
        this.status=0
        this.tabList=[{name:'门店数据',status:true},{name:"个人数据",status:false}]
        this.initData()
      }else if(this._localAjax().typename === 'Dealer Boss'){
        this.isShow=false
        this.initData()
      }else{
        this.isShow=false
        this.getDailyData({
            startDate: this.curDay,
            endDate: this.curDay
        })
      }
    },
    getData(val){
      if(this.isShow&&this.tabList[0].status){
        this.getParamsAjax(val)
      }else{
        this._localAjax().typename === 'Dealer Boss'?this.getParamsAjax(val):this.getDailyData(val)
      }
    },
    getParamsAjax(val){
      let userId=this._localAjax().userId;
      let temp=Object.assign({},{userId:userId},val)
      this.getDailyStoreReport(temp)
    },
    initData(){
        if(this.isShow&&this.tabList[0].status){
          this.initParamsData()
        }else{
          this._localAjax().typename === 'Dealer Boss'?this.initParamsData():this.getDailyData({
            startDate: this.curDay,
            endDate: this.curDay
          })
        }
    },
    initParamsData(){
      this.getDailyStoreReport({
            userId:this._localAjax().userId,
            startDate: this.curDay,
            endDate: this.curDay
      })
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
      border-bottom: 1px solid #e1e1e1;
    }
    .time{
      background: #fff;
      border-top-left-radius:2vw;
      border-top-right-radius:2vw;
    }
    .dailyUI{
      background: #fff;
      border-bottom-left-radius:2vw;
      border-bottom-right-radius:2vw;
    }
  }
  .dailyOn{
    padding-top:2.66vw;
    background: url('../../../../static/images/bj.png') no-repeat top center;
    background-size:100% 48.266vw;
    .dailyUI{
       background: rgba(255,255,255,.9);
    }
  }
  
  .dailyTab{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index:10;
    li{
      width:28vw;
      height:8vw;
      font-size: 4.266vw;
      color:#363636;
      background: #EFEFF4;
      border-top-left-radius: 5.33vw;
      border-top-right-radius: 5.33vw;
      text-align: center;
      position: relative;

    }
    li:first-child{
      left:2.66vw;
    }
    li.on{
      background: url('../../../../static/images/tab.png') no-repeat center center;
      background-size: 28vw 8vw;
      font-weight: bold;
      z-index:10;
      top:1px;
    }
    
  }
}
  
</style>

