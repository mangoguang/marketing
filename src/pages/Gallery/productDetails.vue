<template>
  <div class="productDetails" :style="{'marginTop':`${marginTop}vw`}">
    <div class="prodect">
      <product :imgList='productList.goodsImageList'/>
    </div>
    <div class="content">
      <productContent :list='productList'/>
    </div>
    <div class="details" v-html="myhtml">
    </div>
  </div>
</template>

<script>
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import { b64DecodeUnicode, changeGalleryStyle } from '../../utils/msManage'
import product from '../../components/Gallery/productDetails/product'
import productContent from '../../components/Gallery/productDetails/productContent'
export default {
  components: {
    product,
    productContent
  },
  data() {
    return {
      ajaxData: {},
      myhtml: '',
      productList: {},
      marginTop: ''
    }
  },
  created() {
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    this.getProductList()
    this.isIPhoneX()
  },
  methods: {
    getProductList() {
      let id = this.$route.query.id
      let account = this.ajaxData.account
      indexModel.productList(id, account).then(res => {
        if(res.data) {
          let temp = res.data.details
          this.myhtml = changeGalleryStyle(b64DecodeUnicode(temp))
          this.productList = res.data
        }
      })
    },
     isIPhoneX : function(fn){
      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isIOS) {        
        if ((screen.height == 812 && screen.width == 375) || (screen.height == 896 && screen.width == 414)) {
          this.marginTop = '-6'
        }else{
          this.marginTop = '0'
        } 
      }else{
        this.marginTop = '0'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.productDetails {
  background: #f1f1f1;
  // margin-top: -5vw;
  .content {
    background: #fff;
  }
  .details {
    margin-top: 4vw;
    width: 100vw;
    img {
      width: 100vw;
      height: auto;
    }
  }
}
</style>



