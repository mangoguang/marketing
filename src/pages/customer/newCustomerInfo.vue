<template>
  <div class="newCustomerInfo">
    <my-banner :title="'新建客户信息'">
      <div class="save" @click="creatNewCustomer">保存</div>
    </my-banner>
    <ul>
      <li>
        <div class="title">
          <p ></p>
          <span>客户描述</span>
        </div>
      </li>
      <new-descript :select='true' :fromName='fromName' :areaType='false'/>
    </ul>
    <ul>
      <li @click="controlDemand">
        <div class="title">
          <p ></p>
          <span>意向信息</span>
        </div>
        <div class="pullDown-icon">
          <img src="../../assets/imgs/newPullDown.png" :class="{changSide:isShowDemand}">
        </div>
      </li>
      <new-demand v-show="isShowDemand" :fromName='fromName' :changeCode="change"/>
    </ul>
    <ul class="dealUl">
      <li @click="controlDaal">
        <div class="title">
          <p ></p>
          <span>跟进情况</span>
        </div>
        <div class="pullDown-icon">
          <img src="../../assets/imgs/newPullDown.png"  :class="{changSide:isShowDeal}">
        </div>
      </li>
      <new-record v-show="isShowDeal" :fromName='fromName'/>
    </ul>

    <!-- <new-descript v-show="this.btns[0].status" :btns="btns" @changeBtnsStatus="changeBtnsStatus" /> -->
    <!-- <new-demand v-show="this.btns[1].status" :btns="btns" @changeBtnsStatus="changeBtnsStatus" /> -->
    <!-- <new-record v-show="this.btns[2].status" :btns="btns" @changeBtnsStatus="changeBtnsStatus" /> -->
    <!-- <records v-show="this.btns[2].status"/> -->
  </div>
</template>

<script>
import Vuex, { mapMutations, mapState } from 'vuex'
import { MessageBox } from 'mint-ui'
import myBanner from '../../components/banner'
import newDemand from '../../components/customer/newCustomerInfo/newDemand'
import newDescript from '../../components/customer/newCustomerInfo/newDescript'
import newRecord from '../../components/customer/newCustomerInfo/newRecord'
// import records from '../../components/customer/customerInfo/records'
import mango from '../../js'
import variable from '../../js/variable'
import {returnDate} from '../../utils/customer'
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel() 

