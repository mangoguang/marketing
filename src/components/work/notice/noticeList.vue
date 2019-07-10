<template>
    <div>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="headOffice" :auto-fill="false"> 
            <ul class="noticeList">
               <li is="noticeLi" v-for="(item,index) in list" :key="index" :item="item"></li>
            </ul>
        </mt-loadmore>
    </div>
    
</template>
<script>
import Vue from 'vue'
import { Loadmore } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)
import noticeLi from "./noticeLi"
export default {
    name:'noticeList',
    props:['list'],
    data(){
        return {
            allLoaded:false
        }
    },
    components:{
        noticeLi
    },
    methods:{
        loadBottom(){
            this.$refs.headOffice.onBottomLoaded()
        }
    }

}
</script>
<style lang="scss" scoped>

</style>
