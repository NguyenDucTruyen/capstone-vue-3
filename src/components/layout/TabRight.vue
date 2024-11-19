<script setup lang="ts">
import type { Category } from '@/utils/types'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
await categoryStore.fetchCategories()
</script>

<template>
  <div class="flex flex-col items-start gap-5">
    <div class="bg-muted rounded-lg flex flex-col items-start gap-2 w-72 p-2">
      <h2 class="text-foreground font-medium text-2xl p-2 leading-5">
        Categories
      </h2>
      <Separator class="w-full bg-muted-foreground" />
      <ScrollArea class="max-h-[420px] w-full overflow-auto custom-scroll mb-5 pr-4">
        <div
          v-for="item in categoryStore.categories"
          :key="item._id"
          class="flex items-start gap-2 w-full rounded cursor-pointer hover:bg-secondary mb-3 p-2"
        >
          <Icon
            name="IconTag"
            class="object-contain h-8 w-8 flex justify-center items-center"
          />
          <div class="flex flex-col w-[calc(100%-2.5rem)] items-start gap-0.5">
            <span class="text-foreground font-medium text-sm leading-4">{{ item.name }}</span>
            <span class="text-foreground truncate font-normal w-full text-xs leading-[1.4]">{{ item.description }}</span>
          </div>
        </div>
      </ScrollArea>
    </div>
  </div>
</template>
