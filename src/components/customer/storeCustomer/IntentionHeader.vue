<template>
    <header class="header"  ref="header" :style="{top:top}">
       <div class="tabBox">
            <ul class="subTab">
                <li v-for="(item,sindex) in subHeaderStatus" @click="changeStatus(sindex)"  :key="`subHeaderStatus${sindex}`" :class="item.status?'on':''">
                    <span>{{item.name}}</span>
                </li> 
            </ul>
           <div class="bigBox">
                <ul class="filter" v-if="subHeaderStatus[0].status">
                    <li @click="showFilterList">
                        <div v-for="(item,index) in filterList" :key="index">
                            <span class="filterli" v-if="item.val===cusomerAjaxParams.sort">{{item.name}}</span>
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
                <div :class="showFilter&&subHeaderStatus[0].status?`filterList show`:'filterList'" >
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
    props:['id'],
    data(){
        return {
            padding:'',
            top:'',
            showFilter:false,
            key:true,
            bottom:''
        }
    },
    computed:{
        ...mapState({
            rightHeadTitle: state => state.rightContainer.rightHeadTitle,
            rightTimeSelect: state => state.rightContainer.rightTimeSelect,
            rightContainerStatus: state => state.rightContainer.rightContainerStatus,
            subHeaderStatus:state => state.storeHeader.subHeaderStatus,
            filterList:state => state.storeHeader.filterList,
            sort:state => state.storeHeader.sort,
            approvedNum:state => state.storeApproved.approvedNum,
            closedNum:state => state.storeClosed.closedNum,
            cusomerAjaxParams:state => state.storeCustomer.customerAjaxParams,
            allCustomerNum:state => state.allCustomer.allCustomerNum
        })
          
    },
    watch:{
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
        ...mapMutations('storeHeader',['setSubHeaderStatus']),
        ...mapMutations(['setRightTimeSelect','setRightHeadTitle','setRightContainerStatus']),
        ...mapMutations('store',['setStoreScroll','setStoreParmas','setStoreList',
        'setAllLoaded','initStoreList','setStoreNum']),
        ...mapMutations('storeCustomer',['setCustomerList','setCustomerScroll',
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
                this.top='34.466vw'
                this.bottom="21.07vw"
            }else{ 
                this.top='28.466vw'
                this.bottom="16.53vw"
            }
            
            
        },
        changeStatus(i){
            let array = this.subHeaderStatus;
            i!==0?this.showFilter=false:'';
            console.log(array);
            let arr = array.map((item,index) => {
                if(index===i){
                    item.status=true
                }else{
                    item.status=false
                }
                return item;
            })
           this.setSubHeaderStatus(arr);
        },
        showFilterList(){
            let phone=this.phoneSize()
            if(phone==='iphonex'){
              
            }else{
                
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
        this.showFilter=false;
        this.setRightContainerStatus('show')
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
                userId:this.id?this.id:''
            }
            this.setStoreCustomerAjaxParams(obj)
            this.getCustomerList(obj)
        },
        getCustomerList(obj){
            indexModel.getCusotmerList(obj).then((res) => {
                if(res.status===1){
                    if(obj.type==='New'){
                        if(obj.page===res.data.pages){
                            this.setCustomerAllLoaded(true)
                            //mango.tip('没有更多数据了')
                        }else{
                            this.setCustomerAllLoaded(false)
                        }
                        
                        this.initCustomerList(res.data.records)
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
@import '../../../assets/common.scss';
.header{
    width:100vw;
    min-height:22vw;
    position: fixed;
    top:34.466vw;
    right:0;
    //background-image: linear-gradient(32deg, #007aff 0%, #5ac8fa 100%);
    background: #f8f8f8;
    box-sizing: border-box;
    z-index: 100;
    border-bottom:1px solid #e1e1e1;
    .top{
        display: flex;
        flex-direction: row;
        align-items: center;
        height:11.733vw;
        margin-top:7vw;
        padding-left:4.266vw;
        @include input-style(3.466vw,rgba(255,255,255,.8));
        span {
            font-size: 8vw;
            color:#fff;
            font-weight: bold;
            padding-right: 5.066vw;
        }
        input{
            width:65.333vw;
            height:8vw;
            border-radius: 4vw;
            padding-left: 9.333vw;
            box-sizing: border-box;
            color:#fff;
            background:url('../../../assets/imgs/search.png') no-repeat center; 
            background-color: rgba(255,255,255,.2);
            background-size: 3vw 3vw;
            background-position: 4vw center;
        }
        
        
    }
    .tabBox{
        color:rgba(255,255,255,.5);
        
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
             border-bottom:1px solid #e1e1e1;
            @include flex-center;
            font-size:4vw;
            height:10.666vw;
            padding-left:3.2vw;
            background:#EFEFF4;
            
            li{
                /* margin-right:4.533vw; */
                span{
                    background:none;
                    padding:1.066vw 1.866vw;
                    border-radius: 8vw;
                    color:rgba(54,54,54,.5);
                }
            }
            li.on{
               span{
                    color:#fff;
                    background:#007AFF;
                    box-shadow:inset 0 0 2px rgba(10, 10, 10, 0.26)
                } 
            }
        }
        .bigBox{
            position: relative;
        }
        .filter{
            @include flex-center;
            color:#909090;
            justify-content: space-between;
            padding:0 4.266vw;
            height:8vw;
            margin-top:1.333vw;
            font-size: 4vw;
            background: #F8F8F8;
            .filterli{
                padding-right:3.466vw;
                background:url("../../../assets/imgs/pullDown2.png") no-repeat right center;
                background-size: 2.133vw auto;
            }
            li:last-child{
                span.last{
                    padding-left:4.266vw;
                    padding-right:4vw;
                    background:url("../../../assets/imgs/filter2.png") no-repeat right center;
                    background-size: 2.4vw auto;
                    border-left:1px solid #909090;
                }
            }
        }
        .filterList{
            position: absolute;
            bottom:0;
            left:0;
            right:0;
            top:9.33vw;
            height:100vh;
            background: rgba(0,0,0,.5);
            display: none;
            /* border-top:0.26vw solid #e1e1e1; */
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

