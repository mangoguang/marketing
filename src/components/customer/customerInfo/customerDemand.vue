<template>
  <div class="customerDemand">
    新建需求：
  </div>
</template>

<script>
// import dealHeader from '../../components/customer/dealCustomer/dealHeader'
// import mango from '../../js'
export default {
  name:'customerDemand',
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
