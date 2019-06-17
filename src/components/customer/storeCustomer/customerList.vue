<template>
    <div class="box" :style="{paddingTop:paddingTop,paddingBottom:paddingBottom}">
        <ul class="top" :style="{top:top}">
            <li>客户信息</li>
            <li>意向产品</li>
            <li>最近跟进</li>
        </ul>
        <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
            <ul class="content">
                <li>
                    <i :class="`importantA`"></i>
                    <span>陆依依陆依依</span>
                    <b :class="`urgencyfalse`"></b>
                </li>
                <li>歌蒂娅海洋之心歌蒂娅海洋之心歌蒂娅海洋之心歌蒂娅海洋之心</li>
                <li>2019.03.20</li>
            </ul>
             <ul class="content">
                <li>
                    <i :class="`importantB`"></i>
                    <span>陆依依</span>
                    <b :class="`urgencytrue`"></b>
                </li>
                <li>歌蒂娅海洋之心</li>
                <li>2019.03.20</li>
            </ul>
            <ul class="content">
                <li>
                    <i :class="`importantC`"></i>
                    <span>陆依依</span>
                    <b :class="`urgencytrue`"></b>
                </li>
                <li>歌蒂娅海洋之心</li>
                <li>2019.03.20</li>
            </ul>
            <ul class="content">
                <li>
                    <i :class="`importantC`"></i>
                    <span>陆依依</span>
                    <b :class="`urgencytrue`"></b>
                </li>
                <li>歌蒂娅海洋之心</li>
                <li>2019.03.20</li>
            </ul>
            <ul class="content">
                <li>
                    <i :class="`importantC`"></i>
                    <span>陆依依</span>
                    <b :class="`urgencytrue`"></b>
                </li>
                <li>歌蒂娅海洋之心</li>
                <li>2019.03.20</li>
            </ul>
            <ul class="content">
                <li>
                    <i :class="`importantC`"></i>
                    <span>陆依依</span>
                    <b :class="`urgencytrue`"></b>
                </li>
                <li>歌蒂娅海洋之心</li>
                <li>2019.03.20</li>
            </ul>
             <ul class="content">
                <li>
                    <i :class="`importantC`"></i>
                    <span>陆依依</span>
                    <b :class="`urgencytrue`"></b>
                </li>
                <li>歌蒂娅海洋之心</li>
                <li>2019.03.20</li>
            </ul>
        </mt-loadmore>
        <button class="new" :style="{bottom:bottom}"></button>
    </div>
</template>
<script>
import Vue from 'vue'
import {mapState,mapMutations} from 'vuex'
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
export default {
    data(){
        return {
            allLoaded:false,
            top:'',
            paddingTop:'',
            paddingBottom:'',
            bottom:''
        }
    },
    computed:{
        ...mapState({
            headerStatus:state => state.storeHeader.headerStatus,
            subHeaderStatus:state => state.storeHeader.subHeaderStatus
            
        })
       
    },
    watch:{
        headerStatus(){
            if(this.headerStatus[0].status){
                //this.getCustomerList()
            }
        }
    },
    mounted(){
        this.isIphone();
    },
    methods:{
        ...mapMutations('storeHeader',['setHeaderStatus','setSubHeaderStatus']),
        isIphone(){
            let phone=this.phoneSize()
            if(phone==='iphonex'){
               this.top="59.326vw";
               this.paddingTop="63.986vw"
               this.bottom="28vw"
                this.paddingBottom='21.07vw'
            }else{
                this.top="53.326vw";
                this.paddingTop="63.986vw"
                this.bottom="32vw"
                this.paddingBottom='16.53vw'
            }  
        },
        loadBottom(){

        }
      
       
    }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/public.scss';
.new{
    width:14.13vw;
    height:14.13vw;
    background: url('../../../assets/imgs/add.png') no-repeat center center;
    background-size:100% 100%;
    position: fixed;
    bottom:32vw;
    right:3.73vw;

}

</style>

