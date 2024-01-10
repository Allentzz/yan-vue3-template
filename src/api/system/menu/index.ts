import { request } from "@/utils/service"
import type * as Menu from "./types/menu"

/** 增 */
export function createMenuDataApi(data: Menu.CreateMenuRequestData) {
  return request({
    url: "menu",
    method: "post",
    data
  })
}

/** 删 */
export function deleteMenuDataApi(id: number) {
  return request({
    url: `menu/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateMenuDataApi(data: Menu.UpdateMenuRequestData) {
  return request({
    url: "menu",
    method: "put",
    data
  })
}

/** 查 */
export function getMenuDataApi(params: Menu.GetMenuRequestData) {
  return request<Menu.GetMenuResponseData>({
    url: "/system/menu",
    method: "get",
    params
  })
}
