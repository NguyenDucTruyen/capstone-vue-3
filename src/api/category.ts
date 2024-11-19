import { $get } from '@/api/axios'

export async function apiGetCategories() {
  return $get('/categories')
}
