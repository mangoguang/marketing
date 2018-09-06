<template>
  <div class="footer">
    <ul>
      <li v-for="(foot,index) in x" :key="index" @click="linkTo">
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
          text:'首页'
        },{
          text:'报表'
        },{
          text:'财务'
        },{
          text:'消息'
        },{
          text:'个人'
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
    linkTo:function(e){
      console.log(e.target.className)
      // 获取图片的地址
      let src = e.target.src
      let len = src.length
      let len1 = len - 4
      let src1 = src.slice(0,len1)
      //匹配第几张图片
      let reg = /^i|[0-9]$/gm
      let num = src1.match(reg)
      console.log(num)
      if(num == 1){
         this.$router.push({path:'/home'}) 
      }else if(num ==2){
         this.$router.push({path:'/sales'}) 
      }
     
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
