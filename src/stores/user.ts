import type { UserData } from '@/types'
import { fetchUserData } from '@/api/user'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserData | null>(null)

  function setUser(newUser: UserData) {
    user.value = newUser
  }
  function removeUser() {
    user.value = null
  }
  async function getUserData() {
    const data = await fetchUserData() as UserData
    setUser(data)
  }
  const isAuthenticated = computed(() => !!user.value)
  return {
    user,
    setUser,
    isAuthenticated,
    removeUser,
    getUserData,
  }
})
