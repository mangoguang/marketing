<template>
  <div class="chooseShop">
    <banner :title='"所属门店"'/>
    <ul class="shopList">
      <chooseLi v-for="(item,index) in list" :key="index" 
        :list='item'
        @click.native='chooseShop(index)'/>
    </ul>
  </div>
</template>

<script>
import {btnList} from '../../../utils/gallery'
import banner from '../../../components/banner'
import chooseLi from '../../../components/customer/newCustomer/chooseLi'
import {mapState,mapMutations} from 'vuex'
export default {
  components: {banner,chooseLi},
  data(){
    return {
      list: [],
      shop: []
    }
  },
  computed: {
    ...mapState({
      shopList: state => state.chooseShop.shopList,
      descriptShopList: state => state.chooseShop.descriptShopList
    })
  },
  created() {
    let shops = localStorage.getItem('shops')
    this.shop = JSON.parse(shops)
    this.isInit()
    // console.log(this.$route.query.type)
  },
  methods: {
    ...mapMutations(['initShopList', 'getShopVal','initDescriptShopList','getDescriptShopVal']),
    chooseShop(index) {
      if(this.list[index].status) {
        return
      }
      this.init(index);
      
    },
    //初始化选择第一个
    init(i) {
      // console.log(this.shop[i].id)
      this.list = btnList(this.shop, i)
      if(this.$route.query.type === 'descript') {
        this.initDescriptShopList(this.list)
        this.getDescriptShopVal()
        localStorage.setItem('descriptShopIndex',i);
      }else {
        this.initShopList(this.list)
        this.getShopVal()
        localStorage.setItem('shopIndex',i);
      }
    },
    //判断vuex中是否已经有数据
    isInit() {
      if(this.$route.query.type === 'descript') {
        this.setInitData(this.descriptShopList)
      }else {
        this.setInitData(this.shopList)
      }
     
    },
    //设置初始
    setInitData(list) {
      if(list && list.length) {
        this.list = list
      }else {
        this.init(0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chooseShop {
  width: 100vw;
  height: 100vh;
  background: #fff;
  overflow: hidden;
  ul {
   margin-top: 16vw;
   overflow: scroll;
  }
}
</style>

