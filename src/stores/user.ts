import type { RequestUpdateUser, ResponseBlogData, ResponseUpdateUser, UserData } from '@/types'
import { apiChangePassword, apiGetBlogsByUser, apiGetMe, apiGetUserData, apiUpdateUserData } from '@/api/user'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserData | null>(null)

  function setUser(newUser: UserData) {
    user.value = newUser
  }
  function removeUser() {
    user.value = null
  }
  async function getMe() {
    const data = await apiGetMe() as UserData
    setUser(data)
  }
  async function getUserData(id: string): Promise<UserData> {
    return await apiGetUserData(id) as UserData
  }
  async function changePassword(data: { password: string, newPassword: string, confirmNewPassword: string }) {
    await apiChangePassword(data)
  }
  async function updateUserData(id: string, data: RequestUpdateUser): Promise<ResponseUpdateUser> {
    return await apiUpdateUserData(id, data)
  }
  async function getBlogsByUser(userId: string, config: any): Promise<ResponseBlogData> {
    return await apiGetBlogsByUser(userId, config)
  }
  const isAuthenticated = computed(() => !!user.value)
  return {
    user,
    getMe,
    setUser,
    removeUser,
    isAuthenticated,
    changePassword,
    getUserData,
    updateUserData,
    getBlogsByUser,
  }
})
