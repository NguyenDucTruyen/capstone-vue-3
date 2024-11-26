import { apiAdminChangeStatus, apiAdminGetUsers, apiDeleteUser } from '@/api/admin'
import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', () => {
  async function getUsers(config: any) {
    return await apiAdminGetUsers(config)
  }
  async function changeStatus(id: string, status: string) {
    return await apiAdminChangeStatus(id, status)
  }

  async function deleteUser(id: string) {
    return await apiDeleteUser(id)
  }
  return {
    getUsers,
    changeStatus,
    deleteUser,
  }
})
