<!--  -->
<template>
  <div class="checkDetail">
    <mybanner :title='title' />
    <form action="">
      <textarea name="reason" id="" cols="30" rows="10" placeholder="请填写扣分原因"></textarea>
      <ul class="imgBox">
        <li
        id="div1"
        draggable="true"
        ondragstart="drag(event)"
        >111</li>
        <li
        ondrop="drop(event)"
        ondragover="allowDrop(event)"
        >222</li>
      </ul>
      <div class="rangeBox">
        <span>扣{{rangeValue}}分</span>
        <mt-range
          v-model="rangeValue"
          :min="10"
          :max="90"
          :step="10"
          :bar-height="12">
        </mt-range>
      </div>
      <button>保存</button>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import { Range } from 'mint-ui';

Vue.component(Range.name, Range);
export default {
  components : {
    mybanner
  },
  data () {
    return {
      title: '店面',
      rangeValue: 10
    }
  },
  methods: {
    drag(ev) {
      ev.dataTransfer.setData("Text",ev.target.id)
    },
    allowDrop(ev) {
      ev.preventDefault()
    },
    drop(ev) {
      ev.preventDefault();
      var data=ev.dataTransfer.getData("Text");
      ev.target.appendChild(document.getElementById(data));
    }
  }
}
</script>
<style lang='scss' scoped>
.checkDetail {
  form{
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    padding-top: 16.466vw;
    height: 100vh;
    box-sizing: border-box;
    .imgBox{
      li{
        width: 20vw;
        height: 20vw;
        background: blue;
      }
    }
    .rangeBox{
      width: 92vw;
      margin: 0 4vw;
      span{
        display: block;
        width: 12.8vw;
        height: 8.1vw;
        font-size: 12px;
        line-height: 6.6vw;
        color: #E4675B;
        text-align: center;
        background: url(../../../assets/imgs/4s/starCheck/msg.png) no-repeat;
        background-size: 100%;
        margin-left: 39.6vw;
      }
    }
    button{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 92vw;
      margin: 0 4vw 5vw 4vw;
      background: #007aff;
      color: #fff;
      font-size: 16px;
      line-height: 13.34vw;
      border-radius: 6.67vw;
    }
  }
}
</style>