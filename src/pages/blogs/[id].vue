<route>
    {
        meta: {
        layout: "empty",
        title: "Blog",
        }
    }
</route>

<script setup lang="ts">
import type { BlogData } from '@/types/blog'
import { useBlogStore } from '@/stores/blog'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()
if (!route.params.id) {
  router.push('/home')
}
const blog = ref<BlogData | null>(null)
blog.value = await blogStore.getBlogById(route.params.id as string)
</script>

<template>
  <section v-if="blog" class="mt-8 px-6 ">
    <div class="header relative">
      <p class="text-3xl font-semibold lg:max-w-[46rem] pb-2">
        {{ blog.title }}
      </p>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-4">
        <div class="meta-item">
          <label>Author:</label>
          <!-- <RouterLink :to="{ name: 'profile', params: { id: blog.userId._id } }"> -->
          <RouterLink to="/home">
            {{ blog.userId.email }}
          </RouterLink>
        </div>
        <div class="meta-item">
          <label>Category:</label>
          <RouterLink to="/home">
            {{ blog.category?.name ?? 'Uncategorized' }}
          </RouterLink>
        </div>
        <div class="meta-item">
          <label>Published: {{ blog.createdAt.split('T')[0] }}</label>
        </div>
      </div>
      <RouterLink to="/blogs/create" class="lg:absolute top-0 right-0">
        <Button class="mb-4 lg:mb-0 ">
          Create Blog
        </Button>
      </RouterLink>
      <Separator />
    </div>
    <div class="ql-snow content">
      <div class="ql-editor" v-html="blog?.content" />
    </div>
    <!-- <Comment
      v-for="item in itemComment"
      :key="item._id" :item="item"
    /> -->
  </section>
</template>

<style scoped lang="scss">
.meta-item {
    @apply flex items-center gap-2;
    label {
        @apply text-sm min-w-4 truncate;
    }
    a {
        @apply text-sm max-w-48 truncate text-primary hover:underline;
    }
}
</style>
