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
  props: ['title', 'index', 'status'],
  components: {

  },
  data () {
    return {
      // status: false
    }
  },
  methods: {
    close () {
      // this.status = false
      this.$emit('changeStatus', this.index, false)
    },
    open () {
      // this.status = true
      this.$emit('changeStatus', this.index, true)
    }
  }
}
</script>
<style lang='scss' scoped>
%border {
  display: block;
  content: "";
  width: 100%;
  height: 1px;
  position: absolute;
  left: 0;
  bottom: 0;
  background: #f8f8f8;
  transform: scaleY(0.5);
}
.checkTitle {
  height: 54px;
  line-height: 54px;
  background: #fff;
  // border-bottom: 1px solid #f8f8f8;
  position: relative;
  &:after {
    @extend %border;
  }
  h5 {
    button {
      // line-height: 10.67vw;
      height: 54px;
      line-height: 54px;
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