<!-- <keep-alive> -->
<template>
  <header class="header" :style="{'padding-top': `${top}vw`}">
    <div class="top">
       <!-- 搜索组件 -->
      <div class="search">
        <h1>客户</h1>
        <!-- <button @click="showNav(headerStatus)">返回</button> -->
        <form action='' @submit.prevent>
          <input ref="inpComp" class="input"
              v-model="searchKey" 
              type="search" 
              placeholder="请输入姓名或电话或微信号"
              @keypress="search">
        <!-- <button @click="searchCustomer">搜索</button> -->
        </form>
      </div>
      <!-- 模块选择 -->
      <ul :style="{display: !navShow ? 'none' : 'flex'}">
        <li v-for="(item, index) in headerStatus"
        :key="`this.headerStatus${index}`">
          <button 
          class="topBarTitle"
          :class="{on: item.status}"
          @click="moduleSelect(index)">
          <!-- <img src="../../assets/imgs/customer-icon.png" class="topBarimg"> -->
          {{item.name}}
          </button>
          <!-- <button class="search" @click="showNav"></button> -->
        </li>
      </ul>
    </div>
    <div class="bot-select" v-show="headerStatus[0].status">
      <button @click="showCustomerClassify">{{selectBtnText}}</button>
      <button @click="showRightContainer" class="filter">
        <span class="line"></span>
        筛选 
        <img src="../../assets/imgs/filter.png" alt="" class="filterImg">
      </button>
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
      <button @click="showRightTimeSelect">
        <span class="line"></span>
        筛选
        <img src="../../assets/imgs/filter.png" alt="" class="filterImg">
      </button>
    </div>
 
  </header>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapMutations, mapState } from 'vuex'
