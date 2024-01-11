<script lang="ts" setup>
//导入 form-create
import formCreate from "@form-create/element-ui"
import { ref } from "vue"
//获取 formCreate 组件
const FormCreate = formCreate.$form()
const fApi = ref({})
const formData = ref({})
const options = ref({
  //表单提交事件
  onSubmit: function (formData) {
    alert(JSON.stringify(formData))
  }
})
const rule = ref([
  {
    type: "input",
    field: "title",
    title: "标题",
    value: "",
    validate: [{ type: "string", required: true, message: "请输入" }]
  },
  {
    type: "datePicker",
    field: "date",
    title: "日期",
    value: [],
    props: {
      type: "datetimerange"
    },
    validate: [{ type: "array", required: true, message: "请选择日期" }]
  },
  {
    type: "input",
    field: "goal",
    title: "目标描述",
    value: "",
    props: {
      type: "textarea"
    },
    validate: [{ type: "string", required: true, message: "请输入目标描述" }]
  },
  {
    type: "input",
    field: "standard",
    title: "衡量标准",
    value: "",
    props: {
      type: "textarea"
    },
    validate: [{ type: "string", required: true, message: "请输入衡量标准" }]
  },
  {
    type: "select",
    field: "address",
    title: "地点",
    value: [],
    validate: [{ type: "array", required: true, message: "请选择地点" }],
    options: [
      { value: "1", label: "地点1", disabled: false },
      { value: "2", label: "地点2", disabled: false },
      { value: "3", label: "地点3", disabled: true }
    ],
    props: {
      multiple: true
    }
  },
  {
    type: "select",
    field: "invites",
    title: "邀评人",
    value: "",
    options: [
      { value: "1", label: "邀评人1", disabled: false },
      { value: "2", label: "邀评人2", disabled: false },
      { value: "3", label: "邀评人3", disabled: false }
    ],
    props: {
      multiple: true
    }
  },
  {
    type: "InputNumber",
    field: "weight",
    title: "权重",
    suffix: "%",
    value: 0
  },
  {
    type: "radio",
    field: "publicType",
    title: "目标公开",
    value: [0, 1, 2, 3],
    options: [
      { label: "公开", value: 0 },
      { label: "部分公开", value: 1 },
      { label: "不公开", value: 2 }
    ],
    control: [
      {
        handle(val) {
          return val == 1
        },
        rule: [
          {
            type: "input",
            field: "info",
            title: "公开给",
            value: ""
          }
        ]
      }
    ]
  }
])
</script>

<template>
  <div class="app-container">
    <el-card class="mb-3">
      <div class="text-slate-500 font-serif font-semibold">
        form-create 是一个可以通过 JSON
        生成具有动态渲染、数据收集、验证和提交功能的表单生成组件。支持5个UI框架，并且支持生成任何 Vue
        组件。内置20种常用表单组件和自定义组件，再复杂的表单都可以轻松搞定。
      </div>
    </el-card>
    <el-card>
      <FormCreate class="max-w-3xl mx-auto" :rule="rule" :option="options" v-model="formData" v-model:api="fApi" />
    </el-card>
  </div>
</template>
