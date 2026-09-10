<template>
  <PublicPageShell><section class="mx-auto max-w-xl px-6 py-20 text-center"><h1 class="text-2xl font-bold text-[#173a67]">{{ error ? 'Sign-in could not be completed' : 'Completing sign-in...' }}</h1><p v-if="error" class="mt-4 text-slate-600">Please try again. If you already have an account with this email, use its existing sign-in method.</p><NuxtLink v-if="error" to="/login" class="mt-6 inline-block font-bold text-green-700">Back to login</NuxtLink></section></PublicPageShell>
</template>
<script setup>
import { useUserStore } from '~/store/user'
const error = ref(false)
const config = useRuntimeConfig()
const route = useRoute()
const store = useUserStore()
onMounted(async () => {
  if (route.query.error) { error.value = true; return }
  try {
    const response = await $fetch(`${config.public.backendUrl}/auth/session`, { credentials: 'include' })
    if (!response?.data?.token) throw new Error('Missing session')
    sessionStorage.removeItem('cto-demo-session')
    localStorage.setItem('_token', response.data.token)
    store.setUser(response.data.user)
    await navigateTo('/my-requests')
  } catch { error.value = true }
})
</script>
