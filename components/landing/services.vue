<template>
  <section id="services" class="services section">
    <div class="container">
      <div class="row gy-4">
        <div
          class="col-md-4"
          v-for="(service, index) in services"
          :key="index"
          :data-aos="'fade-up'"
          :data-aos-delay="(index + 1) * 100"
        >
          <div class="service-item d-flex position-relative h-100">
            <i :class="service.icon + ' icon flex-shrink-0'"></i>
            <div>
              <h4 class="title">
                <NuxtLink to="service-details.html">{{ service.title }}</NuxtLink>
              </h4>
              <p class="description">{{ service.description }}</p>
              <img :src="service.image" alt="" class="img-fluid mt-3" />
            </div>
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
    description:
      'Generates comprehensive reports and visual analytics to assess child welfare data and trends.',
    icon: 'bi bi-clipboard-data',
    image: '/assets/img/funtion/dashboard.PNG'
  },
  {
    title: 'Sectioned Rights Encoding',
    description:
      'Organizes and records data based on child rights categories for accurate monitoring and evaluation.',
    icon: 'bi bi-diagram-3',
    image: '/assets/img/funtion/dataentry.PNG'
  },
  {
    title: 'User Management',
    description:
      'Manages system users, roles, and access permissions to ensure secure and efficient data handling.',
    icon: 'bi bi-sliders',
    image: '/assets/img/funtion/users.PNG'
  }
]
</script>