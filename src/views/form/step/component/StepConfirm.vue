<script lang="ts" setup>
import { FormInstance, FormRules } from "element-plus"
import { reactive, defineProps, ref, defineEmits } from "vue"

defineProps(["data"])
const $emit = defineEmits(["back", "done"])
interface RuleForm {
  password: string
}
const formRef = ref<FormInstance>()
const rules = reactive<FormRules<RuleForm>>({
  password: [
    {
      required: true,
      message: "请输入支付密码",
      trigger: "blur"
    }
  ]
})
const form = reactive({
  password: "123456"
})
const loading = ref<boolean>(false)
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      $emit("done")
    } else {
      console.log("error submit!", fields)
    }
  })
}
const back = () => {
  $emit("back")
}
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules">
    <div style="margin-bottom: 20px; padding: 0 20px">
      <el-alert title="确认转账后, 资金将直接打入对方账户, 无法退回。" type="info" show-icon class="ele-alert-border" />
    </div>
    <el-form-item label="付款账户:">
      <span>{{ data.account }}</span>
    </el-form-item>
    <el-form-item label="收款账户:" prop="receiver">
      <span>{{ data.receiver }}</span>
    </el-form-item>
    <el-form-item label="收款人姓名:" prop="name">
      <span>{{ data.name }}</span>
    </el-form-item>
    <el-form-item label="转账金额:" prop="amount">
      <span style="font-size: 24px">{{ data.amount }}</span>
      <span> 元</span>
    </el-form-item>
    <div style="margin: 20px 0 30px 0">
      <el-divider />
    </div>
    <el-form-item label="支付密码:" prop="password" style="margin-bottom: 22px">
      <div style="max-width: 280px; padding-right: 15px">
        <el-input v-model="form.password" placeholder="请输入支付密码" show-password />
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="submit(formRef)"> 下一步 </el-button>
      <el-button class="hidden-xs-only" @click="back">上一步</el-button>
    </el-form-item>
  </el-form>
</template>
