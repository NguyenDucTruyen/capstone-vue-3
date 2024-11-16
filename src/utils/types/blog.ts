import type { UserData } from './auth'

export interface Category {
  _id: string
  name: string
  status: string
  slug: string
  createdAt: string
  updatedAt: string
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
