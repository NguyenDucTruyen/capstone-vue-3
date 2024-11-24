<script setup lang="ts">
import type { ColorsType } from '@/types/'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores/theme'
import { ref } from 'vue'

interface ColorSelectProps {
  customClass?: string
}

const props = defineProps<ColorSelectProps>()

const themeStore = useThemeStore()
function setColor(color: ColorsType) {
  themeStore.setColor(color)
}
const colors = ref<ColorsType[]>(['rose', 'blue', 'green', 'orange', 'zinc'],
)
</script>

<template>
  <Select
    v-model="themeStore.color"
    @change="setColor"
  >
    <SelectTrigger class="w-full" :class="props.customClass">
      <SelectValue placeholder="Select a color" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem
          v-for="(color, index) in colors"
          :key="index"
          :value="color"
        >
          {{ color.toLocaleUpperCase() }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
