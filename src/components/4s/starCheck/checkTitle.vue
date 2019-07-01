<!--  -->
<template>
  <div class="checkTitle">
    <h5 :class="status ? 'open' : 'close'">
      <button @click="open">{{title}}</button>
      <button @click="close">收起</button>
    </h5>
  </div>
</template>

<script>
export default {
  props: ['title', 'index'],
  components : {

  },
  data () {
    return {
      status: false
    }
  },
  methods: {
    close() {
      this.status = false
      this.$emit('changeStatus', index, true)
    },
    open() {
      this.status = true
      this.$emit('changeStatus', index, true)
    }
  }
}
</script>
<style lang='scss' scoped>
.checkTitle {
  h5{
    button{
      line-height: 10.67vw;
      font-size: 14px;
      color: #767A7F;
      padding: 0 4vw;
    }
  }
  h5.open{
    display: flex;
    justify-content: space-between;
    button:nth-child(2) {
      color: #007AFF;
    }
  }
  h5.close{
    text-align: center;
    button{
      padding-right: 5vw;
      color: #007AFF;
      background: url(../../../assets/imgs/4s/starCheck/more_blue.png) no-repeat;
      background-size: 3.5vw auto;
      background-position: right 0 top 50%;
    }
    button:nth-child(2) {
      display: none;
    }
  }
}
</style>