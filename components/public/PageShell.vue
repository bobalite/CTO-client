<template>
  <div class="min-h-screen bg-slate-50 text-slate-800">
    <div class="bg-[#16283f] text-white">
      <div class="mx-auto flex min-h-10 max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6 lg:px-8">
        <p class="font-medium">The Official Website of the City Government of Davao</p>
        <a href="mailto:cto@davaocity.gov.ph" class="hidden text-white/80 hover:text-white sm:block">cto@davaocity.gov.ph</a>
      </div>
    </div>

    <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
        <NuxtLink to="/" class="flex min-w-0 items-center gap-3" aria-label="City Treasurer's Office home">
          <img :src="davaoLogo" alt="City Government of Davao" class="h-14 w-14 object-contain" />
          <img :src="ctoLogo" alt="City Treasurer's Office" class="h-14 w-14 rounded-full object-contain" />
          <div class="min-w-0">
            <p class="truncate text-base font-extrabold text-[#173a67] sm:text-lg">City Treasurer's Office</p>
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Davao City</p>
          </div>
        </NuxtLink>

        <button type="button" class="grid h-11 w-11 place-items-center rounded-md border border-slate-200 lg:hidden" :aria-expanded="open" aria-label="Toggle navigation" @click="open = !open">
          <Bars3Icon v-if="!open" class="h-6 w-6" />
          <XMarkIcon v-else class="h-6 w-6" />
        </button>

        <nav class="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          <NuxtLink v-for="item in links" :key="item.to" :to="item.to" class="rounded-md px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 hover:text-[#15803d]" active-class="bg-slate-100 text-[#15803d]">{{ item.label }}</NuxtLink>
          <NuxtLink to="/verify" class="ml-2 rounded-md bg-[#15803d] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#166534]">Verify Clearance</NuxtLink>
        </nav>
      </div>

      <nav v-if="open" class="grid gap-1 border-t border-slate-200 bg-white px-4 py-4 lg:hidden" aria-label="Mobile navigation">
        <NuxtLink v-for="item in links" :key="item.to" :to="item.to" class="rounded-md px-4 py-3 text-sm font-bold hover:bg-slate-100" @click="open = false">{{ item.label }}</NuxtLink>
      </nav>
    </header>

    <main><slot /></main>

    <footer class="bg-[#102c50] text-white">
      <div class="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div><p class="font-extrabold">City Treasurer's Office</p><p class="mt-2 text-sm leading-6 text-white/70">Room 1, City Hall Building<br />San Pedro Street, Davao City</p></div>
        <div><p class="font-bold">Office hours</p><p class="mt-2 text-sm leading-6 text-white/70">Monday to Friday<br />8:00 AM–5:00 PM</p></div>
        <div><p class="font-bold">Contact</p><p class="mt-2 text-sm leading-6 text-white/70">(082) 241-1000 local 232<br />cto@davaocity.gov.ph</p></div>
      </div>
      <div class="border-t border-white/10 px-4 py-5 text-center text-xs text-white/60">© {{ new Date().getFullYear() }} City Government of Davao. All rights reserved.</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import davaoLogo from '~/assets/images/dcplinado2.png'
import ctoLogo from '~/assets/images/CTOLogo.png'

const open = ref(false)
const links = [
  { label: 'My Requests', to: '/my-requests' },
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Transparency', to: '/transparency' },
  { label: 'Updates', to: '/updates' },
  { label: 'Contact Us', to: '/contact' },
]
</script>
