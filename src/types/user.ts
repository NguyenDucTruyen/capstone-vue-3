export interface UserData {
  _id: string
  firstName: string
  lastName: string
  email: string
  isActive: string
  roleName: string
  createdAt: string
  updatedAt: string
  dayOfBirth: string
  gender: boolean
  phone: number
  profileImage: string
}
export interface RequestUpdateUser {
  firstName: string
  lastName: string
  gender: boolean
  dayOfBirth: string
  phone: number
  profileImage: string
}

export interface ResponseUpdateUser {
  message: string
  user: UserData
}
export interface ResponseListUser {
  docs: UserData[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
}
export const isActiveEnum = {
  BANNER: 'banner',
  ACTIVE: 'active',
  BLOCKPOSTING: 'blockposting',
  DELETE: 'delete',
  BLOCKCOMMENT: 'blockcomment',
}
