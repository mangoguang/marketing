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
        <newDescript :select='this.list.headPortrait? false : true' :list='list' :areaType='true' :type='"descript"'/>
        <btn @click.native="saveMsg()" :text="'保存资料'" class="theBtn"></btn>
      </div>
    </div>
    <!-- 意向信息-->
    <intentionMsg v-show="dealTabStatus[2].status" :list='list.opportunityList'/>
    <!-- <EnquiryOrderInfo v-show="dealTabStatus[1].status"/> -->
    <!-- <div class="line"></div> -->
    <!-- <orderInfoDetails/> -->
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import {IndexModel} from '../../utils/index'
import variable from '../../js/variable'
const indexModel = new IndexModel()
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
import {btnList} from '../../utils/gallery'
export default {
  components: { EnquiryOrderInfo, orderInfoDetails, dealHeader, OrderInfo, CustomerMsg, newDescript, btn, intentionMsg },
  data() {
    return {
      list: {},
      type: [],
      editStatus: false,
      shops: '',
      shpoId:'',
      index: '',
      phone: ''
    };
  },
  computed: {
    ...mapState({
      orderInfoDetails: state => state.orderInfoDetails.orderInfoDetails,
      dealTabStatus: state => state.tabStatus.dealTabStatus,
      newCustomerInfo: state => state.customer.newCustomerInfo,
      upLoadUrl: state => state.loadImgUrl.upLoadUrl,
      descriptShopVal: state => state.chooseShop.descriptShopVal
    })
  },
  beforeRouteEnter(to,from,next) {
    next(vm => {
      if(from.name === 'selectAddress') {
        vm.editStatus = true
      }else {
        vm.setUpLoadUrl('')
      }
    })
  },
  created() {
    this.getStatus()
    this.getData()
  },
  destroyed() {
    this.setUpLoadUrl('')
  },
  methods: {
    ...mapMutations(['getDescriptShopVal','initDescriptShopList','setDealTabStatus','setUpLoadUrl','setNewCustomerInfo']),
    getData() {
      //从父级传id过来请求
      indexModel.getCustomerDetails(this.$route.query.id).then(res => {
        if(res.data) {
          this.list = res.data
          let arr = this.changeStatus(this.list.orderList)
          this.list.orderList = arr
          this.getShopName(this.list.orgId)
          this.phone = res.data.phone
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.getData()
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
      if(!this.newCustomerInfo.sex) {
        MessageBox.alert('性别不能为空')
        return
      }else if(!this.newCustomerInfo.username) {
        MessageBox.alert('姓名不能为空')
        return
      }
      if(this.phone === this.newCustomerInfo.phone) {
        this.saveData()
      }else {
        let testPhone = variable.testPhone(this.newCustomerInfo.phone)
        if(testPhone) {
          this.checkPhone()
        }else {
          MessageBox.alert('请填写正确手机号码')
        }
      }
    },
     //验证手机
    checkPhone() {
      mango.getAjax('/v3/app/customer/check', {
        value: this.newCustomerInfo.phone,
        type: 'phone'
      }).then((res) => {
        if(res.status) {
          MessageBox.alert('该手机号码已存在')
        }else {
          this.saveData()
        }
      })
    },
    //
    saveData() {
      let formdata = this.newCustomerInfo.dataFiles
      if(this.upLoadUrl) {
        this.changeFormData(this.upLoadUrl)
      }
      let obj = this.updateParams(this.newCustomerInfo)
      let arr = []
      for(var key in obj) {
        formdata.append(key,obj[key])
        arr.push(key)
      }
      mango.getFormdataAjax('/v3/app/customer/update', formdata, arr).then((res) => {
        if(res.status) {
          this.editStatus = false
          this.getData()
        }
      })
    },
      //base64转成formdata形式上传
    changeFormData(url) {
      let bytes = window.atob(url.split(",")[1]);
      let temp = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(temp);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      //Blob对象
      let blob = new Blob([temp], { type: "image/jpeg" }); //type为图片的格式
      //FormData对象
      let formdata = this.newCustomerInfo.dataFiles
      formdata.append("dataFile", blob, Date.now() + ".jpg");
    },
     //获取参数
     updateParams(obj) {
      let tempObj = {}
      let temp = {
        phone: obj.phone,
        username: obj.username,
        sex: obj.sex, 
        birthday: obj.birthday,
        age: obj.age,
        qq:obj.qq,
        weChat: obj.weChat,
        duty: obj.duty,
        remark: obj.remark,
        customerId: this.$route.query.id,
        orgId: obj.orgId || this.list.orgId
      }
      for (let key in temp) {
        if (temp[key] || temp[key] === 0) {
          tempObj[key] = temp[key]
        }
      }
      return tempObj
    },
    //切换顶部导航
    clickTab(index) {
      this.setDealTabStatus(mango.btnList(['订单信息', '客户信息', '意向信息'], index))
    },
    goBack() {
      this.$router.back(-1);
    },
      //获取门店id
    getShopId(name) {
      if(this.shops && this.shops.length) {
        this.shops.forEach((item, index) => {
          if(item.name === name) {
            this.shopId = item.crmId
          }
      });
      }
      this.$set(this.newCustomerInfo,'orgId',this.shopId)
      this.setNewCustomerInfo(this.newCustomerInfo)
    },
     //获取门店index
    getShopName(id) {
      if(this.shops && this.shops.length) {
        this.shops.forEach((item,index) => {
          if(item.crmId === id) {
            this.index = index
          }
        })
      }
      let shopsList = btnList(this.shops,this.index)
      this.initDescriptShopList(shopsList)
      this.getDescriptShopVal()
    }  
  },
   //
  activated() {
    // isUseCache为false时才重新刷新获取数据
    if(!this.$route.meta.isUseCache){   
      this.editStatus = false
      let shops = localStorage.getItem('shops')
      this.shops = JSON.parse(shops)
      this.getData()
      this.$route.meta.customerUseCache = false;  
    } 
  },
    //
  beforeRouteLeave (to, from, next) { 
  // /Customer       
    if (to.name === 'address'|| to.name === 'chooseShop') {
      this.$route.meta.isUseCache = true; 
    }else {
      this.$route.meta.isUseCache = false; 
      this.setUpLoadUrl('')
    }        
    next();
  },
  beforeRouteEnter (to, from, next) { 
    next(vm => {
      if (from.name === 'chooseShop'){
        let shops = localStorage.getItem('shops')
        vm.shops = JSON.parse(shops)
        if(vm.descriptShopVal) {
          vm.getShopId(vm.descriptShopVal)
        }
      } 
    });
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
