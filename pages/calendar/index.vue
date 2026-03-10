<template>
  <div class="p-6 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <button
        @click="prevMonth"
        class="rounded-lg border px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-50"
      >
        ← Prev
      </button>

      <div class="text-center">
        <h2 class="text-2xl font-bold">{{ currentMonth.format('MMMM YYYY') }}</h2>
        <p class="text-sm text-gray-500">Report schedules, deadlines, and holidays</p>
      </div>

      <button
        @click="nextMonth"
        class="rounded-lg border px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-50"
      >
        Next →
      </button>
    </div>

    <!-- Legend -->
    <div class="flex flex-wrap gap-4 mb-6 text-sm">
      <div class="flex items-center gap-2">
        <span class="w-4 h-4 rounded bg-blue-100 border border-blue-400"></span>
        <span>Report Period</span>
      </div>

      <div class="flex items-center gap-2">
        <span class="w-4 h-4 rounded bg-orange-100 border border-orange-400"></span>
        <span>Submission Deadline</span>
      </div>

      <div class="flex items-center gap-2">
        <span class="w-4 h-4 rounded bg-green-600"></span>
        <span>Holiday</span>
      </div>

      <div class="flex items-center gap-2">
        <span class="w-4 h-4 rounded border-2 border-blue-500"></span>
        <span>Today</span>
      </div>
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
      <button
        v-for="day in daysInMonth"
        :key="day.dateKey"
        type="button"
        @click="openDayModal(day)"
        :class="[
          'p-3 rounded-2xl shadow border flex flex-col justify-start min-h-[140px] text-left transition',
          'focus:outline-none focus:ring-2 focus:ring-blue-400',
          day.isHoliday
            ? 'bg-green-600 text-white border-green-700'
            : day.isDeadline
              ? 'bg-orange-100 border-orange-400 hover:shadow-lg'
              : day.isSchedule
                ? 'bg-blue-50 border-blue-400 hover:shadow-lg'
                : 'bg-white border-gray-200 hover:shadow-lg',
          day.isToday ? 'ring-2 ring-blue-500' : ''
        ]"
      >
        <div
          :class="[
            'font-bold text-lg mb-2',
            day.date.day() === 0 && !day.isHoliday ? 'text-red-500' : ''
          ]"
        >
          {{ day.date.date() }}
        </div>

        <div v-if="day.holidayName" class="text-xs font-semibold mb-2">
          🎉 {{ day.holidayName }}
        </div>

        <div class="space-y-1">
          <div
            v-for="(msg, index) in day.previewMessages"
            :key="index"
            class="text-xs rounded px-2 py-1 truncate"
            :class="day.isHoliday ? 'bg-white/20 text-white' : msg.type === 'deadline' ? 'bg-orange-200 text-orange-900' : 'bg-blue-100 text-blue-900'"
          >
            {{ msg.label }}
          </div>

          <div
            v-if="day.hiddenCount > 0"
            class="text-[11px] font-medium opacity-70"
          >
            +{{ day.hiddenCount }} more
          </div>
        </div>
      </button>
    </div>

    <!-- Day Details Modal -->
    <div
      v-if="selectedDay"
      class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      @click.self="closeDayModal"
    >
      <div class="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h3 class="text-lg font-bold">
              {{ selectedDay.date.format('MMMM D, YYYY') }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ selectedDayDetailSubtitle }}
            </p>
          </div>

          <button
            @click="closeDayModal"
            class="text-gray-500 hover:text-black text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div
            v-if="selectedDay.holidayName"
            class="rounded-xl border border-green-300 bg-green-50 p-4"
          >
            <div class="font-semibold text-green-800">Holiday</div>
            <div class="text-green-700 mt-1">{{ selectedDay.holidayName }}</div>
          </div>

          <div
            v-if="selectedDayEvents.length === 0 && !selectedDay.holidayName"
            class="text-sm text-gray-500"
          >
            No schedules or deadlines on this date.
          </div>

          <div
            v-for="(event, index) in selectedDayEvents"
            :key="index"
            class="rounded-xl border p-4"
            :class="event.type === 'deadline'
              ? 'border-orange-300 bg-orange-50'
              : 'border-blue-300 bg-blue-50'"
          >
            <div class="flex items-center justify-between gap-4">
              <div class="font-semibold">
                {{ event.type === 'deadline' ? '⏰ Submission Deadline' : '📊 Report Schedule' }}
              </div>

              <div
                class="text-xs px-2 py-1 rounded-full"
                :class="event.type === 'deadline'
                  ? 'bg-orange-200 text-orange-900'
                  : 'bg-blue-200 text-blue-900'"
              >
                {{ event.statusLabel }}
              </div>
            </div>

            <div class="mt-2 text-sm text-gray-900 font-medium">
              {{ event.name }}
            </div>

            <div v-if="event.description" class="mt-1 text-sm text-gray-600">
              {{ event.description }}
            </div>

            <div class="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div class="rounded-lg bg-white/80 border p-3">
                <div class="text-gray-500 text-xs">Start</div>
                <div class="font-medium">{{ event.date_start || '—' }}</div>
              </div>

              <div class="rounded-lg bg-white/80 border p-3">
                <div class="text-gray-500 text-xs">End</div>
                <div class="font-medium">{{ event.date_end || '—' }}</div>
              </div>

              <div class="rounded-lg bg-white/80 border p-3">
                <div class="text-gray-500 text-xs">Deadline</div>
                <div class="font-medium">{{ event.submition_deadline || '—' }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 border-t bg-gray-50 flex justify-end">
          <button
            @click="closeDayModal"
            class="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'
import { report_yearService } from '~/components/api/ReportYears'

definePageMeta({
  layout: 'main',
})

const today = dayjs()
const currentMonth = ref(dayjs())

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const schedules = ref([])
const messages = ref({})
const deadlines = ref({})
const holidays = ref({})
const selectedDay = ref(null)

const mockHolidaysFromAPI = [
  { date: '2025-08-21', name: 'Ninoy Aquino Day' },
  { date: '2025-08-25', name: 'National Heroes Day' },
  { date: '2025-11-30', name: 'Bonifacio Day' },
  { date: '2025-12-25', name: 'Christmas Day' },
]

const daysInMonth = computed(() => {
  const start = currentMonth.value.startOf('month')
  const end = currentMonth.value.endOf('month')
  const days = []

  for (let d = start; d.isBefore(end) || d.isSame(end); d = d.add(1, 'day')) {
    const dateStr = d.format('YYYY-MM-DD')
    const dayEvents = messages.value[dateStr] || []

    days.push({
      date: d,
      dateKey: dateStr,
      isToday: d.isSame(today, 'day'),
      isSchedule: dayEvents.some((x) => x.type === 'schedule'),
      isDeadline: dayEvents.some((x) => x.type === 'deadline'),
      isHoliday: holidays.value[dateStr] !== undefined,
      holidayName: holidays.value[dateStr] || '',
      events: dayEvents,
      previewMessages: dayEvents.slice(0, 2),
      hiddenCount: Math.max(dayEvents.length - 2, 0),
    })
  }

  return days
})

const blanks = computed(() => {
  return Array(currentMonth.value.startOf('month').day()).fill(null)
})

const selectedDayEvents = computed(() => {
  if (!selectedDay.value) return []
  return selectedDay.value.events || []
})

const selectedDayDetailSubtitle = computed(() => {
  if (!selectedDay.value) return ''
  const eventCount = selectedDayEvents.value.length
  if (selectedDay.value.holidayName && eventCount > 0) return 'Holiday and scheduled activities'
  if (selectedDay.value.holidayName) return 'Holiday'
  if (eventCount > 0) return `${eventCount} scheduled item${eventCount > 1 ? 's' : ''}`
  return 'No scheduled items'
})

const prevMonth = () => {
  currentMonth.value = currentMonth.value.subtract(1, 'month')
  fetchMonthData()
}

const nextMonth = () => {
  currentMonth.value = currentMonth.value.add(1, 'month')
  fetchMonthData()
}

function normalizeStatusLabel(status) {
  const n = Number(status)
  if (n === 1) return 'Open'
  if (n === 2) return 'Close - In waiting'
  if (n === 0) return 'Encoding Locked'
  return 'Unknown'
}

function openDayModal(day) {
  selectedDay.value = day
}

function closeDayModal() {
  selectedDay.value = null
}

async function fetchMonthData() {
  messages.value = {}
  deadlines.value = {}
  holidays.value = {}

  const monthStart = currentMonth.value.startOf('month')
  const monthEnd = currentMonth.value.endOf('month')

  try {
    const response = await report_yearService.getReportYears()
    schedules.value = response?.data || []

    const msgTemp = {}
    const deadlineTemp = {}

    schedules.value.forEach((schedule) => {
      const start = dayjs(schedule.date_start)
      const end = dayjs(schedule.date_end)
      const deadline = dayjs(schedule.submition_deadline)

      const baseEvent = {
        id: schedule.id,
        name: schedule.name || 'Unnamed Schedule',
        description: schedule.description || '',
        date_start: schedule.date_start || '',
        date_end: schedule.date_end || '',
        submition_deadline: schedule.submition_deadline || '',
        status: schedule.status,
        statusLabel: normalizeStatusLabel(schedule.status),
      }

      if (start.isValid() && end.isValid()) {
        for (let d = start; d.isBefore(end) || d.isSame(end); d = d.add(1, 'day')) {
          if (d.isBefore(monthStart) || d.isAfter(monthEnd)) continue

          const dateStr = d.format('YYYY-MM-DD')
          if (!msgTemp[dateStr]) msgTemp[dateStr] = []

          msgTemp[dateStr].push({
            ...baseEvent,
            type: 'schedule',
            label: `📊 ${schedule.name}`,
          })
        }
      }

      if (deadline.isValid()) {
        const deadlineStr = deadline.format('YYYY-MM-DD')

        if (
          (deadline.isSame(monthStart) || deadline.isAfter(monthStart)) &&
          (deadline.isSame(monthEnd) || deadline.isBefore(monthEnd))
        ) {
          deadlineTemp[deadlineStr] = true

          if (!msgTemp[deadlineStr]) msgTemp[deadlineStr] = []

          msgTemp[deadlineStr].push({
            ...baseEvent,
            type: 'deadline',
            label: `⏰ ${schedule.name} deadline`,
          })
        }
      }
    })

    messages.value = msgTemp
    deadlines.value = deadlineTemp
  } catch (err) {
    console.error('Schedule load error', err)
  }

  holidays.value = Object.fromEntries(
    mockHolidaysFromAPI
      .filter((h) => h.date.startsWith(currentMonth.value.format('YYYY-MM')))
      .map((h) => [h.date, h.name])
  )
}

onMounted(() => {
  fetchMonthData()
})
</script>