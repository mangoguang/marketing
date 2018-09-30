<template>
<div class="myinput">
  <li>
    <label for="account" v-bind:class='`${newpwd}`'>
      <span>新密码</span>
    </label>
    <input id="account" type="password" 
      v-bind:class="`${inputPwd}`"
      v-on:focus='focusPwd()'  @blur="blurPwd()"
      v-model="resetForm.Pwd" maxlength="20">
  </li>
  </div>
</template>

<script>
export default {
  data(){
    return{
      inputPwd:'inputPwd',
      inputNewPwd:'inputNewPwd',
      newpwd:'newpwd',
      newPwd:'newPwd',
      resetForm:{
        Pwd:'',
        pwd:''
      }
    }
  },
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
.myinput{
  position: relative;

.newpwd,.newPwd{
        font-size: 4vw;
        letter-spacing: .66vw;
        color: #909090;   
        line-height: 11.6vw;  
      }
      //span位置
      .newpwd{
        position: absolute;
        left: 1px;
        top: -4px;
        animation: moveDown .5s;
        @keyframes moveDown {
          from{
            top: -6.5vw;
          }
          to{
            top: -4px;
          }
        }
        }
      .newpwd1{
        position: absolute;
        left: 1px;
        top: -6.5vw;
        animation: moveUP .5s;
        @keyframes moveUP {
          from{
            top: 5px;
          }
          to{
            top: -6.5vw;
          }
        }
        span{
          color: #bebebe;
          font-size:3.2vw;
          letter-spacing: 4px;
        }
      }
      .newpwd2{
       position: absolute;
       left: 1px;
       top: -6.5vw;
        span{
          color: #bebebe;
          font-size:3.2vw;
          letter-spacing: 4px; 
        }
      }
      .newpwd3{
        position: absolute;
        left: 1px;
        top: -4px;
         span{
          font-size: 4vw;
          letter-spacing: 5px;
          color: #909090;   
          line-height: 10vw; 
        }
      }
      .newPwd{
        position: absolute;
        left: 1px;
        top: 17.2vw;
        animation: moveDown1 .5s;
        @keyframes moveDown1 {
          from{
            top: 12vw;
          }
          to{
            top: 17.2vw;
          }
        }
      }
      .newPwd1{
        position: absolute;
        left: 1px;
        top: 12vw;
        color: #bebebe;
        font-size:3.2vw;
        letter-spacing: .53vw; 
        animation: moveUp1 .5s;
        @keyframes moveUp1 {
          from{
            top: 17.2vw;
          }
          to{
            top: 12vw;
          }
        }
        }
       .newPwd2{
        position: absolute;
        left: 1px;
        top: 12vw;
         span{
          color: #bebebe;
          font-size:3.2vw;
          letter-spacing: 4px; 
        }
        }
       .newPwd3{
        position: absolute;
        left: 1px;
        top: 17.2vw;
        span{
          font-size: 4vw;
          letter-spacing: 5px;
          color: #909090;   
          line-height: 10vw; 
        }
       }
      .inputPwd,.inputNewPwd{
        display: block;
        border-bottom: 1px solid #ccc;
        width: 80vw;
        height: 8vw;
        font-size: 4vw;
        margin-top: 10vw;
        color: #262628
      }
      .inputPwd1{
        display: block;
        border-bottom: 2px solid #ccc;
        width: 80vw;
        height: 8vw;
        font-size: 4vw;
        margin-top: 10vw;
        color: #262628;     
        }
      .inputNewPwd1{
        display: block;
        border-bottom: 2px solid #ccc;
        width: 80vw;
        height: 8vw;
        font-size: 4vw;
        margin-top: 10vw;
        color: #262628;
      }
}
</style>

