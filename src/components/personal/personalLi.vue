<template>
  <li class="personalLi">
    <div class="left-text">{{lefttext}}</div>

    <div class="center" >
      <slot></slot>
      <e-input  class="input" 
                v-if='hasInput'
                :type="type"
                :placeholderText='placeholderText'
                @changeVal='changeVal'
              />
    </div>

    <div class="right-icon" >

      <template v-if="icon ==='icon'">
        <img src="../../assets/imgs/rightside.png" class="icon">
      </template>

      <template v-if='icon === "eye"' >
        <img  class="eye"
              src="../../assets/imgs/cansee.png" 
              v-show="eye"
              @click="changeEye" >
        <img  class="eye"
              src="../../assets/imgs/nosee.png" 
              v-show='!eye'
              @click="changeEye" >
      </template>
      
    </div>

  </li>
</template>

<script>
import eInput from './e-input'
export default {
  props: {
    lefttext: String,
    icon: String,
    hasInput: Boolean,
    placeholderText: String,
    pwdChange: Function
  },
  components: {eInput},
  data () {
    return {
      eye: true,
      type: 'password'
    };
  },
  methods: {
    //获取input组件传的值赋给父组件。
    changeVal(val) {
      this.pwdChange(val)
    },
    //改变密码显示隐藏
    changeEye() {
      this.eye = !this.eye
      this.type = this.eye === true? 'password' : 'text'
    }
  }
}
</script>
<style lang='scss' scoped>
.personalLi {
  width: 95.74vw;
  height: 11.7vw;
  line-height: 11.7vw;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  font-size: 4vw;
  .left-text {
    width: 26.6vw;
    height: 11.7vw;
    color: #363636;
  }
  .center {
    width: 50vw;
    height: 11.7vw;
    color: #363636;
    .input {
      width: 90%;
      height: 100%;
    }
  }
  .right-icon {
    width: 10vw;
    height: 11.7vw;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    .icon {
      width: 1.86vw;
      height: 3.06vw;
    }
    .eye {
      width: 4vw;
      height: 4vw;
    }
  }
}
</style>