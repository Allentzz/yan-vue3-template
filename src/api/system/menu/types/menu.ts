export interface CreateMenuRequestData {
  menuId: number
  parentId: number
  parentTitle: string
  title: string
  menuType: number
  openType: number
  icon: string
  path: string
  component: string
  authority: string
  sortNumber: number
  hide: number
  meta: string
  createTime?: string
}

export interface UpdateMenuRequestData {
  menuId: number
  parentId: number
  parentTitle: string
  title: string
  menuType: number
  openType: number
  icon: string
  path: string
  component: string
  authority: string
  sortNumber: number
  hide: number
  meta: string
  createTime?: string
}

export interface GetMenuRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
}

export interface GetMenuData {
  menuId: number
  parentId: number
  parentTitle: string
  title: string
  menuType: number
  openType: number
  icon: string
  path: string
  component: string
  authority: string
  sortNumber: number
  hide: number
  meta: string
  createTime?: string
  children?: GetMenuData[]
}

export type GetMenuResponseData = ApiResponseData<{
  list: GetMenuData[]
  total: number
}>
