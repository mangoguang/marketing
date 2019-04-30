<template>
  <div class="intentionSelect">
    <!-- <div class="content">
      <span></span>
    </div> -->
    <h3>意向分类</h3>
    <ul class="select">
      <li v-for="(item, index) in keyBtns"
        :class="{on: item.status}"
        :key="`keyBtns${index}`">
        <button 
        @click="keySelect(index)">{{item.name}}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import mango from '../../js'
export default {
  props: ['intentionVal'],
  data() {
    return {
      keyBtns: mango.btnList(['A', 'B', 'C']),
      val: ''
    }
  },
  created() {
    this.init()
  },
  computed:{
    ...mapState({
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  methods: {
    //初始化问题
     init() {
      if(this.newCustomerInfo.level) {
        let i = this.newCustomerInfo.level === 'A'? 0 : this.newCustomerInfo.level === 'B'? 1 : 2
        mango.changeBtnStatus(this.keyBtns, i)
      }else {
        mango.changeBtnStatus(this.keyBtns, 0)
      }
    },
     // 选择
    keySelect(i) {
      if(this.keyBtns[i].status) {
        return
      }
      this.val = i === 0? "A" : i === 1? 'B' : 'C'
      this.intentionVal(this.val)
      mango.changeBtnStatus(this.keyBtns, i)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
.intentionSelect {
  width: 100vw;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 2vw 4vw;
  font-size: 4vw;
  color: #363636;
  height: 15vw;
  h3 {
    font-size: 4vw;
    color: #363636;
    font-weight: normal;
    flex: 0.24;
  }
  .content {
    flex: 0.24
  }
  .select {
    flex: 0.76;
    display: flex;
    align-items: center;
    justify-content: space-between;
    li {
      width: 21.33vw;
      height: 10.66vw;
      border-radius: 1.6vw;
      background: #fff;
      line-height: 10.66vw;
      text-align: center;
      button {
        font-size: 3.73vw;
        color: #666;
      }
    }
    li.on{
      color: $btnCol;
      background: $btnSubCol;
      button {
        color: #007aff
      }
    }
  }
}
</style>
