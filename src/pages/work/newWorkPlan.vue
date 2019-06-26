<template>
    <div class="newWorkPlan">
        <banner title='新建工作计划' class="header">
            <button type="button" class="save">保存</button>
        </banner>
        <planForm />
        
    </div>
</template>
<script>
import banner from '../../components/banner'
import planForm from '../../components/work/plan/planForm'
import { mapState , mapMutations } from 'vuex'
import { IndexModel } from '../../utils'
const indexModel = new IndexModel()
export default {
    name:'workPlan',
    data(){
        return {
           
        }
    },
    components:{
        banner,
        planForm
    },
    computed:{
        ...mapState({
            plan:state => state.plan.plan
        })
    },
    mounted(){
       
        
    },
    methods:{
        
    }
}
</script>
<style lang="scss" scoped>
.newWorkPlan{
    .header{
        background: #fff;
        border: 1px solid #E1E1E1;
    }
    .save{
        font-size: 14px;
        width: 28px;
        margin-right:4.8vw;
        font-weight: 300;
        white-space: nowrap;
        color:#007AFF;
        font-weight: bold;
    }
    .planForm{
        margin-top:16.466vw;
    }
    
  
}
 
</style>
