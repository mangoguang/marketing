<template>
  <div class="chooseShop">
    <banner :title='"所属门店"'/>
    <ul>
      <chooseLi />
    </ul>
  </div>
</template>

<script>
import banner from '../../../components/banner'
import chooseLi from '../../../components/customer/newCustomer/chooseLi'
export default {
  components: {banner,chooseLi}
}
</script>

<style lang="scss" scoped>
.chooseShop {
  ul {
   margin-top: 16vw;
  }
}
</style>

