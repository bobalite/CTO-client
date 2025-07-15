<template>
  <span class="text-3xl md:text-4xl font-bold text-primary">
    {{ displayedValue }}
  </span>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  end: { type: Number, required: true },
  duration: { type: Number, default: 1000 },
})

const displayedValue = ref(0)

onMounted(() => {
  const start = 0
  const end = props.end
  const duration = props.duration
  const stepTime = Math.max(Math.floor(duration / end), 20)

  let current = start
  const timer = setInterval(() => {
    current++
    displayedValue.value = current
    if (current >= end) clearInterval(timer)
  }, stepTime)
})
</script>