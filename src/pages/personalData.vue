<template>
  <div class="safe">
    <mybanner :title="title" style="position:static"/>
    <ul class="list">
      <li>
        <span>头像</span>
        <div class="cell">
          <img v-if="headPortrait===''" :src="via" alt="" class="avatar">
          <img v-else :src="headPortrait" alt="" class="avatar">
        </div>
      </li>
       <li>
          <span>姓名</span>
          <div class="cell">
            <span>{{username}}</span>
          </div>
      </li>
       <li>
        <span>性别</span>
        <div class="cell">
          <span v-if="sex==1">男</span>
          <span v-else-if="sex==2">女</span>
          <span v-else>未知</span>
          <div class="icon-right">
            <img src="../assets/imgs/rightside.png" alt="">
          </div>
        </div>
      </li>
    </ul>
    <ul class="list info" style="border-top:1px solid #ccc">
      <li>
        <span>手机</span>
        <div class="cell">
          <span>{{phone}}</span>
        </div>
      </li>
       <li>
          <span>账号</span>
          <div class="cell">
            <span>{{account}}</span>
          </div>
      </li>
       <li v-show="_localAjax().typename !== 'Dealer Boss'">
        <span style="align-self:flex-start;">所属门店</span>
        <div class="cell" style="flex-direction: column;">
          <span v-for="(item,index) in shopList" :key="index">{{item.name}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {IndexModel} from '../utils'
const indexModel=new IndexModel()
import {  userinfo } from '@/api/4s'
import mybanner from '../components/banner'
export default {
  data () {
    return {
      title:'个人资料',
      headPortrait:'',
      username:'',
      sex:'',
      phone:'',
      account:'',
      shopList:'',
      via:'./static/images/avatar.png'
    }
  },
  components:{
      mybanner
  },
  created(){
   this.getUserInfo();
  },
  methods:{
    getUserInfo(){
     userinfo().then(res => {
        console.log(res);
        if(res.code===0){
          this.headPortrait=res.data.headPortrait;
          this.username=res.data.username;
          this.sex=res.data.sex;
          this.phone=res.data.phone;
          this.account=res.data.account;
          this.shopList=res.data.shopList;
        }
      }).catch((reject) => {
        if (reject === 510) {
          this.getUserInfo()
        }
      })
    }

  }
};
</script>

<style lang="scss" scoped>
.safe{
  height:100vh;
  .list{
    //margin-top:16.466vw;
    padding-left:4.266vw;
    background: #fff;
    font-size: 4vw;
    color:#363636;
    border-bottom: 1px solid #ccc;
    margin-bottom: 2.666vw;
    li{
      min-height:12vw;
      border-bottom: 1px solid #e1e1e1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .cell{
        display: flex;
        flex-direction: row;
        align-items: top;
        padding-right:4.266vw;
        color:#666;
        text-align:right;
        .avatar{
          width:14.666vw;
          height:14.466vw;
          margin:1.866vw 0;
        }
        .icon-right{
          margin-left:2.133vw;
          img{
            width: 1.86vw;
            height: 3.06vw;
          }
        }
      }
    }
    li:last-child{
        border:none;
    }
  }
  .info{
       li:last-child{
        flex-direction: column;
      
        .cell{
          width:100%;
          justify-content: flex-start;
          box-sizing:border-box;
          text-align: left;
        }
      }
    }
}

</style>
