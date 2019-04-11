<template>
  <div class="enquiryInfo">
    <!-- <div class="header" :style="{'height':`${height}vw`,'marginTop':`${marginTop}vw`}">
      <div class="backicon">
        <div class="back-icon" @click="goBack()">
          <img src="../../assets/imgs/backicon.png" alt>
        </div>
        <span>订单详情</span>
      </div>
      <div class="content">
        <p>{{ orderInfoDetails.orderStatus}}</p>
        <div class="photo"></div>
      </div>
    </div> -->
    <deal-header :list='list'/>
    <ul class="infoNav">
      <li  class="infoNavLi"
        v-for="(item,index) in dealTabStatus" :key="index" 
        @click="clickTab(index)"
        :class="{'active' : dealTabStatus[index].status}">
        {{item.name}}
      </li>
    </ul> 
    <!-- 订单信息-->
    <order-info v-show="dealTabStatus[0].status" :list='list' />
    <!-- 客户信息-->
    <div v-show="dealTabStatus[1].status">
      <customer-msg :list="list" :editMsg='editMsg' v-if='!editStatus'/>
      <div v-else>
        <newDescript />
        <btn @click.native="saveMsg()" :text="'保存资料'" class="theBtn"></btn>
      </div>
    </div>
    <!-- 意向信息-->
    <intentionMsg v-show="dealTabStatus[2].status"/>
    <!-- <EnquiryOrderInfo v-show="dealTabStatus[1].status"/> -->
    <!-- <div class="line"></div> -->
    <!-- <orderInfoDetails/> -->
  </div>
</template>

<script>
import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import newDescript from '../../components/customer/newCustomerInfo/newDescript'
import OrderInfo from '../../components/customer/dealCustomer/orderInfo'
import CustomerMsg from '../../components/customer/customerShare/customerMsg'
import intentionMsg from '../../components/customer/customerShare/intentionMsg'
import btn from "../../components/btn";
import Vuex, { mapMutations, mapState } from "vuex";
import mango from "../../js";
import EnquiryOrderInfo from "../../components/customer/enquiryOrder/enquiryOrderInfo";
import orderInfoDetails from "../../components/customer/dealCustomer/orderInfoDetails";
import {explainType} from '../../utils/customer'
export default {
  components: { EnquiryOrderInfo, orderInfoDetails, dealHeader, OrderInfo, CustomerMsg, newDescript, btn, intentionMsg },
  data() {
    return {
      list: {},
      type: [],
      editStatus: false
    };
  },
  computed: {
    ...mapState({
      orderInfoDetails: state => state.orderInfoDetails.orderInfoDetails,
      dealTabStatus: state => state.tabStatus.dealTabStatus
    })
  },
  created() {
    this.getStatus()
    this.getData()
  },
  methods: {
    ...mapMutations(['setDealTabStatus']),
    getData() {
      //从父级传id过来请求
      mango.getAjax('/v3/app/customer/details', {
        type: 'order',
        customerId: this.$route.query.id
      }).then(res => {
        if(res.data) {
          this.list = res.data
          let arr = this.changeStatus(this.list.orderList)
          this.list.orderList = arr
        }
      })
    },
     //获取status的type数组
    getStatus() {
      this.getType('FS_ORDER_STATUS')
      setTimeout(() => {
        this.type = this._type
      }, 100);
    },
    //更改status
    changeStatus(arr) {
      arr.map(item => {
        item.status = explainType(this.type,item.status)
      })
      return arr
    },
    //编辑按钮
    editMsg(val) {
      this.editStatus = val
    },
    //保存资料
    saveMsg() {
      this.editStatus = false
    },
    //切换顶部导航
    clickTab(index) {
      this.setDealTabStatus(mango.btnList(['订单信息', '客户信息', '意向信息'], index))
    },
    goBack() {
      this.$router.back(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.enquiryInfo {
  width: 100vw;
  min-height: 100vh;
  background: #f8f8f8;
  box-sizing:border-box;
  padding-bottom:4vw;
  .infoNav {
    width: 100%;
    justify-content: space-around;
    box-sizing: border-box;
    .infoNavLi {
      width: 30%;
    }
    .active {
      background: #f8f8f8;
      color: #007aff;
      font-weight: bold;
    }
  } 
  // .header {
  //   width: 100vw;
  //   background-image: linear-gradient(55deg, #007aff 0%, #5ac8fa 100%);
  //   .backicon {
  //     padding: 4.26vw;
  //     padding-top: 10.3vw;
  //     color: #fff;
  //     font-size: 5.06vw;
  //     display: flex;
  //     font-weight: bold;
  //     .back-icon {
  //       padding-right: 8vw;
  //       img {
  //         width: 2.66vw;
  //         height: 4.66vw;
  //       }
  //     }
  //     span {
  //       padding-left: 26.33vw;
  //       line-height: 7vw;
  //     }
  //   }
  //   .content {
  //     color: #fff;
  //     font-size: 4.8vw;
  //     display: flex;
  //     align-items: center;
  //     justify-content: space-around;
  //     .photo {
  //       background: url("../../assets/imgs/order-icon.png");
  //       background-size: 100% 100%;
  //       width: 33.2vw;
  //       height: 21.3vw;
  //       // background: #fff;
  //       // border: 1px solid #e1e1e1
  //     }
  //   }
  // }
  .line {
    margin-bottom: 2vw;
  }
  .theBtn {
    background:rgba(0,122,255,1);
    border: .13vw solid rgba(0,93,194,1);
    width: 80%;
    margin:0 auto;
    // position: absolute;
    // bottom:0;
    // left:10vw;
  }
}

</style>
