<template>
    <ul class="planTimeList">
        <li>
            <span>09:00</span>
            <div>
                <p>电话邀约陈先生到店开月度复盘会议 </p>
                <img src="../../../assets/imgs/rightside.png" alt="" class="icon">
            </div>
        </li>
        <li>
            <span>09:00</span>
            <div>
                <p>电话邀约陈先生到店开月度复盘会议 </p>
                <img src="../../../assets/imgs/rightside.png" alt="" class="icon">
            </div>
        </li>
        <li>
            <span>09:00</span>
            <div>
                <p>电话邀约陈先生到店开月度复盘会议 </p>
                <img src="../../../assets/imgs/rightside.png" alt="" class="icon">
            </div>
        </li>
          <li>
            <span>09:00</span>
            <div>
                <p>电话邀约陈先生到店开月度复盘会议 </p>
                <img src="../../../assets/imgs/rightside.png" alt="" class="icon">
            </div>
        </li>
        <li>
            <span>09:00</span>
            <div>
                <p>电话邀约陈先生到店开月度复盘会议 </p>
                <img src="../../../assets/imgs/rightside.png" alt="" class="icon">
            </div>
        </li> 
        <li class="nonePlan">
           当前日期暂无工作计划 
        </li>
    </ul>
</template>
<script>
export default {
    name:'planTime',
    data(){
        return {

        }
    },
    methods:{

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
