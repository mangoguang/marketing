<template>
    <ul class="weekDay">
        <li class="hasPlan"><span class="active">1</span></li>
        <li><span>1</span></li>
        <li><span>1</span></li>
        <li><span>1</span></li>
        <li><span>1</span></li>
        <li><span>1</span></li>
        <li><span>1</span></li>
    </ul>
</template>
<script>
export default {
    props:[],
    name:'weekDay',
    data(){
        return {
            startDay:"",
            endDay:"",
            nowDay:"",
            dayIndex:'',
            year:null,
            month:null,
            day:null
        }
    },
    created(){
        this.getDate()
    },
    methods:{
        getDate(){
            let oneDayLong=24*60*60*1000;
            this.year=new Date().getFullYear();
            this.month=new Date().getMonth()+1;
            this.day=new Date().getDate();
            this.dayIndex=new Date().getDay();
            this.nowDay=`${this.year}-${this.month>10?this.month:`0${this.month}`}-${this.day>10?this.day:`0${this.day}`}`
        }
    }
}
</script>
<style lang="scss" scoped>
.weekDay{
   display: flex;
   flex-direction: row;
   align-items: center;
   flex-wrap: wrap;
   li{
       display: inline-block;
       width:14.28%;
       text-align: center;
       color:#363636;
       font-size: 4.8vw;
       position: relative;
       padding:2.66vw 0;
   }
   li:after{
            content: '';
            display: block;
            width:6px;
            height:6px;
            border-radius: 50%;
            background: #ccc;
            text-align: center;
            position: absolute;
            left:50%;
            bottom:0;
            transform: translate(-50%)
    }
    span{
        display: inline-block;
        width:8.53vw;
        height:8.53vw;
        border-radius: 50%;
        background: transparent;
    }
    span.active{
        background:#007AFF;
        color:#fff;
    }
    li.hasPlan:after{
        background: #007AFF    
    }
   
}
</style>
