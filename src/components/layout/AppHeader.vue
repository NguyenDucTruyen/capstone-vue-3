<script setup>
import UserDropdown from '@/components/common/UserDropdown.vue'
import Button from '@/components/ui/button/Button.vue'
import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
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
  <div class="flex items-center justify-between w-full bg-muted h-full gap-2 p-2 lg:pr-8">
    <RouterLink to="/home?page=1" class="flex p-4 pl-8 gap-2 cursor-pointer items-center">
      <Icon name="IconLogo" class="w-10 h-10" />
      <h1 class="max-lg:hidden text-3xl font-bold text-primary">
        S-Forum
      </h1>
    </RouterLink>
    <div class="flex gap-2">
      <template v-for="item in items" :key="item.id">
        <Navigator :to="item.url" :icon="item.icon" />
      </template>
    </div>
    <div class="flex flex-2">
      <UserDropdown v-if="userStore?.user" />
      <template v-else>
        <router-link to="/auth/register">
          <Button class="rounded-full px-6" variant="ghost">
            Sign up
          </Button>
        </router-link>
        <router-link to="/auth/login">
          <Button class="rounded-full px-6 bg-foreground">
            Log in
          </Button>
        </router-link>
      </template>
    </div>
  </div>
</template>
