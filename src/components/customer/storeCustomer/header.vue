<template>
    <header class="header" :style="{paddingTop:padding}" ref="header">
       <div class="top">
           <span>客户</span>
           <input type="text" placeholder="请输入姓名或手机搜索" v-model="searchKey">
       </div>
       <div class="tabBox">
           <ul class="tab">
                <li v-for="(item,index) in headerStatus" :class="item.status?'on':''" :key="`headerStatus${index}`" @click="changeStatus(index,'headerStatus')">
                    <span>{{item.name}}</span>
                    <hr :style="{borderColor:item.status?'#fff':'transparent'}"/>
                </li> 
            </ul>
            <ul class="subTab" v-show="headerStatus[1].status">
                <li v-for="(item,sindex) in subHeaderStatus" @click="changeStatus(sindex,'subHeaderStatus')" :key="`subHeaderStatus${sindex}`" :class="headerStatus[1].status&&item.status?'on':''">
                    <span>{{item.name}}</span>
                </li> 
            </ul>
           <div v-show="headerStatus[1].status">
                <ul class="filter" v-if="subHeaderStatus[0].status">
                    <li @click="showFilterList">
                        <div v-for="(item,index) in filterList" :key="index">
                            <span class="filterli" v-if="item.val===cusomerAjaxParams.sort">{{item.name}}</span>
                        </div>
                    </li>
                    <li>
                        <span @click="showRightContainer">筛选</span>
                    </li>
                </ul>
                <ul class="filter" v-else>
                    <li>
                        <span v-if="subHeaderStatus[1].status">全部&nbsp;&nbsp;({{approvedNum}})</span>
                        <span v-else>全部&nbsp;&nbsp;({{closedNum}})</span>
                    </li>
                    <li>
                        <span @click="showRightTimeSelect">筛选</span>
                    </li>
                </ul>
                <div :class="showFilter&&subHeaderStatus[0].status?`filterList show`:'filterList'" :style="{top:`${top}`}">
                     <ul v-show="subHeaderStatus[0].status">
                        <li v-for="(item,index) in filterList" :key="index"  @click="closeFilter">
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
export default {
    data(){
        return {
            padding:'',
            top:'',
            showFilter:false,
            key:true,
            searchKey:''
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
            approvedNum:state => state.storeApproved.approvedNum,
            closedNum:state => state.storeClosed.closedNum,
            cusomerAjaxParams:state => state.storeCustomer.customerAjaxParams
        }),
        'cusomerAjaxParams.sort':{
            get(){
                return this.$store.state.storeCustomer.customerAjaxParams.sort
            },
            set (val) {
                this.$store.commit('storeCustomer/setSort', val)
            }
        }
          
    },
    watch:{
        headerStatus(){
            if(this.headerStatus[0].status){
                //this.getCustomerList()
            }
        },
        rightContainerStatus(val) {
            this.key = false
            if(val === 'hideRightContainer') {
                //this.getCustomerList()
                this.key = true
            }
        }
    },
    mounted(){
        this.isIphone();
    },
    methods:{
        ...mapMutations('storeHeader',['setHeaderStatus','setSubHeaderStatus']),
        ...mapMutations('storeApproved',['setApprovedNum']),
        ...mapMutations('storeClosed',['setClosedNum']),
        ...mapMutations(['setRightTimeSelect','setRightHeadTitle','setRightContainerStatus']),
        isIphone(){
            let phone=this.phoneSize()
            if(phone==='iphonex'){
                this.padding='6vw'
                this.top=((this.$refs.header.offsetHeight/375)*100+6)+"vw"
            }else{
                this.padding=''
                this.top=this.$refs.header.offsetHeight+"px"
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
                this.top=((this.$refs.header.offsetHeight/375)*100+6)+"vw"
            }else{
                this.top=this.$refs.header.offsetHeight+"px"
            }
            this.showFilter=!this.showFilter;
        },
        closeFilter(){
            this.showFilter=false;
        },
        //订单查询成交客户的侧标栏
        showRightTimeSelect() {
            this.setRightTimeSelect(true)
            if(this.subHeaderStatus[1].status) {
                this.setRightHeadTitle('订单交单日期')
            }else{
                this.setRightHeadTitle('战败时间')
            }
        },
        // 显示右侧边栏
        showRightContainer() {
        // console.log('显示侧边栏。')
        this.setRightContainerStatus('show')
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
            @include flex-center;
            font-size:4vw;
            height:10.666vw;
            padding-left:3.2vw;
            background:rgba(0, 48, 100, .2);
            li{
                margin-right:4.533vw;
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
            padding:2.133vw 4.266vw;
            margin-top:1.333vw;
            font-size: 4vw;
            .filterli{
                padding-right:3.466vw;
                background:url("../../../assets/imgs/pullDown.png") no-repeat right center;
                background-size: 2.133vw auto;
            }
            li:last-child{
                span{
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
    }
}
</style>

