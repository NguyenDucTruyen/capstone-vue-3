import type { RequestUpdateUser } from '@/types'
import { $get, $post, $put } from '@/api/axios'

export async function apiGetMe() {
  return $get('/users/me')
}
export async function apiGetUserData(userId: string) {
  return $get(`/users/${userId}`)
}
export async function apiUpdateUserData(id: string, data: RequestUpdateUser) {
  return $put(`/users/${id}`, data)
}
export async function apiChangePassword(data: { password: string, newPassword: string, confirmNewPassword: string }) {
  return $post('/users/changePassword', data)
}
export async function apiGetBlogsByUser(userId: string, config: any) {
  return $get(`/users/${userId}/blogs`, config)
}
