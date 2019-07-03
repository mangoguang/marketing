<template>
    <ul class="planList">
        <li v-for="(item,index) in day" :key="index">
           <div class="top">
               <img src="../../../assets/imgs/point.png" alt="">
               <b>{{`${year}.${month}.${item<10?`0${item}`:item}`}}&nbsp;&nbsp;
               <span>{{formatDay(year,month,item)}}</span></b>
           </div>
           <div class="bottom">
               <planTime :list="getList(`${year}-${month}-${item<10?`0${item}`:item}`)"/>
           </div>
        </li>
        
    </ul>
</template>
<script>
import planTime from './planTime'
export default {
    name:'planList',
    props:['dateList','year','month','day'],
    data(){
        return {
        }
    },
    components:{
        planTime
    },
    methods:{
        compareDate(date){
            let arr = this.dateList.map((item,index) => {
                return item.startTime.split(' ')[0]
            })
            return arr.includes(date)
        },
        formatDay(year,months,day){
            let month = parseInt(months)-1
            let week = new Date(year,month,day).getDay()
            switch(week){
                case 1:
                    return '星期一'
                    break;
                case 2:
                    return '星期二'
                    break;
                case 3:
                    return '星期三'
                    break;
                case 4:
                    return '星期四'
                    break;
                case 5:
                    return '星期五'
                    break;
                case 6:
                    return '星期六'
                    break;
                default:
                    return '星期日'
                    break;
            }      
        },
        getList(date){
            console.log(date)
            let arr = []
            this.dateList.map((item,index) => {
                // console.log(item)
                let str = item.startTime.split(' ')[0]
                if(str===date){
                    arr.push(item)
                }
            })
            return arr
        }
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
