export interface CreateRoleRequestData {
  roleCode: string
  roleName: string
}

export interface UpdateRoleRequestData {
  roleId: string
  roleCode: string
  roleName: string
}

export interface GetRoleRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
}

export interface GetRoleData {
  roleId: string
  roleCode: string
  roleName: string
  comments: string
  deleted: string
  tenantId: string
  userId: string
}

export type GetRoleResponseData = ApiResponseData<{
  list: GetRoleData[]
  total: number
}>
