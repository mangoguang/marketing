<template>
  <div class="timeInterval">
    <button
    type="button"
    @click="openDatePick"
    ></button>
  </div>
</template>

<script>
// import mango from '../../../js'
export default {
  name: 'timeInterval',
  components: {},
  data() {
    return{

    }
  },
  mounted() {

  },
  created(){
  },
  methods: {
    openDatePick() {
      console.log('suss')
      this.$emit('getTimeInterval', {
        startTime: '2019-04-04',
        endTime: '2119-04-04'
      })
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

