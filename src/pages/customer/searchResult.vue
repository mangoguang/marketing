<template>
  <div class="searchResult">
    <mybanner :title='text'/>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { mapMutations, mapState } from "vuex";
import mybanner from '../../components/banner';
import mango from '../../js'

export default {
  components:{mybanner},
  data() {
    return {
      text:'查询结果',
      searchData:'',
      account:'',
      ajaxData:[]
    };
  },
  created() {
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    // this.customerAjaxParams.tenantId = this.ajaxData.tenantId
    // this.setCustomerAjaxParams(this.customerAjaxParams)
    let account = localStorage.getItem('accountMsg')
    this.account = JSON.parse(account).name.trim()

    this.searchData = this.$route.query
    console.log('search',this.searchData)
    let key = this.searchData.key
    let status = this.searchData.status
    if(key){
      this.getCustomerList(key,status)
    }
  },
  methods:{
    getCustomerList(key,status) {
      mango.getAjax(this, 'order',{
        account: this.account,
        page: 1,  
        limit: 10,  
        key: key //搜索关键字，电话或名字
      },'v2').then((res) => {
        if (res) {
          if (status[1].status) {
            console.log(1,res.data)
          }else if (status[2].status) {
            let result  = mango.getUniqueData(res.data.records)
            console.log(2,result)
          }
        }
      }) 
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
