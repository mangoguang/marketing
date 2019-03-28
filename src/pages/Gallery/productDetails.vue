<template>
  <div class="productDetails" :style="{'marginTop':`${marginTop}vw`}">
    <div class="prodect">
      <product :imgList="productList.goodsImageList"/>
    </div>
    <div class="content">
      <productContent :list="productList"/>
    </div>
    <div class="details" v-html="myhtml"></div>
  </div>
</template>

<script>
import { IndexModel } from "../../utils/index";
const indexModel = new IndexModel();
import { b64DecodeUnicode, changeGalleryStyle } from "../../utils/msManage";
import product from "../../components/Gallery/productDetails/product";
import productContent from "../../components/Gallery/productDetails/productContent";
export default {
  components: {
    product,
    productContent
  },
  data() {
    return {
      myhtml: "",
      productList: {},
      marginTop: ""
    };
  },
  created() {
    this.getProductList();
    this.isIPhoneX();
  },
  methods: {
    getProductList() {
      let id = this.$route.query.id;
      let account = this.__localAjax().account
      indexModel.productList(id, account).then(res => {
        if (res.data) {
          let temp = res.data.details;
          this.myhtml = changeGalleryStyle(b64DecodeUnicode(temp));
          this.productList = res.data;
        }
      });
    },
    isIPhoneX() {
      let phone = this.phoneSize();
      if (phone === "iphonex") {
        this.marginTop = "-6";
      } else if (phone === "iphone") {
        this.marginTop = "0";
      } else {
        this.marginTop = "0";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.productDetails {
  background: #f1f1f1;
  -webkit-overflow-scrolling: touch;
  // margin-top: -5vw;
  .content {
    background: #fff;
    word-wrap: break-word !important;
  }
  .details {
    margin-top: 4vw;
    width: 100vw;
    word-wrap: break-word !important;
    img {
      width: 100vw;
      height: auto;
    }
  }
}
</style>



