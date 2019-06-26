<template>
    <ul class="planList">
        <li>
           <div class="top">
               <img src="../../../assets/imgs/point.png" alt="">
               <b>2019.03.05 <span>星期二</span></b>
           </div>
           <div class="bottom">
               <planTime/>
           </div>
        </li>
        <li>
           <div class="top">
               <img src="../../../assets/imgs/point.png" alt="">
               <b>2019.03.05 <span>星期二</span></b>
           </div>
           <div class="bottom">
               <planTime/>
           </div>
        </li>
        
    </ul>
</template>
<script>
import planTime from './planTime'
export default {
    name:'planList',
    data(){
        return {

        }
    },
    components:{
        planTime
    },
    methods:{

    }
}
</script>
<style lang="scss" scoped>
.planList{
    li{
        margin: 0 4vw;
        .top{
            display: flex;
            align-items: center;
            font-size: 4.8vw;
            color:#666;
            img{
                width:4.8vw;
                margin-right: 4vw;
            }
            span{
                color:#999;
            }
        }
        .bottom{
            border-left:2px dashed #ccc;
            margin-left:2.133vw;
            padding:5.33vw 0;
            .planTimeList{
                margin-left:6.133vw;
                background: #fff;
                border-radius: 2vw;
                box-shadow: 0 4px 7px rgba(80, 164, 255, 0.15);
            }
        }
    }
}
</style>
