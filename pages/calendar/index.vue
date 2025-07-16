<template>
  <div class="p-6 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <button @click="prevMonth" class="text-gray-600 hover:text-black">← Prev</button>
      <h2 class="text-xl font-semibold">{{ currentMonth.format('MMMM YYYY') }}</h2>
      <button @click="nextMonth" class="text-gray-600 hover:text-black">Next →</button>
    </div>

    <!-- Weekday Labels -->
    <div class="grid grid-cols-7 gap-4 text-center text-sm font-semibold mb-2">
      <div
        v-for="day in weekDays"
        :key="day"
        :class="[day === 'Sun' ? 'text-red-500' : 'text-gray-500']"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-4">
      <div v-for="blank in blanks" :key="'blank-' + blank"></div>

      <!-- Day Cards -->
      <div
        v-for="day in daysInMonth"
        :key="day.date"
        :class="[
          'p-3 rounded-2xl shadow border flex flex-col justify-start min-h-[120px] text-left transition',
          day.isToday ? 'border-blue-500 ring-2 ring-blue-400' : 'border-gray-200 hover:shadow-lg',
          day.isHoliday ? 'bg-green-600 text-white' : 'bg-white'
        ]"
      >
        <div
          :class="[
            'font-bold text-lg mb-1',
            day.date.day() === 0 && !day.isHoliday ? 'text-red-500' : ''
          ]"
        >
          {{ day.date.date() }}
        </div>

        <!-- Holiday Name -->
        <div v-if="day.holidayName" class="text-sm font-semibold mb-1">
          🎉 {{ day.holidayName }}
        </div>

        <!-- Messages -->
        <ul class="text-xs space-y-1" :class="day.isHoliday ? 'text-white' : 'text-gray-700'">
          <li v-for="(msg, index) in day.messages" :key="index">• {{ msg }}</li>
          <li v-if="day.messages.length === 0 && !day.holidayName" class="text-gray-400"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'

// Simulated API responses
const mockMessagesFromAPI = {
  '2025-07-15': ['Team meeting at 10AM',  'Encoding deadline'],
  '2025-07-20': ['Project deadline'],
}
const mockHolidaysFromAPI = [
  { date: '2025-08-21', name: 'Ninoy Aquino Day' },
  { date: '2025-08-25', name: 'National Heroes Day' },
  { date: '2025-11-05', name: 'All Saints Day' },
  { date: '2025-11-30', name: 'Bonifacio Day' },
  { date: '2025-12-30', name: 'Rizal Day' },
  { date: '2025-12-08', name: 'Feast of the Immaculate Conception' },
  { date: '2025-12-25', name: 'Christmas' },
  { date: '2025-12-31', name: 'Non-Working Day' },
]

const today = dayjs()
const currentMonth = ref(dayjs())

const messages = ref({})
const holidays = ref({}) // key: dateStr, value: holiday name

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const daysInMonth = computed(() => {
  const start = currentMonth.value.startOf('month')
  const end = currentMonth.value.endOf('month')
  const days = []

  for (let d = start; d.isBefore(end) || d.isSame(end); d = d.add(1, 'day')) {
    const dateStr = d.format('YYYY-MM-DD')
    const isHoliday = holidays.value[dateStr] !== undefined
    days.push({
      date: d,
      isToday: d.isSame(today, 'day'),
      messages: messages.value[dateStr] || [],
      isHoliday,
      holidayName: holidays.value[dateStr] || ''
    })
  }

  return days
})

const blanks = computed(() => {
  return Array(currentMonth.value.startOf('month').day()).fill(null)
})

const prevMonth = () => {
  currentMonth.value = currentMonth.value.subtract(1, 'month')
  fetchMonthData()
}
const nextMonth = () => {
  currentMonth.value = currentMonth.value.add(1, 'month')
  fetchMonthData()
}

function fetchMonthData() {
  messages.value = {}
  holidays.value = {}

  setTimeout(() => {
    const monthStr = currentMonth.value.format('YYYY-MM')

    // Filter messages
    messages.value = Object.fromEntries(
      Object.entries(mockMessagesFromAPI).filter(([dateStr]) =>
        dateStr.startsWith(monthStr)
      )
    )

    // Filter holidays and convert to { dateStr: name }
    holidays.value = Object.fromEntries(
      mockHolidaysFromAPI
        .filter(h => h.date.startsWith(monthStr))
        .map(h => [h.date, h.name])
    )
  }, 300)
}

onMounted(() => {
  fetchMonthData()
})

definePageMeta({
  layout: 'main'
})

</script>