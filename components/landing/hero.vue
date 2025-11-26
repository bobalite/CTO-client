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
                <div v-if="current === 1" class="w-full max-w-3xl h-80 text-lg font-bold">
                  CHILDREN'S RIGHTS TO SURVIVAL
                 <div class="grid grid-cols-2 gap-4">
                    <div class="bg-green-700 p-2">
                      <component :is="Chart" type="area" :options="chartOptionsSurvival1" :series="seriesSurvival1" height="150%"
                        width="100%" />
                    </div>
                    <div class="bg-green-700 p-2">
                      <component :is="Chart" type="bar" :options="chartOptionsSurvival2" :series="seriesSurvival2" height="100%"
                        width="100%" />
                    </div>
                  </div>
                </div>
              </transition>

              <!-- Chart on Slide 3 -->
              <transition name="fade">
                <div v-if="current === 2" class="w-full max-w-3xl h-80 text-lg font-bold">
                  CHILDREN'S RIGHTS TO DEVELOPMENT
                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-green-700 p-4">
                      <component :is="Chart" type="bar" :options="chartOptionsDevelopment1" :series="seriesDevelopment1" height="150%"
                        width="100%" />
                    </div>
                    <div class="bg-green-700 p-4">
                      <component :is="Chart" type="bar" :options="chartOptionsDevelopment2" :series="seriesDevelopment2" height="100%"
                        width="100%" />
                    </div>
                  </div>


                </div>
              </transition>


              <!-- Chart on Slide 4 -->
              <transition name="fade">
                <div v-if="current === 3" class="w-full max-w-3xl h-80 text-lg font-bold">
                  CHILDREN'S RIGHTS TO PROTECTION
                  
                    <div class="bg-green-700 p-4">
                      <component :is="Chart" type="bar" :options="chartOptionsProtection" :series="seriesProtection" height="150%"
                        width="100%" />
                    </div>
                    
                  
                </div>
              </transition>


              <!-- Chart on Slide 5 -->
              <transition name="fade">
                <div v-if="current === 4" class="w-full max-w-3xl h-80 text-lg font-bold">

                  CHILDREN'S RIGHTS TO PARTICIPATION
                
                    <div class="bg-green-700 p-4">
                      <component :is="Chart" type="bar" :options="chartOptionsRepresentation" :series="seriesRepresentation" height="150%"
                        width="100%" />
                    </div>
                   
                


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


onMounted(async () => {
  const module = await import("vue3-apexcharts");
  Chart.value = module.default;
});

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
const Chart = ref(null);
const seriesSurvival1 = [{ name: "Public", data: [2132, 3213, 2312, 4212, 2323] },{ name: "Private", data: [3434, 5450, 3443, 4342, 5433] }];
const seriesSurvival2 = [{ name: "FIC", data: [3434, 5450, 3443, 4342, 5433] }];
const seriesDevelopment1 = [{ name: "FIC", data: [3434, 5450, 3443, 4342, 5433] }];
const seriesDevelopment2 = [{ name: "Kindergarten", data: [1223, 2123, 2233, 2435, 1234] }, { name: " Elementary", data: [2123, 1234, 1544, 2112, 5433] },  { name: " Secondary", data: [3434, 5450, 3443, 4342, 5433] }];



const seriesProtection = [{ name: "abandoned", data: [123, 234, 345, 456, 567] }, 
                          { name: "bullying", data: [123, 234, 345, 456, 567] }, 
                          { name: "child labor", data: [123, 234, 345, 456, 567] },
                          { name: "economic abuse", data: [123, 234, 345, 456, 567] },
                          { name: "neglected", data: [123, 234, 345, 456, 567] },
                          { name: "physical abuse", data: [123, 234, 345, 456, 567] },
                          { name: "sexual abuse", data: [123, 234, 345, 456, 567] },
                          { name: "sexual exploitation", data: [123, 234, 345, 456, 567] },
                          { name: "victim of OSAEC & CSAEM", data: [123, 234, 345, 456, 567] },
                          { name: "victim of domestic violence", data: [123, 234, 345, 456, 567] },
                          { name: "Trafficking in Persons", data: [123, 234, 345, 456, 567] }
                                                ];

