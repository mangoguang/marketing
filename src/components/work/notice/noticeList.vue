<template>
    <div>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="headOffice" :auto-fill="false"> 
            <ul class="noticeList">
               <li is="noticeLi" v-for="(item,index) in dataList" :key="index" :item="item"></li>
               <li class="noData" v-show="allLoaded">没有更多数据了</li>
            </ul>
        </mt-loadmore>
    </div>
    
</template>
<script>
import Vue from 'vue'
import { Loadmore } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)
import noticeLi from "./noticeLi"
import { mapState, mapMutations } from 'vuex'
import { IndexModel } from '../../../utils'
const indexModel = new IndexModel()
export default {
    name:'noticeList',
    props:['dataList'],
    data(){
        return {
        }
    },
    components:{
        noticeLi
    },
    computed:{
         ...mapState({
            list:state => state.noticeList.list,
            params:state => state.noticeList.params,
            allLoaded:state => state.noticeList.allLoaded,
            scroll:state => state.noticeList.scroll,
            tabList:state => state.noticeList.tabList
        })
    },
    methods:{
        ...mapMutations('noticeList',['setList','initList','paramsAddPage',
        'setScroll','setAllLoaded','setParams','setTabList']),
        loadBottom(){
            this.$refs.headOffice.onBottomLoaded()
            this.paramsAddPage()
            this.getNoticeList(this.params)
        },
        getNoticeList(obj){
            indexModel.getNoticeList(obj).then((res) => {
                obj.page===1?this.initList(res.data.list):this.setList(res.data.list)
                res.data.totalPage===0?this.setAllLoaded(true):obj.page===res.data.totalPage?this.setAllLoaded(true):this.setAllLoaded(false)
            }).catch((reject) => {
                if(reject === 510) {
                    this.getNoticeList(obj)
                }
            })
        }
    }

}
</script>
<style lang="scss" scoped>
.noData{
    font-size: 11px;
    color:#909090;
    margin-top:4.266vw;
    text-align: center;
}
</style>
