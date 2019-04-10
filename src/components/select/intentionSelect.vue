<template>
  <div class="intentionSelect">
    <div class="content">
      <span>意向分类</span>
    </div>
    <ul class="select">
      <li v-for="(item, index) in keyBtns"
        :class="{on: item.status}"
        :key="`keyBtns${index}`">
        <button 
        @touchend="keySelect(index)">{{item.name}}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import mango from '../../js'
export default {
  props: ['intentionVal'],
  data() {
    return {
      keyBtns: mango.btnList(['A', 'B', 'C']),
      val: ''
    }
  },
  methods: {
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
  padding: 4vw 4vw;
  font-size: 4vw;
  color: #363636;
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
