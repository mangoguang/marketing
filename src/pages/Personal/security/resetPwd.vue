<template>
  <div class="resetPwd">
    <banner title='修改密码'/>
    <div class="errTips-box">
       <errTips class="errtips" 
                v-show="showTips"
                :errTips='errTips'/>
    </div>
    <ul class="container">
      <li is='personalLi'
          class="personalLi" 
          v-for="(item,index) in list" 
          :key="index"
          :lefttext="item.name"
          :hasInput="item.hasInput"
          :placeholderText='item.placeholderText'
          :icon='item.icon'
          :pwdChange='item.pwdChange'
          >
          <input  type="password" 
                  v-if="!item.hasInput" 
                  v-model="value"
                  placeholder="请输入原登录密码"
                  maxlength="18">
      </li>
    </ul>
    <div class="pwdtips">
      密码必须为6-18位字母和数字组合，英文区分大小写
    </div>
    <btn text='确定修改' class="btn" @touchend.native="changeBtn"/>

    <messageBox :type='true' :btnNum='1' v-show="changeSuc">
      <div>密码修改成功，请重新登录</div>
      <div slot='btn'>
        <button @touchend="comfirm">确定</button>
      </div>
    </messageBox>
  </div>
</template>

<script>
import {IndexModel} from '../../../utils/index'
const indexModel = new IndexModel()
import md5 from "js-md5";
import banner from '../../../components/banner'
import personalLi from '../../../components/personal/personalLi'
import btn from '../../../components/personal/Btn'
import errTips from '../../../components/personal/errTips'
import messageBox from '../../../components/msManage/yanMessageBox'
export default {
  components: {
    banner,
    personalLi,
    btn,
    messageBox,
    errTips
  },
  data () {
    return {
      list: [
        {
          name: '原登录密码',
          hasInput: false
        },{
          name: '新登录密码',
          hasInput: true,
          placeholderText: '请输入新登录密码',
          pwdChange: this.newLoginVal,
          icon: 'eye'
        },{
          name: '再次输入密码',
          hasInput: true,
          placeholderText:'再次输入新登录密码',
          pwdChange: this.newLoginValAgain,
          icon: 'eye'
        }
      ],
      newVal: '',
      newValAgain: '',
      showTips: false,
      errTips: '',
      changeSuc: false,
      top: '',
      value: '',
      key: true
    };
  },
  methods: {
    //获取原密码
    getOriginPwd() {
      const token = localStorage.getItem('token')
      return JSON.parse(token).pwd
    },
    //获取新密码
    newLoginVal(val) {
      this.newVal = val
      if(val.length >= 6) {
        this.judgePwd(val)
      }
    },
    //获取新密码
    newLoginValAgain(val) {
      this.newValAgain = val
    },
    //判断密码格式
    judgePwd(val) {
      // const reg = /^(\w){6,18}$/g
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
      if(!(reg.test(val))) {
        this.errTips = '密码格式错误'
        this.showTips = true
      }else {
        this.showTips = false
        return true
      }
    },
    //判断两次密码相同
    onSamePwd() {
      if(this.newVal === this.newValAgain) {
        return true
      }
    },
    //确定修改
    changeBtn() {
      if(!this.key) {
        return
      }
      this.key = false
      const password = this.getOriginPwd()
      if(this.value === password) {
        this.comfirmChange()
        this.key = true
      }else {
        this.errTips = '原登录密码错误'
        this.showTips = true
        this.hideTips()
      }
    },
    //确认修改后再判断格式
    comfirmChange() {
      if(this.onSamePwd()) {
        if(this.judgePwd(this.newVal)) {
          this.changePassword()
        }
      }else {
        this.errTips = '请输入相同的密码'
        this.showTips = true
      }
    },
    hideTips() {
      setTimeout(() => {
        this.showTips = false
        this.key = true
      }, 1500);
    },
    //修改成功
    comfirm() {
      localStorage.clear()
      this.$router.push({path: '/login'})
    },
    //修改密码
    changePassword() {
      // const formData = new FormData()
      let obj = {
        password:md5(this.getOriginPwd()),
        newPassword:md5(this.newVal)
      }
      // formData.append('password',md5(this.getOriginPwd()))
      // formData.append('newPassword',md5(this.newVal))
      const key = ['password','newPassword']
      indexModel.changePassword(obj,'post').then(res => {
        if(res.status) {
          this.changeSuc = true
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.resetPwd {
  .errTips-box {
    position: absolute;
    left: 0;
    .errtips {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      -webkit-animation: run 2s;
    }
    @keyframes run {
      0%   {top: -16.4vw;}
      100%  {top: 0;}
    }
  }
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
  .pwdtips {
    font-size: 3.2vw;
    color: #909090;
    line-height: 11.73vw;
    margin-left: 4.26vw;
  }
  .btn {
    margin-top: 6.8vw;
  }
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
} 
</style>