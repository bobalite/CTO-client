<template>
  <section id="featured-services" class="featured-services section dark-background">
    <div class="container">
      <div class="row gy-4">
        <div
          class="col-lg-4 col-md-6 service-item d-flex"
          v-for="(item, index) in services"
          :key="index"
          :data-aos="'fade-up'"
          :data-aos-delay="(index + 1) * 100"
        >
          <div class="icon flex-shrink-0"><i :class="item.icon"></i></div>
          <div>
            <h4 class="title">{{ item.title }}</h4>
            <p class="description">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    title: 'Child Rights Situational Analysis',
    description:
      "Enables agencies to input, manage, and analyze data on children's welfare across key indicators.",
    icon: 'bi bi-briefcase'
  },
  {
    title: 'Data Source Tracker',
    description:
      'Monitors data submission progress, ensuring timely and accurate reporting.',
    icon: 'bi bi-card-checklist'
  },
  {
    title: 'Accomplishment Reports',
    description:
      'Provides visual comparisons of accomplishments versus projections, offering insights into child welfare trends.',
    icon: 'bi bi-bar-chart'
  }
]
</script>