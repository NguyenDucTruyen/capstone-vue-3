<script setup lang="ts">
import type { CommentData } from '@/types/comment'
import { useUserStore } from '@/stores/user'

interface Emit {
  (event: 'updateComment', data: CommentData): void
  (event: 'updateCommentReply', data: CommentData): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emit>()

interface Props {
  comment: CommentData | null
}
const itemComment = ref(props.comment)
function hanldeEmitUpdateComment(data: CommentData) {
  emit('updateComment', data)
}
function hanldeEmitUpdateCommentReply(data: CommentData) {
  emit('updateCommentReply', data)
}
</script>

<template>
  <Comment
    :item="itemComment"
    @update-comment="hanldeEmitUpdateComment"
  />
  <div class="flex flex-col pl-12 mb-6">
    <template
      v-for="commentReply in itemComment?.reply"
      :key="commentReply._id"
    >
      <Separator label="Comment reply" class="my-4" />
      <Comment
        :item="commentReply"
        @update-comment="hanldeEmitUpdateComment"
      />
    </template>
  </div>
</template>
