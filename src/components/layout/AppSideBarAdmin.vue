<script setup lang="ts">
const items = ref([
  {
    id: 0,
    title: 'User Management',
    icon: 'IconAdmin',
    url: '/admin',
  },
  {
    id: 1,
    title: 'Publish Blog',
    icon: 'IconAdmin',
    url: '/admin/publishblog',
  },
  {
    id: 2,
    title: 'Pending Blog',
    icon: 'IconAdmin',
    url: '/admin/pendingblog',

  },
])
</script>

<template>
  <div class="flex flex-col items-start gap-5">
    <div class="bg-muted rounded-lg flex lg:flex-col items-start gap-2 w-72 p-2">
      <h1 class="text-xl lg:flex hidden text-center w-full font-semibold my-2">
        Admin Management
      </h1>
      <AppSideBarItem
        v-for="item in items"
        :key="item.id"
        v-bind="item"
      />
    </div>
  </div>
</template>
