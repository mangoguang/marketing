<template>
  <div class="timeInterval">
    <button
    type="button"
    @click="openDatePick"
    ></button>
    <DoubleDatePick ref="doubleDatePick" :show="datePickShow" />
  </div>
</template>

<script>
import DoubleDatePick from './doubleDatePick'
export default {
  name: 'timeInterval',
  components: {DoubleDatePick},
  data() {
    return{
      datePickShow: false
    }
  },
  mounted() {

  },
  created(){
  },
  methods: {
    openDatePick() {
      this.$refs.doubleDatePick.$refs.startDatePick.open()
    }
  }
}
</script>

<style lang="scss" scoped>
  .timeInterval{
    button{
      width: 6vw;
      height: 6vw;
      background: url('../../assets/imgs/date.png') no-repeat;
      background-size: 4.8vw 4.8vw;
      background-position: center;
    }
  }
</style>

