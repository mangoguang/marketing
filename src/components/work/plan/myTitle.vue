<template>
    <div class="title">
        <span class="left">{{title}}</span>
        <span class="mid">{{mid}}</span>
        <span class="right"><slot></slot></span>
    </div>
</template>
<script>
export default {
    props:['title','mid'],
    name:'myTitle',
    data(){
        return {

        }
    },
    components:{

    },
    methods:{

    }
}
</script>
<style lang="scss" scoped>
.title{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height:10.66vw;
    color:#363636;
    font-size: 4.266vw;
    padding-right:4vw;
    border-bottom: 1px solid #E1E1E1;
    .left{
        flex:0.33;
        border-left:3px solid #007AFF;
        padding-left:4vw;
    }
    .mid{
        color:#909090;
        flex:0.33;
        text-align: center;
    }
    .right{
        flex:0.33;
        color:#007AFF;
        text-align: right;
    }
}
</style>
