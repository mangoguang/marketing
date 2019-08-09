
<template>
  <div class="progress">
    <atest-header title="认证进度"
                  @onSearch="onSearch" />

    <div class="content">
      <atest-recordCard />
    </div>
  </div>
</template>

<script>
import AtestHeader from '@/components/4s/starAtest/AtestHeader'
import AtestRecordCard from '@/components/4s/starAtest/AtestRecordCard'

export default {
  components: {
    AtestHeader,
    AtestRecordCard

  },
  methods: {
    //搜索
    onSearch () {

    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding-top: 89.5px;
}
</style>
