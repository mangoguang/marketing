<!-- <keep-alive> -->
<template>
  <header class="header" :style="{'padding-top': `${top}vw`}">
    <div class="top">
      <!-- 模块选择 -->
      <ul :style="{display: !navShow ? 'none' : 'flex'}">
        <li v-for="(item, index) in headerStatus"
        :key="`this.headerStatus${index}`">
          <button 
          :class="{on: item.status}"
          @click="moduleSelect(index)">{{item.name}}</button>
          <button class="search" @click="showNav"></button>
        </li>
      </ul>
      <!-- 搜索组件 -->
      <div :style="{display: navShow ? 'none' : 'flex'}">
        <button @click="showNav(headerStatus)">返回</button>
        <div>
          <input v-model="searchKey" type="text" placeholder="请输入姓名或电话">
          <button @click="searchCustomer">搜索</button>
        </div>
      </div>
    </div>
    <div class="bot-select" v-show="headerStatus[0].status">
      <button @click="showCustomerClassify">{{selectBtnText}}</button>
      <button @click="showRightContainer" >筛选</button>
      <!-- 客户类型选择 -->
      <ul :class="`customerClassify ${ifShow}`">
        <li
          v-for="(item, index) in customerClassifyList"
          :key="`customerClassifyList${index}`"
          :class="{on: item.status}"
          @click="customerClassifySelect(index)"
        >{{item.name}}</li>
      </ul>
    </div>
    <!-- <div class="bot-result">
      <p>查询结果</p>
    </div> -->
    <div class="bot-total" v-show="headerStatus[1].status || headerStatus[2].status">
      <p><slot></slot></p>
      <button @click="showRightTimeSelect">筛选</button>
    </div>
 
  </header>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapMutations, mapState } from 'vuex'
import mango from '../../js'
Vue.use(Vuex)

