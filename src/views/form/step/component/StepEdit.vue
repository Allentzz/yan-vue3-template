<script lang="ts" setup>
import { reactive, ref, defineEmits } from "vue"
import type { FormInstance, FormRules } from "element-plus"
defineOptions({
  // 命名当前组件
  name: "StepEdit"
})
const $emit = defineEmits(["done"])
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
const rules = reactive<FormRules<RuleForm>>({
  account: [
    {
      type: "string",
      required: true,
      message: "请选择付款账户",
      trigger: "blur"
    }
  ],
  receiver: [
    {
      type: "string",
      required: true,
      message: "请输入收款账户",
      trigger: "blur"
    }
  ],
  name: [
    {
      type: "string",
      required: true,
      message: "请输入收款人姓名",
      trigger: "blur"
    }
  ],
  amount: [
    {
      type: "number",
      required: true,
      message: "请输入转账金额",
      trigger: "blur"
    }
  ]
})
const loading = ref<boolean>(false)
const formRef = ref<FormInstance>()
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      $emit("done", form)
    } else {
      console.log("error submit!", fields)
    }
  })
}
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" style="padding-right: 15px">
    <el-form-item label="付款账户:" prop="account">
      <el-select class="w-full" v-model="form.account" placeholder="请选择付款账户" clearable>
        <el-option label="eleadmin@eclouds.com" value="eleadmin@eclouds.com" />
      </el-select>
    </el-form-item>
    <el-form-item label="收款账户:" prop="receiver">
      <el-input v-model="form.receiver" placeholder="请输入收款账户" clearable class="input-with-select">
        <template v-slot:prepend>
          <el-select v-model="form.pay">
            <el-option label="支付宝" value="alipay" />
            <el-option label="微信" value="wxpay" />
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="收款人姓名:" prop="name">
      <el-input v-model="form.name" placeholder="请输入收款人姓名" clearable />
    </el-form-item>
    <el-form-item label="转账金额:" prop="amount">
      <el-input v-model="form.amount" placeholder="请输入转账金额" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="submit(formRef)"> 下一步 </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.input-with-select :deep(.el-select .el-input) {
  width: 100px;
}
</style>
