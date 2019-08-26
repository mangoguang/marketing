<template>
  <div class="personalMsg">
    <Header/>
    <ul>
      <li v-for = "(item,index) in ListItem" :key='index' @click="routeTo(index)">
        <span v-if="index!==3">{{item}}</span>
        <div v-else class="version"><span>{{item}}</span><span style="color:#666" >版本&nbsp;1.1.2</span></div>
        <div class="icon-right">
          <img src="../../assets/imgs/rightside.png" alt="">
        </div>
      </li>
       <li @click="crmMerge" v-if="isMerge">
        <span>同步CRM账号</span>
        <div class="icon-right">
          <img src="../../assets/imgs/rightside.png" alt="">
        </div>
      </li>
    </ul>
    <btn :text='text' @click.native="quit()"/>
    <message-box :type="messageTip.type" :btnNum='messageTip.btnNum' v-if="messageTip.showMessageBox">
      {{messageTip.tip}}
    <template v-slot:btn-group>
        <button type="button" @click="remove">确定</button>
        <button type="button" @click="cancel">取消</button>
    </template>
    <template v-slot:btn>
        <button type="button" @click="cancel">确定</button>
    </template>
  </message-box>
   <message-box v-show="mergeBoxShow" v-bind="mergeBox">
      <p id="tip">{{mergeBox.tip}}</p>
    <template v-slot:btn-group>
        <button type="button" @click="merge">确定</button>
        <button type="button" @click="cancelMerge">取消</button>
    </template>
    <template v-slot:btn>
        <button type="button" @click="cancelMerge">确定</button>
    </template>
  </message-box>
    <Footer/>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapMutations, mapState } from "vuex";
//组件
import btn from '../../components/personal/Btn'
import Footer from '../../components/Footer'
import Header from '../../components/personal/header'
import {IndexModel} from '../../utils/index'
import {checkLogin} from '../../utils/token/toLogin'
import messageBox from '../../components/msManage/yanMessageBox'
const indexModel = new IndexModel()

