<template>
  <PublicPageShell>
    <Head><Title>My Requests | City Treasurer's Office</Title></Head>
    <section class="bg-[#173a67] text-white">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p class="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Your account</p>
        <h1 class="mt-3 text-4xl font-extrabold">My Requests</h1>
        <p class="mt-4 text-white/75">Review your treasury requests and their progress.</p>
      </div>
    </section>
    <div v-if="ready" class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div><h2 class="text-xl font-bold text-slate-900">Welcome, {{ displayName }}</h2><p class="mt-1 text-sm text-slate-500">{{ userStore.user?.email }}</p></div>
        <div class="flex gap-3"><NuxtLink to="/services" class="rounded-lg bg-green-700 px-5 py-3 text-sm font-bold text-white hover:bg-green-800">New request</NuxtLink><button type="button" class="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold" @click="signOut">Sign out</button></div>
      </div>
      <p v-if="isDemo" class="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">Demo account — these are sample requests, not official records. No requests or payments have been submitted.</p>
      <div v-if="!isDemo" class="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center"><h2 class="text-xl font-bold">Request history is not yet available</h2><p class="mt-3 text-slate-600">Your account's requests will appear here once the history service is connected.</p></div>
      <template v-else>
        <div class="mt-8 flex flex-wrap gap-2" aria-label="Filter request history">
          <button v-for="filter in filters" :key="filter" type="button" :aria-pressed="activeFilter === filter" class="rounded-full border px-5 py-2.5 text-sm font-bold" :class="activeFilter === filter ? 'border-green-700 bg-green-700 text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'" @click="activeFilter = filter">{{ filter }} <span class="ml-1">({{ count(filter) }})</span></button>
        </div>
        <p class="mt-5 text-sm text-slate-500" aria-live="polite">{{ visibleRequests.length }} requests · Most recent first</p>
        <div class="mt-4 space-y-5">
          <article v-for="request in visibleRequests" :key="request.code" class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-slate-100/70 px-6 py-4">
              <div class="flex flex-wrap gap-x-10 gap-y-2"><div><p class="text-xs uppercase tracking-wider text-slate-500">Request code</p><p class="mt-1 font-bold text-[#173a67]">{{ request.code }}</p></div><div><p class="text-xs uppercase tracking-wider text-slate-500">Requested on</p><p class="mt-1 text-sm">{{ request.date }}</p></div></div>
              <span class="rounded-full px-3 py-1.5 text-xs font-bold" :class="statusColor(request.status)">{{ request.status }}</span>
            </div>
            <div class="p-6">
              <div class="flex flex-wrap items-start justify-between gap-6"><div class="flex items-start gap-4"><div class="rounded-xl bg-green-50 p-3 text-green-700"><DocumentTextIcon class="h-7 w-7" aria-hidden="true" /></div><div><h3 class="text-lg font-bold text-slate-900">{{ request.type }}</h3><p class="mt-2 text-sm text-slate-600">PIN: {{ request.pin }}</p><p class="mt-1 text-sm text-slate-600">Delivery: {{ request.delivery }}</p></div></div><p class="max-w-md text-sm leading-6 text-slate-600">{{ request.remark }}</p></div>
              <ol v-if="request.stage >= 0" class="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-4" aria-label="Request progress">
                <li v-for="(step, index) in steps" :key="step" class="border-t-4 pt-2 text-sm" :class="index <= request.stage ? 'border-green-600 font-semibold text-green-800' : 'border-slate-200 text-slate-500'" :aria-current="index === request.stage ? 'step' : undefined">{{ step }}<span class="sr-only">{{ index < request.stage ? ' completed' : index === request.stage ? ' current' : ' upcoming' }}</span></li>
              </ol>
              <details class="mt-5 border-t border-slate-100 pt-4"><summary class="cursor-pointer text-sm font-bold text-green-700">View request details</summary><dl class="mt-4 grid gap-4 text-sm sm:grid-cols-2"><div><dt class="text-slate-500">Land owner</dt><dd class="mt-1">Sample Property Owner</dd></div><div><dt class="text-slate-500">Requester</dt><dd class="mt-1">tester</dd></div><div><dt class="text-slate-500">Email</dt><dd class="mt-1">test@test.com</dd></div><div><dt class="text-slate-500">Mailing address</dt><dd class="mt-1">Sample address, Davao City</dd></div></dl></details>
            </div>
          </article>
          <p v-if="!visibleRequests.length" class="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600">No requests in this category.</p>
        </div>
      </template>
    </div>
    <p v-else class="p-12 text-center text-slate-600">Loading your account...</p>
  </PublicPageShell>