const seriesRepresentation = [{ name: "Election", data: [123, 234, 345, 456, 567] }, { name: "Appointment", data: [123, 234, 345, 456, 567] }];

const chartOptionsSurvival1 = { 
  title: {
    text: 'Davao City Total number of Newbord deliveries: 2021-2025',
    align: 'center',
    style: {
      fontSize: '10px',
      fontWeight: 'bold'
  }},
  chart: {
    toolbar: {
      show: false
    }}, 
  stroke: { curve: "smooth", width: 3 },
  dataLabels: { enabled: true },
  grid: { borderColor: "#555" },
  yaxis: {
    min: 0,
    max: 10000,
    tickAmount: 5,
   
  },
  xaxis: { categories: [2021, 2022, 2023, 2024, 2025] }, 
  theme: { mode: "dark" },
};



const chartOptionsSurvival2 = { 
  title: {
    text: 'Davao City Total number of Fully Immunized Children: 2021-2025',
    align: 'center',
    style: {
      fontSize: '10px',
      fontWeight: 'bold'
  }},
  chart: {
    toolbar: {
      show: false
    }}, 
  stroke: { curve: "smooth", width: 3 },
  dataLabels: { enabled: true },
  grid: { borderColor: "#555" },
  yaxis: {
    min: 0,
    max: 10000,
    tickAmount: 5,
    
  },
  xaxis: { categories: [2021, 2022, 2023, 2024, 2025] }, 
  theme: { mode: "dark" },
};


const chartOptionsDevelopment1 = { 
  title: {
    text: 'Total Number of child development centers/facilities: 2021-2025',
    align: 'center',
    style: {
      fontSize: '10px',
      fontWeight: 'bold'
  }},
  chart: {
    toolbar: {
      show: false
    }}, 
  stroke: { curve: "smooth", width: 3 },
  dataLabels: { enabled: true },
  grid: { borderColor: "#555" },
  yaxis: {
    min: 0,
    max: 10000,
    tickAmount: 5,
    
  },
  xaxis: { categories: [2021, 2022, 2023, 2024, 2025] }, 
  theme: { mode: "dark" },
};



// Net Enrolment rate
const chartOptionsDevelopment2 = { 
  title: {
    text: 'Davao City Net Enrolment rate: 2021-2025',
    align: 'center',
    style: {
      fontSize: '10px',
      fontWeight: 'bold'
  }},
  chart: {
    toolbar: {
      show: false
    }}, 
  stroke: { curve: "smooth", width: 3 },
  dataLabels: { enabled: true },
  grid: { borderColor: "#555" },
  yaxis: {
    min: 0,
    max: 10000,
    tickAmount: 5,
    
  },
  xaxis: { categories: [2021, 2022, 2023, 2024, 2025] }, 
  theme: { mode: "dark" },
};


//chartOptionsProtection

const chartOptionsProtection = { 
  title: {
    text: 'Total number of violence against children cases resolved: 2021-2025',
    align: 'center',
    style: {
      fontSize: '10px',
      fontWeight: 'bold'
  }},
  chart: {
    toolbar: {
      show: false
    }}, 
  stroke: { curve: "smooth", width: 3 },
  dataLabels: { enabled: true },
  grid: { borderColor: "#555" },
  yaxis: {
    min: 0,
    max: 1000,
    tickAmount: 5,
    
  },
  xaxis: { categories: [2021, 2022, 2023, 2024, 2025] }, 
  theme: { mode: "dark" },
};


const chartOptionsRepresentation = { 
  title: {
    text: ' Total Number of BCPC with child representatives: 2021-2025',
    align: 'center',
    style: {
      fontSize: '10px',
      fontWeight: 'bold'
  }},
  chart: {
    toolbar: {
      show: false
    }}, 
  stroke: { curve: "smooth", width: 3 },
  dataLabels: { enabled: true },
  grid: { borderColor: "#555" },
  yaxis: {
    min: 0,
    max: 1000,
    tickAmount: 5,
    
  },
  xaxis: { categories: [2021, 2022, 2023, 2024, 2025] }, 
  theme: { mode: "dark" },
};
</script>