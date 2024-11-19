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
  <div class="flex bg-[#262D34] gap-5 w-full p-5 mb-5 rounded-lg cursor-pointer">
    <img
      :src="imageLink[0] ?? 'https://sgroupvn.org/_nuxt/img/logo-sgroup-symbol.ae66e60.png'"
      alt=""
      class="w-[80px] h-[80px] rounded-lg"
    >
    <div class="flex flex-col w-full justify-center h-[80px] gap-[14px]">
      <div id="title" class="flex justify-between">
        <p class="text-white font-medium text-[16px]">
          {{ title }}
        </p>
        <p class="text-[#C5D0E6] text-[10px]">
          Author: {{ author }}
        </p>
      </div>

      <div class="flex justify-between items-center">
        <div class="flex justify-center gap-2">
          <span class="text-[#C5D0E6] text-[10px] leading-[20px]">Category:</span>
          <div v-if="category" class="bg-[#2C353D] rounded-lg px-2 py-1 text-[8px] text-[#858EAD] font-medium">
            {{ category }}
          </div>
        </div>
        <div class="flex gap-5">
          <p class="text-[#C5D0E6] text-[10px]">
            {{ like }} Likes
          </p>
          <p class="text-[#C5D0E6] text-[10px]">
            {{ dislike }} Dislikes
          </p>
          <p class="text-[#C5D0E6] text-[10px]">
            {{ formattedTime }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
