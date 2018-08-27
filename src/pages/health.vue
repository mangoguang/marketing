<template>
  <div class="login"  v-bind:style="{ height: height + 'px' }">
    <div class="picbox">
      <h3>好的睡眠从选择床垫开始</h3>
      <p>人的一生有三分之一的时间都是在床上度过的，拥有一个良好的睡眠，意味着你这一生的三分之一的时间都是舒服的。与其说，人是睡在床上的，不如说人是睡在床垫上的。所以，好的睡眠从选择一款适合自己的床垫开始的。输入资料，我们将为您选择适合您的床垫。</p>
    </div>
    <form class="loginForm" action="">
      <ul>
        <li>
          <label>身高：</label>
          <input v-model="stature" type="text" placeholder="(m)" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" maxlength="8" autofocus>
        </li>
        <li>
          <label>肩宽：</label>
          <input v-model="shoulder" type="text" placeholder="(cm)" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"  maxlength="8">
        </li>
        <li>
          <label>腰围：</label>
          <input v-model="waistline" type="text" placeholder="(cm)" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"  maxlength="8">
        </li>
        <li>
          <label>体重：</label>
          <input v-model="weight" type="text" placeholder="(kg)" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"  maxlength="8">
        </li>
        <li class="phoneBox" v-show="hidPhone" v-bind:style="{ height: height + 'px' }">
<!--           <span v-on:click="phoneClose" class="phoneClose">关闭</span> -->
          <ul>
            <li><h4>快捷登陆</h4></li>
            <li>
              <label>姓名：</label>
              <input v-model="name" type="text" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"  maxlength="11">
            </li>
            <li>
              <label>电话：</label>
              <input v-model="phone" type="text" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"  maxlength="11">
            </li>
            <li>
              <label>动态码：</label>
              <input class="numText" v-model="number" type="text" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"  maxlength="6">
              <span v-on:click="getNum" class="getNum">获取动态码</span>
            </li>
            <span v-on:click="submit" class="submit">提交</span>
          </ul>
        </li>
        <li>
          <span v-on:click="getPhone" class="getPhone">提交</span>
        </li>
      </ul>
    </form>

    <ul class='resultBox' v-show="hidResult" v-bind:style="{ height: height + 'px' }">
      <li><img class="logo" src="../assets/logo_u127.png" alt=""></li>
      <li class="clearfix">
        <h2>您输入的参数：</h2>
        <h5>身高：{{stature}}m</h5>
        <h5>肩宽：{{shoulder}}cm</h5>
        <h5>腰围：{{waistline}}cm</h5>
        <h5>体重：{{weight}}kg</h5>
      </li>
      <li>
        <h2>您的测试结果：</h2>
        <ul class="resultLi clearfix">
          <li v-for="n in index" v-bind:style="{ background: color}"></li>
        </ul>
        <p>根据测试结果，适合您的床垫类型为******</p>
      </li>
      <li class="map">
        <img src="../assets/map.png" alt="">
      </li>
<!--       <li>
        <button v-on:click="ok" class="ok">确定</button>
      </li> -->
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import vueResource from 'vue-resource'

