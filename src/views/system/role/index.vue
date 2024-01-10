<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { updateRoleDataApi, getRoleDataApi, createRoleDataApi, deleteRoleDataApi } from "@/api/system/role"
import { type GetRoleData } from "@/api/system/role/types/role"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"

defineOptions({
  // 命名当前组件
  name: "Role"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const defaultProps = {
  children: "children",
  label: "label"
}
const data = [
  {
    id: 1,
    label: "首页"
  },
  {
    id: 2,
    label: "系统管理",
    children: [
      {
        id: 3,
        label: "用户管理"
      },
      {
        id: 4,
        label: "角色管理"
      }
    ]
  }
]
// #region 权限弹窗
const dialogVisibileRole = ref<boolean>(false)
const handleRoleUpdate = (row: GetRoleData) => {
  dialogVisibileRole.value = true
  console.log(row)
}
// #endregion

//#region 增
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive({
  roleName: "",
  roleCode: ""
})
const formRules: FormRules = reactive({
  roleName: [{ required: true, trigger: "blur", message: "请输入角色名称" }],
  roleCode: [{ required: true, trigger: "blur", message: "请输入角色标识" }]
})
const handleCreate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        createRoleDataApi(formData)
          .then(() => {
            ElMessage.success("新增成功")
            getRoleDataApi({
              currentPage: paginationData.currentPage,
              size: paginationData.pageSize
            })
          })
          .finally(() => {
            dialogVisible.value = false
          })
      } else {
        updateRoleDataApi({
          roleId: currentUpdateId.value,
          roleName: formData.roleName,
          roleCode: formData.roleCode
        })
          .then(() => {
            ElMessage.success("修改成功")
            getRoleDataApi({
              currentPage: paginationData.currentPage,
              size: paginationData.pageSize
            })
          })
          .finally(() => {
            dialogVisible.value = false
          })
      }
    } else {
      console.error("表单校验不通过", fields)
    }
  })
}
const resetForm = () => {
  currentUpdateId.value = undefined
  formData.roleName = ""
  formData.roleCode = ""
}
//#endregion

//#region 删
const handleDelete = (row: GetRoleData) => {
  ElMessageBox.confirm(`正在删除角色：${row.roleName}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteRoleDataApi(row.roleId).then(() => {
      ElMessage.success("删除成功")
      getRoleDataApi({
        currentPage: paginationData.currentPage,
        size: paginationData.pageSize
      })
    })
  })
}
//#endregion

//#region 改
const currentUpdateId = ref<undefined | string>(undefined)
const handleUpdate = (row: GetRoleData) => {
  currentUpdateId.value = row.roleId
  formData.roleName = row.roleName
  formData.roleCode = row.roleCode
  dialogVisible.value = true
}
//#endregion

//#region 查
const RoleData = ref<GetRoleData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  roleCode: "",
  roleName: ""
})
const getRoleData = () => {
  loading.value = true
  getRoleDataApi({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize
  })
    .then((res) => {
      console.log(res)
      paginationData.total = res.data.total
      RoleData.value = res.data.list
    })
    .catch(() => {
      console.log(1)

      RoleData.value = []
    })
    .finally(() => {
      console.log(2)

      loading.value = false
    })
}
const handleSearch = () => {
  paginationData.currentPage === 1 ? getRoleData() : (paginationData.currentPage = 1)
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getRoleData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="角色名">
          <el-input v-model="searchData.roleName" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="phone" label="角色标识">
          <el-input v-model="searchData.roleCode" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">添加</el-button>
          <el-button type="danger" :icon="Delete">批量删除</el-button>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="getRoleData" />
          </el-tooltip>
        </div>
      </div>
      <div class="Role-wrapper">
        <el-table :data="RoleData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="roleName" label="角色名" align="center" />
          <el-table-column prop="roleCode" label="角色标识" align="center" />
          <el-table-column prop="createTime" label="创建时间" align="center" />

          <el-table-column fixed="right" label="操作" width="250" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
              <el-button type="warning" text bg size="small" @click="handleRoleUpdate(scope.row)">分配权限</el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 新增/修改 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentUpdateId === undefined ? '新增角色' : '修改角色'"
      @close="resetForm"
      width="30%"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="roleName" label="角色名称">
          <el-input v-model="formData.roleName" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="roleCode" label="角色标识">
          <el-input v-model="formData.roleCode" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">确认</el-button>
      </template>
    </el-dialog>
    <!-- 权限管理 -->
    <el-dialog v-model="dialogVisibileRole" title="分配权限" @close="resetForm" width="30%">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[1, 2, 3, 4]"
        :default-checked-keys="[1, 2, 3, 4]"
        :props="defaultProps"
      />
      <template #footer>
        <el-button @click="dialogVisibileRole = false">取消</el-button>
        <el-button type="primary" @click="() => {}">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.Role-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
@/api/system/role/types/role
