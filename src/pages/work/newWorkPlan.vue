<template>
    <div class="newWorkPlan">
        <banner :title="!id?'新建工作计划':'计划详情'" class="header">
            <button type="button" class="save" @click="save" v-if="edit">保存</button>
            <button type="button" class="save" @click="edit" v-else>编辑</button>
        </banner>
        <planForm v-if="edit"/>
        <planFormReadonly v-else/>
    </div>
</template>
<script>
import banner from '../../components/banner'
import planForm from '../../components/work/plan/planForm'
import planFormReadonly from '../../components/work/plan/planFormReadonly'
import { mapState , mapMutations } from 'vuex'
import { IndexModel } from '../../utils'
const indexModel = new IndexModel()
import mango from '../../js'
export default {
    name:'workPlan',
    props:['id'],
    data(){
        return {
           edit:true
        }
    },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    components:{
        banner,
        planForm,
        planFormReadonly
    },
    computed:{
        ...mapState({
            plan:state => state.plan.plan
        })
    },
    activated(){
        if(!this.id){
            if(!this.$route.meta.isUseCache){
                this.setPlan({})
                this.edit=true
            }
        }else{
            this.edit=false
        }

        
    },
    mounted(){
       
        
    },
    methods:{
        ...mapMutations('plan',['setPlan']),
        save(){
            if(this.valid(this.plan)){
                let obj = this.getParams(this.plan)
                /* let form = new FormData()
                let keys = []
                for(let key in obj){
                    form.append(key,obj[key])
                    keys.push(key)
                } */
                indexModel.saveWorkPlan(obj).then((res) => {
                    console.log(res)
                }).catch((reject) => {
                    if(reject === 510){
                        this.save()
                    }
                })
            }
        },
        editPlan(obj){
            
        },
        getParams(obj){
            let tempObj = {}
            let temp = {
                planName:obj.planName,
                address:obj.address,
                startTime:obj.startTime,
                endTime:obj.endTime,
                customerId:obj.customerId,
                customerName:obj.customerName,
                opportunityId:obj.opportunityId,
                remark:obj.remark
            }
            for(let key in temp){
                if(temp[key] || temp[key]===0){
                    tempObj[key]=temp[key]
                }
            }
            return tempObj
        },
        valid(obj){
            if(!obj.planName){
                mango.tip('请填写事件标题')
                return false
            }else if(!obj.startTime){
                mango.tip('请选择开始时间')
                return false
            }else{
                return true
            }
        }
    },
    beforeRouteEnter(to,from,next){
        if(from.name==='searchCustomer'||from.name==='searchIntention'){
            to.meta.isUseCache=true    
        }else{
            to.meta.isUseCache=false 
        }
        next()
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
