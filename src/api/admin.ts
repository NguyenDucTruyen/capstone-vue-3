import type { isActiveEnum } from '@/types'
import { $delete, $get, $post, $put } from './axios'

export async function apiAdminGetUsers(config: any) {
  return $get('/users', config)
}
export async function apiAdminChangeStatus(userId: string, status: string) {
  return $post(`/users/${userId}/changeStatus`, {
    isActive: status,
  })
}
export async function apiDeleteUser(userId: string) {
  return $delete(`/users/${userId}`)
}
