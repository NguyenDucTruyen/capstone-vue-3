<script setup lang="ts">
const props = defineProps<{
  to: string
  icon?: string
}>()
const router = useRouter()
const isActive = computed(() => props.to.includes(router.currentRoute.value.name as string))
</script>

<template>
  <RouterLink :to="props.to">
    <div :class="{ isActive }" class="flex items-center justify-center p-2 gap-2">
      <Icon :name="props.icon" class="w-6 h-6" />
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
    .isActive {
        @apply bg-primary text-white rounded-lg;
    }
</style>
