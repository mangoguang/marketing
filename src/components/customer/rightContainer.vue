<!-- <keep-alive> -->
<template>
  <div :class="`rightContainer ${rightContainerStatus}`">
    <div>
      <div class="botBtns">
        <button>重置</button>
        <button class="on" @click="hideRightContainer">完成</button>
      </div>
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(Vuex)
export default {
  name: 'rightContainer',
  props:[''],
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      // citySelect: state => state.select.citySelect,
      rightContainerStatus: state => state.rightContainer.rightContainerStatus
    })
  },
  watch:{
    rightContainerStatus() {
      console.log(this.rightContainerStatus)
    }
  },
  mounted(){

  },
  methods:{
    ...mapMutations([
      'setRightContainerStatus'
    ]),
    hideRightContainer() {
      console.log('隐藏侧边栏。', this.rightContainerStatus)
      this.setRightContainerStatus('hideRightContainer')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.rightContainer{
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .5);
  z-index: 1000;
  &>div{
    display: flex;
    width: 80vw;
    height: 100vh;
    background: #fff;
  }
  .botBtns{
    align-self: flex-end;
    width: 80vw;
    font-size: 0;
    button{
      display: inline-block;
      width: 50%;
      height: 22vw;
      background: #b2d7ff;
      color: #007aff;
      font-weight: 300;
    }
    button.on{
      background: #007aff;
      color: #fff;
    }
  }
}
.hideRightContainer{
  left: 100vw;
}
.showRightContainer{
  left: 0;
}
</style>