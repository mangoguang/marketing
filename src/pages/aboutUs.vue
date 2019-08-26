<template>
  <div class="version">
    <mybanner style="border:none"/>
    <div class="verBox">
        <div class="imgBox">
          <img src="../assets/imgs/ver.png" alt="">
          <h1>营销助手</h1>
          <h2>Version 2.0.0</h2>
        </div>
        <div class="desc">    
          <p>东莞市慕思寝室用品有限公司，以下简称慕思。慕思创立于2004年，专业致力于人体健康睡眠研究，从事整套健康睡眠系统的研发、生产和销售。慕思深知占据了人生三分之一的生命的睡眠意义非凡，为此确立了“让人们睡得更好”的使命，并以“成为全球最受尊重的健康睡眠品牌引领者”为愿景。在践行“客户满意、整合创新、合作共赢”核心价值观的过程中，慕思迅速由中国扩展至全球，目前全球专卖店已突破3600余家，遍及澳大利亚、美国、意大利、加拿大等20多个国家和地区。</p>
          <p>营销助手APP致力于给经销商赋能，协助经销商进行客户管理，让经销商能实时查看经营数据，减少人工统计数据的时间和成本，使得经销商可以更好地进行经营。</p>                   
        </div>
    </div>
  </div>
</template>

<script>
import mybanner from '../components/banner'
export default {
  data () {
    return {
     
 
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
.version{
  margin-top:16.466vw;
  .verBox{
    padding:0 8vw;
    color:#363636;
   .imgBox{
      padding:18.534vw 0 8.333vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img{
        width:16vw;
        height:16vw;
      }
      h1{
        margin-top:5.333vw;
        font-weight: bold;
        font-size:4.8vw;
      }
      h2{
        font-size:3.733vw;
      }
   }
   p{
    text-indent: 2em;
    font-size:4vw;
    color:#363636;
    text-align:justify;
    text-justify:inter-word;
   }
  }
}

</style>
