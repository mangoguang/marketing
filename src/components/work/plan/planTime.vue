<template>
    <ul class="planTimeList">
        <li @click="go(item.id)" v-for="(item,index) in list" :key="index">
            <span>{{item.startTime.split(' ')[1]}}</span>
            <div>
                <p>{{item.planName}}</p>
                <img src="../../../assets/imgs/rightside.png" alt="" class="icon">
            </div>
        </li>
        <li class="nonePlan" v-if="!list||!list.length">
           当前日期暂无工作计划 
        </li>
    </ul>
</template>
<script>
export default {
    name:'planTime',
    props:['list'],
    data(){
        return {

        }
    },
    created(){
        console.log(this.list)
    },
    methods:{
        go(id){
            this.$router.push({
                path:'/newWorkPlan',query:{id:id}
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.planTimeList{
    li{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left:4vw;
        span{
            font-size: 14px;
            color:#007AFF;
        }
        div{
            flex:1;
            margin-left:6.66vw;
            height:10.66vw;
            line-height: 10.66vw;
            border-bottom:1px solid #E1E1E1;
            padding-right:4vw;
            p{
                display: inline-block;
                width:53.33vw;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                font-size: 14px;
                color:#666;
                text-align: left;
            }
            ::after{
                content: '';
                display: block;
                clear: both;
            }
        }
        .icon{
            width:1.866vw;
            float: right;
            margin-top:4vw;
        }
    }
    li:last-child{
        div{
            border:none;
        }
    }
    .nonePlan{
        height:10.66vw;
        justify-content: center;
        color:#666;
        font-size:14px;
    }
}
</style>
