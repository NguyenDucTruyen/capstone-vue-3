<script setup>
import UserDropdown from '@/components/common/UserDropdown.vue'
import Button from '@/components/ui/button/Button.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="flex items-center justify-between w-full bg-muted h-full gap-2 p-2 lg:pr-8">
    <div class="flex p-4 pl-8 gap-2 cursor-pointer items-center">
      <Icon name="IconLogo" class="w-10 h-10" />
      <h1 class="max-sm:hidden text-3xl font-bold text-primary">
        S-Forum
      </h1>
    </div>
    <div class="flex gap-2">
      <Navigator to="/home?page=1" icon="IconHome" />
    </div>
    <div class="flex">      
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
