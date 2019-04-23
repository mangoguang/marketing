<template>
  <div class="orderDetail">
    订单详情
    <enquiryOrderInfo />
  </div>
</template>


<script>
import enquiryOrderInfo from '../../components/customer/enquiryOrder/enquiryOrderInfo'
export default {
  name: 'orderDetail',
  components: {
    enquiryOrderInfo
  },
  props: [],
  data() {
    return {

    };
  },
  computed: {

  },
  created() {

  },
  methods: {
  
  }
};
</script>

<style lang="scss">
.orderDetail {
  
}
</style>
