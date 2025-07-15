<template>
  <section id="featured-services" class="bg-black text-white py-16">
    <div class="max-w-screen-xl mx-auto px-4">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-aos="fade-up"
      >
        <div
          v-for="(service, index) in services"
          :key="index"
          class="flex gap-4 items-start"
          :data-aos-delay="100 * (index + 1)"
        >
          <div class="text-3xl text-accent flex-shrink-0">
            <!-- <i :class="service.icon"></i> -->
             <template v-if="index == 2">
              <IconGraph />
             </template>
             <template v-else-if="index == 1">
              <IconList />
              </template>
              <template v-else-if="index == 0">
              <IconBriefcase />
              </template>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-1">{{ service.title }}</h4>
            <p class="text-sm text-gray-300">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
//import { IconGraph } from '#build/components';

const services = [
  {
    icon: 'bi bi-briefcase',
    title: "Child Rights Situational Analysis",
    description:
      "Enables agencies to input, manage, and analyze data on children's welfare across key indicators.",
  },
  {
    icon: 'bi bi-card-checklist',
    title: 'Data Source Tracker',
    description:
      'Monitors data submission progress, ensuring timely and accurate reporting.',
  },
  {
    icon: 'bi bi-bar-chart',
    title: 'Accomplishment Reports',
    description:
      'Provides visual comparisons of accomplishments versus projections, offering insights into child welfare trends.',
  },

]
</script>