export default {
  name: 'login',
  data () {
    return {
      height: document.documentElement.clientHeight,
      stature: '',
      shoulder: '',
      waistline: '',
      weight: '',
      name: '',
      phone: '',
      number: '',
      index: 4,
      color: '',
      hidResult: false,
      hidPhone: false
    }
  },computed: {

  },
  methods:{
    getPhone: function(){
      var stature = parseFloat(this.stature);
      var shoulder = parseFloat(this.shoulder);
      var waistline = parseFloat(this.waistline);
      var weight = parseFloat(this.weight);
      var phone = parseFloat(this.phone);
      if(this.stature != ''){
        if(this.shoulder != ''){
          if(this.waistline != ''){
            if(this.weight != ''){
              //色值
              var colorNum = weight/(stature*stature);
              //根据色值算出相对应颜色
              if((colorNum>=0)&&(colorNum<=20)){
                this.color = '#57d3f7';
              }else if(colorNum>20&&colorNum<=24){
                this.color = '#00ff80';
              }else if(colorNum>24&&colorNum<=28){
                this.color = '#f27537';
              }else{
                this.color = '#eb3f2f';
              }
              //计算我的指数
              if(shoulder>waistline){
                var index = (shoulder/waistline-1)*100;
              }else{
                var index = (waistline/shoulder-1)*100;
              }
              if(index>0&&index<=10){
                this.index = 1;
              }else if(index>10&&index<=15){
                this.index = 2;
              }else if(index>15&&index<=20){
                this.index = 3;
              }else if(index>20&&index<=30){
                this.index = 4;
              }else{
                this.index = 5;
              }
              //显示获取手机动态码模块
              this.hidPhone = true;
            }else{
              alert('体重不能为空');
              return;
            }
          }else{
            alert('腰围不能为空');
            return;
          }
        }else{
          alert('肩宽不能为空');
          return;
        }
      }else{
        alert('身高不能为空');
        return;
      }
    },
    getNum:function(){
      if(this.phone.length == 11){
        return this.number = '123456';
      }else{
        alert('无效的手机号码！请输入正确的手机号！');
      }
    },
    submit:function(){
      if(this.number=='123456'){
        this.hidResult = true;
        return this.hidPhone = false;
      }else{
        alert('验证码输入有误！');
      }
    },
    ok:function(){
      this.hidResult =  false;
      this.$router.go(0);
    }
  },
  beforeMount: function() {
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$bgc: #31c3b0;
$fc: #666;
$subfc: #525252;
.picbox{
  h3{
    width: 10rem;
    height: 6rem;
    background: url(./../../static/images/u60.jpg);
    background-size: 100% 100%;
    color: #fff;
    font-size: .8rem;
    text-align: center;
    line-height: 6rem;
  }
  p{
    color: #666;
    font-size: .4rem;
    line-height: 1.5em;
    padding: .3rem .3733rem;
    text-indent: 2em;
  }
}

  .login{
    font-size: 20px;
    width: 100%;
    background-color: rgba(218, 249, 202, 1);
    .loginForm{
      width: 90%;
      height: 200px;
      margin-left: 5%;
      input,label,button,span{
        color: $fc;
      }
      label,input{
        font-size: 20px;
        height: 30px;
        width: 50%;
      }
      &>input{
        width: 7rem;
        border-bottom: 1px solid #666;
      }
      input::-webkit-input-placeholder{
        color: #999;
        } input:-moz-placeholder{
        color: #999;
        } input::-moz-placeholder{
        color: #999;
        } input:-ms-input-placeholder{
        color: #999;
        }
      .getPhone{
        display: block;
        width: 100%;
        color: $fc;
        text-align: center;
        line-height: 2em;
        margin-top: 30px;
        border-radius: .1rem;
        background-color: rgba(243, 215, 181, 1);
      }
      &>.submit{
        display: block;
        text-align: center;
        width:80%;
        margin-left: 10%;
        margin-top: 25px;
        line-height: 2em;
        border: 1px solid #fff;
        border-radius: 4px;
      }
      .phoneBox{
        width: 100%;
        background: rgba(0,0,0,.5);
        position: fixed;
        top: 0;
        left: 0;
        ul{
          width: 90%;
          height: 6rem;
          position: absolute;
          top: 50%;
          left: 5%;
          margin-top: -3rem;
          background-color: rgba(253, 255, 223, 1);
          padding-top: .2rem;
          li{
            margin: 0 .2rem;
            border-bottom: 1px solid #666;
            position: relative;
            h4{
              color: #666;
              text-align: center;
              margin: 0 .2rem;
            }
            label{
              width: 30%;
              box-sizing: border-box;
            }
            input{
              width: 70%;
            }
            .getNum{
              border: 1px solid #666;
              border-radius: 4px;
              position: absolute;
              right: .2rem;
              top: .1rem;
              line-height: 1.2em;
            }
          }
          li:nth-child(4){
            border: none;
          }
          span.submit{
            display: block;
            text-align: center;
            line-height: 2em;
            background-color: rgba(243, 215, 181, 1);
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        }
        .numText{
          width: 25%;
        }
        .phoneClose{
          color: $fc;
          padding: 0 5px;
          position: fixed;
          top: 0;
          right: 0;
        }
      }
    }
  }
  .resultBox{
    width: 100%;
    background-color: rgba(253, 255, 223, 1);
    color: $fc;
    padding: 20px 20px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
    li{
      h2{
        color: #525252;
        font-size: .6rem;
        font-weight: 600;
      }
      h5{
        width: 50%;
        float: left;
      }
    }
    img.logo{
        width: 6rem;
        height: 2.5rem;
        margin: .5rem 2rem;
      }
    .resultLi{
      li{
        width: 1.6rem;
        height: .8rem;
        background: #daf9ca;
        float: left;
        margin-right: .1rem;
      }
    }
    .map{
      img{
        width: 9rem;
      }
    }
    button{
      color: $subfc;
      background-color: rgba(243, 215, 181, 1);
      width: 100%;
      margin-top:  30px;
      font-size: 20px;
      line-height: 2em;
      border-radius: .1rem;
    }
  }
</style>
