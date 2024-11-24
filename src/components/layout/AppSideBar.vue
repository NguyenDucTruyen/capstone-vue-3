<script setup lang="ts">
const items = ref([
  {
    id: 0,
    title: 'Home',
    icon: 'IconHome',
    url: '/home',
  },
  {
    id: 1,
    title: 'Newest and Recent',
    icon: 'IconNew',
    url: '/blogs/newest',
  },
  {
    id: 2,
    title: 'Popular of the day',
    icon: 'IconPopular',
    url: '/blogs/popular',
  },
])
</script>

<template>
  <div class="flex flex-col items-start gap-5">
    <div class="bg-muted rounded-lg flex flex-col items-start gap-2 w-72 p-2">
      <AppSideBarItem
        v-for="item in items"
        :key="item.id"
        v-bind="item"
      />
    </div>
  </div>
</template>
