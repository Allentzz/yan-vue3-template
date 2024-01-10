import { request } from "@/utils/service"
import type * as Role from "./types/role"

/** 增 */
export function createRoleDataApi(data: Role.CreateRoleRequestData) {
  return request({
    url: "role",
    method: "post",
    data
  })
}

/** 删 */
export function deleteRoleDataApi(id: string) {
  return request({
    url: `role/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateRoleDataApi(data: Role.UpdateRoleRequestData) {
  return request({
    url: "role",
    method: "put",
    data
  })
}

/** 查 */
export function getRoleDataApi(params: Role.GetRoleRequestData) {
  return request<Role.GetRoleResponseData>({
    url: "/system/role",
    method: "get",
    params
  })
}
