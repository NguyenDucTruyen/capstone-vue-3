<script setup lang="ts">
import type { BlogData, ResponseBlogData } from '@/utils/types'
import { useBlogStore } from '@/stores/blog'

const route = useRoute()
const blogStore = useBlogStore()

const isLoading = ref(false)
const blogs = ref<ResponseBlogData>()
const query = ref({
  page: 1,
  limit: 5,
})
if (!route.query.page) {
  query.value.page = 1
}

watch(route, async (newVal) => {
  query.value.page = Number(newVal.query.page)
  isLoading.value = true
  blogs.value = await blogStore.getBlogs({ params: query.value }) as ResponseBlogData
  isLoading.value = false
}, { immediate: true })
</script>

<template>
  <div v-if="isLoading" class="flex w-full p-8 justify-center items-center">
    <Icon name="IconLoading" />
  </div>
  <div v-else class="flex flex-col p-6 bg-muted rounded-lg flex-1">
    <div
      v-for="blog in blogs?.docs"
      :key="blog._id"
      class="blog w-full"
    >
      <BlogCard
        :image-link="blog.blogImage ?? null"
        :author="`${blog.userId?.firstName ?? ''} ${
          blog.userId?.lastName ?? ''
        }`"
        :like="
          blog.reaction?.filter((e) => {
            return e.reaction === 'like'
          }).length
        "
        :dislike="
          blog.reaction?.filter((e) => {
            return e.reaction === 'dislike'
          }).length
        "
        :title="blog.title"
        :time="blog.createdAt"
        :category="blog.category?.name ?? ''"
      />
    </div>
    <PaginationTable
      :total="blogs?.totalDocs" 
      :current-page="blogs?.page"
      :items-per-page="query.limit"
    />
  </div>
</template>
