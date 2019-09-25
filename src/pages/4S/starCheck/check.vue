<!--  -->
<template>
  <div class="check"
       ref="check">
    <RecordHeader :title="$route.query.name">
      <div class="tips"
           @click="$router.push({path:'/checkTip',query:{remark:$route.query.remark}})"></div>
    </RecordHeader>
    <div class="contentBox">
      <div v-for="(item, index) in bigCategoryList"
           :key="`bigCategoryList${index}`"
           :class="{paddingTop10: index === 0}">
        <SubHeader class="firstTitle"
                   v-if="index === 0"
                   text="分数统计"
                   :totalPoints="total.totalPoints"
                   :deductMarks="total.deductMarks" />
        <CheckTitle :title="item.name"
                    :index="index"
                    :status="item.status"
                    @changeStatus="changeStatus" />
        <CheckContent :paprentIndex="index"
                      :standardList="item.standardList"
                      :status="item.status" />
      </div>
      <!-- 底部按钮 -->
      <div class="btn-bottom"
           v-if="$route.query.isGrade!=1">
        <button @click="toastReset=true"
                :class="{on: !btnBotStatus}">重置</button>
        <button @click="bindSubmit"
                :class="{on: btnBotStatus}">提交</button>
      </div>
    </div>
    <ToastBox class="toast"
              v-if="toastShow">
      <template v-slot:content>
        <div class="cont">
          <p>该检查得分：<span>{{total.totalPoints-total.deductMarks}}分</span>
            <span>扣分：{{total.deductMarks}}分</span>
          </p>
          <!-- <p>注意：提交后无法修改分数</p> -->
          <!-- <div class="bot"
               @click="$router.push('/recordJxs')">查看检查记录 >></div> -->
        </div>
      </template>
      <template v-slot:bottons>
        <div class="but">
          <div class="btns"
               @click="toastShow=false">返回修改</div>
          <div class="btns"
               @click="bindComfirmSubmit">确认提交</div>
        </div>
      </template>
    </ToastBox>
    <ToastBox class="toast"
              v-if="toastReset"
              :content="'是否确认重置？'">

      <template v-slot:bottons>
        <div class="but">
          <div class="btns"
               @click="toastReset=false">取消</div>
          <div class="btns"
               @click="bindReset">确定</div>
        </div>
      </template>
    </ToastBox>
  </div>
</template>

<script>
import RecordHeader from '../../../components/4s/record/header'
import SubHeader from '../../../components/4s/starCheck/subHeader'
import CheckContent from '../../../components/4s/starCheck/checkContent'
import CheckTitle from '../../../components/4s/starCheck/checkTitle'
import ToastBox from '@/components/4s/tipsBox/ToastBox'
import { Toast } from 'mint-ui'
import { gradeSubcategories, gradeSubmit } from '@/api/4s'
import { mapGetters, mapMutations, mapState } from 'vuex'
import { setTimeout } from 'timers'

