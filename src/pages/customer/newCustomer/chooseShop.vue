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
      list: []
    }
  },
  computed: {
    ...mapState({
      shopList: state => state.chooseShop.shopList
    })
  },
  created() {
    let shops = localStorage.getItem('shops')
    this.list = JSON.parse(shops)
    this.isInit()
  },
  methods: {
    ...mapMutations(['initShopList', 'getShopVal']),
    chooseShop(index) {
      if(this.list[index].status) {
        return
      }
      this.init(index)
    },
    //初始化选择第一个
    init(i) {
      this.list = btnList(this.list, i)
      this.initShopList(this.list)
      this.getShopVal()
    },
    //判断vuex中是否已经有数据
    isInit() {
      if(this.shopList && this.shopList.length) {
        this.list = this.shopList
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

