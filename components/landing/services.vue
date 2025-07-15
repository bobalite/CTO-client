<template>
  <section id="services" class="py-16 bg-white text-gray-800">
    <div class="max-w-screen-xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="flex items-start gap-4 relative h-full"
          data-aos="fade-up"
          :data-aos-delay="100 * (index + 1)"
        >
          <i :class="`${service.icon} text-3xl text-primary flex-shrink-0`"></i>
          <div>
            <h4 class="text-lg font-semibold mb-1">
              <a :href="service.link" class="hover:underline">
                {{ service.title }}
              </a>
            </h4>
            <p class="text-sm text-gray-600">{{ service.description }}</p>
            <img
              :src="service.image"
              :alt="`${service.title} image`"
              class="mt-3 w-full h-auto object-cover rounded shadow"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    title: 'Reports and Analysis',
    link: 'service-details.html',
    icon: 'bi bi-clipboard-data',
    description:
      'Generates comprehensive reports and visual analytics to assess child welfare data and trends.',
    image: 'assets/img/funtion/dashboard.PNG',
  },
  {
    title: 'Sectioned Rights Encoding',
    link: 'service-details.html',
    icon: 'bi bi-diagram-3',
    description:
      'Organizes and records data based on child rights categories for accurate monitoring and evaluation.',
    image: 'assets/img/funtion/dataentry.PNG',
  },
  {
    title: 'User Management',
    link: 'service-details.html',
    icon: 'bi bi-sliders',
    description:
      'Manages system users, roles, and access permissions to ensure secure and efficient data handling.',
    image: 'assets/img/funtion/users.PNG',
  },
]
</script>