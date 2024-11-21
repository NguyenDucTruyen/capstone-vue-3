import type { RequestCreateBlog, ResponseBlogData } from '@/utils/types/blog'
import { apiCreateBlog, apiGetBlogs } from '@/api/blog'
import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', () => {
  function getBlogs(config: any) {
    return apiGetBlogs(config)
  }
  function createBlog(data: RequestCreateBlog) {
    return apiCreateBlog(data)
  }
  return {
    getBlogs,
    createBlog,
  }
})
