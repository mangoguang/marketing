<template>
  <div class="fil-box"
       @click="$emit('onCloseFilter')">
    <div class="fil-main"
         @click.stop>
      <div class="list">
        <h2>品牌</h2>
        <div class="ul">
          <div class="li"
               :class="{active:selectIndex==index}"
               v-for="(item,index) in 10"
               :key="index"
               @click="bindSelect(index)">慕思</div>
        </div>
      </div>
    </div>
    <div class="button">
      <div class="btn light-blue">重置</div>
      <div class="btn blue">完成</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      selectIndex: 0
    }
  },
  methods: {
    bindSelect(index) {
      this.selectIndex = index
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.fil-box {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  .fil-main {
    width: 300px;
    height: calc(100vh-52px);
    background-color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    padding: 21px 17px;
    overflow: auto;
    .list > h2 {
      color: #999999;
      font-size: 14px;
      line-height: 1;
      padding-bottom: 10px;
    }
    .ul {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 20px;
      .li {
        width: 80px;
        height: 40px;
        background: #f8f8f8;
        border-radius: 6px;
        text-align: center;
        line-height: 40px;
        border: 1px solid transparent;
        margin-right: 13px;
        margin-bottom: 10px;
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
      .active {
        background: rgba(178, 215, 255, 1);
        color: #007aff;
      }
    }
  }
  .button {
    display: flex;
    height: 52px;
    text-align: center;
    line-height: 52px;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 300px;
    .btn {
      flex: 1;
    }
    .light-blue {
      background-color: #b2d7ff;
      color: #007aff;
    }
    .blue {
      background-color: #007aff;
      color: #fff;
    }
  }
}
</style>