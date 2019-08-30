<template>
    <header class="header" :style="{paddingTop:padding}" ref="header">
       <div class="top">
           <span>客户</span>
            <form action="" @submit.prevent>
                <input type="search" placeholder="请输入姓名或手机搜索" v-model="searchKey" @keypress="search">
            </form>
       </div>
       <div class="tabBox">
           <ul class="tab">
                <li v-for="(item,index) in headerStatus" :class="item.status?'on':''" :key="`headerStatus${index}`" @click="changeStatus(index,'headerStatus')">
                    <span>{{item.name}}</span>
                    <hr :style="{borderColor:item.status?'#fff':'transparent'}"/>
                </li> 
            </ul>
            <ul class="subTab" v-show="headerStatus[0].status">
                <li v-for="(item,sindex) in subHeaderStatus" @click="changeStatus(sindex,'subHeaderStatus')" :key="`subHeaderStatus${sindex}`" :class="headerStatus[0].status&&item.status?'on':''">
                    <span>{{item.name}}</span>
                </li> 
            </ul>
            <div class="lastNum" v-show="headerStatus[1].status" :style="{bottom:bottom}">
                    共{{storeNum}}名
            </div>
           <div v-show="headerStatus[0].status">
                <ul class="filter" v-if="subHeaderStatus[0].status">
                    <li @click="showFilterList">
                        <div v-for="(item,index) in filterList" :key="index">
                            <span class="filterli" v-if="item.val===cusomerAjaxParams.sort">{{item.name}}({{newNum}})</span>
                        </div>
                    </li>
                    <li>
                        <span @click="showRightContainer" class="last">筛选</span>
                    </li>
                </ul>
                <ul class="filter" v-else>
                    <li>
                        <span v-if="subHeaderStatus[1].status">全部&nbsp;&nbsp;({{approvedNum}})</span>
                        <span v-else-if="subHeaderStatus[2].status">全部&nbsp;&nbsp;({{closedNum}})</span>
                        <span v-else>全部&nbsp;&nbsp;({{allCustomerNum}})</span>
                    </li>
                    <li v-if="!subHeaderStatus[3].status">
                        <span @click="showRightTimeSelect" class="last">筛选</span>
                    </li>
                </ul>
                
                <div :class="showFilter&&subHeaderStatus[0].status?`filterList show`:'filterList'" :style="{top:`${top}`}">
                     <ul v-show="subHeaderStatus[0].status">
                        <li v-for="(item,index) in filterList" :key="index"  @click="closeFilter(item.val)">
                            <label :class="item.val===cusomerAjaxParams.sort?'on':''">
                                {{item.name}}
                                <input type="radio" :value="item.val" :checked="item.val===cusomerAjaxParams.sort" v-model="cusomerAjaxParams.sort">
                                <img src="../../../assets/imgs/selected.png" alt="" v-show="item.val===cusomerAjaxParams.sort">
                            </label>
                        </li>
                    </ul>
                </div>
                
               
           </div>
       </div>
    </header>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import { IndexModel } from '../../../utils'
