<template>
    <div class="planBox">
        <div class="plan">
            <mytitle title="工作计划" :mid="`${selectDate.split('-').join('.')}`">
            <span @click="more">更多</span>
            </mytitle>
            <weekHeader/>
            <weekDay @getSelectDate="getSelectDate" />
        </div>
        <div class="planList">
            <planTime/>
            <button type="button" class="newPlan" @click="newPlan"></button>
        </div>
        
    </div>
</template>
<script>
import mytitle from './myTitle'
import weekHeader from './weekHeader'
import weekDay from './weekDay'
import planTime from './planTime'
export default {
    name:'planModule',
    data(){
        return {
            selectDate:'2019-06-24'
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
            this.selectDate=date
        },
        newPlan(){
            this.$router.push({path:'/newWorkPlan'})
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
    padding-bottom: 4.8vw;
    position: relative;
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
