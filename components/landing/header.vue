<template>
  <header id="header" class="header fixed-top">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
      <NuxtLink to="/" class="d-flex align-items-center">
        <img src="/assets/img/logo.png" style="width: 80px; height: 80px;">
      </NuxtLink>

      <i class="mobile-nav-toggle d-xl-none bi bi-list" @click="toggleMenu"></i>

      <nav id="navmenu" class="navmenu align-items-center" :class="{ active: menuActive }">
        <NuxtLink to="#" class="btn login-btn">Login</NuxtLink>
        <NuxtLink to="#" class="btn login-btn">Contact Us <i class="bi bi-arrow-right"></i></NuxtLink>
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
</script>

<style scoped>
/* Add your mobile menu styles or import CSS classes here */
</style>