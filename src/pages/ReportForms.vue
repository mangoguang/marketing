<template>
  <div class="reportForms" :style="{overflow:`${myStyle.formOverFlow}`}">
    <div :class="`${myStyle.loginFix}`"></div>
    <div class="search">
      <div class="search-icon"></div>
      <input type="text" placeholder="请输入门店、职员、品牌、产品等关键字" >
    </div>
    <div class="topList">
      <div class="shopTop"></div>
      <div class="peopleTop"></div>
    </div>
    <div class="forms">
      <div class="title">报表模块</div>
      <ul>
        <li v-for="(item,index) in forms" :key="index" @click="linkTo(index)" :class="`${index}`">
          <div class="icon" :style="{background:item.color}">
            <div class="icon-forms" :style="{'background-position':`${item.iconPosition}`}" >
              <!-- <img :src ="`./static/images/char${index+1}.png`" alt=""> -->
            </div>
          </div>
          <p>{{item.text}}</p>
        </li>
      </ul>
    </div>
    <Footer/>
  </div>
</template>


<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Footer from '../components/Footer'
import mango from '../js'

export default {
  components:{
    Footer
  },
  data(){
    return{
      forms:[
        {
          color:'#007aff',text:'销售额',iconPosition:'158.4vw -2vw'
        },{
          color:'#5856d6',text:'铁三角',iconPosition:'135.4vw -2vw'
        },{
          color:'#5ac8fa',text:'品牌',iconPosition:'112.8vw -1.8vw'
        },{
          color:'#ff2d55',text:'品类',iconPosition:'90.4vw -1.8vw'
        },{
          color:'#ff964b',text:'坪效',iconPosition:'67.4vw -1.8vw'
        },{
          color:'#ffcc00',text:'人效',iconPosition:'45vw -2vw'
        },{
          color:'#f93580',text:'客户来源',iconPosition:'22vw -2vw'
        }
      ],
      slots: [
        {
          flex: 1,
          values: ['2015年-01月', '2015年-02月', '2015年-03月', '2015年-04月', '2015年-05月', '2015年-06月'],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },
  created(){
    this.checkLogin()
  //  console.log(this.forms[0].text)
    localStorage.removeItem('limit');    
  },
  mounted() {
    if (mango.version === 'app') {
      console.log(api.deviceId)
    }
  },
  props:['myStyle'],
  methods:{
    cancle() {

    },
    checkLogin() {
      let ajaxData = localStorage.getItem('ajaxData')
      // console.log(Date.parse(new Date()) - timeLong)
      if (!ajaxData) {
        this.$router.push({path: './Login'})
        return
      } else {
        let timeLong = JSON.parse(ajaxData).timestamp
        timeLong = Date.parse(new Date()) - JSON.parse(ajaxData).timestamp
        timeLong = timeLong/(60 * 60 * 24 * 1000)
        if (timeLong > 10) {
          this.$router.push({path: './Login'})
          return
        }
      }
    },
    linkTo:function(index){
      if(index == 0){
        this.$router.push({path:'/sales'})
      }else if(index == 1){
        this.$router.push({path:'/audioTechnica'})
      }else if(index == 2){
        this.$router.push({path:'/brand?type=brand'})
      }else if(index == 3){
        this.$router.push({path:'/brand?type=category'})
      }else if(index == 4){
        this.$router.push({path:'/areaEffectiveness'})
      }else if(index == 5){
        this.$router.push({path:'/peopleWork'})
      }else if(index == 6){
        this.$router.push({path:'/customerSource'})
      }
     
    }
     
  }
}
</script>

<style lang="scss" scoped>

.reportForms{
  font-family: PINGPANG;
  background: #f8f8f8;
  position: relative;
   .fix{
      position: absolute;
      background: #f8f8f8;
      left: 0;
      top: -14vw;
      height: 14.1vw;
      width: 100vw;
      z-index: 99;
    }
  .search{
    height: 7.73vw;
    width: 91.46vw;
    border-radius:2.66vw;
    margin: 3vw auto;
    background: #e1e1e1;
    position: relative;
    margin-top: 8vw;
    .search-icon{
      background: url(../assets/imgs/search.png) no-repeat;
      background-size: 100% 100%;
      width: 3.2vw;
      height: 3.2vw;
      position: absolute;
      top: 2.4vw;
      left: 3vw;
    }
    input{
      width: 80vw;
      padding-left: 7vw;
      height: 7.73vw;
      font-size: 3.2vw;
      color: #8e8e93;
    }
  }
  .topList{
    width: 100vw;
    height: 26.66vw;
    border-top: 1px solid #a6a6a6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .shopTop{
      background: url(../assets/imgs/shopTop.png) no-repeat;
      background-size: 100% 100%;
      width: 44vw;
      height: 21.33vw;
      margin-left: 4.26vw;
    }
    .peopleTop{
      background: url(../assets/imgs/peopleTop.png) no-repeat;
      background-size: 100% 100%;
      width: 44vw;
      height: 21.33vw;
      margin-right: 4.26vw;
    }
  }
  .forms{
    width: 100vw;
    background: #fff;
    padding-bottom: 30vw;
    .title{
      font-size: 4.8vw;
      font-weight: bold;
      color: #363636;
      margin: 0 auto;
      text-align: center;
      line-height: 10.66vw;
      border-bottom: 4px solid #363636;
      width: 26.66vw;
    }
    ul{
      width: 87.06vw;
      margin: 0 auto;
      padding-top: 10.8vw;
      border-top: 1px solid #e1e1e1;
      background: #fff;
      height: 100vw;
      li{
        width: 20vw;
        height: 26.66vw;
        float: left;
        margin-right: 12vw;
        margin-bottom: 8.1vw;
        .icon{
          width: 20vw;
          height: 20vw;
          border-radius: 2.66vw;
          position: relative;
          .icon-forms{
            background-image:url(../assets/imgs/icon.png);
            width:20vw;
            height: 20vw;
            border-radius: 2.66vw;
            background-size: 800%;
          }
          // .icon-forms img{
          //   width: 11.46vw;
          //   height: 12vw;
          //   position: absolute;
          //   top: 4vw;
          //   left: 4.4vw;
          // }
        } 
        p{
          text-align: center;
          color: #666;
          font-size: 4vw;
        }
      }
      li:nth-child(3n){
        margin-right: 0
      }
    }

  }
}
</style>
