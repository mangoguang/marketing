<template>
  <div class="safe">
    <mybanner :title="title" style="position:static"/>
    <ul class="list">
      <li>
        <span>头像</span>
        <div class="cell">
          <img src="../assets/imgs/avatar.png" alt="" class="avatar">
        </div>
      </li>
       <li>
          <span>姓名</span>
          <div class="cell">
            <span>张小红</span>
          </div>
      </li>
       <li>
        <span>性别</span>
        <div class="cell">
          <span>女</span>
          <div class="icon-right">
            <img src="../assets/imgs/rightside.png" alt="">
          </div>
        </div>
      </li>
    </ul>
    <ul class="list" style="border-top:1px solid #ccc">
      <li>
        <span>手机</span>
        <div class="cell">
          <span>159166666666</span>
        </div>
      </li>
       <li>
          <span>账号</span>
          <div class="cell">
            <span>11609090</span>
          </div>
      </li>
       <li>
        <span>所属门店</span>
        <div class="cell">
          <span>长沙红星美凯龙店</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import mybanner from '../components/banner'
export default {
  data () {
    return {
     title:'账户安全'
 
    }
  },
  components:{
      mybanner
  },
  mounted(){
   
  },
  methods:{
    

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
        align-items: center;
        padding-right:4.266vw;
        color:#666;
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
}

</style>
