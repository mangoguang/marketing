<template>
  <div class="customerDescript">
    <deal-header />
  </div>
</template>

<script>
import dealHeader from '../../components/customer/dealCustomer/dealHeader'
import mango from '../../js'
export default {
  name:'customerDescript',
  components:{dealHeader},
  data(){
    return{

    }
  },
  mounted() {
    console.log(this.$route.params.id)
  },
  methods: {
    getCustomerInfo() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
