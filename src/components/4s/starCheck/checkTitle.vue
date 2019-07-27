<!--  -->
<template>
  <div class="checkTitle">
    <h5 :class="status ? 'open' : 'close'">
      <button @click="open">{{title}}</button>
      <button class="btn2"
              @click="close">收起</button>

    </h5>
  </div>
</template>

<script>
export default {
  props: ['title', 'index'],
  components: {

  },
  data () {
    return {
      status: false
    }
  },
  methods: {
    close () {
      this.status = false
      this.$emit('changeStatus', this.index, false)
    },
    open () {
      this.status = true
      this.$emit('changeStatus', this.index, true)
    }
  }
}
</script>
<style lang='scss' scoped>
.checkTitle {
  h5 {
    button {
      line-height: 10.67vw;
      font-size: 14px;
      color: #767a7f;
      padding: 0 4vw;
    }
  }
  h5.open {
    display: flex;
    justify-content: space-between;
    button.btn2 {
      color: #007aff;
    }
  }
  h5.close {
    text-align: center;
    button {
      padding-right: 5vw;
      color: #007aff;
      background: url(../../../assets/imgs/4s/starCheck/more_blue.png) no-repeat;
      background-size: 3.5vw auto;
      background-position: right 0 top 50%;
    }
    button.btn2 {
      display: none;
    }
  }
}
</style>