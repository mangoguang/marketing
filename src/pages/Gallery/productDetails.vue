<template>
  <div class="productDetails">
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
import { b64DecodeUnicode, changeImgStyle } from '../../utils/msManage'
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
      productList: {}
    }
  },
  created() {
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    this.getProductList()
  },
  methods: {
    getProductList() {
      let id = this.$route.query.id
      let account = this.ajaxData.account
      indexModel.productList(id, account).then(res => {
        if(res.data) {
          let temp = res.data.details
          this.myhtml = changeImgStyle(b64DecodeUnicode(temp))
          this.productList = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.productDetails {
  background: #f1f1f1;
  .content {
    background: #fff;
  }
  .details {
    margin-top: 4vw;
  }
}
</style>



