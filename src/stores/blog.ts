import type { BlogData, RequestCreateBlog, ResponseBlogData } from '@/types/blog'
import { apiCreateBlog, apiGetBlogById, apiGetBlogs } from '@/api/blog'
import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', () => {
  function getBlogs(config: any): Promise<ResponseBlogData> {
    return apiGetBlogs(config)
  }
  function createBlog(data: RequestCreateBlog) {
    return apiCreateBlog(data)
  }
  function getBlogById(id: string): Promise<BlogData> {
    return apiGetBlogById(id)
  }
  return {
    getBlogs,
    createBlog,
    getBlogById,
  }
})
