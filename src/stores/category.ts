import type { Category } from '@/utils/types'
import { apiGetCategories } from '@/api/category'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])

  const fetchCategories = async () => {
    const data = await apiGetCategories()
    categories.value = data
  }

  return {
    categories,
    fetchCategories,
  }
})
