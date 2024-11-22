<script setup lang="ts">
import type { CommentData } from '@/types/comment'
import { useUserStore } from '@/stores/user'

interface Emit {
  (event: 'updateComment', data: any): void
  (event: 'comment', data: any): void
}

interface Props {
  item: CommentData | null
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const userStore = useUserStore()
const edit = defineModel('edit')

const itemComment = ref(props.item)
const title = ref('')
const quill = ref(null)
const focus = ref(false)
const enableSave = ref(false)

const toolbar = [
  [{ header: [false, 1, 2, 3, 4, 5, 6] }],
  ['bold', 'italic', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['blockquote', 'code-block'],
  ['link', 'image'],
  ['clean'],
]
function switchToEditMode() {
  if (itemComment.value?.content) {
    title.value = itemComment.value.content
  }
  edit.value = true
}
function handleFocus() {
  focus.value = true
}
function handleBlur() {
  focus.value = false
}
function save() {
  if (itemComment.value) {
    itemComment.value.content = title.value
    emit('updateComment', itemComment.value)
    edit.value = false
  }
  else {
    emit('comment', title.value)
    title.value = ''
    edit.value = false
  }
}
function cancelChange() {
  title.value = itemComment.value?.content || ''
  edit.value = false
}
watch(edit, (val) => {
  if (val) {
    nextTick(() => {
      quill.value?.focus()
    })
  }
})
watch(title, async () => {
  await nextTick()
  if (!quill.value) {
    return
  }
  enableSave.value = quill.value.getText().trim() !== ''
})
function getDate(date: string) {
  const dmy = date.split('T')[0]
  const times = date.split('T')[1].split(':')
  return `${dmy}, ${times[0]}:${times[1]}`
}
</script>

<template>
  <div class="comment-editor">
    <img
      v-if="itemComment"
      v-lazy="itemComment.userId.profileImage ?? 'https://static.vecteezy.com/system/resources/thumbnails/024/983/914/small_2x/simple-user-default-icon-free-png.png'"
      alt=""
      class="comment-creator"
    >

    <!-- Avatar useUserStore -->

    <div v-if="!edit" class="preview-comment">
      <template v-if="itemComment">
        <div class="comment-author">
          <span class="comment-author-name max-w-60 truncate">{{ itemComment.userId.email }}</span>
          <span class="comment-author-time">{{ getDate(itemComment.createdAt) }}</span>
        </div>
        <div class="preview-comment-body ql-snow">
          <div class="content ql-editor" v-html="itemComment.content" />
          <div v-if="true" class="preview-comment-body-action">
            <!-- Check authorization here -->
            <Button v-if="itemComment.userId._id === userStore.user?._id" variant="link" type="info" class="file-action relative" @click="switchToEditMode">
              Edit
            </Button>
            <Button v-if="itemComment.reply" variant="link" type="info" class="file-action relative">
              Write a reply
            </Button>
          </div>
        </div>
      </template>
      <div v-else class="preview-comment-placeholder" @click="switchToEditMode()">
        Viết bình luận...
      </div>
    </div>
    <div v-else>
      <div class="editor-container" :class="{ focus }">
        <quill-editor
          ref="quill"
          v-model:content="title"
          content-type="html"
          :toolbar="toolbar"
          placeholder="Viết bình luận..."
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
      <div class="editor-footer">
        <Button :disabled="!enableSave" @click="save">
          Lưu
        </Button>
        <Button v-if="itemComment" variant="secondary" type="info" @click="cancelChange">
          Hủy bỏ
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-editor {
  position: relative;
  padding-left: 40px;
  margin-bottom: 8px;
}
.preview-comment-placeholder {
  padding: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: var(--ds-shadow-raised, 0px 1px 1px #091e4240, 0px 0px 1px #091e424f);
  border-radius: 8px;
}
.preview-comment-placeholder:hover {
  box-shadow: var(--ds-shadow-raised, 0px 1px 1px #091e4240, 0px 0px 1px #091e424f);
  cursor: pointer;
}
.comment-author {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.comment-author-name {
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  margin-right: 8px;
}
.comment-author-time {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}
.comment-creator {
  position: absolute;
  left: 0;
  top: 4px;
  object-fit: contain;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.preview-comment-body-action {
  margin-top: 4px;
  display: flex;
}

.file-action::before {
  @apply absolute top-2 left-0 text-primary;
  content: '•';
}
.editor-footer {
  @apply mt-2 gap-2 flex;
}
.editor-container {
  border-radius: 2px;
  box-shadow: 0 0 0 1px #dbdbdb;
  min-height: 56px;
}
.editor-container.focus {
  box-shadow: 0 0 0 2px hsl(var(--primary));
}
.ql-toolbar.ql-snow {
  border: none;
  border-radius: 2px 2px 0 0;
}
.ql-editor.content {
  padding: 0;
  padding: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: var(--ds-shadow-raised, 0px 1px 1px #091e4240, 0px 0px 1px #091e424f);
  border-radius: 8px;
}

:deep() {
  .ql-container {
    font-size: 14px;
    line-height: 20px;
  }
  .ql-toolbar {
    border: none;
    border-bottom: 2px solid #dfdfdf;
  }
  .ql-container.ql-snow {
    border: none;
  }
  .ql-container.ql-snow .ql-editor {
    min-height: 56px;
  }
  .button-confirm-delete-comment {
    @apply w-full mt-4;
  }
  .ql-snow.ql-toolbar button,
  .ql-toolbar.ql-snow .ql-picker-label {
    @apply rounded-sm;
  }
  .ql-snow.ql-toolbar button.ql-active {
    color: #333 !important;
    background-color: #e9ecf1;
  }
}
</style>