const indexModel=new IndexModel()
import mango from "../../../js";
export default {
    data(){
        return {
            padding:'',
            top:'',
            showFilter:false,
            key:true,
            searchKey:'',
            bottom:''
        }
    },
    computed:{
        ...mapState({
            rightHeadTitle: state => state.rightContainer.rightHeadTitle,
            rightTimeSelect: state => state.rightContainer.rightTimeSelect,
            rightContainerStatus: state => state.rightContainer.rightContainerStatus,
            headerStatus:state => state.storeHeader.headerStatus,
            subHeaderStatus:state => state.storeHeader.subHeaderStatus,
            filterList:state => state.storeHeader.filterList,
            sort:state => state.storeHeader.sort,
            newNum:state => state.storeCustomer.customerNum,
            approvedNum:state => state.storeApproved.approvedNum,
            closedNum:state => state.storeClosed.closedNum,
            cusomerAjaxParams:state => state.storeCustomer.customerAjaxParams,
            list:state => state.store.list,
            params:state => state.store.params,
            allLoaded:state => state.store.allLoaded,
            storeNum:state => state.store.storeNum,
            allCustomerNum:state => state.allCustomer.allCustomerNum
        })
          
    },
    watch:{
        headerStatus(){
            if(this.headerStatus[1].status){
                this.showFilter=false
                this.searchCustomer('')
            }
        },
        rightContainerStatus(val) {
            this.key = false
            if(val === 'hideRightContainer') {
                //this.getCustomerList()
                this.key = true
            }
        },
        subHeaderStatus(){
            if(!this.subHeaderStatus[0].status){
                this.setSort('')
            }
        }
    },
    mounted(){
        this.isIphone();
    },
    methods:{
        ...mapMutations('storeHeader',['setHeaderStatus','setSubHeaderStatus']),
        ...mapMutations(['setRightTimeSelect','setRightHeadTitle','setRightContainerStatus']),
        ...mapMutations('store',['setStoreScroll','setStoreParmas','setStoreList',
        'setAllLoaded','initStoreList','setStoreNum']),
        ...mapMutations('storeCustomer',['setNewNum','setCustomerList','setCustomerScroll',
        'setCustomerAllLoaded','initCustomerList','setStoreCustomerAjaxParams','setSort']),
        ...mapMutations('storeApproved',['setApprovedNum','setApprovedParams',
        'setApprovedList','setApprovedScroll','setApprovedPage','setApprovedAllLoaded','initApprovedList']),
        ...mapMutations('storeClosed',['setClosedNum','setClosedParams','setClosedList','setClosedAllLoaded',
         'setClosedScroll','setClosedPage','initClosedList']),
         ...mapMutations('allCustomer',['setAllCustomerNum','setAllCustomerParams','setAllCustomerList',
         'setAllCustomerAllLoaded','setAllCustomerScroll','setAllCustomerPage','initAllCustomerList']),
        isIphone(){
            let phone=this.phoneSize()
            if(phone==='iphonex'){
                this.padding='6vw'
                this.top=((this.$refs.header.offsetHeight/375)*100)+"vw"
                this.bottom="21.07vw"
            }else{
                this.padding=''
                this.top=this.$refs.header.offsetHeight+"px"
                this.bottom="16.53vw"
            }
            
            
        },
        changeStatus(i,str){
            let array = str==='headerStatus'?this.headerStatus:this.subHeaderStatus;
            str!=='headerStatus'&&i!==0?this.showFilter=false:'';
            console.log(array);
            let arr = array.map((item,index) => {
                if(index===i){
                    item.status=true
                }else{
                    item.status=false
                }
                return item;
            })
            str==='headerStatus'?this.setHeaderStatus(arr):this.setSubHeaderStatus(arr);
        },
        showFilterList(){
            let phone=this.phoneSize()
            if(phone==='iphonex'){
                this.top="59.386vw"
            }else{
                this.top="53.386vw"
            }
            this.showFilter=!this.showFilter;
        },
        closeFilter(val){
            this.searchKey=''
            this.filter(val)
            this.showFilter=false;
        },
        //订单查询成交客户的侧标栏
        showRightTimeSelect() {
            this.searchKey=''
            this.setRightTimeSelect(true)
            if(this.subHeaderStatus[1].status) {
                this.setRightHeadTitle('订单交单日期')
            }else{
                this.setRightHeadTitle('流失时间')
            }
        },
        // 显示右侧边栏
        showRightContainer() {
        // console.log('显示侧边栏。')
        this.searchKey=''
        this.showFilter=false;
        this.setRightContainerStatus('show')
        },
        getType(){
            if(this.headerStatus[1].status){
                return 'store'
            }
            if(this.headerStatus[0].status){
                let type;
               if(this.subHeaderStatus[0].status){
                   type='New'
               }
               if(this.subHeaderStatus[1].status){
                  type='Approved'
               }
               if(this.subHeaderStatus[2].status){
                  type='Closed'
               }
               if(this.subHeaderStatus[3].status){
                  type='all'
               }
               return type
            }   
        },
        search(){
            if (event.keyCode == 13) { //如果按的是enter键 13是enter 
                event.preventDefault(); //禁止默认事件（默认是换行） 
                let type=this.getType();
                this.searchCustomer(type,this.searchKey)
                
            }
            
        },
        getStoreList(obj){
            indexModel.getStoreCustomer(obj).then((res) => {
                if(res.status===1){
                    this.initStoreList(res.data.records);
                    if(obj.page===res.data.pages){
                        this.setAllLoaded(true)
                         mango.tip('没有更多数据了')
                    }else{
                        this.setAllLoaded(false)
                    }   
                }
            }).catch((reject) => {
                if(reject===510){
                    this.getStoreList(obj)
                }
            })
        },
        searchCustomer(type,val){
            let obj;
            switch (type){
                case 'store':
                    this.setStoreScroll(0)
                    this.setAllLoaded(false)
                    obj={
                        key:this.searchKey,
                        page:1,
                        limit:30
                    }
                    this.setStoreParmas(obj)
                    this.getStoreList(obj)
                    break
                case 'New':
                    this.setCustomerScroll(0)
                    this.setCustomerAllLoaded(false)
                     obj= {
                        type:'New',   //New:意向客户，Approved:成交客户，Closed:流失客户
                        key:val,    //搜索关键字，电话或名字、微信
                        sort:'',      //u:紧急排序，la:意向分类升序，ld:意向分类倒序
                        sd:'',          //跟进日期
                        ed:'',
                        u:'',     //1:紧急，0不紧急
                        l:'',    //
                        page: 1,  //页数
                        limit: 30,    //每页条数
                        userId:''
                    }
                    this.setStoreCustomerAjaxParams(obj)
                    this.getCustomerList(obj)
                    break
                case 'Approved':
                    this.setApprovedScroll(0)
                    this.setApprovedAllLoaded(false)
                    obj = {
                        type:'Approved',   //New:意向客户，Approved:成交客户，Closed:流失客户
                        key:val,    //搜索关键字，电话或名字、微信
                        sd:'',          //跟进日期
                        ed:'',
                        page: 1,  //页数
                        limit: 30,    //每页条数
                        userId:''
                    }
                    this.setApprovedParams(obj)
                    this.getCustomerList(obj)
                    break
                case 'Closed':
                    this.setClosedScroll(0)
                    this.setClosedAllLoaded(false)
                    obj = {
                        type:'Closed',   //New:意向客户，Approved:成交客户，Closed:流失客户
                        key:val,    //搜索关键字，电话或名字、微信
                        sd:'',          //跟进日期
                        ed:'',
                        page: 1,  //页数
                        limit: 30,    //每页条数
                        userId:''
                    }
                    this.setClosedParams(obj)
                    this.getCustomerList(obj)
                    break
                case 'all':
                    this.setAllCustomerScroll(0)
                    this.setAllCustomerAllLoaded(false)
                    obj = {
                        type:'',   //New:意向客户，Approved:成交客户，Closed:流失客户
                        key:val,    //搜索关键字，电话或名字、微信
                        page: 1,  //页数
                        limit: 30,    //每页条数
                        userId:''
                    }
                    this.setAllCustomerParams(obj)
                    this.getCustomerList(obj)
                    break
                default:
                    break
            }
            
           
        },
        filter(val){
            this.setCustomerScroll(0)
            this.setCustomerAllLoaded(false)
            let obj = {
                type:'New',   //New:意向客户，Approved:成交客户，Closed:流失客户
                key:'',    //搜索关键字，电话或名字、微信
                sort:val,      //u:紧急排序，la:意向分类升序，ld:意向分类倒序
                sd:'',          //跟进日期
                ed:'',
                u:'',     //1:紧急，0不紧急
                l:'',    //
                page: 1,  //页数
                limit: 30,    //每页条数
                userId:''
            }
            this.setStoreCustomerAjaxParams(obj)
            this.getCustomerList(obj)
        },
        getCustomerList(obj){
            indexModel.getCusotmerList2(obj).then((res) => {
                if(res.status===1){
                    if(obj.type==='New'){
                        if(obj.page===res.data.pages){
                            this.setCustomerAllLoaded(true)
                            //mango.tip('没有更多数据了')
                        }else{
                            this.setCustomerAllLoaded(false)
                        }
                        this.initCustomerList(res.data.records)
                        this.setNewNum(res.data.total)
                    }else if(obj.type==='Approved'){
                        if(obj.page===res.data.pages){
                            this.setApprovedAllLoaded(true)
                            //mango.tip('没有更多数据了')
                        }else{
                            this.setApprovedAllLoaded(false)
                        }
                        this.initApprovedList(res.data.records)
                        this.setApprovedNum(res.data.total)
                    }else if(obj.type==='Closed'){
                        if(obj.page===res.data.pages){
                            this.setClosedAllLoaded(true)
                            //mango.tip('没有更多数据了')
                        }else{
                            this.setClosedAllLoaded(false)
                        }
                        this.initClosedList(res.data.records)
                        this.setClosedNum(res.data.total)
                    }else{
                        if(obj.page===res.data.pages){
                            this.setAllCustomerAllLoaded(true)
                             //mango.tip('没有更多数据了')
                        }else{
                            this.setAllCustomerAllLoaded(false)
                        }
                        this.initAllCustomerList(res.data.records)
                        this.setAllCustomerNum(res.data.total)
                    }
                }
                
            }).catch((reject) => {
                if(reject===510){
                    this.getCustomerList(obj)
                }
            })
        }

    }
}
</script>
<style lang="scss" scoped>
@mixin flex-center (){
    display: flex;
    flex-direction: row;
    align-items: center;
}
@mixin hr-border($height){
    border: none;
    border-bottom:$height #fff solid;
    border-radius:$height/2;
    margin:0; 
}
.header{
    width:100vw;
    min-height:22vw;
    position: fixed;
    top:0;
    right:0;
    background-image: linear-gradient(32deg, #007aff 0%, #5ac8fa 100%);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    z-index: 100;
    .top{
        display: flex;
        flex-direction: row;
        align-items: center;
        height:11.733vw;
        margin-top:7vw;
        padding-left:4.266vw;
       
        span {
            font-size: 8vw;
            color:#fff;
            font-weight: bold;
            padding-right: 5.066vw;
        }
        input{
            width:65.333vw;
            height:8vw;
            line-height: 8vw;
            border-radius: 4vw;
            padding-left: 9.333vw;
            box-sizing: border-box;
            color:#fff;
            background:url('../../../assets/imgs/search.png') no-repeat center; 
            background-color: rgba(255,255,255,.2);
            background-size: 3vw 3vw;
            background-position: 4vw center;
            font-size: 14px;
        }
        input::-webkit-input-placeholder{
          color: rgba(255,255,255,.8);
        } input:-moz-placeholder{
          color: rgba(255,255,255,.8);
        } input::-moz-placeholder{
          color: rgba(255,255,255,.8);
        } input:-ms-input-placeholder{
          color: rgba(255,255,255,.8);
        }
        
    }
    .tabBox{
        color:rgba(255,255,255,1);
        .tab{
            @include flex-center;
            font-size:4.266vw;
            padding-left:4.266vw;
            margin-top: 6.4vw;
            li{
                margin-right:7.733vw;
                span{
                    transform: scale(0);
                    transition: all .2s;  
                }
                hr{
                    @include hr-border(.8vw);
                }
            }
            li.on{
                span{
                    transform: scale(1.125);
                    color:#fff;
                }       
            }

        }
        .subTab{
            @include flex-center;
            font-size:4vw;
            height:10.666vw;
            padding:0 3.2vw;
            background:rgba(0, 48, 100, .2);
            li{
                /* margin-right:4.533vw; */
                flex:1;
                span{
                    background:none;
                    padding:1.066vw 1.866vw;
                    border-radius: 8vw;
                }
            }
            li.on{
               span{
                    background:$slGreenCol;
                    
                    box-shadow:inset 0 0 2px rgba(10, 10, 10, 0.26)
                } 
            }
        }
        .filter{
            @include flex-center;
            color:#fff;
            justify-content: space-between;
            padding:0 4.266vw;
            height:8vw;
            margin-top:1.333vw;
            font-size: 4vw;
            .filterli{
                padding-right:3.466vw;
                background:url("../../../assets/imgs/pullDown.png") no-repeat right center;
                background-size: 2.133vw auto;
            }
            li:last-child{
                span.last{
                    padding-left:4.266vw;
                    padding-right:4vw;
                    background:url("../../../assets/imgs/filter.png") no-repeat right center;
                    background-size: 2.4vw auto;
                    border-left:1px solid #fff;
                }
            }
        }
        .filterList{
            position: fixed;
            bottom:0;
            left:0;
            right:0;
            top:0;
            background: rgba(0,0,0,.5);
            display: none;
            ul{
                color:#909090;
                font-size: 4vw;
                background:#F8F8F8;
                li{
                    label{
                        padding:0 4.266vw;
                        height:10.66vw;
                        @include flex-center;
                        justify-content: space-between;
                        input{
                            display: none;
                        }
                        img{
                            width:3vw;
                        }
                    }
                    label.on{
                        color:#363636;
                    }

                    
                    
                }
            }
        }
        .show{
            display: block;
        }
        .lastNum{
            position: fixed;
            left:0;
            right:0;
            bottom:0;
            height:8vw;
            @include flex-center;
            justify-content: center;
            background:#fff;
            color:#999;
            font-size: 12px;
            z-index:100
        }
    }
}
</style>