import mango from '../../js'
import { deepclone } from "../../utils/customer";
Vue.use(Vuex)
export default {
  name: 'customerHeader',
  props: ['changeResultTit'],
  data () {
    return {
      top: '',
      ifShow: 'hide',
      navShow: true,
      ajaxData: {},
      customerClassifyList: mango.btnList(['全部', '紧急降序', '级别A到C', '级别C到A'], 0),
      selectBtnText: '全部',
      searchKey: '',
      ajaxData:[],
      key: true
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
      // console.log('变化后的customerAjaxParams参数：', val)
      if (val.page === 1 && this.key) {
        this.getCustomerList()
      }
    },
    headerStatus(){
      if(this.headerStatus[0].status){
        this.getCustomerList()
      }
    },
    rightContainerStatus(val) {
      this.key = false
      if(val === 'hideRightContainer') {
        this.getCustomerList()
        this.key = true
      }
    }
  },
  created() {
    // 获取本地存储信息
    this.customerAjaxParams.type = 'New'
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
      'setRightHeadTitle',
      'setOrderList',
      'setDealCustomerList'
    ]),
    //搜索
    search(event) {
      if (event.keyCode == 13) { //如果按的是enter键 13是enter 
        event.preventDefault(); //禁止默认事件（默认是换行） 
        // this.$refs.inpComp.blur()
        this.searchCustomer()
      }
    },
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
      // console.log('显示侧边栏。')
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
    // showNav(status) {
    //   this.navShow = !this.navShow
    // },
    // 选择客户类型
    customerClassifySelect(i) {
      this.ifShow = 'hide'
      let parmas = deepclone(this.customerAjaxParams, {})
      if (this.selectBtnText === '全部' || this.selectBtnText != this.customerClassifyList[i].name) {
        this.selectBtnText = this.customerClassifyList[i].name
        mango.changeBtnStatus(this.customerClassifyList, i)
        switch(i) {
          case 0:
            parmas.sort = ''
            parmas.u = ''
            parmas.sd = ''
            parmas.ed = ''
            parmas.l = ''
            this.setAllLoaded(false)
            this.setCustomerAjaxParams(parmas)
            // console.log('全部', this.customerAjaxParams)
            break
          case 1:
            parmas.sort = 'u'
            parmas.u = ''
            parmas.sd = ''
            parmas.ed = ''
            parmas.l = ''
            this.setAllLoaded(false)
            this.setCustomerAjaxParams(parmas)
            // console.log('紧急降序', this.customerAjaxParams)
            break
          case 2:
            parmas.sort = 'la'
            parmas.u = ''
            parmas.sd = ''
            parmas.ed = ''
            parmas.l = ''
            this.setAllLoaded(false)
            this.setCustomerAjaxParams(parmas)
            // console.log('级别降序', this.customerAjaxParams)
            break
          case 3:
            parmas.sort = 'ld'
            parmas.u = ''
            parmas.sd = ''
            parmas.ed = ''
            parmas.l = ''
            this.setAllLoaded(false)
            this.setCustomerAjaxParams(parmas)
            // console.log('级别降序', this.customerAjaxParams)
            break
          default:
            break
        }
      }
    },
    // 选择页面模块
    moduleSelect(i) {
      this.setHeaderStatus(mango.btnList(['意向客户', '成交客户', '战败客户'], i))
    },
    // ajax请求客户列表
    getCustomerList() {
      // 保证页面挂载是，请求的是第一页的数据。
      this.customerAjaxParams.page = 1
      this.setAllLoaded(false)
      this.setCustomerAjaxParams(this.customerAjaxParams)
      mango.getAjax('/v3/app/customer/list', this.customerAjaxParams).then((res) => {
        if (res) {
          this.setCustomerList(res.data)
        }
      })
    },
    // 根据手机或名字搜索客户
    searchCustomer() {
       mango.changeBtnStatus(this.customerClassifyList, 0)
      let type = this.getType()
       let parmas = {
        type: type,
        key: this.searchKey
      }
      // this.setCustomerAjaxParams(parmas)
       mango.getAjax('/v3/app/customer/list', parmas).then((res) => {
        if (res.data) {
          if(type === 'New') {
            this.setCustomerList(res.data)
          }else if(type === 'Approved') {
            this.setOrderList(res.data)
            this.$emit(
              "changeResultTit",
              `全部客户 (${
                res.data.total == null ? "0" : res.data.total
              })`
            );
          }else {
            this.setDealCustomerList(res.data)
            this.$emit(
              "changeResultTit",
              `全部客户 (${
                res.data.total == null ? "0" : res.data.total
              })`
            );
          }
        }
      })
    },
    //获得当前的头部导航栏状态
    getType() {
      let type;
      type = this.headerStatus[0].status? 'New' : this.headerStatus[1].status? 'Approved' : 'Closed'
      return type;
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
  // height: 46.66vw;
  background-image: linear-gradient(32deg, 
		#007aff 0%, 
		#5ac8fa 100%);
	box-shadow: 0px 1px 2px 0px 
		rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  box-sizing: border-box;
  padding: 1vw 4.266vw;
  // background: #fff;
  z-index: 100;
  box-sizing: border-box;
  &>div{
    // height: 9vw;
    button{
      font-size: 4.26vw;
      color: #fff;
      text-align: center;
    }
    button:first-child{
      // padding-left: 0;
      color: #fff;
      // font-size: 4.8vw;
    }
  }
  .top{
    margin-top: 5vw;
    position: relative;
    .search {
      display: flex;
      align-items: center;
      justify-content: space-around;
      h1 {
        font-size: 8vw;
        color: #fff;
        font-weight: bold;
        margin-left: -3vw;
      } 
    }
    ul{
      display: flex;
      margin-top: 3.26vw;
      justify-content: space-around;
      margin-bottom: 3.26vw;
      width: 100%;
      box-sizing: border-box;
      li {
        // margin-left: 7.73vw;
        text-align: center;
        box-sizing: border-box;
      }
    }
    &>div{
      display: flex;
      justify-content: space-around;
      &>button{
        height: 9vw;
        padding: 0 4.5vw;
        border-radius: 4.5vw;
        background: #5ac8fa;
      }
      // div{
      //   // background: $btnCol;
      //   font-size: 0;
      //   input, button{
      //     display: inline-block;
      //     height: 9vw;
      //   }
        .input{
          color: #fff;
          width: 65.33vw;
          line-height: 8vw;
          background: url('../../assets/imgs/search.png') no-repeat center;
          background-size: 3vw 3vw;
          background-position: $btnHeight/2 center;
          padding-left: $btnHeight;
          border-top-left-radius: $btnHeight/2;
          border-bottom-left-radius: $btnHeight/2;
          border-top-right-radius: $btnHeight/2;
          border-bottom-right-radius: $btnHeight/2;
          font-size: 14px;
          background-color: rgba(255, 255, 255, .2);
        }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
          color: #fff;
        } input:-moz-placeholder, textarea:-moz-placeholder {
          color: #fff;
        } input::-moz-placeholder, textarea::-moz-placeholder {
          color: #fff;
        } input:-ms-input-placeholder, textarea:-ms-input-placeholder {
          color: #fff;
        }
        button{
          background: $btnCol;
          color: #fff;
          padding: 0 $btnHeight/2;
          border-top-right-radius: $btnHeight/2;
          border-bottom-right-radius: $btnHeight/2;
        }
      // }
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
      font-size: 4.8vw;
      color: #fff;
      border-bottom: .8vw solid #fff;
      border-radius: .26vw;
      opacity: 0.8;
      .topBarimg{
        width: 3vw;
        // height: 3.6vw;
      }
    }
  }
  .bot-select, .bot-result, .bot-total{
    display: flex;
    justify-content: space-between;
    line-height: 9vw;
    color: #fff;
    button, p{
      // color: $fontCol;
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
    top: 6vw;
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
  .topBarTitle{
    opacity: 0.5;
  }
  .filter{
    color: #fff!important;
    // border-left: 1px solid #fff;
  }
  .topBarimg{
    width: 2.4vw;
    // height: 2.8vw;
  }
  .filterImg{
    width: 2.4vw;
    height: 2.6vw;
  }
  .line{
    line-height: 3vw;
    margin-right: 2vw;
    border-left: 1px solid #fff;
  }
}
</style>