export default {
  name:'personMsg',
  components:{
    Footer,
    Header,
    btn,
    messageBox
  },
  data(){
    return{
      text:'退出账号',
      /* ListItem: [
        '关于我','组织架构','功勋榜','日报','我的收藏'
      ] */
      ListItem: [
        '我的收藏','意见反馈','账户安全','关于我们'
      ],
      key: true,
      messageTip:{
        showMessageBox:false,
        btnNum:1,
        type:false,
        tip:'确定要退出账号吗?'
      },
      mergeBoxShow:false,
      mergeBox:{
        tip:'',
        type:false,
        btnNum:2
      },
      isMerge:false,
      version:""
    }
  },
  created(){
    checkLogin()
    this.checkLogin()
  //  console.log(this.forms[0].text)
  //到时候放在初始页面
    localStorage.removeItem('limit');  
    localStorage.removeItem('selectLimit');  
    this.setCustomerScroll(0);
    this.setOrderScroll(0);
    this.setDealScroll(0)
    // this.setIsSelectStatus(false)
    this.$store.commit('setIsSelectStatus', false)
    let account=JSON.parse(localStorage.getItem('ajaxData')).account;
    let crmAccount=JSON.parse(localStorage.getItem('crmAccount')).crmAccount;
    if(account!==crmAccount){
      if(_localAjax().typename==='Dealer Boss'||_localAjax().typename==='Boss&Consultant'||_localAjax().typename==='Boss&Manager'){
        this.isMerge=false
      }else{
        this.isMerge=true
      }
    }else{
      this.isMerge=false
    }
    
  },
  mounted() {
    console.log('个人中心页面：', this.$root.token)
  },
  methods:{
    ...mapMutations([
      "setCustomerScroll",
      "setOrderScroll",
      'setDealScroll',
      'setIsSelectStatus'
    ]),
    //判断token过期时间，设置定时器
    setTime() {
      this.key = false
      let count = 0
      let time = JSON.parse(localStorage.getItem('loginData')).expires_in
      let timer = setInterval(() => {
        count ++;
        console.log(123,count)
        if(count === time) {
          clearInterval(timer)
          this.key = true
        }
      }, 1000);
    },
    //缓存时间
    checkLogin() {
      let ajaxData = localStorage.getItem('ajaxData')
      // console.log(Date.parse(new Date()) - timeLong)
      if (!ajaxData) {
        this.$router.replace({path: './Login'})
        return
      } else {
        let timeLong = JSON.parse(ajaxData).timestamp
        timeLong = Date.parse(new Date()) - JSON.parse(ajaxData).timestamp
        timeLong = timeLong/(60 * 60 * 24 * 1000)
        if (timeLong > 10) {
          this.$router.replace({path: './Login'})
          return
        }
      }
    },
    routeTo(index){
      switch (index)
      {
        case 0 :
        this.$router.push({path: '/collectList'});
        break;
        case 1 :
        this.$router.push({path: '/feedback'});
        break;
        case 2 :
        this.$router.push({path: '/security'});
        break;
        case 3 :
        this.$router.push({path: '/aboutUs'});
        break;
        case 4 :
          console.log(4);
        //this.$router.push({path: '/dailyPaper'});
        break;
        default:
        return
      }
    },
    crmMerge(){
      let account=JSON.parse(localStorage.getItem('ajaxData')).account;
      let crmAccount=JSON.parse(localStorage.getItem('crmAccount')).crmAccount;
      let obj={
        tip:`当前APP登录账号为${account}，CRM登录账号${crmAccount}，不一致，是否修改CRM登录账号为${account}，修改后使用${account}登录APP和CRM,是否确定修改？`,
        btnNum:2,
        type:false
      }
      this.mergeBox=obj;
      this.mergeBoxShow=true;
    },
    quit(){
      this.messageTip.tip="确定要退出账号吗?";
      this.messageTip.btnNum=2;
      this.messageTip.showMessageBox=true; 
    },
    remove(){
      let deviceId=localStorage.getItem('deviceId');
      localStorage.clear()
      if(deviceId){
        localStorage.setItem('deviceId',deviceId)
      }
      this.$router.push({path: '/login'})
      this.messageTip.showMessageBox=false;
    },
    cancel(){
      this.messageTip.showMessageBox=false;
    },
    merge(){
      let obj=JSON.parse(localStorage.getItem('ajaxData'));
      indexModel.merge({
        userId: obj.userId,
        account: obj.account
      }).then((res) => {
        if(res.status){
          let tipObj={
            tip:res.msg,
            btnNum:1,
            type:true
          }
          this.mergeBox=tipObj;
          let crmAccount=JSON.stringify({
            crmAccount:obj.account
          })
          localStorage.setItem("crmAccount", crmAccount);
          //this.mergeBoxShow=true;
        }else{
          let tipObj={
            tip:res.msg,
            btnNum:1,
            type:false
          }
          this.mergeBox=tipObj;
        }
       
      })
    },
    cancelMerge(){
      let account=JSON.parse(localStorage.getItem('ajaxData')).account;
      let crmAccount=JSON.parse(localStorage.getItem('crmAccount')).crmAccount;
      if(account!==crmAccount){
        this.isMerge=true
      }else{
        this.isMerge=false
      }
      this.mergeBoxShow=false
    }
  },
  beforeRouteLeave(to,from,next){
    if(to.name==="/feedback"){
      to.meta.isUseCache=false;
      next();
    }
    to.meta.isUseCache=false;
    next();
    
  }
}
</script>

<style lang="scss" scoped>
#tip{
  padding:0;
  margin:0;
  word-break:break-all;
  text-align:justify;
}
.personalMsg{
  background: #f8f8f8;
  min-height: 100vh;
   .fix{
    width: 100%;
    height: 6vw;
    background: #e1e1e1;
    position: absolute;
    left: 0;
    top: -6vw;
  }
  ul{
    padding-left: 4.13vw;
    font-size: 4vw;
    color: #363636;
    margin-bottom: 8.13vw;
    background: #fff;
    border-bottom: 1px solid #CCC;
    li{
      border-bottom: 1px solid #e1e1e1;
      height: 12vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .version{
        flex:1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .icon-right{
        padding: 0 4.53vw;
        img{
          width: 1.86vw;
          height: 3.06vw;
        }
      }
    }
    li:last-child{
        border:none;
    }
  
  }
}

</style>
