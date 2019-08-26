<template>
    <div>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="bossAllLoaded" ref="boss" :auto-fill="false"> 
            <ul class="noticeList">
               <li is="noticeLi" v-for="(item,index) in dataList" :key="index" :item="item"></li>
               <li class="noData" v-show="bossAllLoaded">没有更多数据了</li>
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
            bossList:state => state.noticeList.bossList,
            bossParams:state => state.noticeList.bossParams,
            bossAllLoaded:state => state.noticeList.bossAllLoaded,
            bossScroll:state => state.noticeList.bossScroll,
            tabList:state => state.noticeList.tabList
        })
    },
    methods:{
        ...mapMutations('noticeList',['setBossList','initBossList','bossAddPage',
        'setBossScroll','setBossAllLoaded','setBossParams','setTabList']),
        loadBottom(){
            this.$refs.boss.onBottomLoaded()
            this.bossAddPage()
            this.getNoticeList(this.bossParams)
        },
        getNoticeList(obj){
            indexModel.getNoticeList(obj).then((res) => {
                obj.page===1?this.initBossList(res.data.list):this.setBossList(res.data.list)
                res.data.totalPage===0?this.setBossAllLoaded(true):obj.page===res.data.totalPage?this.setBossAllLoaded(true):this.setBossAllLoaded(false)
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
