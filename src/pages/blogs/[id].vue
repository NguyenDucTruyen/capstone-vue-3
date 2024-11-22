<route>
    {
        meta: {
        layout: "empty",
        title: "Blog",
        }
    }
</route>

<script setup lang="ts">
import type { BlogData, Reaction } from '@/types/blog'
import type { CommentData, CommentReply, RequestBodyComment } from '@/types/comment'
import { useBlogStore } from '@/stores/blog'
import { useCommentStore } from '@/stores/comment'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const blogStore = useBlogStore()
const commentStore = useCommentStore()

if (!route.params.id) {
  router.push('/home')
}
const blog = ref<BlogData | null>(null)
const comments = ref<CommentData[]>([])
comments.value = await commentStore.getCommentByBlogId(route.params.id as string) as CommentData[]
blog.value = await blogStore.getBlogById(route.params.id as string)

const countComment = computed(() => {
  return comments.value.reduce((count, comment) => count + comment.reply.length + 1, 0)
})
const countLike = computed(() => {
  return blog.value?.reaction.filter((reaction: Reaction) => reaction.reaction === 'like').length
})
const countDislike = computed(() => {
  return blog.value?.reaction.filter((reaction: Reaction) => reaction.reaction === 'dislike').length
})
const userReaction = computed(() => {
  const reaction = blog.value?.reaction.find((reaction: Reaction) => reaction.userId === userStore.user?._id)
  return reaction?.reaction || null
})
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
    <Separator />
    <div class="mb-4">
      <div class="flex my-4">
        <Button :variant="userReaction === 'like' ? '' : 'outline'" class="mr-2">
          <Icon name="IconThumbsUp" />
          <span class="ml-2">Like ({{ countLike }})</span>
        </Button>
        <Button :variant="userReaction === 'dislike' ? '' : 'outline'" class="mr-2">
          <Icon name="IconThumbsDown" />
          <span class="ml-2">Dislike ({{ countDislike }})</span>
        </Button>
      </div>
      <div class="flex items-center gap-2">
        <Icon name="IconComment" />
        <span>{{ countComment }} Comments</span>
      </div>
    </div>
    <!-- <Separator label="Comment Area" label-style="text-xl" class="my-4 h-1" /> -->
    <template
      v-for="item in comments"
      :key="item._id"
    >
      <Separator label="Comment" label-style=" text-lg" class="my-4 h-[2px]" />
      <CommentBox
        :comment="item"
      />
    </template>
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
