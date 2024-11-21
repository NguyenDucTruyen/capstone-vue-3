import type { UserData } from './auth'

export interface RequestCreateBlog {
  category: string
  title: string
  content: string
  blogImages: string[]
}

export interface Category {
  _id: string
  name: string
  status: string
  slug: string
  createdAt: string
  updatedAt: string
  description: string
}

export interface BlogData {
  _id: string
  userId: UserData
  category: Category
  title: string
  content: string
  blogImage: any[]
  status: string
  reactionCount: number
  deleted: boolean
  reaction: any[]
  createdAt: string
  updatedAt: string
}

export interface ResponseBlogData {
  docs: BlogData[]
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage: number | null
  page: number
  pagingCounter: number
  prevPage: number | null
  totalDocs: number
  totalPages: number
}
