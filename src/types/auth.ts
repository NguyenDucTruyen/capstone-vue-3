export interface LoginData {
  email: string
  password: string
}
export interface RegisterData {
  email: string
  password: string
  confirmPassword: string
}
export interface EmailData {
  email: string
}

export interface ResetPasswordData {
  password: string
  confirmPassword: string
  token: string
}

export interface UserData {
  _id: string
  firstName: string
  lastName: string
  email: string
  isActive: string
  roleName: string
  createdAt: string
  updatedAt: string
  dayOfBirth: Date
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
