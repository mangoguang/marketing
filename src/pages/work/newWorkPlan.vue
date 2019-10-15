<template>
  <div class="newWorkPlan">
    <banner :title="title"
            class="header">
      <button type="button"
              class="save"
              @click="save"
              v-if="edit">保存</button>
      <button type="button"
              class="save"
              @click="editPlan"
              v-else>编辑</button>
    </banner>
    <planForm v-if="edit" />
    <planFormReadonly v-else />
  </div>
</template>
<script>
import banner from '../../components/banner'
import planForm from '../../components/work/plan/planForm'
import planFormReadonly from '../../components/work/plan/planFormReadonly'
import { mapState, mapMutations } from 'vuex'
import { IndexModel } from '../../utils'
const indexModel = new IndexModel()
let Base64 = require('js-base64').Base64
import mango from '../../js'
export default {
  name: 'workPlan',
  props: ['id'],
  data() {
    return {
      edit: true,
      title: ''
    }
  },
  components: {
    banner,
    planForm,
    planFormReadonly
  },
  computed: {
    ...mapState({
      plan: state => state.plan.plan
    })
  },
  activated() {
    if (!this.$route.meta.isUseCache) {
      if (!this.id) {
        this.setPlan({ id: '' })
        this.edit = true
        this.title = '新建工作计划'
      } else {
        this.edit = false
        this.setPlan({ id: this.id })
        this.title = '计划详情'
        this.getDetail(this.plan.id)
      }
    }
  },
  mounted() {},
  methods: {
    ...mapMutations('plan', ['setPlan']),
    save() {
      if (this.valid(this.plan)) {
        let obj = this.getParams(this.plan)
        console.log(obj)
        let form = new FormData()
        let keys = []
        for (let key in obj) {
          form.append(key, obj[key])
          keys.push(key)
        }
        if (!this.plan.id) {
          indexModel
            .saveWorkPlan(form, keys, obj)
            .then(res => {
              console.log(res)
              mango.tip(res.msg)
              if (res.data) {
                this.getDetail(res.data)
              }
            })
            .catch(reject => {
              if (reject === 510) {
                this.save()
              }
            })
        } else {
          indexModel
            .updateWorkPlan(form, keys, obj)
            .then(res => {
              console.log(res)
              mango.tip(res.msg)
              if (this.plan.id) {
                this.getDetail(this.plan.id)
              }
            })
            .catch(reject => {
              if (reject === 510) {
                this.save()
              }
            })
        }
      }
    },
    getDetail(id) {
      indexModel
        .getPlanDetail(id)
        .then(res => {
          console.log(res)
          if (res.status) {
            this.$set(this.plan, 'planName', Base64.decode(res.data.planName))
            this.$set(
              this.plan,
              'address',
              res.data.address === '' ? '' : Base64.decode(res.data.address)
            )
            this.$set(this.plan, 'startTime', res.data.startTime)
            this.$set(this.plan, 'endTime', res.data.endTime)
            this.$set(this.plan, 'customerId', res.data.customerId)
            this.$set(this.plan, 'customerName', res.data.customerName)
            this.$set(this.plan, 'opportunityId', res.data.opportunityId)
            this.$set(
              this.plan,
              'remark',
              res.data.remark === '' ? '' : Base64.decode(res.data.remark)
            )
            this.$set(this.plan, 'id', res.data.id)
            this.$set(this.plan, 'goodsName', res.data.goodNames)
            this.edit = false
            this.title = '计划详情'
            console.log('哈哈哈', Base64.decode('dW5kZWZpbmVk'))
          }
        })
        .catch(reject => {
          if (reject === 510) {
            this.getDetail(id)
          }
        })
    },
    editPlan() {
      this.title = '编辑工作计划'
      this.edit = true
    },
    getParams(obj) {
      let tempObj = {}
      let temp = {
        planName: Base64.encode(obj.planName),
        address:
          obj.address && obj.address !== '' ? Base64.encode(obj.address) : '',
        startTime: obj.startTime,
        endTime: obj.endTime,
        customerId: obj.customerId,
        customerName: obj.customerName,
        opportunityId: obj.opportunityId,
        remark:
          obj.remark && obj.remark !== '' ? Base64.encode(obj.remark) : '',
        id: obj.id
      }
      for (let key in temp) {
        if (temp[key] || temp[key] === 0) {
          tempObj[key] = temp[key]
        }
      }
      return tempObj
    },
    valid(obj) {
      if (!obj.planName) {
        mango.tip('请填写事件标题')
        return false
      } else if (!obj.startTime) {
        mango.tip('请选择开始时间')
        return false
      } else {
        return true
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'searchCustomer' || from.name === 'searchIntention') {
      to.meta.isUseCache = true
    } else {
      to.meta.isUseCache = false
    }
    next()
  }
}
</script>
<style lang="scss" scoped>
.newWorkPlan {
  .header {
    background: #fff;
    border: 1px solid #e1e1e1;
  }
  .save {
    font-size: 14px;
    width: 28px;
    margin-right: 4.8vw;
    font-weight: 300;
    white-space: nowrap;
    color: #007aff;
    font-weight: bold;
    padding: 0;
  }
  .planForm {
    margin-top: 16.466vw;
  }
}
</style>
