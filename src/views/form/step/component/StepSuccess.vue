<script lang="ts" setup>
import { defineProps, defineEmits } from "vue"
defineProps(["data"])
const $emit = defineEmits(["back"])
const back = () => {
  $emit("back")
}
</script>

<template>
  <div style="padding: 0 15px">
    <el-result icon="success" title="操作成功" desc="预计两小时内到账">
      <template #extra>
        <!-- <el-form label-width="100px" size="mini" class="ele-form-detail">
          <el-form-item label="付款账户:">
            <span style="word-break: break-all">{{ data.account }}</span>
          </el-form-item>
          <el-form-item label="收款账户:">
            <span style="word-break: break-all">{{ data.receiver }}</span>
          </el-form-item>
          <el-form-item label="收款人姓名:">
            <span>{{ data.name }}</span>
          </el-form-item>
          <el-form-item label="转账金额:" style="margin-bottom: 0">
            <span style="font-size: 24px">{{ data.amount }}</span>
            <span> 元</span>
          </el-form-item>
        </el-form> -->
        <el-button type="primary" @click="back">再转一笔</el-button>
        <el-button>查看账单</el-button>
      </template>
    </el-result>
  </div>
</template>
