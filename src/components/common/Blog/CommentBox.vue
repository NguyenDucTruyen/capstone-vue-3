<script setup lang="ts">
import type { CommentData } from '@/types/comment'
import { useUserStore } from '@/stores/user'

interface Props {
  comment: CommentData | null
}

const props = defineProps<Props>()

const itemComment = ref(props.comment)
</script>

<template>
  <Comment
    :item="itemComment"
  />
  <div class="flex flex-col pl-12 mb-6">
      <template
      v-for="commentReply in itemComment?.reply"
      :key="commentReply._id"
      >
      <Separator label="Comment reply" class="my-4" />
      <Comment
        :item="commentReply"
      />
    </template>
  </div>
</template>
