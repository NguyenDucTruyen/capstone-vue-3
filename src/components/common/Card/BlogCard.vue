<script setup lang="ts">
const props = defineProps<{
  imageLink: string[]
  title: string
  author: string
  time: string
  like: number
  dislike: number
  category: string
}>()

const {
  imageLink = [],
  title = '',
  author = '',
  like = 0,
  dislike = 0,
  category = '',
} = props

const formattedTime = computed(() => props.time.split('T')[0])
</script>

<template>
  <div class="flex bg-card text-foreground gap-5 w-full p-5 mb-5 rounded-lg cursor-pointer shadow-lg">
    <img
      v-lazy="imageLink[0]"
      alt=""
      class="w-20 h-20 rounded-lg"
    >
    <div class="flex flex-col w-full justify-center h-20 gap-4">
      <div id="title" class="flex justify-between">
        <p class="font-medium">
          {{ title }}
        </p>
        <p class="text-muted-foreground text-xs">
          Author: {{ author }}
        </p>
      </div>

      <div class="flex justify-between items-center">
        <div class="flex justify-center gap-2">
          <span class="text-muted-foreground text-xs">
            Category:
          </span>
          <div v-if="category" class="bg-muted text-muted-foreground rounded-lg px-2 py-1 text-xs font-medium">
            {{ category }}
          </div>
        </div>
        <div class="flex gap-5">
          <p class="text-muted-foreground text-xs">
            {{ like }} Likes
          </p>
          <p class="text-muted-foreground text-xs">
            {{ dislike }} Dislikes
          </p>
          <p class="text-muted-foreground text-xs">
            {{ formattedTime }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