export default {
  name:'newCustomerInfo',
  components:{myBanner, newDemand, newDescript, newRecord},
  data(){
    return{
      // btns: mango.btnList(['客户描述', '客户需求', '洽谈记录'], 0),
      name: '',
      phone: '',
      sex: '',
      topTitle: ['客户描述', '意向信息', '跟进情况'],
      isShowDemand: false,
      isShowDeal: false,
      shops: [],
      fromName: '',
      codeList: {}
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromName = from.name
      if(from.name === 'chooseShop') {
        vm.isShowDemand = true
      }else {
        vm.setUpLoadUrl('')
      }
    })
  },
  computed: {
    ...mapState({
      newCustomerInfo: state => state.customer.newCustomerInfo,
      sexVal: state => state.select.sexVal,
      areaVal: state => state.select.areaVal,
      enterStoreVal: state => state.select.enterStoreVal,
      sourceVal: state => state.select.sourceVal,
      leaveStoreVal: state => state.select.leaveStoreVal,
      shopVal: state => state.select.shopVal,
      upLoadUrl: state => state.loadImgUrl.upLoadUrl
    })
  },
  mounted() {
    let shops = localStorage.getItem('shops')
    this.shops = JSON.parse(shops)
  },
  destroyed(){
    this.setSexVal('')
    this.setAreaVal('')
    this.setEnterStoreVal('')
    this.setSourceVal('')
    this.setLeaveStoreVal('')
    this.setShopVal('')
    this.setAgeVal('')
    this.setBuyReason('')
    this.setStylePref('')
    this.setProgress('')
    this.setColorPref('')
    this.setUpLoadUrl('')
    this.setHouseType('')
    this.setElevatorVal('')
  },
  methods: {
    ...mapMutations([
      "setNewCustomerInfo",
      'setSexVal',
      'setAreaVal',
      'setSourceVal',
      'setLeaveStoreVal',
      'setEnterStoreVal',
      'setShopVal',
      'setAgeVal',
      'setUpLoadUrl',
      'setBuyReason',
      'setStylePref',
      'setProgress',
      'setColorPref',
      'setHouseType',
      'setElevatorVal'
    ]),
    change(val) {
      this.codeList = val
    },
    //控制下面两个模块的显示隐藏
    controlDemand() {
      this.isShowDemand = !this.isShowDemand
    },
    controlDaal() {
      this.isShowDeal = !this.isShowDeal
    },
    //获得shopId
    getShopID(name) {
      let shopId
      if(this.shops) {
        this.shops.forEach((item, index) => {
          if(item.name === name) {
            shopId = item.id
          }
      });
      this.$set(this.newCustomerInfo, 'shopId', shopId)
      }
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
    //保存客户信息，新建客户	
    creatNewCustomer() {
      //头像的formdata
      // !this.newCustomerInfo.dataFiles? this.newCustomerInfo.dataFiles = new FormData() : ''
      this.upLoadUrl? this.changeFormData(this.upLoadUrl) : ''
      if(!this.newCustomerInfo.sex) {
        MessageBox.alert('性别不能为空')
        return
      }else if(!this.newCustomerInfo.username) {
        MessageBox.alert('姓名不能为空')
        return
      }else if(!this.newCustomerInfo.province) {
        MessageBox.alert('请选择地区')
        return
      }else if(!this.newCustomerInfo.address) {
        MessageBox.alert('请填写客户地址')
        return
      }
      // // let ref = this.$refs.myForm
      // // let formdata = new FormData(ref)

      let formdata = this.newCustomerInfo.dataFiles
    
      let obj = this.updateParams(this.newCustomerInfo)
      let arr = []
      for(var key in obj) {
        formdata.append(key,obj[key])
        arr.push(key)
      }
      mango.getFormdataAjax('/v3/app/customer/update', formdata, arr).then((res) => {
        if(res.status) {
          MessageBox.alert('保存成功！').then(action => {
            this.$router.go(-1)
          })
        }
      })
    },
    //初始化数据
    setInitData() {
      this.newCustomerInfo.leaveStore = this.leaveStoreVal
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
        
        'address.province': obj.province,
        'address.city': obj.city,
        'address.district': obj.area,
        'address.address': obj.address,
        'address.apartmentType': this.codeList.htCode,   //户型    
        'address.elevator': obj.elevator,

        // 'opportunity.goodsList[0].goodsId': '1-44JIB6',          //意向产品多个
        // 'opportunity.goodsList[0].quantity': 2,

        'opportunity.shopId': this.shops[0].id,
        'opportunity.arrivalDate':mango.indexTimeB(new Date())[1],
        'opportunity.source': this.codeList.sourceCode || 'Natural',
        'opportunity.residentTime': obj.residentTime,   //留店时长
        'opportunity.stylePref': this.codeList.spCode,    //风格
        'opportunity.progress': this.codeList.pgCode,    //进度
        'opportunity.colorPref': this.codeList.colorCode,    //颜色偏好
        'opportunity.competingGoods': obj.competingGoods,
        'opportunity.buyReason': this.codeList.brCode,   //购买原因
        'opportunity.budget':obj.budget,    //预算
        'opportunity.depositPaid': obj.depositPaid,     //已缴定金
        'opportunity.argreeDiscount': parseInt(obj.argreeDiscount)*10,    //协议折扣，例：80（百分之80折扣）
        'opportunity.remark': obj.remark2,
        'opportunity.urgency': obj.urgency,   //是否紧急
        'opportunity.level': obj.level,   //等级
        'record.source': obj.source2,
        'record.followDate': obj.followDate,
        'record.residentTime': obj.residentTime2,   //跟进时长
        'record.nextDate': obj.nextDate,
        'record.situation': obj.situation,
        'record.plan': obj.plan
      }
      for (let key in temp) {
        if (temp[key] || temp[key] === 0) {
          tempObj[key] = temp[key]
        }
      }
      return tempObj
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
.newCustomerInfo{
  background: $bgCol;
  padding-top: 16vw;
  position: relative;
  .save{
    color: #0071ff;
    width: 10vw;
    position: absolute;
    right: 0;
  }
  .dealUl{
    margin-top: 2vw;
  }
  ul{
    li{
      padding: 0 4.53vw;
      line-height: 11.2vw;
      display: flex;
      justify-content: space-between;
      background: #efeff4;
      border-bottom: 1px solid #ccc;
      .title{
        display: flex;
        align-items: center;
        color: #363636;
        font-weight: bold;
        p{
          background: #007aff;
          width: 0.53vw;
          height: 4vw;
          margin-right: 2.6vw;
        }
      }
      .pullDown-icon{
        img{
          width: 2.66vw;
        }
        .changSide {
          transform: rotate(180deg)
        }
      }
    }
  }
  .newCustomerInfoBtns{
    margin-top: 21vw;
    border-bottom: 1px solid #ccc;
  }
}
</style>
