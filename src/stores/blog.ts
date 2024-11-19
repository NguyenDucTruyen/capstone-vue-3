import { apiGetBlogs } from '@/api/blog'
import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', () => {
  function getBlogs(config: any) {
    return apiGetBlogs(config)
  }
  return {
    getBlogs,
  }
})
