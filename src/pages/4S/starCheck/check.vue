<!--  -->
<template>
  <div class="check">
    <RecordHeader :title="$route.query.name">
      <div class="tips"
           @click="$router.push('/checkTip')"></div>
    </RecordHeader>
    <div class="contentBox">
      <div v-for="(item, index) in bigCategoryList"
           :key="`bigCategoryList${index}`"
           :class="{paddingTop10: index === 0}">
        <SubHeader class="firstTitle"
                   v-if="index === 0"
                   :text="item.name"
                   :totalPoints="total.totalPoints"
                   :deductMarks="total.deductMarks" />
        <CheckTitle v-else
                    :title="item.name"
                    :index="index"
                    :status="item.status"
                    @changeStatus="changeStatus" />
        <CheckContent :paprentIndex="index"
                      :standardList="item.standardList"
                      :status="item.status" />
      </div>
      <!-- 底部按钮 -->
      <div class="btnBot">
        <button @click="bindReset"
                :class="{on: !btnBotStatus}">重置</button>
        <button @click="bindSubmit"
                :class="{on: btnBotStatus}">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import RecordHeader from '../../../components/4s/record/header'
import SubHeader from '../../../components/4s/starCheck/subHeader'
import CheckContent from '../../../components/4s/starCheck/checkContent'
import CheckTitle from '../../../components/4s/starCheck/checkTitle'
import { Toast } from 'mint-ui'
import { gradeSecondcategories, gradeSubmit } from '@/api/4s'
import { mapGetters, mapMutations, mapState } from 'vuex'
import { setTimeout } from 'timers';

export default {
  components: {
    RecordHeader,
    SubHeader,
    CheckContent,
    CheckTitle
  },
  data () {
    return {
      total: {
        totalPoints: 0,
        deductMarks: 0
      },
      btnBotStatus: true,
      bigCategoryList: [
      ],
      subData: {},
      selectIndex: 0,
      isPageCheck: false
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name == 'checkDetail') {
      from.meta.keepAlive = true
    } else {
      from.meta.keepAlive = false
    }
    next()
  },
  created () {
    this._initData()

    this.setdeductMarks(0)
  },
  computed: mapState({
    submitScoreData: state => state.eggRecordDetails.submitScoreData,
    subcategories: state => state.eggRecordDetails.subcategories,
    deductMarks: state => state.eggRecordDetails.deductMarks
  }),
  activated () {
    let totalPoints = 0
    let deductMarks = 0

    this.subcategories.map((item, index) => {
      totalPoints += item.total
      deductMarks += item.deductLimit
    })

    this.bigCategoryList = this.subcategories

    console.log(this.bigCategoryList)
    this.total.totalPoints = totalPoints;
    this.total.deductMarks = this.deductMarks;

  },
  methods: {
    ...mapMutations(['setSubmitScoreData', 'setSubcategories', 'setTotalPoints', 'setdeductMarks']),
    // 控制评分细则的显示/隐藏
    changeStatus (index, status) {
      this.bigCategoryList[index].status = status
    },
    // 重置表单
    bindReset () {
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
      this.setSubcategories(this.subcategories)
    },
    // 提交表单
    async  bindSubmit () {
      this.btnBotStatus = true

      let standardListNameArr = []
      this.subcategories.map(item => {
        item.standardList.map(items => {
          if (!items.status) {
            standardListNameArr.push(items.name)
          }
        })
      })
      if (standardListNameArr.length != 0) {
        Toast(`请给${standardListNameArr[0]}评分`)
        return
      }
      var params = this.submitScoreData
      let { code, msg, data } = await gradeSubmit(params)
      Toast(msg)
      if (code != 0) return
      this.$router.go(-1)

    },
    async  _initData () {
      let params = {
        shopId: this.$route.query.shopId,
        categoryId: this.$route.query.id
      }

      let { code, msg, categories } = await gradeSecondcategories(params)
      if (code != 0) {
        Toast(msg)
        return
      }

      var totalPoints = 0
      var deductMarks = 0
      let categoryList = []
      categories.map((item, index) => {
        (index == 0) ? item.status = true : item.status = false
        totalPoints += item.total
        deductMarks += item.deductLimit
        categoryList.push({ categoryId: item.id, standardList: [] })
        item.standardList.map(items => {
          items.status = false
        })
      })
      this.submitScoreData.categoryList = categoryList
      this.setSubmitScoreData(this.submitScoreData) //设置提交数据初始值
      this.total.totalPoints = totalPoints;
      this.total.deductMarks = this.deductMarks;
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
    background: url(../../../assets/imgs/4s/tips.png) no-repeat center center /
      19px 19px;
  }
  .contentBox {
    position: relative;
    padding-top: 36vw;
    padding-bottom: 13.34vw;
    box-sizing: border-box;
    min-height: 100vh;
  }
  .btnBot {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    align-self: flex-end;
    height: 13.34vw;
    display: flex;
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
</style>