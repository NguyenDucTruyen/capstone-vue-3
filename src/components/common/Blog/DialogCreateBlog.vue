<!-- eslint-disable no-console -->
<script setup lang="ts">
import { uploadImage } from '@/api/upload'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { useCategoryStore } from '@/stores/category'
import { toTypedSchema } from '@vee-validate/zod'
import { CloudUpload, X } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const categoryStore = useCategoryStore()

const fileInput = useTemplateRef('refInput')

const file = ref<File | null>(null)
const previewImage = ref<string | null>(null)
const titleSchema = z.string().min(2).max(50)
const content = ref<string>('')
const categoryId = ref<string>('')
const form = useForm({
  validationSchema: toTypedSchema(z.object({ title: titleSchema })),
})

const onSubmit = form.handleSubmit(async (values) => {
  if (!file.value) {
    toast({
      title: 'Error',
      description: 'Please upload thumbnail image',
      variant: 'destructive',
    })
    return
  }
  console.log(values.title, categoryId.value, content.value)
  // const response = await uploadImage(file.value as File)
  // console.log(response)
})

function handleUploadImage(e: Event) {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    file.value = files[0]
    const blob = URL.createObjectURL(file.value)
    previewImage.value = blob
  }
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
  <Dialog class="max-h-[30rem]">
    <DialogTrigger as-child>
      <slot>
        <Button variant="outline">
          Edit Profile
        </Button>
      </slot>
    </DialogTrigger>
    <ScrollArea class="max-h-[30rem]">
      <DialogContent class="sm:max-w-[54rem]">
        <DialogHeader>
          <DialogTitle class="text-2xl font-semibold">
            Create Blog
          </DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new blog.
          </DialogDescription>
        </DialogHeader>
        <form @submit.prevent="onSubmit">
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="col-span-1 flex justify-center items-center">
              <Avatar class="h-40 w-40 rounded-lg cursor-pointer relative" @click="() => fileInput?.click()">
                <div v-if="file" class="flex justify-center items-center rounded-sm absolute right-1 top-1 hover:bg-muted-foreground p-1 cursor-pointer" @click.stop="clearImage">
                  <X />
                </div>
                <AvatarImage v-if="previewImage" :src="previewImage" />
                <AvatarFallback class="rounded-lg p-1">
                  <CloudUpload :size="32" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div class="col-span-2 grid gap-4 py-4">
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
          <ContentEditor @update-content="updateContent" />
          <Button type="submit" class="mt-8">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </ScrollArea>
  </Dialog>
</template>