export default {
  name: 'customerHeader',
  data () {
    return {
      top: '',
      ifShow: 'hide',
      navShow: true,
      ajaxData: {},
      customerClassifyList: mango.btnList(['全部', '紧急降序', '关键降序'], 0),
      selectBtnText: '全部',
      searchKey: '',
      ajaxData:[]
    }
  },
  computed: {
    ...mapState({
      rightHeadTitle: state => state.rightContainer.rightHeadTitle,
      rightTimeSelect: state => state.rightContainer.rightTimeSelect,
      rightContainerStatus: state => state.rightContainer.rightContainerStatus,
      customerAjaxParams: state => state.customer.customerAjaxParams,
      headerStatus: state => state.customerHeader.headerStatus,
      dealCustomerList: state => state.dealCustomerList.dealCustomerList
    })
  },
  watch: {
    'customerAjaxParams': function(val) {
      console.log('变化后的customerAjaxParams参数：', val)
      if (val.page === 1) {
        this.getCustomerList()
      }
    },
    headerStatus(){
      if(this.headerStatus[0].status){
        this.getCustomerList()
      }
    },
    rightContainerStatus(val) {
      console.log(123,this.rightContainerStatus)
      this.getCustomerList()
    }
  },
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    this.customerAjaxParams.account = this.ajaxData.account
    this.customerAjaxParams.tenantId = this.ajaxData.tenantId
    this.customerAjaxParams.account = this.ajaxData.account
    this.customerAjaxParams.key = ''
    this.setCustomerAjaxParams(this.customerAjaxParams)
    if(this.headerStatus[0].status){
      this.getCustomerList()
    }
  },
  mounted() {
    this.isIPhoneX()
  },
  methods:{
    ...mapMutations([
      'setRightContainerStatus',
      'setCustomerList',
      'setCustomerAjaxParams',
      'setHeaderStatus',
      'setAllLoaded',
      'setRightTimeSelect',
      'setRightHeadTitle'
    ]),
    //订单查询成交客户的侧标栏
    showRightTimeSelect() {
      this.setRightTimeSelect(true)
      if(this.headerStatus[1].status) {
        this.setRightHeadTitle('订单交单日期')
      }else{
        this.setRightHeadTitle('最新下单日期')
      }
    },
    // 显示右侧边栏
    showRightContainer() {
      console.log('显示侧边栏。')
      this.setRightContainerStatus('show')
    },
    // 显示类型选择列表
    showCustomerClassify() {
      if (this.ifShow === 'show') {
        this.ifShow = 'hide'
      } else {
        this.ifShow = 'show'
      }
    },
    // 显示导航
    showNav(status) {
      this.navShow = !this.navShow
    },
    // 选择客户类型
    customerClassifySelect(i) {
      this.ifShow = 'hide'
      let [temp, tempObj] = [this.customerAjaxParams, {}]
      // 对象深拷贝
      for (let key in temp) {
        tempObj[key] = temp[key]
      }
      if (this.selectBtnText === '全部' || this.selectBtnText != this.customerClassifyList[i].name) {
        this.selectBtnText = this.customerClassifyList[i].name
        mango.changeBtnStatus(this.customerClassifyList, i)
        switch(i) {
          case 0:
            tempObj.uo = 1
            tempObj.io = 1
            tempObj.page = 1
            tempObj.startTime = ''
            tempObj.endTime = ''
            this.setAllLoaded(false)
            this.setCustomerAjaxParams(tempObj)
            console.log('全部', this.customerAjaxParams)
            break
          case 1:
            tempObj.uo = 1
            tempObj.io = 0
            tempObj.page = 1
            tempObj.startTime = ''
            tempObj.endTime = ''
            this.setAllLoaded(false)
            this.setCustomerAjaxParams(tempObj)
            console.log('紧急降序', this.customerAjaxParams)
            break
          case 2:
            tempObj.uo = 0
            tempObj.io = 1
            tempObj.page = 1
            tempObj.startTime = ''
            tempObj.endTime = ''
            this.setAllLoaded(false)
            this.setCustomerAjaxParams(tempObj)
            console.log('关键降序', this.customerAjaxParams)
            break
          default:
            break
        }
      }
    },
    // 选择页面模块
    moduleSelect(i) {
      this.setHeaderStatus(mango.btnList(['我的客户', '订单查询', '成交客户'], i))
    },
    // ajax请求客户列表
    getCustomerList() {
      // 保证页面挂载是，请求的是第一页的数据。
      this.customerAjaxParams.page = 1
      this.setAllLoaded(false)
      this.setCustomerAjaxParams(this.customerAjaxParams)
      mango.getAjax(this, 'customer', this.customerAjaxParams, 'v2').then((res) => {
        if (res) {
          this.setCustomerList(res.data)
        }
      })
    },
    // 根据手机或名字搜索客户
    searchCustomer() {
      this.$router.push({
        path:'/searchResult',
        query:{
          status:this.headerStatus,
          key:this.searchKey
        }
      })
    },
    isIPhoneX : function(fn){
      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isIOS) {        
          if ((screen.height == 812 && screen.width == 375) || (screen.height == 896 && screen.width == 414)) {
            this.fix = 'fix'
            this.top = '6'
          }
      }
    }
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/common.scss";
header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  box-sizing: border-box;
  padding: 0 4.266vw;
  background: #fff;
  z-index: 999;
  box-sizing: border-box;
  &>div{
    height: 9vw;
    button{
      font-size: 14px;
      color: #666;
    }
    button:first-child{
      padding-left: 0;
    }
  }
  .top{
    margin-top: 5vw;
    position: relative;
    ul{
      display: flex;
    }
    &>div{
      display: flex;
      justify-content: space-between;
      &>button{
        height: 9vw;
        padding: 0 4.5vw;
        border-radius: 4.5vw;
        background: #5ac8fa;
      }
      div{
        // background: $btnCol;
        font-size: 0;
        input, button{
          display: inline-block;
          height: 9vw;
        }
        input{
          width: 45vw;
          background: url(../../assets/imgs/search.png) no-repeat center, #f0f0f0;
          background-size: 3vw 3vw;
          background-position: $btnHeight/2 center;
          padding-left: $btnHeight;
          border-top-left-radius: $btnHeight/2;
          border-bottom-left-radius: $btnHeight/2;
          color: $fontSubCol;
          font-size: 14px;
        }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
          color: $fontSubCol;
        } input:-moz-placeholder, textarea:-moz-placeholder {
          color: $fontSubCol;
        } input::-moz-placeholder, textarea::-moz-placeholder {
          color: $fontSubCol;
        } input:-ms-input-placeholder, textarea:-ms-input-placeholder {
          color: $fontSubCol;
        }
        button{
          background: $btnCol;
          color: #fff;
          padding: 0 $btnHeight/2;
          border-top-right-radius: $btnHeight/2;
          border-bottom-right-radius: $btnHeight/2;
        }
      }
    }
    button.search{
      position: absolute;
      top: 0;
      right: 0;
      width: 9vw;
      height: 9vw;
      background: url(../../assets/imgs/search.png) no-repeat center;
      background-size: 5vw 5vw;
    }
    button.on{
      font-size: 20px;
      color: #363636;
    }
  }
  .bot-select, .bot-result, .bot-total{
    display: flex;
    justify-content: space-between;
    line-height: 9vw;
    button, p{
      color: $fontCol;
      font-size: $fontSize;
    }
  }
  .bot-select {
    display: flex;
    position: relative;
    justify-content: space-between;
    button:first-child, button:last-child {
      padding: 0 3vw 0 0;
      background: url(../../assets/imgs/pullDown.png) no-repeat right 0 center;
      background-size: 2.5vw auto;
    }
    button:last-child {
      padding-left: 3vw;
    }
    button:last-child{
      position: relative;
    }
    button:last-child:after{
      content: '';
      position: absolute;
      display: block;
      width: 1px;
      height: 4vw;
      background: #666;
      top: 50%;
      left: 0;
      margin-top: -2vw;
    }
  }
  .customerClassify{
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 9vw;
    left: -4.266vw;;
    background: rgba(0, 0, 0, .5);
    li{
      height: 9vw;
      background: #f8f8f8;
      padding: 0 4.266vw;
      color:#909090;
    }
    li.on{
      color: #363636;
      background: url(../../assets/imgs/selected.png) no-repeat right 4.266vw center, #f8f8f8;
      background-size: 3vw 3vw;
    }
  }
  .show{
    display: block;
  }
  .hide{
    display: hide;
  }

}
</style>