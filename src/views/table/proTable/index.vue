<script lang="ts" setup>
import { deleteTableDataApi, getTableDataApi } from "@/api/table/index"
import ProTable, { ColumnProps } from "@/components/ProTable/index.vue"
import ProForm from "@/components/ProForm/index.vue"
import { onMounted, reactive, Ref, ref, toRefs } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"

interface User {
  id: string
  username: string
  password: string
  email: string
  roles: string
  phone: string
  createTime: string
  status: boolean
}

const sourceData = ref([] as any[])
const columns: Ref<ColumnProps<User>[]> = ref([
  {
    label: "姓名",
    prop: "username",
    align: "center",
    search: true,
    formProp: {
      required: true,
      el: "input"
    }
  },
  {
    label: "角色",
    prop: "roles",
    align: "center",
    search: false
  },
  {
    label: "手机号",
    prop: "phone",
    align: "center",
    search: true,
    formProp: {
      required: true,
      el: "input"
    }
  },
  {
    label: "邮箱",
    prop: "email",
    align: "center",
    search: false,
    formProp: {
      required: true,
      el: "input"
    }
  },
  {
    label: "创建日期",
    prop: "createTime",
    align: "center",
    search: false,
    formProp: {
      required: true,
      el: "date-picker",
      "value-format": "YYYY-MM-DD"
    }
  },
  {
    label: "状态",
    prop: "status",
    align: "center",
    search: false,
    formProp: {
      required: true,
      el: "switch",
      key: "status",
      source: sourceData
    }
  },
  {
    label: "操作",
    prop: "action",
    align: "center"
  }
])

const state = reactive({
  dialogModel: {
    dialogVisiable: false,
    title: ""
  },
  formModel: {} as User,
  proFormRef: {} as any
})

const { dialogModel, formModel, proFormRef } = toRefs(state)

// 新增表单的配置项 与 校验规则
const formColumns = ref(columns.value.filter((item) => item.formProp && !item.hideInForm))
const rules = ref({} as any)
formColumns.value.forEach((item: any) => {
  rules.value[item.formProp.key || item.prop] = [
    {
      required: item.formProp.required,
      message: item.formProp.el === "input" ? `请输入${item.label}` : `请选择${item.label}`,
      trigger: "blur"
    }
  ]
})
//#region 增
const handleAdd = () => {
  dialogModel.value.title = "新增"
  dialogModel.value.dialogVisiable = true
}

const dialogConfirm = () => {
  const form = proFormRef.value.form || proFormRef.value
  form.validate(async (res: boolean | any) => {
    if (res) {
      console.log("proform res ===", res, formModel.value)
    }
  })
}
//#endregion

//#region 删
const handleDelete = (user: User) => {
  ElMessageBox.confirm(`正在删除用户：${user.username}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteTableDataApi(user.id).then(() => {
      ElMessage.success("删除成功")
      // getTableData()
    })
  })
}
//#endregion

//#region 改
const handleEdit = (user: User) => {
  dialogModel.value.title = "编辑"
  formModel.value = user
  dialogModel.value.dialogVisiable = true
}
//#endregion

const resetForm = () => {
  formModel.value.username = ""
  formModel.value.password = ""
  formModel.value.phone = ""
  formModel.value.email = ""
  formModel.value.roles = ""
  formModel.value.createTime = ""
  formModel.value.status = false
}

onMounted(() => {
  setTimeout(() => {
    // select 数据 测试
    sourceData.value = [
      { label: "在线", value: 1 },
      { label: "离线", value: 0 }
    ]
  }, 2000)
})
</script>

<template>
  <div class="app-container">
    <pro-table stripe :columns="columns" :request-func="getTableDataApi" :params="{}">
      <!-- 头部按钮 -->
      <template #tableHeader>
        <el-button @click="handleAdd" type="primary">新增</el-button>
      </template>

      <template #roles="scope: { row: User | any }">
        <el-tag v-if="scope.row.roles === 'admin'" effect="plain">admin</el-tag>
        <el-tag v-else type="warning" effect="plain">{{ scope.row.roles }}</el-tag>
      </template>
      <!-- 自定义单元格 -->
      <template #phone="scope: { row: User | any }">
        <el-tag>{{ scope.row.phone }}</el-tag>
      </template>

      <template #status="scope: { row: User | any }">
        <el-tag :type="scope.row.status ? 'success' : 'danger'">{{ scope.row.status ? "启用" : "禁用" }}</el-tag>
      </template>
      <!-- 操作 -->
      <template #action="scope: { row: User | any }">
        <el-button type="primary" size="small" round @click="() => handleEdit(scope.row)">修改</el-button>
        <el-button type="danger" size="small" round @click="() => handleDelete(scope.row)">删除</el-button>
      </template>
    </pro-table>
    <el-dialog v-model="dialogModel.dialogVisiable" :width="500" :title="dialogModel.title" @close="resetForm">
      <pro-form
        ref="proFormRef"
        :columns="formColumns"
        :form-data="formModel"
        :vertical="true"
        :rules="rules"
        :label-width="'110px'"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogModel.dialogVisiable = false">取消</el-button>
          <el-button type="primary" @click="dialogConfirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
