<!--  -->
<template>
  <div class="check">
    <RecordHeader :title="'店面SI标准一阶段'" />
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
                    @changeStatus="changeStatus" />
        <CheckContent @click.native="bindSetCategoryId(item.id,index)"
                      @onGetStandardId="onGetStandardId"
                      :list="item.standardList"
                      :status="item.status" />
      </div>
      <!-- 底部按钮 -->
      <div class="btnBot">
        <button @click="reset"
                :class="{on: !btnBotStatus}">重置</button>
        <button @click="submit"
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
      selectIndex: 0
    }
  },
  computed: {
    statusList () {
      return this.bigCategoryList.map((item) => {
        return item.status
      })
    }
  },
  created () {
    this.subData = this.submitScoreData
    this._initData()
  },
  computed: mapState({ submitScoreData: state => state.eggRecordDetails.submitScoreData }),
  methods: {
    ...mapMutations(['setSubmitScoreData', 'setCategoryListIndex', 'setStandardListIndex']),
    bindSetCategoryId (categoryId, index) {
      this.selectIndex = index
      this.subData.categoryList[index].categoryId = categoryId

    },
    onGetStandardId (item) {
      this.subData.categoryList[this.selectIndex].standardList[item.index].standardId = item.standardId //设置当前选中分类细项id
      this.setSubmitScoreData(this.subData) //提交分类id，打分细项id
      this.setCategoryListIndex(this.selectIndex) //记录三级分类索引
      this.setStandardListIndex(item.index) //记录分类细项列表索引

    },
    // 控制评分细则的显示/隐藏
    changeStatus (index, status) {
      this.bigCategoryList[index].status = status
    },
    // 重置表单
    reset () {
      this.btnBotStatus = false
    },
    // 提交表单
    async  submit () {
      this.btnBotStatus = true
      var params = this.submitScoreData
      console.log(JSON.stringify(this.submitScoreData))
      let { code, data } = await gradeSubmit(params)
    },
    async  _initData () {
      let params = {
        shopId: this.subData.shopId,
        categoryId: this.$route.query.id
      }

      let { code, msg, categories } = await gradeSecondcategories(params)
      if (code != 0) {
        Toast(msg)
        return
      }
      var totalPoints = 0
      var deductMarks = 0
      categories.map((item, index) => {
        (index == 0) ? item.status = true : item.status = false
        totalPoints += item.total
        deductMarks += item.deductLimit
      })
      this.total.totalPoints = totalPoints;
      this.total.deductMarks = deductMarks;
      this.bigCategoryList = categories
    }
  }
}
</script>
<style lang='scss' scoped>
.check {
  padding-bottom: 30px;
  .contentBox {
    position: relative;
    padding-top: 46vw;
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