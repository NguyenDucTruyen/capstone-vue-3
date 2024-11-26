import type { BlogData, RequestCreateBlog, ResponseBlogData } from '@/types'
import { apiCreateBlog, apiGetBlogById, apiGetBlogs, apiGetNewBlogs, apiGetPopularBlogs } from '@/api/blog'
import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', () => {
  function getBlogs(config: any): Promise<ResponseBlogData> {
    return apiGetBlogs(config)
  }
  function getNewBlogs(config: any): Promise<ResponseBlogData> {
    return apiGetNewBlogs(config)
  }
  function getPopularBlogs(config: any): Promise<ResponseBlogData> {
    return apiGetPopularBlogs(config)
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
    getNewBlogs,
    getPopularBlogs,
  }
})
