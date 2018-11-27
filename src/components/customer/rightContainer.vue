<!-- <keep-alive> -->
<template>
  <div :class="`rightContainer ${rightContainerStatus}`">
    <div>
      <ul>
        <li class="time">
          <h3>时间</h3>
          <ul>
            <li>
              <p>起始日</p>
              <strong>11月16日</strong>
            </li>
            <li><span>至</span></li>
            <li>
              <p>结束日</p>
              <strong>11月24日</strong>
            </li>
            <li><span>共7日</span></li>
          </ul>
        </li>
        <li>
          <h3>紧急</h3>
          <ul>
            <li v-for="(item, index) in urgencyBtns"
            :key="`urgencyBtns${index}`">
              <button 
              :class="{on: item.status}"
              @click="urgencySelect(index)">{{item.name}}</button>
            </li>
          </ul>
        </li>
        <li>
          <h3>关键</h3>
          <ul>
            <li v-for="(item, index) in keyBtns"
            :key="`keyBtns${index}`">
              <button 
              :class="{on: item.status}"
              @click="keySelect(index)">{{item.name}}</button>
            </li>
          </ul>
        </li>
      </ul>
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
import mango from '../../js'
Vue.use(Vuex)
export default {
  name: 'rightContainer',
  props:[''],
  data () {
    return {
      urgencyBtns: mango.btnList(['低', '中', '高']),
      keyBtns: mango.btnList(['高', '中', '低'])
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
    },
    urgencySelect(i) {
      mango.changeBtnStatus(this.urgencyBtns, i)
    },
    keySelect(i) {
      mango.changeBtnStatus(this.keyBtns, i)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/common.scss";
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
    justify-content: flex-start;
    flex-direction: column;
    position: relative;
    width: 80vw;
    height: 100vh;
    background: #fff;
    padding: 4vw;
    box-sizing: border-box;
    &>ul{
      // width: 100%;
      h3{
        font-size: $fontSize;
        color: $fontSubCol;
        margin-top: 3vw;
      }
      ul{
        display: flex;
        justify-content: space-between;
        width: 100%;
        li{
        }
        button{
          padding: 0 10vw;
          line-height: 3em;
          border-radius: 2vw;
          background: $bgCol;
          font-weight: 400;
        }
        button.on{
          color: $btnCol;
          background: $btnSubCol;
        }
      }
    }
    .botBtns{
      display: flex;
      position: absolute;
      bottom: 0;
      left: 0;
      // align-self: flex-end;
      font-size: 0;
      button{
        align-self: flex-start;
        width: 40vw;
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
  .time{
    ul{
      background: $bgCol;
      padding: 1vw 4vw;
      line-height: 1.4em;
      box-sizing: border-box;
      border-radius: 2vw;
      li{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        span{
          align-self: flex-end;
        }
      }
      p, span{
        color: $fontSubCol;
      }
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