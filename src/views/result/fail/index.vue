<script lang="ts" setup></script>

<template>
  <div class="app-container">
    <el-card>
      <el-result icon="error" title="提交失败">
        <template #sub-title>
          <span class="text-neutral-400 text-sm">请核对并修改以下信息后, 再重新提交。</span>
          <div class="bg-neutral-100 py-4 rounded-md bg mt-8 pl-8 text-gray-600 text-left text-sm" style="width: 900px">
            <div>您提交的内容有如下错误:</div>
            <div class="flex mt-4">
              <el-icon color="#ff4d4f" size="16" style="height: 20px; line-height: 20px"><CircleClose /></el-icon>
              <div class="ml-2 mr-3">您的账户已被冻结</div>
              <el-link type="primary" :underline="false">
                <span>立即解冻</span>
                <el-icon><ArrowRight /></el-icon>
              </el-link>
            </div>
            <div class="flex mt-3">
              <el-icon color="#ff4d4f" size="16" style="height: 20px; line-height: 20px"><CircleClose /></el-icon>
              <div class="ml-2 mr-3">您的账户还不具备申请资格</div>
              <el-link type="primary" :underline="false">
                <span>立即升级</span>
                <el-icon><ArrowRight /></el-icon>
              </el-link>
            </div>
          </div>
        </template>
        <template #extra>
          <el-button type="primary">返回修改</el-button>
        </template>
      </el-result>
    </el-card>
  </div>
</template>
