<template>
  <div class="demand">
    <ul>
      <li is="customerLi" :leftText="'意向产品'">
        <input v-model="demand.intention" @change="intentionChange" placeholder="请填写意向产品" type="text">
      </li>
      <li is="mySelect" leftText="装修进度" :selectList="progressList" @valChange="progressChange"></li>
      <li is="mySelect" leftText="购买原因" :selectList="buyReasonList" @valChange="buyReasonChange"></li>
      <li is="mySelect" leftText="房间数量" :selectList="roomNumList" @valChange="roomNumChange"></li>
      <li is="mySelect" leftText="颜色偏好" :selectList="colorPrefList" @valChange="colorPrefChange"></li>
      <li is="mySelect" leftText="装修风格" :selectList="stylePrefList" @valChange="stylePrefChange"></li>
      <li is="mySelect" leftText="所属门店" :selectList="shopNameList" @valChange="shopNameChange"></li>
      <li class="noPadding">
        <remark :title="'备注'">
          <textarea
          @change="remarkChange"
          v-model="demand.remark" 
          placeholder="写点什么"></textarea>
        </remark>
      </li>
    </ul>
  </div>
</template>

<script>
import mySelect from '../select/mySelect'
import remark from './remark'
import customerLi from '../../components/customer/customerLi'
export default {
  name:'demand',
  components: {
    mySelect,
    remark,
    customerLi
  },
  props: ['defaultVal'],
  data(){
    return{
      demand: {},
      progressList: ['装修中', '装修完成', '毛坯阶段', '水电木工', '油漆吊顶', '橱柜安装', '地板安装', '木门安装', '洁具安装', '灯饰安装'],
      buyReasonList: ['旧床换新', '新房购置', '婚房购置'],
      roomNumList: [1, 2, 3, 4, '5及以上'],
      colorPrefList: ['暖色', '冷色'],
      stylePrefList: ['现代', '中式古典', '欧式', '美式', '新中式'],
      shopNameList: [],
      shops: []
    }
  },
  created() {
    //获取本地缓存信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    let shops = localStorage.getItem('shops')
    shops = JSON.parse(shops)
    this.shopNameList = shops.map(element => {
      return element.name
    })
    this.shops = shops
  },
  methods: {
    progressChange(val) {
      this.demand.progress = val
      this.emitEvent()
    },
    buyReasonChange(val) {
      this.demand.buyReason = val
      this.emitEvent()
    },
    roomNumChange(val) {
      this.demand.roomNum = val
      this.emitEvent()
    },
    colorPrefChange(val) {
      this.demand.colorPref = val
      this.emitEvent()
    },
    stylePrefChange(val) {
      this.demand.stylePref = val
      this.emitEvent()
    },
    shopNameChange(val) {
      this.demand.shopId = this.getShopId(val)
      this.emitEvent()
    },
    intentionChange() {
      this.emitEvent()
    },
    remarkChange() {
      this.emitEvent()
    },
    emitEvent()  {
      this.$emit('getDemand', this.demand)
    },
    // 根据店铺名称，获取对应的店铺ID
    getShopId(name) {
      let [shopId, shops] = ['', this.shops]
      for (let i = 0; i < shops.length; i++) {
        if (shops[i].name === name) {
          shopId = shops[i].id
          break
        }
      }
      return shopId
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
.demand{
  input{
    line-height: 3em;
  }
}
</style>
