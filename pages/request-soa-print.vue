<template>
  <PublicPageShell>
    <Head>
      <Title>Request SOA Print | City Treasurer's Office</Title>
      <Meta name="description" content="Prepare a request for a printed real property tax Statement of Account." />
    </Head>

    <section class="bg-[#173a67] text-white">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p class="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Online government services</p>
        <h1 class="mt-4 text-4xl font-extrabold sm:text-5xl">Request SOA Print</h1>
        <p class="mt-5 max-w-2xl text-lg leading-8 text-white/75">Provide the property and requester details for a printed Statement of Account.</p>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <NuxtLink to="/services" class="inline-flex items-center gap-2 text-sm font-bold text-[#15803d] hover:underline">
        <ArrowLeftIcon class="h-4 w-4" aria-hidden="true" /> Back to Services
      </NuxtLink>

      <div class="mt-6 grid items-start gap-10 lg:grid-cols-[1fr_0.72fr]">
      <div class="min-w-0">
      <TabGroup>
        <TabList class="mb-6 flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm sm:w-fit">
          <Tab v-for="tab in tabs" :key="tab.label" v-slot="{ selected }" as="template">
            <button type="button" class="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700" :class="selected ? 'bg-green-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'">
              <component :is="tab.icon" class="h-5 w-5" aria-hidden="true" />{{ tab.label }}
            </button>
          </Tab>
        </TabList>
        <TabPanels>
        <TabPanel :unmount="false">
      <div id="submission-notice" class="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-base leading-7 text-amber-950">
        <p class="font-bold">{{ authenticated ? 'Submit your SOA request' : 'Sign in to submit a request' }}</p>
        <p class="mt-1"><span v-if="authenticated">Your request will be saved for review. Printing and delivery are not automatic.</span><NuxtLink v-else to="/login" class="font-bold underline">Sign in to your account</NuxtLink></p>
      </div>

      <form class="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-describedby="submission-notice" @submit.prevent="submitRequest">
        <div class="mb-6 flex items-start gap-4">
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700"><DocumentPlusIcon class="h-6 w-6" aria-hidden="true" /></div>
          <div><h2 class="text-2xl font-bold text-slate-900">Submit a print request</h2><p class="mt-2 text-sm leading-6 text-slate-600">Enter the property details and contact information for your SOA request.</p></div>
        </div>
        <p class="text-sm text-slate-600">All fields are required.</p>

        <fieldset class="mt-6">
          <legend class="text-xl font-extrabold text-[#173a67]">Property details</legend>
          <div class="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <label for="soa-pin" class="field-label">Property Index Number (PIN)</label>
              <input id="soa-pin" v-model.trim="form.pin" name="pin" type="text" required class="field-input" aria-describedby="pin-help" />
              <p id="pin-help" class="mt-2 text-sm leading-6 text-slate-500">Enter the PIN as it appears on your property documents.</p>
            </div>
            <div>
              <label for="soa-land-owner" class="field-label">Land owner's name</label>
              <input id="soa-land-owner" v-model.trim="form.land_owner" name="landOwner" type="text" required class="field-input" />
            </div>
          </div>
        </fieldset>

        <fieldset class="mt-8 border-t border-slate-200 pt-6">
          <legend class="pr-3 text-xl font-extrabold text-[#173a67]">Delivery preference</legend>
          <p class="text-sm leading-6 text-slate-600">How would you like to receive your Statement of Account?</p>
          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <label class="flex cursor-pointer items-start gap-3 rounded-xl border p-4" :class="deliveryMethod === 'postal' ? 'border-green-700 bg-green-50' : 'border-slate-200'">
              <input v-model="deliveryMethod" type="radio" name="deliveryMethod" value="postal" required class="mt-1 h-4 w-4 accent-green-700" />
              <span><span class="block text-sm font-bold text-slate-800">Printed copy by postal mail</span><span class="mt-1 block text-sm leading-6 text-slate-600">Send a printed copy to your mailing address.</span></span>
            </label>
            <label class="flex cursor-pointer items-start gap-3 rounded-xl border p-4" :class="deliveryMethod === 'email' ? 'border-green-700 bg-green-50' : 'border-slate-200'">
              <input v-model="deliveryMethod" type="radio" name="deliveryMethod" value="email" required class="mt-1 h-4 w-4 accent-green-700" />
              <span><span class="block text-sm font-bold text-slate-800">PDF file by email</span><span class="mt-1 block text-sm leading-6 text-slate-600">Send a PDF copy to your email address.</span></span>
            </label>
          </div>
        </fieldset>

        <fieldset class="mt-8 border-t border-slate-200 pt-6">
          <legend class="pr-3 text-xl font-extrabold text-[#173a67]">Requester details</legend>
          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <label for="soa-requester" class="field-label">Requester's name</label>
              <input id="soa-requester" v-model.trim="form.requester_name" name="requesterName" type="text" autocomplete="name" required class="field-input" />
            </div>
            <div>
              <label for="soa-email" class="field-label">Email address</label>
              <input id="soa-email" v-model.trim="form.email" name="email" type="email" autocomplete="email" required class="field-input" />
            </div>
            <div class="sm:col-span-2">
              <label for="soa-mailing-address" class="field-label">Mailing address</label>
              <textarea id="soa-mailing-address" v-model.trim="form.mailing_address" name="mailingAddress" autocomplete="street-address" rows="3" required class="field-input resize-y"></textarea>
            </div>
          </div>
        </fieldset>

        <p v-if="message" role="alert" class="mt-6 text-red-700">{{ message }}</p>
        <div v-if="savedCode" role="status" class="mt-6 rounded-xl bg-green-50 p-5 text-green-900">Request saved. Your request code is <strong class="break-all">{{ savedCode }}</strong>. Status: PENDING.</div>
        <div class="mt-8 border-t border-slate-200 pt-6">
          <button type="submit" :disabled="!authenticated || saving || !!savedCode" aria-describedby="submission-notice" class="w-full rounded-md bg-green-700 px-6 py-3.5 text-base font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 sm:w-auto">{{ saving ? 'Saving...' : savedCode ? 'Request saved' : 'Submit Request' }}</button>
        </div>
      </form>
        </TabPanel>
        <TabPanel :unmount="false" class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div class="flex items-start gap-4">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700"><MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" /></div>
            <div><h2 class="text-2xl font-bold text-slate-900">Track your request</h2><p class="mt-2 text-sm leading-6 text-slate-600">Use your request code to check the status of your SOA print request while signed in.</p></div>
          </div>
          <div id="tracking-notice" class="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">Sign in and enter a request code to view a request belonging to your account.</div>
          <form class="mt-8" @submit.prevent="trackRequest">
            <label for="soa-request-code" class="field-label">Request code</label>
            <input id="soa-request-code" v-model.trim="trackingCode" name="requestCode" type="text" autocomplete="off" placeholder="Enter your request code" class="field-input" aria-describedby="tracking-notice" />
            <button type="submit" :disabled="!authenticated || tracking" aria-describedby="tracking-notice" class="mt-6 w-full rounded-xl bg-green-700 px-6 py-3.5 text-base font-bold text-white disabled:bg-slate-200 disabled:text-slate-500">{{ tracking ? 'Checking...' : 'Check request status' }}</button><p role="status" class="mt-4 text-slate-700">{{ trackingMessage }}</p>
          </form>
        </TabPanel>
        </TabPanels>
      </TabGroup>
      </div>

      <aside class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-800"><InformationCircleIcon class="h-6 w-6" aria-hidden="true" /></div>
        <h2 class="mt-5 text-xl font-bold text-slate-900">How it works</h2>
        <p class="mt-2 text-sm leading-6 text-slate-600">For signed-in users:</p>
        <ol class="mt-6 space-y-6">
          <li v-for="(instruction, index) in instructions" :key="instruction.title" class="flex gap-4">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">{{ index + 1 }}</span>
            <div><h3 class="font-bold text-slate-900">{{ instruction.title }}</h3><p class="mt-1 text-sm leading-6 text-slate-600">{{ instruction.description }}</p></div>
          </li>
        </ol>
        <div class="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p class="font-bold text-amber-900">Important</p>
          <p class="mt-1 text-sm leading-6 text-amber-800">Submitting a request does not automatically approve or print the Statement of Account. Requests are subject to review by the City Treasurer's Office.</p>
        </div>
        <div class="mt-8 border-t border-slate-200 pt-6">
          <h3 class="font-bold text-slate-900">Request statuses</h3>
          <div class="mt-4 space-y-4">
            <div v-for="status in statuses" :key="status.label">
              <span class="inline-flex rounded-full px-3 py-1 text-xs font-bold" :class="status.color">{{ status.label }}</span>
              <p class="mt-1 text-sm leading-6 text-slate-600">{{ status.description }}</p>
            </div>
          </div>
        </div>
      </aside>
      </div>
    </section>
  </PublicPageShell>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { ArrowLeftIcon, DocumentPlusIcon, InformationCircleIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const config = useRuntimeConfig()
const authenticated = ref(false)
const saving = ref(false)
const savedCode = ref('')
const message = ref('')
const trackingCode = ref('')
const tracking = ref(false)
const trackingMessage = ref('')
const form = reactive({ pin: '', land_owner: '', requester_name: '', mailing_address: '', email: '' })
const headers = () => ({ Authorization: 'Bearer ' + localStorage.getItem('_token') })
onMounted(async () => {
  if (!localStorage.getItem('_token')) return
  try {
    const response = await $fetch<any>(config.public.apiBaseURL + '/me', { headers: headers() })
    authenticated.value = true
    form.requester_name = response.data.username || ''
    form.mailing_address = response.data.mailing_address || ''
    form.email = response.data.email || ''
  } catch { authenticated.value = false }
})
async function submitRequest() {
  if (!authenticated.value || saving.value || savedCode.value) return
  saving.value = true
  message.value = ''
  try {
    const response = await $fetch<any>(config.public.apiBaseURL + '/user-requests/soa', {
      method: 'POST', headers: headers(), body: { ...form, delivery_preference: deliveryMethod.value.toUpperCase() },
    })
    savedCode.value = response.data.request_code
    trackingCode.value = savedCode.value
  } catch (error: any) {
    message.value = error?.data?.message || 'Unable to save the request. Please try again.'
    if (error?.status === 401) authenticated.value = false
  } finally { saving.value = false }
}
async function trackRequest() {
  if (!authenticated.value || tracking.value || !trackingCode.value) return
  tracking.value = true
  try {
    const response = await $fetch<any>(config.public.apiBaseURL + '/user-requests/' + encodeURIComponent(trackingCode.value), { headers: headers() })
    trackingMessage.value = 'Status: ' + response.data.status
  } catch { trackingMessage.value = 'Request not found for your account, or tracking is unavailable.' }
  finally { tracking.value = false }
}
const tabs = [
  { label: 'New request', icon: DocumentPlusIcon },
  { label: 'Track request', icon: MagnifyingGlassIcon },
]
const deliveryMethod = ref('postal')
const instructions = [
  { title: 'Enter the property details', description: 'Provide the PIN and the name of its land owner.' },
  { title: 'Choose delivery and provide your details', description: 'Choose a printed copy by postal mail or a PDF by email, then enter your name, mailing address, and email address.' },
  { title: 'Save your request code', description: 'Keep the request code provided after submission.' },
  { title: 'Track the request', description: 'Use the Track request tab to check the status and remarks.' },
]
const statuses = [
  { label: 'PENDING', description: 'The request was received and is awaiting review.', color: 'bg-amber-100 text-amber-800' },
  { label: 'FOR REVIEW', description: 'The request is being checked by the office.', color: 'bg-blue-100 text-blue-800' },
  { label: 'APPROVED', description: 'The request was approved for processing.', color: 'bg-emerald-100 text-emerald-800' },
  { label: 'READY FOR PRINTING', description: 'The requested document is ready for printing.', color: 'bg-violet-100 text-violet-800' },
  { label: 'COMPLETED', description: 'The request has been completed.', color: 'bg-green-100 text-green-800' },
  { label: 'REJECTED', description: 'The request was not approved.', color: 'bg-red-100 text-red-800' },
  { label: 'CANCELLED', description: 'The request was cancelled.', color: 'bg-slate-200 text-slate-800' },
]
</script>

<style scoped>
.field-label {
  @apply block text-sm font-bold text-slate-700;
}

.field-input {
  @apply mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-base text-slate-800 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20;
}
</style>