</template>

<script setup>
import { DocumentTextIcon } from '@heroicons/vue/24/outline'
import { useUserStore } from '~/store/user'
import { authService } from '~/components/api/AuthService'

const userStore = useUserStore()
const ready = ref(false)
const isDemo = ref(false)
const displayName = computed(() => userStore.user?.username || userStore.user?.name || 'Account holder')
const activeFilter = ref('All')
const filters = ['All', 'In progress', 'Completed', 'Rejected / Cancelled']
const steps = ['Received', 'Review', 'Ready', 'Completed']
const requests = [
  { code: 'DEMO-SOA-005', date: 'September 10, 2026', type: 'Statement of Account', pin: 'DEMO-PIN-005', delivery: 'PDF by email', status: 'PENDING', stage: 0, remark: 'Your request is awaiting review.' },
  { code: 'DEMO-TC-004', date: 'September 8, 2026', type: 'Tax Clearance Print', pin: 'DEMO-PIN-004', delivery: 'Printed copy', status: 'FOR REVIEW', stage: 1, remark: 'The office is checking the property and payment details.' },
  { code: 'DEMO-SOA-003', date: 'September 5, 2026', type: 'Statement of Account', pin: 'DEMO-PIN-003', delivery: 'Printed copy by postal mail', status: 'READY FOR PRINTING', stage: 2, remark: 'The document is ready for printing. It has not been mailed yet.' },
  { code: 'DEMO-SOA-002', date: 'September 1, 2026', type: 'Statement of Account', pin: 'DEMO-PIN-002', delivery: 'PDF by email', status: 'COMPLETED', stage: 3, remark: 'Sample completed request. No actual document was emailed.' },
  { code: 'DEMO-TC-001', date: 'August 28, 2026', type: 'Tax Clearance Print', pin: 'DEMO-PIN-001', delivery: 'Printed copy', status: 'REJECTED', stage: -1, remark: 'Sample review remark: property details could not be verified.' },
]
function matches(request, filter) {
  if (filter === 'All') return true
  if (filter === 'Completed') return request.status === 'COMPLETED'
  if (filter === 'Rejected / Cancelled') return ['REJECTED', 'CANCELLED'].includes(request.status)
  return !['COMPLETED', 'REJECTED', 'CANCELLED'].includes(request.status)
}
const visibleRequests = computed(() => requests.filter(request => matches(request, activeFilter.value)))
const count = filter => requests.filter(request => matches(request, filter)).length
function statusColor(status) {
  return ({ PENDING: 'bg-amber-100 text-amber-800', 'FOR REVIEW': 'bg-blue-100 text-blue-800', 'READY FOR PRINTING': 'bg-violet-100 text-violet-800', COMPLETED: 'bg-green-100 text-green-800', REJECTED: 'bg-red-100 text-red-800' })[status] || 'bg-slate-200 text-slate-800'
}
onMounted(async () => {
  isDemo.value = sessionStorage.getItem('cto-demo-session') === 'tester'
  if (isDemo.value) userStore.setUser({ username: 'tester', email: 'test@test.com', isDemo: true })
  else if (!localStorage.getItem('_token') || !userStore.user || userStore.user.isDemo) {
    await navigateTo('/login')
    return
  }
  ready.value = true
})
async function signOut() {
  if (localStorage.getItem('_token')) {
    try { await authService.logout() } catch { /* Clear this browser's session even if the server is unreachable. */ }
  }
  sessionStorage.removeItem('cto-demo-session')
  localStorage.removeItem('_token')
  userStore.resetUser()
  await navigateTo('/login')
}
</script>
