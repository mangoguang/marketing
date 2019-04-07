<template>
    <div class="address">
      <mybanner :title="title" style="background:#fff;"></mybanner>
      
      <btn text='添加新地址' style="position:absolute;bottom:6.4vw;left:0;right:0" @click.native='jump'/>
    </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import Btn from '../../../components/personal/Btn'
import { Toast } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      
    }
  },
  components:{
     mybanner,
     Btn
  },
  computed:{
    ...mapState('selectAddress',[
      'title'
    ])
  }, 
  created(){
   
  },
  
  mounted(){
    
  },
  methods:{
   ...mapMutations('selectAddress',['updateAddress']),
   jump(){
     this.$router.push({path:'/addAddress'});
   }
  }
};
</script>

<style lang="scss">
 .address{
  width:100vw;
  min-height:100vh;
  padding-bottom: 25.866vw;
  overflow-x: hidden;
  position: relative;
  box-sizing: border-box;
   .list{
    margin-top:16.466vw;
    width:100vw;
    overflow-x: hidden;
    .noRecord{
      text-align: center;
      font-size:2.933vw;
      color:#909090;
      line-height: 6.4vw;
      padding-top:14.133vw;
      img{
        width:4vw;
        margin-top:4vw;
      }
    }
   }
 }
</style>
