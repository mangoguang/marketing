<template>
  <div class="footer">
    <ul>
      <li v-for="(foot,index) in x" :key="index"
       @click="linkTo(index)">
        <div class="footer-icon">
          <img :src ="`./static/images/icon${index+1}.png`" alt="">
        </div>
        <p :class="`${index}`">{{f[index].text}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      foot:[
        {
          text:'首页',methods:'linkto1'
        },{
          text:'报表',methods:'linkto2'
        },{
          text:'财务',methods:'linkto3'
        },{
          text:'消息',methods:'linkto4'
        },{
          text:'个人',methods:'linkto5'
        }
      ],
      x:5,
      f:''
    }
  },
  created(){
    this.f = this.foot
  //  console.log(this.f[1].icon)
  },
  methods:{
    linkTo:function(index){
      if(index == 0){
         this.$router.push({path:'/home'}) 
      }else if(index == 1){
         this.$router.push({path:'/sales'}) 
      }else{
        alert('该模块尚未开发')
      }
      console.log(index)
    
    }
  }
}
</script>

<style lang="scss" scoped>
.footer{
  width: 100vw;
  height: 22vw;
  position: fixed;
  bottom: 0;
  background: #f8f8f8;
  ul{
    display: flex;
    justify-content: space-around; 
    li{
      margin-top: 2vw;
      .footer-icon img{
        width: 6.6vw;
        height: 6.6vw; 
        margin-bottom: 1.33vw;
      }
      p{
        color: #8e8e93;
        font-size: 2.4vw;
        text-align: center;
      }
    }
  }
}


</style>
