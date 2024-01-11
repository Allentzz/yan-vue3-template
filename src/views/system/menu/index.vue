<script lang="ts" setup>
import { reactive, ref, watch, computed, getCurrentInstance, onMounted } from "vue"
import { createMenuDataApi, deleteMenuDataApi, updateMenuDataApi, getMenuDataApi } from "@/api/system/menu"
import { type GetMenuData } from "@/api/system/menu/types/menu"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"

defineOptions({
  // 命名当前组件
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Menu"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
const pathPlaceholder = computed(() => {
  return formData.openType === 2 ? "请输入外链地址" : "请输入路由地址"
})
const componentPlaceholder = computed(() => {
  return formData.openType === 1 ? "请输入内链地址" : "请输入组件路径"
})
const isDirectory = (d: GetMenuData) => {
  return !!d.children?.length && !d.component
}
onMounted(() => {
  console.log(getCurrentInstance())
  // const _this = ctx
  // console.log("getCurrentInstance()中的ctx:", _this)
  // console.log("getCurrentInstance()中的proxy:", proxy)
})

const menuList = [
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
      },
      {
        id: 5,
        label: "菜单管理"
      }
    ]
  }
]

//#region 增
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = reactive<GetMenuData>({
  menuId: 0,
  parentId: 0,
  parentTitle: "",
  title: "",
  menuType: 0,
  openType: 0,
  icon: "",
  path: "",
  component: "",
  authority: "",
  sortNumber: 0,
  hide: 0,
  meta: ""
})
const formRules: FormRules = reactive({
  roleName: [{ required: true, trigger: "blur", message: "请输入角色名称" }],
  roleCode: [{ required: true, trigger: "blur", message: "请输入角色标识" }]
})
const handleCreate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      if (currentUpdateId.value === undefined) {
        createMenuDataApi(formData)
          .then(() => {
            ElMessage.success("新增成功")
            getMenuDataApi({
              currentPage: paginationData.currentPage,
              size: paginationData.pageSize
            })
          })
          .finally(() => {
            dialogVisible.value = false
          })
      } else {
        updateMenuDataApi(formData)
          .then(() => {
            ElMessage.success("修改成功")
            getMenuDataApi({
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
  formData.menuId = 0
  formData.parentId = 0
  formData.parentTitle = ""
  formData.title = ""
  formData.menuType = 0
  formData.openType = 0
  formData.icon = ""
  formData.path = ""
  formData.component = ""
  formData.authority = ""
  formData.sortNumber = 0
  formData.hide = 0
  formData.meta = ""
}
//#endregion

//#region 删
const handleDelete = (row: GetMenuData) => {
  ElMessageBox.confirm(`正在删除菜单：${row.title}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteMenuDataApi(row.menuId).then(() => {
      ElMessage.success("删除成功")
      getMenuDataApi({
        currentPage: paginationData.currentPage,
        size: paginationData.pageSize
      })
    })
  })
}
//#endregion

//#region 改
const currentUpdateId = ref<undefined | number>(undefined)
const handleUpdate = (row: GetMenuData) => {
  currentUpdateId.value = row.menuId
  formData.title = row.title
  formData.parentTitle = row.parentTitle
  formData.path = row.path
  formData.component = row.component
  formData.menuType = row.menuType
  formData.openType = row.openType
  formData.sortNumber = row.sortNumber
  formData.hide = row.hide
  dialogVisible.value = true
}
const handleAddCurent = (row: GetMenuData) => {
  formData.parentTitle = row.title
  dialogVisible.value = true
}
//#endregion

//#region 查
const MenuData = ref<GetMenuData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  title: "",
  path: "",
  authority: ""
})
const getMenuData = () => {
  loading.value = true
  getMenuDataApi({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize
  })
    .then((res) => {
      // console.log(res)
      paginationData.total = res.data.total
      MenuData.value = res.data.list
    })
    .catch(() => {
      console.log(1)

      MenuData.value = []
    })
    .finally(() => {
      console.log(2)

      loading.value = false
    })
}
const handleSearch = () => {
  paginationData.currentPage === 1 ? getMenuData() : (paginationData.currentPage = 1)
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getMenuData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="菜单名称">
          <el-input v-model="searchData.title" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="phone" label="菜单地址">
          <el-input v-model="searchData.path" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="phone" label="权限标识">
          <el-input v-model="searchData.authority" placeholder="请输入" />
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
            <el-button type="primary" :icon="RefreshRight" circle @click="getMenuData" />
          </el-tooltip>
        </div>
      </div>
      <div class="Menu-wrapper">
        <el-table :data="MenuData" :row-key="(row) => row.menuId">
          <el-table-column type="index" width="50" align="center" />
          <el-table-column prop="title" label="菜单名称" align="center" />
          <el-table-column prop="path" label="路由地址" align="center" />
          <el-table-column prop="component" label="组件路径" align="center" />
          <el-table-column prop="authority" label="权限标识" align="center" />
          <el-table-column prop="sortNumber" label="排序" align="center" />
          <el-table-column prop="hide" label="可见" align="center">
            <template #default="scope">
              {{ scope.row.hide ? "否" : "是" }}
            </template>
          </el-table-column>
          <el-table-column prop="menuType" label="类型" align="center">
            <template #default="scope">
              <el-tag v-if="isDirectory(scope.row)" type="success">目录</el-tag>
              <el-tag v-else>菜单</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createdTime" label="创建时间" align="center" />
          <el-table-column fixed="right" label="操作" width="250" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleAddCurent(scope.row)">添加</el-button>
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
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
      :title="currentUpdateId === undefined ? '添加菜单' : '修改菜单'"
      @close="resetForm"
      width="35%"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="上级菜单:">
              <el-tree-select style="width: 100%" v-model="formData.parentTitle" :data="menuList" />
            </el-form-item>
            <el-form-item label="菜单名称:" prop="title">
              <el-input clearable v-model="formData.title" placeholder="请输入菜单名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单类型:">
              <!-- @change="onMenuTypeChange" -->
              <el-radio-group v-model="formData.menuType">
                <el-radio :label="0">目录</el-radio>
                <el-radio :label="1">菜单</el-radio>
                <el-radio :label="2">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="打开方式:">
              <!-- @change="onOpenTypeChange" -->
              <el-radio-group
                v-model="formData.openType"
                :disabled="formData.menuType === 0 || formData.menuType === 2"
              >
                <el-radio :label="0">组件</el-radio>
                <el-radio :label="1">内链</el-radio>
                <el-radio :label="2">外链</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="margin: 6px 0 28px 0">
          <el-divider />
        </div>
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item name="path">
              <template v-slot:label>
                <el-tooltip
                  v-if="formData.openType === 2"
                  placement="top"
                  content="需要以`http://`、`https://`、`//`开头"
                >
                  <i class="el-icon-_question" />
                </el-tooltip>
                <span>
                  {{ formData.openType === 2 ? " 外链地址:" : " 路由地址:" }}
                </span>
              </template>
              <el-input
                clearable
                v-model="formData.path"
                :disabled="formData.menuType === 2"
                :placeholder="pathPlaceholder"
              />
            </el-form-item>
            <el-form-item name="component">
              <template v-slot:label>
                <el-tooltip
                  v-if="formData.openType === 1"
                  placement="top"
                  content="需要以`http://`、`https://`、`//`开头"
                >
                  <i class="el-icon-_question" />
                </el-tooltip>
                <span>
                  {{ formData.openType === 1 ? " 内链地址:" : " 组件路径:" }}
                </span>
              </template>
              <el-input
                clearable
                v-model="formData.component"
                :disabled="formData.menuType === 0 || formData.menuType === 2 || formData.openType === 2"
                :placeholder="componentPlaceholder"
              />
            </el-form-item>
            <el-form-item label="是否展示:">
              <el-switch
                :active-value="0"
                :inactive-value="1"
                v-model="formData.hide"
                :disabled="formData.menuType === 2"
              />
              <el-tooltip placement="top" content="选择不展示只注册路由不显示在侧边栏, 比如添加页面应该选择不展示">
                <i class="el-icon-_question" style="vertical-align: middle; margin-left: 8px" />
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限标识:">
              <el-input
                clearable
                v-model="formData.authority"
                placeholder="请输入权限标识"
                :disabled="formData.menuType === 0 || (formData.menuType === 1 && formData.openType === 2)"
              />
            </el-form-item>
            <el-form-item label="排序号:" prop="sortNumber">
              <el-input-number
                :min="0"
                v-model="formData.sortNumber"
                placeholder="请输入排序号"
                controls-position="right"
                class="ele-fluid ele-text-left"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">确认</el-button>
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

.Menu-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
