<!--  -->
<template>
  <div class="e-input">
    <form action='' @submit.prevent>
      <input  :type="type" 
              @change="changeVal"
              @blur="viewDefault"
              :placeholder="placeholderText"
              maxlength="18"
              />
    </form>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholderText: String
  },
  data () {
    return {
    };
  },
  methods: {
    //输入框回弹的时候恢复页面
    viewDefault() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    //给父组件传值
    changeVal(e) {
      this.$emit('changeVal',e.target.value)
    }
  }
}
</script>
<style lang='scss' scoped>
input {
  border-radius:0;
  text-indent: 0;
  background: transparent;
  border: 0 none;
  resize:none; 
  outline:none;  /*清除选中效果的默认蓝色边框 */
  -webkit-appearance:none;  /*清除浏览器默认的样式 */
  line-height: normal;   //光标问题 
  width: 45vw;
  height: 11.7vw;
  font-size: 4vw;
  color: #363636;
}
  input::-webkit-input-placeholder { /* WebKit browsers */
    font-size: 4vw;
    color: #909090;
    padding: 0;
    margin: 0;
    width: 45vw;
    height: 11.7vw;
  }
  input:focus {
    // color: #8b8791;
  }
</style>