<template>
  <div class="urgentSelect">
    <h3>是否紧急</h3>
    <ul class="select">
      <li v-for="(item, index) in urgencyBtns"
        :key="`urgencyBtns${index}`"
        :class="{on: item.status}">
        <button 
        @click="urgencySelect(index)">{{item.name}}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import mango from '../../js'
export default {
  props: ['urgentVal'],
  data() {
    return {
      urgencyBtns: mango.btnList(['是', '否']),
      val: ''
    }
  },
  computed:{
    ...mapState({
      newCustomerInfo: state => state.customer.newCustomerInfo
    })
  },
  created() {
    this.init()
  },
  methods: {
    //初始化问题
     init() {
      if(this.newCustomerInfo.urgency === 'false' || this.newCustomerInfo.urgency === 'true') {
        let i = this.newCustomerInfo.urgency  === 'false'? 1 : 0
        mango.changeBtnStatus(this.urgencyBtns, i)
      }
    },
    // 紧急程度选择
    urgencySelect(i) {
      if(this.urgencyBtns[i].status) {
        return
      }
      this.val = i? 0 : 1
      this.urgentVal(this.val)
       mango.changeBtnStatus(this.urgencyBtns, i)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/common.scss";
.urgentSelect {
  width: 100vw;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 2vw 4vw;
  h3 {
    font-size: 4vw;
    color: #363636;
    font-weight: normal;
    flex: 0.24;
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

