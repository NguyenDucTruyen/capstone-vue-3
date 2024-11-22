<script setup lang="ts">
interface Emit {
  (event: 'updateComment', data: any): void
  (event: 'comment', data: any): void
}

interface Props {
  item: any
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

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
    emit('updateComment', itemComment.value.data)
    edit.value = false
  }
  else {
    emit('comment', title.value)
    title.value = ''
    edit.value = false
  }
}
function cancelChange() {
  title.value = itemComment.value.content
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
    <!-- <img
      v-if="itemComment"
      :src="itemComment.memberCreator.avatarUrl"
      alt=""
      class="comment-creator"
    >
    <img
      v-else
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYZ8ZtmkjFdGFK0_FJf-dSL8E7laGwRv33OuZ_IlGMAjrASwhzoNcRwdfLPO2OkKsNyts&usqp=CAU"
      alt=""
      class="comment-creator"
    > -->
    <!-- Avatar useUserStore -->

    <div v-if="!edit" class="preview-comment">
      <div v-if="itemComment" class="comment-author">
        <span class="comment-author-name">{{ itemComment?.userId?.firstName || 'Anonymous' }}</span>
        <span class="comment-author-time">{{ getDate(itemComment.updatedAt) }}</span>
      </div>
      <div v-if="itemComment" class="preview-comment-body ql-snow">
        <div class="content ql-editor" v-html="itemComment.content" />
        <div v-if="true" class="preview-comment-body-action">
          <!-- Check authorization here -->
          <Button variant="link" type="info" class="file-action relative" @click="switchToEditMode">
            Chỉnh sửa
          </Button>
        </div>
      </div>
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
  color: #44546f;
  background-color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: var(--ds-shadow-raised, 0px 1px 1px #091e4240, 0px 0px 1px #091e424f);
  border-radius: 8px;
}
.preview-comment-placeholder:hover {
  background-color: var(--ds-background-input-hovered, #f7f8f9);
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
  color: #172b4d;
}
.comment-author-time {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--ds-text-subtle, #44546f);
}
.preview-comment-body {
  color: #172b4d;
}
.comment-creator {
  position: absolute;
  left: 0;
  top: 0;
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
  background-color: #fff;
  box-shadow: 0 0 0 1px #dbdbdb;
  min-height: 56px;
}
.editor-container.focus {
  box-shadow: 0 0 0 2px #0055cc;
}
.ql-toolbar.ql-snow {
  border: none;
  border-radius: 2px 2px 0 0;
  background-color: #fff;
}
.ql-editor.content {
  padding: 0;
  padding: 8px;
  background-color: #fff;
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
}
</style>