export default {
  components: {
    RecordHeader,
    SubHeader,
    CheckContent,
    CheckTitle,
    ToastBox
  },
  data() {
    return {
      total: {
        totalPoints: 0,
        deductMarks: 0
      },
      btnBotStatus: true,
      bigCategoryList: [],
      subData: {},
      selectIndex: 0,
      isPageCheck: false,
      toastShow: false,
      toastReset: false
    }
  },
  beforeRouteLeave(to, from, next) {
    let routeName = ['checkDetail', 'recordJxs', 'checkTip', 'recordJxs']
    if (routeName.indexOf(to.name) != -1) {
      from.meta.keepAlive = true
    } else {
      from.meta.keepAlive = false
    }
    next()
  },
  created() {
    this._initData()

    this.setdeductMarks(0)
  },
  computed: mapState({
    submitScoreData: state => state.eggRecordDetails.submitScoreData,
    subcategories: state => state.eggRecordDetails.subcategories,
    deductMarks: state => state.eggRecordDetails.deductMarks
  }),
  activated() {
    let totalPoints = 0
    let deductMarks = 0

    this.subcategories.map((item, index) => {
      totalPoints += item.total
      // deductMarks += item.deductLimit
      item.standardList.map(items => {
        deductMarks += items.deductMarks
      })
    })
    this.bigCategoryList = this.subcategories
    this.total.totalPoints = totalPoints
    this.total.deductMarks = deductMarks
    document.querySelector('#app').scrollTop = sessionStorage.getItem(
      'scrollTop'
    )
  },
  mounted() {
    document.querySelector('#app').scrollTop = 0
  },
  methods: {
    ...mapMutations([
      'setSubmitScoreData',
      'setSubcategories',
      'setTotalPoints',
      'setdeductMarks'
    ]),
    // 控制评分细则的显示/隐藏
    changeStatus(index, status) {
      this.bigCategoryList[index].status = status
    },
    // 重置表单
    bindReset() {
      this.total.deductMarks = 0
      this.toastReset = false
      this.btnBotStatus = false
      this.submitScoreData.categoryList.map(item => {
        item.standardList = []
      })
      this.setSubmitScoreData(this.submitScoreData) //设置提交数据初始值

      this.subcategories.map(item => {
        item.standardList.map(items => {
          items.status = false
        })
      })
      this.setdeductMarks(0)
      this.setSubcategories(this.subcategories)
    },
    bindSubmit() {
      this.btnBotStatus = true
      let standardListNameArr = []
      this.subcategories.map(item => {
        item.standardList.map(items => {
          if (!items.status) {
            standardListNameArr.push(items.name)
          }
        })
      })
      // if (standardListNameArr.length != 0) {
      //   Toast(`请给${standardListNameArr[0]}评分`)
      //   return
      // }
      this.toastShow = true
    },
    // 提交表单
    async bindComfirmSubmit() {
      this.toastShow = false

      var params = this.submitScoreData
      let { code, msg, data } = await gradeSubmit(params)
      Toast(msg)
      if (code != 0) return
      this.$router.go(-1)
    },
    async _initData() {
      let params = {
        shopId: this.$route.query.shopId,
        categoryId: this.$route.query.id
      }

      let { code, msg, categories } = await gradeSubcategories(params)
      if (code != 0) {
        Toast(msg)
        return
      }

      var totalPoints = 0
      var deductMarks = 0
      let categoryList = []
      let { isGrade } = this.$route.query
      let totalScore = 0
      categories.map((item, index) => {
        index == 0 || isGrade == 1
          ? (item.status = true)
          : (item.status = false)
        totalPoints += item.total
        deductMarks += item.deductLimit
        let standardList = []
        item.standardList.map(items => {
          items.deductMarks = 0
          if (isGrade == 1) {
            items.status = true
          } else {
            items.status = false
          }
          totalScore += items.deduct

          let { id, deduct, reason, urls } = items
          standardList.push({
            standardId: id,
            deduct: deduct || 0,
            reason: reason || '',
            urls: urls || []
          })
        })
        categoryList.push({ categoryId: item.id, standardList })
      })

      this.submitScoreData.categoryList = categoryList
      this.setSubmitScoreData(this.submitScoreData) //设置提交数据初始值
      this.total.totalPoints = totalPoints
      this.total.deductMarks = isGrade == 1 ? totalScore : this.deductMarks
      if (isGrade == 1) {
        this.setdeductMarks(totalScore)
      }
      this.setTotalPoints(totalPoints)
      this.setSubcategories(categories)
      this.bigCategoryList = categories
    }
  }
}
</script>
<style lang='scss' scoped>
.check /deep/ .record_header {
  height: auto;
  padding-bottom: 5px;
}

.check {
  padding-bottom: 30px;
  .tips {
    position: absolute;
    top: 52px;
    right: 24px;
    // transform: translateX(-50%);
    width: 19px;
    height: 37px;
    background: url(../../../assets/imgs/4s/tips.png) center center no-repeat;
    background-size: 19px 19px;
  }
  .contentBox {
    position: relative;
    padding-top: 148px;
    padding-bottom: 13.34vw;
    box-sizing: border-box;
    min-height: 100vh;
  }
  .btn-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    align-self: flex-end;
    height: 13.34vw;
    display: flex;
    z-index: 999;
    button {
      width: 50%;
      box-sizing: border-box;
      border: 1px solid #007aff;
      background: #fff;
      font-size: 16px;
      color: #007aff;
    }
    button.on {
      background: #007aff;
      color: #fff;
    }
  }
}

.toast {
  .cont {
    text-align: center;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-size: 15px;
      color: #363636;
      line-height: 1;
      padding-bottom: 10px;
      span:first-child {
        color: #007aff;
        font-size: 15px;
      }
      span:last-child {
        color: #ff0718;
        font-size: 15px;
      }
    }
    .bot {
      padding-top: 10px;
      color: #ff0718;
      font-size: 15px;
    }
  }
  .but {
    display: flex;
    .btns {
      flex: 1;
      font-size: 15px;
    }
    .btns:first-child {
      color: #909090;
      border-right: 1px solid #ddd;
    }
    .btns:last-child {
      color: #007aff;
    }
  }
}
</style>