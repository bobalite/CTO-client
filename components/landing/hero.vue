<template>
  <section class="hero p-0 relative">
    <div class="carousel w-full min-h-[100vh] p-0 m-0 relative bg-[var(--background-color)]">
      <div
        class="carousel-item absolute inset-0 bg-cover bg-center bg-no-repeat overflow-hidden before:content-[''] before:absolute before:inset-0 before:z-2 before:bg-[color-mix(in_srgb,var(--background-color),transparent_30%)]">
        <div
          class="carousel-item absolute inset-0 bg-cover bg-center bg-no-repeat overflow-hidden before:content-[''] before:absolute before:inset-0 before:z-2 before:bg-[color-mix(in_srgb,var(--background-color),transparent_30%)]">
          <div class="relative w-full min-h-[100vh]">
            <div v-for="(slide, index) in slides" :key="index" class="absolute inset-0 transition-opacity duration-700"
              :class="{
                'opacity-100 z-10': current === index,
                'opacity-0 z-0': current !== index,
              }">
              <img :src="slide.image" alt="" class="w-full h-full object-cover" />
              <!-- Content overlay -->
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center z-20 px-4 text-center">
                <div class="flex flex-col items-center gap-6 text-white">
                  <!-- Title -->
                  <h2 class="text-[clamp(24px,4vw,36px)] pt-6 font-bold leading-snug">
                    SPECIAL OFFICE FOR CHILDREN'S CONCERN Analytical and Reporting System
                  </h2>
                  <!-- Contact Info -->
                  <div class="contact-info flex flex-wrap justify-center items-center gap-6 text-sm md:text-base">
                    <a href="https://www.google.com/maps?q=Magsaysay+Park,+Davao+City"
                      class="flex items-center gap-2 hover:text-gray-300 transition">
                      <i class="bi bi-geo-alt-fill"></i>
                      <span>Magsaysay Park, Davao City</span>
                    </a>
                    <a href="tel:+63822919657" class="flex items-center gap-2 hover:text-gray-300 transition">
                      <i class="bi bi-telephone-fill"></i>
                      <span>(082) 291-9657</span>
                    </a>
                    <a href="mailto:socc@davaocity.gov.ph"
                      class="flex items-center gap-2 hover:text-gray-300 transition">
                      <i class="bi bi-envelope-fill"></i>
                      <span>socc@davaocity.gov.ph</span>
                    </a>


                  </div>

                  <NuxtLink to="/login"
                    class="bg-green-700 text-white font-medium text-lg tracking-wider px-6 py-3 rounded-full transition inline-flex items-center justify-center no-underline normal-case">
                    Get Started</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Controls -->
      <button @click="prevSlide"
        class="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 text-white text-2xl z-20">
        ‹
      </button>
      <button @click="nextSlide"
        class="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 text-white text-2xl z-20">
        ›
      </button>

      <!-- Indicators -->
      <ul class="carousel-indicators absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 list-none">
        <li class="w-3 h-3 rounded-full bg-white opacity-50 cursor-pointer"></li>
        <li class="w-3 h-3 rounded-full bg-white opacity-50 cursor-pointer"></li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'


onMounted(() => {
  setInterval(() => {
    nextSlide()
  }, 9000)
})


const slides = ref([
  { image: '/assets/img/hero/bg.jpg', title: 'Slide 1' },
  { image: '/assets/img/hero/bg2.jpg', title: 'Slide 2' },
  { image: '/assets/img/hero/bg.png', title: 'Slide 3' }
])

const current = ref(0)

const nextSlide = () => {
  current.value = (current.value + 1) % slides.value.length
}

const prevSlide = () => {
  current.value = (current.value - 1 + slides.value.length) % slides.value.length
}
</script>