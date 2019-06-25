<template>
    <div class="plan">
        <mytitle title="工作计划" :mid="`${selectDate.split('-').join('.')}`">
            <span @click="more">更多</span>
        </mytitle>
        <weekHeader/>
        <weekDay/>
    </div>
</template>
<script>
import mytitle from './myTitle'
import weekHeader from './weekHeader'
import weekDay from './weekDay'
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
        weekDay
    },
    methods:{
        more(){
            console.log('更多')
        }
    }
}
</script>
<style lang="scss" scoped>
.plan{
    margin:6.66vw 4.8vw 22.66vw;
    border-radius:2vw;
    background: #fff;
    padding-bottom: 4.8vw;
    position: relative;
}
</style>
