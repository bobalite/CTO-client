<template>
  <section class="hero p-0 relative">
    <div class="carousel w-full min-h-[100vh] p-0 m-0 relative bg-[var(--background-color)]">
      <div class="relative w-full min-h-[100vh]">
        <div v-for="(slide, index) in slides" :key="index" class="absolute inset-0 transition-opacity duration-700"
          :class="{
            'opacity-100 z-10': current === index,
            'opacity-0 z-0': current !== index,
          }">
          <img :src="slide.image" alt="" class="w-full h-full object-cover" />

          <!-- Overlay -->
          <div class="absolute inset-0 bg-black/40 flex items-center justify-center z-20 px-4 text-center">
            <div class="flex flex-col items-center gap-6 text-white transition-all duration-700 ease-in-out">

              <!-- Title -->
              <h2 class="pt-6 font-bold leading-snug transition-all duration-700 ease-in-out transform" :class="{
                // Default (slide 0 and slide 2+)
                'text-[clamp(24px,4vw,36px)] translate-y-0': current !== 1,

                // On second slide → move up + shrink
                'text-[clamp(16px,3vw,24px)] -translate-y-16': current === 1
              }">
                SPECIAL OFFICE FOR CHILDREN'S CONCERN Analytical and Reporting System
              </h2>

              <!-- ApexChart (only visible on slide 2) -->
              <transition name="fade">
                <div v-if="current === 1" class="w-full max-w-3xl h-80">
                 AREA OF CHILD RIGHTS/LIFE STAGE: SURVIVAL
                
                </div>
              </transition>

                <!-- Chart on Slide 3 -->
              <transition name="fade">
                <div v-if="current === 2" class="w-full max-w-3xl h-80">
                  AREA OF CHILD RIGHTS/LIFE STAGE: DEVELOPMENT
                  
                  
                </div>
              </transition>


                  <!-- Chart on Slide 4 -->
              <transition name="fade">
                <div v-if="current === 3" class="w-full max-w-3xl h-80">
                  AREA OF CHILD RIGHTS/LIFE STAGE: PROTECTION
                </div>
              </transition>


                  <!-- Chart on Slide 5 -->
              <transition name="fade">
                <div v-if="current === 4" class="w-full max-w-3xl h-80">
                  
                    AREA OF CHILD RIGHTS/LIFE STAGE: PARTICIPATION
                  
                 
                </div>
              </transition>

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
                <a href="mailto:socc@davaocity.gov.ph" class="flex items-center gap-2 hover:text-gray-300 transition">
                  <i class="bi bi-envelope-fill"></i>
                  <span>socc@davaocity.gov.ph</span>
                </a>
              </div>

              <NuxtLink to="/login"
                class="bg-green-700 text-white font-medium text-lg tracking-wider px-6 py-3 rounded-full transition inline-flex items-center justify-center no-underline normal-case">
                Get Started
              </NuxtLink>
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
  { image: '/assets/img/hero/bg.png', title: 'Slide 3' },
  { image: '/assets/img/hero/bg2.jpg', title: 'Slide 4' },
  { image: '/assets/img/hero/bg.png', title: 'Slide 5' },
])

const current = ref(0)

const nextSlide = () => {
  current.value = (current.value + 1) % slides.value.length
}

const prevSlide = () => {
  current.value = (current.value - 1 + slides.value.length) % slides.value.length
}


const dummyPercentageActualvsLocal =[10, 41, 35, 51, 49, 62, 69]







// // Chart B (Slide 3)
// const seriesB = reactive([
//   { name: "Bar Data", data: [12, 25, 14, 32, 20, 40, 33] },
// ]);
// const chartOptionsB = ref({
//   chart: { toolbar: { show: false }, background: "transparent" },
//   plotOptions: { bar: { borderRadius: 8, horizontal: false } },
//   xaxis: { categories: ["A", "B", "C", "D", "E", "F", "G"] },
//   theme: { mode: "dark" },
// });
</script>