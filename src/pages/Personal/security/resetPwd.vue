<template>
  <div class="resetPwd">
    <banner title='修改密码'/>
    <ul class="container">
      <li is='personalLi'
          class="personalLi" 
          v-for="(item,index) in list" 
          :key="index"
          :lefttext="item.name"
          :hasInput="item.hasInput"
          :placeholderText='item.placeholderText'
          :eye='item.eye'
          :pwdChange='item.pwdChange'>
          <!-- <input type="password" :value="item.text" :readonly='true'> -->
      </li>
    </ul>
    <div class="tips">
      密码必须为6-18位字母和数字组合，英文区分大小写
    </div>
    <btn text='确定修改' class="btn"/>
  </div>
</template>

<script>
import md5 from "js-md5";
import banner from '../../../components/banner'
import personalLi from '../../../components/personal/personalLi'
import btn from '../../../components/personal/Btn'
import messageBox from '../../../components/msManage/yanMessageBox'
export default {
  components: {
    banner,
    personalLi,
    btn,
    messageBox
  },
  data () {
    return {
      list: [{
        name: '原登录密码',
        hasInput: false,
        text:'12313'
      },{
        name: '新登录密码',
        hasInput: true,
        placeholderText: '请输入新登录密码',
        pwdChange: this.newLoginVal,
        eye: true
      },{
        name: '再次输入密码',
        hasInput: true,
        placeholderText:'再次输入新登录密码',
        pwdChange: this.newLoginValAgain,
        eye: false
      }]
    };
  },
  methods: {
    newLoginVal(val) {
      console.log(123,val)
    },
    newLoginValAgain(val) {
      console.log(222,val)
    }
  }
}
</script>
<style lang='scss' scoped>
.resetPwd {
  .container {
    width: 100vw;
    margin-top: 16.4vw;
    padding-left: 4.26vw;
    box-sizing: border-box;
    background: #fff;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
    .personalLi {
      border-bottom: 1px solid #e1e1e1;
    }
    .personalLi:last-child{
      border-bottom: none;
    }
  }
  .tips {
    font-size: 3.2vw;
    color: #909090;
    line-height: 11.73vw;
    margin-left: 4.26vw;
  }
  .btn {
    margin-top: 6.8vw;
  }
} 
</style>