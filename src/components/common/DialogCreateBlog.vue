<script setup lang="ts">
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
import { useCategoryStore } from '@/stores/category'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const categoryStore = useCategoryStore()
const titleSchema = z.string().min(2).max(50)
const form = useForm({
  validationSchema: toTypedSchema(z.object({ title: titleSchema })),
})

const onSubmit = form.handleSubmit(async (values) => {
  console.log(values)
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot>
        <Button variant="outline">
          Edit Profile
        </Button>
      </slot>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create Blog</DialogTitle>
        <DialogDescription>
          Fill in the form below to create a new blog.
        </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="onSubmit">
        <div class="grid gap-4 py-4">
          <InputValidator
            id="title"
            type="text"
            label="Title"
            placeholder="Title blog"
            required
            name="title"
            autocomplete="off"
          />
          <Select>
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
        <Button type="submit">
          Save changes
        </Button>
      </form>
    </DialogContent>
  </Dialog>
</template>
