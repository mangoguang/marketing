<template>
  <div class="remark">
    <h3>{{title}}<span v-if='start === "start"'>*</span></h3>
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
// import trackRecord from '../dealCustomer/trackRecord'
export default {
  name:'remark',
  props: ['title', 'start'],
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

  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
.remark{
  h3{
    font-size: $fontSize;
    color: $fontCol;
    padding: 0 5vw;
    line-height: 2.6em;
  }
  textarea{
    display: block;
    width: 100vw;
    height: 35vw;
    background: #fff;
    padding: 3vw 5vw;
    box-sizing: border-box;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    font-size: $fontSize;
  }
  span {
    color: #fb222b;
  }
}
</style>
