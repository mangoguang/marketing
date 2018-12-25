<template>
  <div class="personalMsg">
    <Header/>
    <ul>
      <li v-for = "(item,index) in ListItem" :key='index' @click="routeTo(index)">
        <span>{{item}}</span>
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
//组件
import btn from '../../components/personal/Btn'
import Footer from '../../components/Footer'
import Header from '../../components/personal/header'

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
      ListItem: [
        '关于我','组织架构','功勋榜','日报'
      ]
    }
  },
  methods:{
    routeTo(index){
      switch (index)
      {
        case 0 :
        console.log(index)
        break;
        case 1 :
        console.log(index)
        break;
        case 2 :
        console.log(index)
        break;
        case 3 :
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
    li{
      border-bottom: 1px solid #e1e1e1;
      height: 12vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon-right{
        padding: 0 4.53vw;
        img{
          width: 1.86vw;
          height: 3.06vw;
        }
      }
    }
  
  }
}

</style>
