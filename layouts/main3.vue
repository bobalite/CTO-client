<template>
    <div>
      <!-- Header with Burger Menu -->
      <header id="header" class="header absolute top-0 left-0 w-full z-50">
        <div class="flex items-center justify-between px-20 py-4">
          <!-- Logo on the left -->
          <a href="/" class="flex items-center">
            <img src="/assets/images/logo.png" alt="Logo" class="w-20 h-20">
          </a>
  
          <!-- Burger menu for small screens -->
          <button id="burger" class="lg:hidden text-white focus:outline-none" @click="toggleMenu">
            <i class="bi bi-list text-2xl"></i>
          </button>
  
          <!-- Buttons on the right -->
          <nav id="navmenu" class="hidden lg:flex gap-4 items-center">
            <!-- SOAR login page -->
            <a href="#"
              class="bg-[#198754] text-white font-sans font-medium text-xs tracking-wide px-6 py-3 rounded-[30px] transition-all duration-300 flex items-center justify-center no-underline">
              <span>Login</span>
            </a>
  
            <!-- SOCC FB page -->
            <a href="#"
              class="bg-[#198754] text-white font-sans font-medium text-xs tracking-wide px-6 py-3 rounded-[30px] transition-all duration-300 flex items-center justify-center no-underline">
              <span>Contact Us</span> <i class="bi bi-arrow-right"></i>
            </a>
          </nav>
  
          <!-- Mobile Menu (Hidden by default) -->
          <div id="mobile-menu" class="lg:hidden hidden absolute top-16 left-0 w-full bg-white shadow-lg">
            <nav class="flex flex-col items-center py-4">
              <!-- Mobile SOAR login page -->
              <a href="#"
                class="bg-[#198754] text-white font-sans font-medium text-xs tracking-wide px-6 py-3 rounded-[30px] transition-all duration-300 w-full text-center mb-2">
                <span>Login</span>
              </a>
  
              <!-- Mobile SOCC FB page -->
              <a href="#"
                class="bg-[#198754] text-white font-sans font-medium text-xs tracking-wide px-6 py-3 rounded-[30px] transition-all duration-300 w-full text-center">
                <span>Contact Us</span> <i class="bi bi-arrow-right"></i>
              </a>
            </nav>
          </div>
        </div>
      </header>
  
      <!-- Page Content -->
      <slot />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const menuOpen = ref(false);
  
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden', !menuOpen.value);
    }
  };
  </script>
  