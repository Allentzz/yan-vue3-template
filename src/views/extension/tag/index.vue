<script lang="ts" setup>
import { ElInput } from "element-plus"
import { nextTick, ref } from "vue"

const tagSize = ref("small")
const tagTheme = ref("light")
const tags2 = ["标签一", "标签二", "标签三"]
const ripple = true
const validator = (value: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(value + "不合法, 请重新输入"))
    }, 1000)
  })
}

const inputValue = ref("")
const dynamicTags = ref(["标签一", "标签二", "标签三"])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ""
}
</script>
<template>
  <div class="app-container">
    <el-card shadow="never" header="标签组件" body-style="overflow: auto;">
      <div style="min-width: 460px">
        <div class="ele-cell">
          <div>默认样式:</div>
          <div class="ele-cell-content">
            <el-tag :size="tagSize" :effect="tagTheme">标签一</el-tag>
            <el-tag :size="tagSize" :effect="tagTheme" type="success"> 标签二 </el-tag>
            <el-tag :size="tagSize" :effect="tagTheme" type="info"> 标签三 </el-tag>
            <el-tag :size="tagSize" :effect="tagTheme" type="warning"> 标签四 </el-tag>
            <el-tag :size="tagSize" :effect="tagTheme" type="danger"> 标签五 </el-tag>
          </div>
        </div>
        <div class="ele-cell">
          <div>圆角样式:</div>
          <div class="ele-cell-content">
            <el-tag :size="tagSize" :effect="tagTheme" class="ele-tag-radius"> 标签一 </el-tag>
            <el-tag :size="tagSize" :effect="tagTheme" type="success" class="ele-tag-radius"> 标签二 </el-tag>
            <el-tag :size="tagSize" :effect="tagTheme" type="info" class="ele-tag-radius"> 标签三 </el-tag>
            <el-tag :size="tagSize" :effect="tagTheme" type="warning" class="ele-tag-radius"> 标签四 </el-tag>
            <el-tag :size="tagSize" :effect="tagTheme" type="danger" class="ele-tag-radius"> 标签五 </el-tag>
          </div>
        </div>
        <div class="ele-cell">
          <div>圆形样式:</div>
          <div class="ele-cell-content">
            <el-tag :size="tagSize" :effect="tagTheme" round> 1 </el-tag>
            <el-tag :size="tagSize" :effect="tagTheme" type="success" round> 2 </el-tag>
            <el-tag :size="tagSize" :effect="tagTheme" type="info" round> 3 </el-tag>
            <el-tag :size="tagSize" :effect="tagTheme" type="warning" round> 4 </el-tag>
            <el-tag :size="tagSize" :effect="tagTheme" type="danger" round> 5 </el-tag>
          </div>
        </div>
        <div class="ele-cell">
          <div class="mr-4">尺寸设置:</div>
          <div class="ele-cell-content">
            <el-radio-group v-model="tagSize">
              <el-radio label="large">默认</el-radio>
              <el-radio label="medium">中等</el-radio>
              <el-radio label="small">小型</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="ele-cell">
          <div class="mr-4">主题设置:</div>
          <div class="ele-cell-content">
            <el-radio-group v-model="tagTheme">
              <el-radio label="light">light</el-radio>
              <el-radio label="dark">dark</el-radio>
              <el-radio label="plain">plain</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
    </el-card>
    <el-card shadow="never" header="标签输入">
      <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        class="mx-1"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        style="width: 50px"
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        size="small"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput"> + New Tag </el-button>
      <div class="ml-3 mt-3 text-gray-500">{{ dynamicTags }}</div>
    </el-card>
    <!-- <el-card shadow="never" header="状态文字" body-style="overflow: auto;">
      <div style="min-width: 360px">
        <div class="ele-cell">
          <div>默认效果:</div>
          <div class="ele-cell-content">
            <ele-dot :ripple="ripple" text="运行中" />
            <ele-dot type="success" :ripple="ripple" text="已上线" />
            <ele-dot type="danger" :ripple="ripple" text="异常" />
            <ele-dot type="info" :ripple="ripple" text="关闭" />
          </div>
        </div>
        <div class="ele-cell">
          <div>大小设置:</div>
          <div class="ele-cell-content">
            <ele-dot :ripple="ripple" text="运行中" size="8px" />
            <ele-dot type="success" :ripple="ripple" text="已上线" size="8px" />
            <ele-dot type="danger" :ripple="ripple" text="异常" size="8px" />
            <ele-dot type="info" :ripple="ripple" text="关闭" size="8px" />
          </div>
        </div>
        <div class="ele-cell">
          <div>显示动画:</div>
          <div class="ele-cell-content">
            <el-radio-group v-model="ripple">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
    </el-card> -->
  </div>
</template>

<style scoped lang="scss">
.el-tag {
  margin-left: 12px;
}
.ele-cell {
  display: flex;
  align-items: center;
}
.ele-cell + .ele-cell {
  margin-top: 16px;
}

.ele-dot + .ele-dot {
  margin-left: 16px;
}
</style>
