<!-- eslint-disable no-console -->
<route>
  {
      meta: {
      layout: "empty",
      title: "Create",
      }
  }
  </route>

<script setup lang="ts">
import type { RequestCreateBlog, ResponseBlogData } from '@/utils/types/blog'
import { uploadImage } from '@/api/upload'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/toast'
import { useBlogStore } from '@/stores/blog'
import { useCategoryStore } from '@/stores/category'
import { toTypedSchema } from '@vee-validate/zod'
import { BookText, CloudUpload, X } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const categoryStore = useCategoryStore()
const blogStore = useBlogStore()
onMounted(async () => {
  await categoryStore.fetchCategories()
})

const fileInput = useTemplateRef('refInput')

const file = ref<File | null>(null)
const previewImage = ref<string | null>(null)
const titleSchema = z.string().min(2).max(255)
const content = ref<string>('')
const categoryId = ref<string>('')
const form = useForm({
  validationSchema: toTypedSchema(z.object({ title: titleSchema })),
})

const onSubmit = form.handleSubmit(async (values) => {
  if (!file.value) {
    return
  }
  const response = await uploadImage(file.value as File)
  const body = {
    title: values.title,
    category: categoryId.value,
    content: content.value,
    blogImages: [response.url],
  }
  await blogStore.createBlog(body)
  toast({
    title: 'Success',
    description: 'Blog created successfully',
  })
  form.resetForm()
})

function handleUploadImage(e: Event) {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (!files?.length)
    return
  file.value = files[0]
  if (!file.value.type.startsWith('image/')) {
    toast({
      title: 'Error',
      description: 'Please upload an image file',
      variant: 'destructive',
    })
    file.value = null
    return
  }
  const blob = URL.createObjectURL(file.value)
  previewImage.value = blob
}
function clearImage() {
  file.value = null
  previewImage.value = null
}
function updateContent(newContent: string) {
  content.value = newContent
}
</script>

<template>
  <input id="" ref="refInput" type="file" accept="image/*" name="" class="hidden" @input="handleUploadImage">
  <form class="p-8 rounded-md" @submit.prevent="onSubmit">
    <div class="flex flex-col items-center mb-8">
      <h1 class="text-2xl font-semibold mb-2 flex items-center gap-2">
        <BookText />  Create Blog
      </h1>
      <p>
        Fill in the form below to create a new blog.
      </p>
    </div>
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="col-span-1 flex justify-center relative items-center">
        <Avatar class="h-40 w-40 rounded-lg cursor-pointer relative" @click="() => fileInput?.click()">
          <div v-if="file" class="flex justify-center items-center rounded-sm absolute right-1 top-1 hover:bg-muted-foreground bg-secondary p-1 cursor-pointer" @click.stop="clearImage">
            <X />
          </div>
          <AvatarImage v-if="previewImage" :src="previewImage" />
          <div v-else class="rounded-lg p-1 flex flex-col items-center gap-2">
            <CloudUpload :size="32" />
            <span class="font-semibold">Upload thumbnail</span>
          </div>
        </Avatar>
        <span v-if="!previewImage" class="absolute left-9 bottom-[-1rem] text-sm font-normal text-destructive error-message">Please upload thumbnail image</span>
      </div>
      <div class="col-span-2 grid gap-2 py-4">
        <InputValidator
          id="title"
          type="text"
          label="Title"
          placeholder="Title blog"
          required
          name="title"
          autocomplete="off"
        />
        <Select v-model="categoryId">
          <Label>
            Category
          </Label>
          <SelectTrigger class="w-full">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="category in categoryStore.categories"
                :key="category._id"
                :value="category._id"
              >
                {{ category.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
    <Label class="text-lg">What are the details of your blog?</Label>
    <p class=" flex mb-4 font-normal">
      Expand on what you put in the title. Minimum 20 characters.
    </p>
    <ContentEditor @update-content="updateContent" />
    <!-- <section class="mt-8">
      <Label class="text-lg">Preview</Label>
      <p class="flex mb-4 font-normal">
        This section provides a preview of your blog content. Ensure it meets the minimum requirement of 20 characters.
      </p>
      <div class="ql-snow content">
        <div class="ql-editor" v-html="content" />
      </div>
    </section> -->
    <Button variant="secondary">
      <RouterLink to="/home">
        Cancel
      </RouterLink>
    </Button>
    <Button type="submit" class="mt-8 ml-4">
      Save changes
    </Button>
  </form>
</template>
