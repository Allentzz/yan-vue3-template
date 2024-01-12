<script lang="ts" setup>
import { ref, reactive } from "vue"
import StepEdit from "./component/StepEdit.vue"
import StepSConfirm from "./component/StepConfirm.vue"
import StepSuccess from "./component/StepSuccess.vue"
const active = ref<number>(1)
const form = reactive<RuleForm>({
  account: "eleadmin@eclouds.com",
  receiver: "test@example.com",
  pay: "alipay",
  name: "Alex",
  amount: 500
})
interface RuleForm {
  account: string
  receiver: string
  pay: string
  name: string
  amount: number
}
const onDone = (data: RuleForm) => {
  Object.assign(form, data)
  active.value = 2
}
const onNext = () => {
  active.value = 3
}
const onBack = () => {
  active.value = 1
}
</script>
<template>
  <div class="app-container">
    <el-card shadow="never" body-style="padding: 15px 0 25px 0;">
      <div style="max-width: 700px; margin: 0 auto">
        <el-steps :active="active" class="ele-steps-horizontal" style="margin: 10px 0 45px 0">
          <el-step title="第一步" description="填写转账信息" />
          <el-step title="第二步" description="确认转账信息" />
          <el-step title="第三步" description="转账成功" />
        </el-steps>
        <!-- 第一步 -->
        <StepEdit v-if="active === 1" @done="onDone" />
        <!-- 第二步 -->
        <StepSConfirm v-if="active === 2" :data="form" @done="onNext" @back="onBack" />
        <!-- 第三步 -->
        <StepSuccess v-if="active === 3" :data="form" @back="onBack" />
      </div>
    </el-card>
  </div>
</template>
