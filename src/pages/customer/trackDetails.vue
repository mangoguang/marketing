<template>
  <div class="trackDetalis">
    <mybanner :title="title"/>
    <h1>DR-1103床垫</h1>
    <div class="customer-demand">
      <div class="tilte">
        <p></p>
        <h2>客户需求</h2>
      </div>
      <ul>
        <li v-for="(item,index) in demand" :key="index">
          <div v-for="(value,key) in item" :key="key" class="demand">
            <p>{{key}}</p>
            <span>{{value}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="follow-up-history">
      <div class="tilte">
        <p></p>
        <h2>跟进历史</h2>
      </div>
      <ul>
        <li v-for="(item,index) in trackHistory" :key="index" @click="pullDown(index)">
          <div class="detail-wrapper">
            <span class="time">{{item.time}}</span>
            <span class="people">{{item.person}}</span>
            <p>{{item.howMuch}}</p>
            <div class="icon" >
              <img src="../../assets/imgs/rightside.png" alt="" 
              :class="{'pullDown':`${pulldown}` == index}">
            </div>
          </div>
          <followDetails v-show="i == index"/>
        </li>
      </ul> 
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import mybanner from '../../components/banner';
import followDetails from '../../components/customer/dealCustomer/followDetails'

export default {  
  components:{mybanner,followDetails},
  data() {
    return{
      title:'跟踪详情',
      demand:[
        {'意向产品':'DR-1103床垫'},
        {'颜色偏好':'深海蓝 灰'},
        {'风格偏好':'简约'},
        {'购买原因':'新房购置'},
        {'装修进度':'装修中'},
        {'房间数量':'2'},
        {'客户备注':'挑选了几个心仪的款式'}
      ],
      trackHistory:[
        {time:'2018-10-18',person:'导购A',howMuch:'80%'},
        {time:'2018-10-18',person:'导购A',howMuch:'70%'},
        {time:'2018-10-18',person:'导购B',howMuch:'60%'}
      ],
      pulldown:-1,
      i:-1,
      status:false
    }
  },
  methods:{
    pullDown(index) {
      if(this.status){
        if(this.pulldown == index){
          this.i = -1
          this.status = false
          this.pulldown = -1
        }else{
          this.i = index
          this.pulldown = index  
        }
      }else{
        this.status = true
        this.pulldown = index
         this.i = index
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.trackDetalis{
  color: #363636;
  background: #f8f8f8;
  h1{
    padding-top: 16vw;
    font-size: 5.64vw;
    line-height: 2em;
    padding-left: 4.6vw;
  } 
  .tilte{
    display: flex;
    align-items: center;
    h2{
      font-size: 4vw;
      margin-left: 2vw;
    }
    p{
      background:#007aff;
      width: 0.53vw;
      height: 4vw;
      margin-left: 4.6vw;
    }
  }
  .customer-demand{
    ul{
      border-top:1px solid  #b5b5b5;
      border-bottom: 1px solid #b5b5b5;
      background: #fff;
      padding: 2vw 4vw;
      margin-bottom: 4vw;
      margin-top: 2vw;
      li{
        font-size: 4vw;
        line-height: 2em;
        .demand{
          display: flex;
          p{
            flex: 0.3;
          }
          span{
            flex: 0.7
          }
        }
      }
    }
  }
  .follow-up-history{
    ul{
      border-top:1px solid  #b5b5b5;
      border-bottom: 1px solid #b5b5b5;
      background: #fff;
      margin-bottom: 4vw;
      margin-top: 2vw;
      .detail-wrapper{
        font-size: 4vw;
        line-height: 2em;
        display: flex;
        padding: 1vw 4vw;
        .time{
          flex: 0.35;
        }
        .people{
          flex: 0.65
        }
        p{
          color: #999;
        }
        .icon{
          padding-left:2vw;
          img{
            width: 1.6vw;
            height: 3.2vw;
            transform: rotate(90deg);
          }
          .pullDown{
            transform: rotate(-90deg);    
          }
        }
       
      }
    }
  }
  
}
</style>
