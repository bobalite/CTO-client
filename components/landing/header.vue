<template>
  <header id="header" class="px-5 py-2.5 fixed top-0 left-0 w-full z-[1000]">
    <div class="w-full max-w-screen-xl mx-auto flex items-center justify-between px-4">
      <NuxtLink to="/" class="flex items-center">
        <img src="/assets/img/logo.png" class="w-20 h-20">
      </NuxtLink>

      <button class="mobile-nav-toggle bi bi-list xl:hidden cursor-pointer" @click="toggleMenu"
        aria-label="Toggle menu"></button>

      <nav id="navmenu" class="flex gap-4">
        <NuxtLink to="/"
          class="bg-green-700 text-white font-medium text-xs tracking-wider px-6 py-3 rounded-full transition inline-flex items-center justify-center no-underline normal-case">
          Login</NuxtLink>
        <NuxtLink to="mailto:socc@davaocity.gov.ph"
          class="bg-green-700 text-white font-medium text-xs tracking-wider px-6 py-3 rounded-full transition inline-flex items-center justify-center no-underline normal-case">
          Contact Us <i class="bi bi-arrow-right"></i></NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const menuActive = ref(false)
const toggleMenu = () => {
  menuActive.value = !menuActive.value
}

onMounted(() => {
  document.addEventListener('click', (event) => {
    if (!event.target.closest('#navmenu') && !event.target.closest('.mobile-nav-toggle')) {
      menuActive.value = false
    }
  })
})
</script>

<style scoped>
/* Add your mobile menu styles or import CSS classes here */
</style>