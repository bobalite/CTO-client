<template>
  <section id="stats" class="bg-gray-100 py-16">
    <div class="max-w-screen-xl mx-auto px-4" data-aos="fade-up" data-aos-delay="100">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <!-- <div v-for="stat in stats" :key="stat.label" class="flex flex-col items-center justify-center h-full">
          <LandingAnimatedCounter :end="stat.value" />
          <p class="mt-2 text-green-700 text-lg md:text-xl font-medium">
            {{ stat.label }}
          </p>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref([
  { label: 'Total Barangays Monitored', value: 182 },
  { label: 'Mother-Child Services Provided', value: 521 },
  { label: 'Child Friendly Indicators', value: 527 },
  { label: 'Involved Agencies', value: 16 },
  
])
</script>