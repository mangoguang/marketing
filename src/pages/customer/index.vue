<template>
  <div class="customer paddingTop">
    <!-- 头部 -->
    <Header/>
    <!-- 客户列表 -->
    <CustomerList/>
    <!-- 右侧边栏 -->
    <RightContainer/>

    <Footer/>
  </div>
</template>


<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'

// 组件
import Footer from '../../components/Footer'
import Header from '../../components/customer/header'
import CustomerList from '../../components/customer/customerList'
import RightContainer from '../../components/customer/rightContainer'
import mango from '../../js'

export default {
  components:{
    Footer,
    Header,
    CustomerList,
    RightContainer
  },
  data(){
    return{

    }
  },
  created(){
    this.checkLogin()
  },
  mounted() {

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
    }
  }
}
</script>

<style lang="scss">
.paddingTop{
  padding-top: 19.6vw;
}
.customer{
  background-color: #f8f8f8;
  height: 100vh;
  box-sizing: border-box;
}
</style>
