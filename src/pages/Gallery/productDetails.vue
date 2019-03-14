<template>
  <div class="productDetails">
    <div class="prodect">
      <product />
    </div>
    <div class="content">
      <productContent />
    </div>
    <div class="details">
      富文本
    </div>
  </div>
</template>

<script>

import product from '../../components/Gallery/productDetails/product'
import productContent from '../../components/Gallery/productDetails/productContent'
export default {
  components: {
    product,
    productContent
  },
  data() {
    return {
     
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



