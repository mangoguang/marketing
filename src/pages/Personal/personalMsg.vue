<template>
  <div class="personalMsg">
    <Header/>
    <ul>
      <li v-for = "(item,index) in ListItem" :key='index' @click="routeTo(index)">
        <span v-if="index!==3">{{item}}</span>
        <div v-else class="version"><span>{{item}}</span><span style="color:#666">版本&nbsp;1.0.1</span></div>
        <div class="icon-right">
          <img src="../../assets/imgs/rightside.png" alt="">
        </div>
      </li>
    </ul>
    <btn :text='text' @click.native="quit()"/>
    <Footer/>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapMutations, mapState } from "vuex";
//组件
import btn from '../../components/personal/Btn'
import Footer from '../../components/Footer'
import Header from '../../components/personal/header'
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()

export default {
  name:'personMsg',
  components:{
    Footer,
    Header,
    btn
  },
  data(){
    return{
      text:'退出账号',
      /* ListItem: [
        '关于我','组织架构','功勋榜','日报','我的收藏'
      ] */
      ListItem: [
        '我的收藏','意见反馈','账户安全','关于我们','日报'
      ],
      key: true
    }
  },
  created(){
    // if(this.key) {
    //   this.setTime()
    // }
    this.checkLogin()
  //  console.log(this.forms[0].text)
  //到时候放在初始页面
    localStorage.removeItem('limit');  
    localStorage.removeItem('selectLimit');  
    this.setCustomerScroll(0);
    this.setOrderScroll(0);
    this.setDealScroll(0)
    // this.setIsSelectStatus(false)
    this.$store.commit('setIsSelectStatus', false)
  },
  mounted() {
    console.log('个人中心页面：', this.$root.token)
  },
  methods:{
    ...mapMutations([
      "setCustomerScroll",
      "setOrderScroll",
      'setDealScroll',
      'setIsSelectStatus'
    ]),
    //判断token过期时间，设置定时器
    setTime() {
      this.key = false
      let count = 0
      let time = JSON.parse(localStorage.getItem('loginData')).expires_in
      let timer = setInterval(() => {
        count ++;
        console.log(123,count)
        if(count === time) {
          clearInterval(timer)
          this.key = true
        }
      }, 1000);
    },
    //缓存时间
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
    routeTo(index){
      switch (index)
      {
        case 0 :
        this.$router.push({path: '/collectList'});
        break;
        case 1 :
        this.$router.push({path: '/feedback'});
        break;
        case 2 :
        console.log('账户安全');
        break;
        case 3 :
        this.$router.push({path: '/aboutUs'});
        break;
        case 4 :
        this.$router.push({path: '/dailyPaper'});
        break;
        default:
        return
      }
    },
    quit(){
      localStorage.clear()
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style lang="scss" scoped>
.personalMsg{
  background: #f8f8f8;
  min-height: 100vh;
   .fix{
    width: 100%;
    height: 6vw;
    background: #e1e1e1;
    position: absolute;
    left: 0;
    top: -6vw;
  }
  ul{
    padding-left: 4.13vw;
    font-size: 4vw;
    color: #363636;
    margin-bottom: 8.13vw;
    background: #fff;
    border-bottom: 1px solid #CCC;
    li{
      border-bottom: 1px solid #e1e1e1;
      height: 12vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .version{
        flex:1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .icon-right{
        padding: 0 4.53vw;
        img{
          width: 1.86vw;
          height: 3.06vw;
        }
      }
    }
    li:last-child{
        border:none;
    }
  
  }
}

</style>
