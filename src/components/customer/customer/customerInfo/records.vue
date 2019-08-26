<template>
  <div class="records">
    <track-record></track-record>
  </div>
</template>

<script>
import Vue from 'vue'
import trackRecord from '../dealCustomer/trackRecord'
export default {
  name:'records',
  data(){
    return{

    }
  },
  computed: {
    // ...mapState({
    //   dealOrderInfoDetails: state => state.dealOrderInfoDetails.dealOrderInfoDetails
    // })
  },
  mounted() {
    // console.log(this.$route.params.id)
  },
  methods: {
    getCustomerInfo() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
