<template>
    <div id="previewBox">
      <mybanner :title="title" style="border:none;background:#fff"></mybanner>
      
    </div>
</template>

<script>
import Vue from 'vue'
import mybanner from '../../../components/banner'
import { Actionsheet, Toast } from 'mint-ui';
import { mapState, mapMutations } from 'vuex'
Vue.component(Actionsheet.name, Actionsheet);
export default {
  data () {
    return {
      title:""
    
    }
  },
  components:{
     mybanner
  },
  created(){
   
  },
  
  mounted(){
    
  },
  methods:{
   
      
  }
};
</script>

<style lang="scss">
 
</style>
