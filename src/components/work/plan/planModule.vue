<template>
    <div class="planBox">
        <div class="plan">
            <mytitle title="工作计划" :mid="`${selectDate.split('-').join('.')}`">
            <span @click="more">更多</span>
            </mytitle>
            <weekHeader/>
            <weekDay @getSelectDate="getSelectDate" @getWeekParams="getWeekParams" :dateList="dateList"/>
            <p>点击日期查看工作</p>
        </div>
        <div class="planList">
            <planTime :list="list"/>
            <button type="button" class="newPlan" @click="newPlan"></button>
        </div>
        
    </div>
</template>
<script>
import mytitle from './myTitle'
import weekHeader from './weekHeader'
import weekDay from './weekDay'
import planTime from './planTime'
import { IndexModel } from '../../../utils'
const indexModel = new IndexModel()
export default {
    name:'planModule',
    data(){
        return {
            selectDate:'',
            list:[],
            dateList:[]
        }
    },
    components:{
        mytitle,
        weekHeader,
        weekDay,
        planTime
    },
    methods:{
        more(){
            this.$router.push({path:'/workPlan'})
        },
        getSelectDate(date){
            if(this.selectDate===date){
                return;
            }
            this.selectDate=date
            this.getPlanList({
                startDate:date,
                endDate:date
            })
        },
        newPlan(){
            this.$router.push({path:'/newWorkPlan'})
        },
        getPlanList(obj){
            indexModel.getPlanList(obj).then((res) => {
                console.log(res)
                if(obj.startDate===obj.endDate){
                    if(res.data.length>0){
                        this.list=res.data[0].dataList
                    }else{
                        this.list=[]
                    }
                }else{
                    if(res.data.length>0){
                        this.dateList=res.data
                    }else{
                        this.dateList=[]
                    }
                }
                
            }).catch((reject) => {
                if(reject===510){
                    this.getPlanList(obj)
                }
            })
        },
        getWeekParams(dateObj){
            this.getPlanList(dateObj)
        }
    }
}
</script>
<style lang="scss" scoped>
.planBox{
    margin:6.66vw 4.8vw 22.66vw;
}
.plan{
    border-radius:2vw;
    background: #fff;
    padding-bottom: 2.66vw;
    position: relative;
    p{
        text-align: center;
        color:#909090;
        font-size: 12px;
        margin-top:2.66vw;
    }
}
.planList{
    border-radius:2vw;
    background: #fff;
    margin-top:1.33vw;
    position: relative;
    .newPlan{
        position: absolute;
        top:0;
        right:0;
        width:14.13vw;
        height:14.13vw;
        background:url('../../../assets/imgs/add.png') center center;
        background-size: 100% 100%;
        opacity: 0.6;
    }
}
</style>
