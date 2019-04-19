<template>
  <div class="customerInfo">
    <deal-header :list='list'/>
    <ul class="infoNav">
      <li
        v-for="(item, index) in customerTabStatus"
        :key="`customerInfoBtn${index}`"
        :class="{active: customerTabStatus[index].status}"
        @click="infoSelect(index)"
      >{{item.name}}</li>
    </ul>
    <!-- 客户信息-->
    <div v-show="customerTabStatus[0].status">
      <customer-msg :list="list" :editMsg='editMsg' v-if='!editStatus'/>
      <div v-else>
        <newDescript :select='this.list.headPortrait? false : true' :list='list' :areaType='true'/>
        <btn @click.native="saveMsg()" :text="'保存资料'" class="theBtn"></btn>
      </div>
    </div>
    <!-- 意向信息-->
    <intentionMsg v-show="customerTabStatus[1].status" :list='list.opportunityList'/>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import {IndexModel} from '../../utils/index'
import variable from '../../js/variable'
const indexModel = new IndexModel()
import { mapMutations, mapState } from "vuex"
import btn from "../../components/btn";
import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import customerDescript from '../../components/customer/customerInfo/customerDescript'
import newDescript from '../../components/customer/newCustomerInfo/newDescript'
import intentionMsg from '../../components/customer/customerShare/intentionMsg'
import CustomerMsg from '../../components/customer/customerShare/customerMsg'
import mango from '../../js'
export default {
  name:'customerInfo',
  components:{
    btn,
    dealHeader, 
    customerDescript,
    newDescript,
    intentionMsg,
    customerDescript,
    CustomerMsg
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
  data(){
    return{
      btns: mango.btnList(['客户信息', '意向信息'], 0),
      list: [],
      editStatus: false
    }
  },
  computed: {
    ...mapState({
      customerTabStatus: state => state.tabStatus.customerTabStatus,
      newCustomerInfo: state => state.customer.newCustomerInfo,
      upLoadUrl: state => state.loadImgUrl.upLoadUrl
    })
  },
  created() {
    this.getData()
  },
  destroyed() {
    this.setUpLoadUrl('')
  },
  methods: {
    ...mapMutations(["setCustomerInfoBtns", "setCustomerTabStatus",'setUpLoadUrl']),
    infoSelect(index) {
      this.setCustomerTabStatus(mango.btnList(['客户信息', '意向信息'], index))
    },
    getData() {
      indexModel.getCustomerDetails(this.$route.query.id).then(res => {
        if(res.data) {
          this.list = res.data
          console.log('list')
        }
      })
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

      let testPhone = variable.testPhone(this.newCustomerInfo.phone)
      if(testPhone) {
        this.saveData()
      }else {
        MessageBox.alert('请填写正确手机号码')
      }
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
        }else {
          MessageBox.alert(res.msg)
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
        customerId: this.$route.query.id
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
.customerInfo{
  padding-bottom:4vw;
  box-sizing: border-box; 
  .active {
    background: #f8f8f8;
    color: #007aff;
    font-weight: bold;
  }
  .theBtn {
    background:rgba(0,122,255,1);
    border: .13vw solid rgba(0,93,194,1);
    width: 80%;
    margin:0 auto;
  }
}
</style>
