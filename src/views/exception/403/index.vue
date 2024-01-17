<script lang="ts" setup></script>
<template>
  <div class="app-container">
    <div class="flex justify-center mt-40">
      <img alt="" src="@/assets/ic-403.svg" style="width: 216px; height: 250px" />
      <div class="flex flex-col ml-9">
        <div class="text-7xl mt-4 text-gray-500 font-semibold">403</div>
        <div class="my-8 text-zinc-500 text-lg">抱歉, 你无权访问该页面</div>
        <router-link to="/">
          <el-button class="w-min" type="primary">返回首页</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
