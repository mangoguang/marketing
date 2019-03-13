<template>
  <div class="productDetails">
    <div class="prodect">
      <product />
    </div>
    <div class="content">
      content
    </div>
    <div class="details">
      details
    </div>
  </div>
</template>

<script>

import MoreDetails from '../../components/Gallery/productDetails/moreDetail'
import product from '../../components/Gallery/productDetails/product'
export default {
  components: {
    MoreDetails,
    product
  },
  data() {
    return {
     
    }
  }
}
</script>


