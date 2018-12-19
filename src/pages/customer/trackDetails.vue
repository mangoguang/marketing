<template>
  <div class="trackDetalis">
    <mybanner :title="title">
      <!-- <button v-show="showRecordForm">保存</button> -->
    </mybanner>
    <h1>{{ product }}</h1>
    <div class="customer-demand">
      <div class="tilte">
        <p></p>
        <h2>客户需求</h2>
        <button @click="toChangeDemand" v-show="showRecordForm">更改</button>
      </div>
      <ul>
        <li>
          <p>意向产品</p>
          <span>{{demandList.intention }}</span>
        </li>
        <li>
          <p>颜色偏好</p>
          <span>{{demandList.colorPref }}</span>
        </li>
        <li>
          <p>风格偏好</p>
          <span>{{demandList.stylePref }}</span>
        </li>
        <li>
          <p>购买原因</p>
          <span>{{demandList.buyReason }}</span>
        </li>
        <li>
          <p>装修进度</p>
          <span>{{ demandList.progress }}</span>
        </li>
        <li>
          <p>房间数量</p>
          <span>{{ demandList.roomNum }}</span>
        </li>
        <li>
          <p>客户备注</p>
          <span>{{ demandList.remark }}</span>
        </li>
      </ul>
    </div>
    <!-- 跟进客户 -->
    <div class="recordFormBox" v-show="showRecordForm">
      <record-form @getRecordForm="getRecordForm" />
      <div class="btnBox"><big-btn @click.native="saveRecord" :text="'保存'" /></div>
    </div>
    <div class="follow-up-history">
      <div class="tilte">
        <p></p>
        <h2>跟进历史</h2>
      </div>
      <ul>
        <li v-for="(item,index) in demandList.trList" :key="index" @click="pullDown(index)">
          <div class="detail-wrapper">
            <span class="time">{{item.followTime}}</span>
            <span class="people">{{demandList.intention}}</span>
            <p>{{item.probability}}</p>
            <div class="icon" >
              <img src="../../assets/imgs/rightside.png" alt="" 
              :class="{'pullDown':`${pulldown}` == index}">
            </div>
          </div>
          <followDetails v-show="i == index" />
        </li>
      </ul> 
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex, { mapMutations, mapState } from 'vuex'
import VueRouter from 'vue-router'
import mybanner from '../../components/banner'
import followDetails from '../../components/customer/dealCustomer/followDetails'
import recordForm from '../../components/customer/recordForm'
import bigBtn from '../../components/customer/bigBtn'
import mango from '../../js'
import {returnDate} from '../../utils/customer'

export default {  
  components:{mybanner, followDetails, recordForm, bigBtn},
  computed: {
    ...mapState({
      followTrackDetails: state => state.followTrackDetails.followTrackDetails  
    })
  },
  data() {
    return{
      title:'跟踪详情',
      pulldown:-1,
      i:-1,
      status:false,
      demandId:'',
      demandList:[],
      product:'',
      trList:[],
      showRecordForm: this.$route.query.recordForm,
      recordFormData: {}
    }
  },
  created(){
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    //获取参数
    this.demandId = this.$route.query.demandId 
    this.product = this.$route.query.product 
    this.getTrackDetails()
  },
  methods:{
    ...mapMutations([
      'setFollowTrackDetails',
      'setCustomerDemand'
    ]),
    getRecordForm(obj) {
      this.recordFormData = obj
    },
    //获取数据
    getTrackDetails(){
      mango.getAjax(this, 'demand',{
        demandId:this.demandId
      }, 'v2')
      .then((res) => {
        if (res) {
          this.demandList = res.data
          console.log(1111,this.demandList)
        }
      }) 
    },
    toChangeDemand() {
      this.setCustomerDemand({
        buyReason: this.demandList.buyReason,
        colorPref: this.demandList.colorPref,
        id: this.demandList.id,
        intention: this.demandList.intention,
        progress: this.demandList.progress,
        remark: this.demandList.remark,
        roomNum: this.demandList.roomNum,
        stylePref: this.demandList.stylePref
      })
      this.$router.push({
        path:'/changeDemand'
      })
    },
    saveRecord() {
      let obj = this.recordFormData
      mango.getAjax(this, 'saveTrackRecord', {
        account: this.ajaxData.account,   //登录账户
        demandId: this.$route.query.demandId, 
        probability: `${obj.percent}%`,
        nextFollowTime: returnDate(obj.followTime),
        followPlan: obj.followPlan || '',
        followSituation: obj.followSituation || ''
      },'v2', 'post').then((res) => {
        if (res) {
          this.$router.go(0)
        }
      })
      console.log('传到父组建的recordForm参数', this.recordFormData)
    },
    pullDown(index) {
      // this.trList = this.demandList.trList[index]
      this.setFollowTrackDetails(this.demandList.trList[index])
      // console.log(this.trList)
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
  min-height: 100vh;
  h1{
    padding-top: 16vw;
    font-size: 5.64vw;
    line-height: 2em;
    padding-left: 4.6vw;
  } 
  .tilte{
    display: flex;
    align-items: center;
    position: relative;
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
    button{
      position: absolute;
      right: 5vw;
      line-height: 2em;
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
