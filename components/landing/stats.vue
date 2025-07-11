<template>
  <section id="stats" class="stats section light-background">
    <div class="container">
      <div class="row gy-4">
        <div class="col-lg-3 col-md-6" v-for="(stat, index) in stats" :key="index">
          <div class="stats-item text-center w-100 h-100">
            <span class="purecounter" :data-purecounter-end="stat.value"></span>
            <p>{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: 232, label: 'Over all Children Served' },
  { value: 521, label: 'Total Agencies' },
  { value: 1453, label: 'Child Welfare Services' },
  { value: 32, label: 'Programs' }
]
</script>