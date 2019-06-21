<template>
  <div class="tabCurReport">
    <ul class="dailyTab">
      <li v-for="(item,index) in tabList" :key="index" @click="changeStatus(index)" :class="item.status?'on':''">{{item.name}}</li>
    </ul>
    <div class="dailyBox">
      <div class="daily">
          <H3>{{curDay}}数据</H3>
          <DailyUl
          :list="list" class="dailyStyle"/>
      </div>
    </div>
  </div>
</template>


<script>
import DailyUl from '../daily/dailyUl'
import H3 from '../dailyReport/h3'

export default {
  name: 'curReport',
  components:{
    DailyUl,
    H3
  },
  props:['list', 'curDay'],
  data(){
    return{
      tabList:[
        {
          name:'门店数据',
          status:true
        },
        {
          name:'个人数据',
          status:false
        }
      ]
    }
  },
  created() {
  
  },
  mounted() {

  },
  methods:{
    changeStatus(i){
      let arr = this.tabList.map((item,index) => {
        if(index===i){
          item.status=true
        }else{
          item.status=false
        }
        return item;
      })
      this.tabList = arr
    } 
  }
}
</script>

<style lang="scss" scoped>

.tabCurReport{
  margin-top:19.2vw;
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
        background: url('../../../assets/imgs/tab.png') no-repeat center center;
        background-size: 28vw 8vw;
        font-weight: bold;
        z-index:10;
        top:1px;
      }
      
    }
    .dailyBox{
      width:100vw;
      padding-top:2.66vw;
      background: url('../../../assets/imgs/bj.png') no-repeat top center;
      background-size:100% 48.266vw;
      .daily{
        margin:0 4.266vw;
        background: #fff;
        border-radius: 2.66vw;
      }
    }
  h3{
    position: relative;
    font-size: 4.266vw;
    font-size: 300;
    color: #007fff;
    line-height: 10.66vw;
    height:10.66vw;
    padding-left: 4vw;
    border-bottom: 1px solid #e1e1e1;
  }
  h3:after{
    content: '';
    display: block;
    position: absolute;
    width: 3px;
    height: 20px;
    left: 0;
    top: 50%;
    margin-top: -10px;
    background: #007fff;
  }
}
</style>
