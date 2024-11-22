<script setup lang="ts">
import type { BlogData, ResponseBlogData } from '@/types'
import { useBlogStore } from '@/stores/blog'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

const isLoading = ref(true)
const blogs = ref<ResponseBlogData | null>()
const query = ref({
  page: 1,
  limit: 5,
})
if (!route.query.page) {
  router.push({ query: { page: 1 } })
  query.value.page = 1
}

watch(route, async (newVal) => {
  query.value.page = Number(newVal.query.page)
  blogs.value = null
  isLoading.value = true
  blogs.value = await blogStore.getBlogs({ params: query.value }) as ResponseBlogData
  isLoading.value = false
}, { immediate: true })
</script>

<template>
  <div v-show="isLoading" class="flex w-full p-8 justify-center items-center">
    <Icon name="IconLoading" />
  </div>
  <div v-if="blogs?.docs" class="flex flex-col p-6 bg-muted rounded-lg flex-1">
    <div
      v-for="blog in blogs?.docs"
      :key="blog._id"
      class="blog w-full"
    >
      <BlogCard
        :value="blog"
        :category="blog.category?.name ?? 'Uncategorized'"
        @click="$router.push(`/blogs/${blog._id}`)"
      />
    </div>
    <PaginationTable
      :total="blogs?.totalDocs"
      :current-page="blogs?.page"
      :items-per-page="query.limit"
    />
  </div>
</template>
