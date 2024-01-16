<script lang="ts" setup></script>

<template>
  <div class="app-container">
    <el-card>
      <el-result icon="success" title="提交成功">
        <template #sub-title>
          <span class="text-neutral-400 text-sm"
            >提交结果页用于反馈一系列操作任务的处理结果, 如果仅是简单操作, 使用 Message
            全局提示反馈即可。灰色区域可以显示一些补充的信息。</span
          >
          <div class="bg-neutral-100 py-4 rounded-md bg mt-8 pl-8 text-gray-600 flex text-sm" style="width: 900px">
            已提交申请, 等待部门审核。
          </div>
        </template>
        <template #extra>
          <el-button type="primary">返回列表</el-button>
          <el-button>查看项目</el-button>
          <el-button>打印</el-button>
        </template>
      </el-result>
    </el-card>
  </div>
</template>
