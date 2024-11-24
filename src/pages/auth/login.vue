<route>
  {
      meta: {
      layout: "auth",
      title: "Login",
      }
  }
  </route>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { loginValidator } from '@/utils/validation'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()

const form = useForm({
  validationSchema: toTypedSchema(loginValidator),
})

const onSubmit = form.handleSubmit(async (values) => {
  authStore.login(values)
})
</script>

<template>
  <form class="rounded-lg border bg-card text-card-foreground shadow-sm mx-auto max-w-sm h-max sm:min-w-[25rem]" @submit.prevent="onSubmit">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl text-center">
          Login
        </CardTitle>
        <CardDescription class="text-center">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid">
            <InputValidator id="email" type="email" label="Email" placeholder="m@gmai.com" name="email" />
            <div class="grid gap-2">
              <InputValidator id="password" type="password" placeholder="Password" label="Password" name="password" />
              <RouterLink to="/auth/forgot-password" class="ml-auto text-sm underline">
                Forgot your password?
              </RouterLink>
            </div>
          </div>
          <Button type="submit">
            Login
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <RouterLink to="/auth/signup" class="underline">
            Sign up
          </RouterLink>
        </div>
      </CardContent>
    </Card>
  </form>
</template>
