<!-- <keep-alive> -->
<template>
  <header class="header" :style="{'margin-top': `${top}vw`}">
    <div class="top">
      <!-- 模块选择 -->
      <!-- <ul>
        <li v-for="(item, index) in moduleList"
        :key="`moduleList${index}`">
          <button 
          :class="{on: item.status}"
          @click="moduleSelect(index)">{{item.name}}</button>
          <button class="search"></button>
        </li>
      </ul> -->
      <div>
        <button>导航</button>
        <div>
          <input type="text">
          <button>搜索</button>
        </div>
      </div>
    </div>
    <div class="bot">
      <button @click="showCustomerClassify">{{selectBtnText}}</button>
      <button @click="showRightContainer">筛选</button>
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
  </header>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(Vuex)
export default {
  name: 'customerHeader',
  props:[],
  data () {
    return {
      top: '',
      ifShow: 'hide',
      customerClassifyList: [
        {
          name: '全部',
          status: true
        }, {
          name: '紧急降序',
          status: false
        }, {
          name: '关键降序',
          status: false
        }
      ],
      moduleList: [
        {
          name: '我的客户',
          status: true
        }, {
          name: '订单查询',
          status: false
        }, {
          name: '成交客户',
          status: false
        }
      ],
      selectBtnText: '全部'
    }
  },
  computed: {
    
  },
  watch:{

  },
  mounted(){

  },
  methods:{
    ...mapMutations([
      'setRightContainerStatus'
    ]),
    showRightContainer() {
      console.log('显示侧边栏。')
      this.setRightContainerStatus('show')
    },
    showCustomerClassify() {
      if (this.ifShow === 'show') {
        this.ifShow = 'hide'
      } else {
        this.ifShow = 'show'
      }
    },
    customerClassifySelect(index) {
      this.ifShow = 'hide'
      this.selectBtnText = this.customerClassifyList[index].name
      this.customerClassifyList.forEach((element, i) => {
        element.status = i === index
      })
    },
    moduleSelect(i) {
      this.moduleList.forEach((element, index) => {
        element.status = i === index
      })
    },
    isIPhoneX : function(fn){
      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isIOS) {        
          if ((screen.height == 812 && screen.width == 375) || (screen.height == 896 && screen.width == 414)) {
            this.fix = 'fix'
            this.top = '6'
            console.log(this.top, 333)
          }else{
            
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
  width: 100vw;
  box-sizing: border-box;
  padding: 0 4.266vw;
  background: #fff;
  z-index: 999;
  &>div{
    height: 9vw;
    button{
      font-size: 14px;
      color: #666;
    }
  }
  .top{
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
          width: 52vw;
          background: #f0f0f0;
          border-top-left-radius: $btnHeight/2;
          border-bottom-left-radius: $btnHeight/2;
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
      right: 4.266vw;
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
  .bot{
    display: flex;
    position: relative;
    justify-content: space-between;
    line-height: 9vw;
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