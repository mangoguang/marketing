<template>
    <li class="noticeLi" @click="go(item.id)">
        <h1>{{item.titleName}}</h1>
        <p>
            <span v-if="item.sort===1">置顶&nbsp;&nbsp;</span>
            {{item.createTime.split(' ')[0].split('-').join('.')}}&nbsp;&nbsp;<span v-if="item.throughput>=10000">{{(parseFloat(item.throughput)/10000).toFixed(2)+"万"}}</span>
            <img src="../../../assets/imgs/visit.png" alt="" v-if="item.throughput>=10000">
        </p>
    </li>
</template>
<script>
export default {
    name:'noticeLi',
    props:['item'],
    methods:{
        go(id){
            this.$router.push({path:'/noticeDetails',query:{id:id}})
        }
    }
}
</script>
<style lang="scss" scoped>
.noticeLi{
    background: #fff;
    padding:4.266vw;
    box-shadow: 0 1px 3px rgba(136, 136, 136, 0.2);
    margin-bottom: 1.33vw;
    h1{
        color:#363636;
        font-size: 4vw;
        font-weight: bold;
    }
    p{
        color:#909090;
        font-size: 3.733vw;
        span{
            color:#FF2D55;
        }
        img{
            vertical-align: middle;
            width:4.533vw;
        }
    }
}
</style>
