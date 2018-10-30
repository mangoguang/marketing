<template>
  <div class="reportForms" :style="{overflow:`${overflow}`}">
    <div :class="`${fix}`"></div>
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
        <li v-for="(forms,index) in x" :key="index" @touchend="linkTo(index)" :class="`${index}`">
          <div class="icon" :style="{background:t[index].color}">
            <div class="icon-forms">
              <img :src ="`./static/images/char${index+1}.png`" alt="">
            </div>
          </div>
          <p>{{t[index].text}}</p>
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

export default {
  components:{
    Footer
  },
  data(){
    return{
      t:'',
      fix:'',
      overflow:'hidden',
      forms:[
        {
          color:'#007aff',text:'销售额'
        },{
          color:'#5856d6',text:'铁三角'
        },{
          color:'#5ac8fa',text:'品牌'
        },{
          color:'#ff2d55',text:'品类'
        },{
          color:'#ff964b',text:'坪效'
        },{
          color:'#ffcc00',text:'人效'
        },{
          color:'#f93580',text:'客户来源'
        }

      ],
      x:7
    }
  },
  created(){
    this.checkLogin()
    this.t = this.forms
  //  console.log(this.forms[0].text)
    
  },
  mounted(){
    this.isIPhoneX()
  },
  methods:{
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
     
    },
    isIPhoneX : function(){
      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isIOS) {        
          if ((screen.height == 812 && screen.width == 375) || (screen.height == 896 && screen.width == 414)) {
            this.fix = 'fix'
            this.overflow = ''
          }else{
            this.overflow = 'hidden'
          } 
      }
    }
     
  }
}
</script>

<style lang="scss" scoped>

.reportForms{
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
          .icon-forms img{
            width: 11.46vw;
            height: 12vw;
            position: absolute;
            top: 4vw;
            left: 4.4vw;
          }
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
