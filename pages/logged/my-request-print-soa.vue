<template>
  <PublicPageShell>
    <Head>
      <Title>
        Request SOA Print | City Treasurer's Office
      </Title>

      <Meta
        name="description"
        content="Submit and track a printed real property tax Statement of Account request."
      />
    </Head>

    <!-- Header -->
    <section class="relative overflow-hidden bg-slate-950 text-white">
      <div class="absolute inset-0 soa-header-gradient"></div>

      <div
        class="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-green-500/20 blur-3xl"
      ></div>

      <div
        class="absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl"
      ></div>

      <div
        class="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8"
      >
        <div
          class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div class="max-w-3xl">
            <NuxtLink
              to="/logged/services"
              class="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
            >
              <ArrowLeftIcon class="h-4 w-4" />

              Back to services
            </NuxtLink>

            <div
              class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
            >
              <DocumentPlusIcon class="h-4 w-4 text-emerald-300" />

              <span
                class="text-xs font-bold uppercase tracking-[0.18em] text-white/90"
              >
                Authenticated SOA Service
              </span>
            </div>

            <h1
              class="mt-6 text-4xl font-black tracking-tight sm:text-5xl"
            >
              Request SOA Print
            </h1>

            <p
              class="mt-5 max-w-2xl text-lg leading-8 text-white/75"
            >
              Submit and track Statement of Account print requests associated
              with your signed-in account.
            </p>
          </div>

          <!-- Account Summary -->
          <div
            v-if="currentUser"
            class="w-full rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md lg:max-w-sm"
          >
            <div class="flex items-center gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white"
              >
                <UserCircleIcon class="h-7 w-7" />
              </div>

              <div class="min-w-0">
                <p
                  class="text-xs font-bold uppercase tracking-[0.14em] text-emerald-300"
                >
                  Signed in as
                </p>

                <p class="mt-1 truncate font-bold text-white">
                  {{ displayName }}
                </p>

                <p class="truncate text-sm text-white/65">
                  {{ currentUser.email || 'No email provided' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading -->
    <main
      v-if="loadingAccount"
      class="mx-auto max-w-7xl px-6 py-16 lg:px-8"
    >
      <div
        class="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm"
      >
        <ArrowPathIcon
          class="mx-auto h-8 w-8 animate-spin text-green-700"
        />

        <p class="mt-4 font-semibold text-slate-700">
          Loading your account...
        </p>
      </div>
    </main>

    <!-- Main -->
    <section
      v-else
      class="mx-auto max-w-7xl px-6 py-14 lg:px-8"
    >
      <NuxtLink
        to="/logged/services"
        class="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:underline"
      >
        <ArrowLeftIcon
          class="h-4 w-4"
          aria-hidden="true"
        />

        Back to Services
      </NuxtLink>

      <div
        class="mt-6 grid items-start gap-10 lg:grid-cols-[1fr_0.72fr]"
      >
        <div class="min-w-0">
          <TabGroup>
            <TabList
              class="mb-6 flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm sm:w-fit"
            >
              <Tab
                v-for="tab in tabs"
                :key="tab.label"
                v-slot="{ selected }"
                as="template"
              >
                <button
                  type="button"
                  class="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                  :class="
                    selected
                      ? 'bg-green-700 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  "
                >
                  <component
                    :is="tab.icon"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />

                  {{ tab.label }}
                </button>
              </Tab>
            </TabList>

            <TabPanels>
              <!-- New Request -->
              <TabPanel :unmount="false">
                <div
                  class="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-base leading-7 text-blue-950"
                >
                  <div class="flex items-start gap-3">
                    <ShieldCheckIcon
                      class="mt-0.5 h-5 w-5 shrink-0 text-blue-700"
                    />

                    <div>
                      <p class="font-bold">
                        Request linked to your account
                      </p>

                      <p class="mt-1 text-sm leading-6">
                        Your account details have been loaded automatically.
                        This request will be associated with your signed-in
                        account.
                      </p>
                    </div>
                  </div>
                </div>

                <form
                  class="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  @submit.prevent="submitRequest"
                >
                  <div class="mb-6 flex items-start gap-4">
                    <div
                      class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700"
                    >
                      <DocumentPlusIcon
                        class="h-6 w-6"
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <h2 class="text-2xl font-bold text-slate-900">
                        Submit a print request
                      </h2>

                      <p class="mt-2 text-sm leading-6 text-slate-600">
                        Enter the property details for your Statement of
                        Account request.
                      </p>
                    </div>
                  </div>

                  <!-- Property -->
                  <fieldset class="mt-6">
                    <legend
                      class="text-xl font-extrabold text-[#173a67]"
                    >
                      Property details
                    </legend>

                    <div class="mt-5 grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          for="soa-pin"
                          class="field-label"
                        >
                          Property Index Number (PIN)
                        </label>

                        <input
                          id="soa-pin"
                          v-model.trim="form.pin"
                          name="pin"
                          type="text"
                          required
                          class="field-input font-mono uppercase"
                          aria-describedby="pin-help"
                          :disabled="saving"
                        />

                        <p
                          id="pin-help"
                          class="mt-2 text-sm leading-6 text-slate-500"
                        >
                          Enter the PIN as it appears on your property
                          documents.
                        </p>
                      </div>

                      <div>
                        <label
                          for="soa-land-owner"
                          class="field-label"
                        >
                          Land owner's name
                        </label>

                        <input
                          id="soa-land-owner"
                          v-model.trim="form.land_owner"
                          name="landOwner"
                          type="text"
                          required
                          class="field-input"
                          :disabled="saving"
                        />
                      </div>
                    </div>
                  </fieldset>

                  <!-- Delivery -->
                  <fieldset
                    class="mt-8 border-t border-slate-200 pt-6"
                  >
                    <legend
                      class="pr-3 text-xl font-extrabold text-[#173a67]"
                    >
                      Delivery preference
                    </legend>

                    <p class="text-sm leading-6 text-slate-600">
                      How would you like to receive your Statement of Account?
                    </p>

                    <div class="mt-4 grid gap-3 sm:grid-cols-2">
                      <label
                        class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
                        :class="
                          deliveryMethod === 'postal'
                            ? 'border-green-700 bg-green-50'
                            : 'border-slate-200 hover:border-slate-300'
                        "
                      >
                        <input
                          v-model="deliveryMethod"
                          type="radio"
                          name="deliveryMethod"
                          value="postal"
                          required
                          class="mt-1 h-4 w-4 accent-green-700"
                          :disabled="saving"
                        />

                        <span>
                          <span
                            class="block text-sm font-bold text-slate-800"
                          >
                            Printed copy by postal mail
                          </span>

                          <span
                            class="mt-1 block text-sm leading-6 text-slate-600"
                          >
                            Send a printed copy to your mailing address.
                          </span>
                        </span>
                      </label>

                      <label
                        class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
                        :class="
                          deliveryMethod === 'email'
                            ? 'border-green-700 bg-green-50'
                            : 'border-slate-200 hover:border-slate-300'
                        "
                      >
                        <input
                          v-model="deliveryMethod"
                          type="radio"
                          name="deliveryMethod"
                          value="email"
                          required
                          class="mt-1 h-4 w-4 accent-green-700"
                          :disabled="saving"
                        />

                        <span>
                          <span
                            class="block text-sm font-bold text-slate-800"
                          >
                            PDF file by email
                          </span>

                          <span
                            class="mt-1 block text-sm leading-6 text-slate-600"
                          >
                            Send a PDF copy to your email address.
                          </span>
                        </span>
                      </label>
                    </div>
                  </fieldset>

                  <!-- Requester -->
                  <fieldset
                    class="mt-8 border-t border-slate-200 pt-6"
                  >
                    <legend
                      class="pr-3 text-xl font-extrabold text-[#173a67]"
                    >
                      Requester details
                    </legend>

                    <p class="mt-1 text-sm leading-6 text-slate-600">
                      These details were loaded from your account. You may
                      review them before submitting.
                    </p>

                    <div class="mt-5 grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          for="soa-requester"
                          class="field-label"
                        >
                          Requester's name
                        </label>

                        <input
                          id="soa-requester"
                          v-model.trim="form.requester_name"
                          name="requesterName"
                          type="text"
                          autocomplete="name"
                          required
                          class="field-input"
                          :disabled="saving"
                        />
                      </div>

                      <div>
                        <label
                          for="soa-email"
                          class="field-label"
                        >
                          Email address
                        </label>

                        <input
                          id="soa-email"
                          v-model.trim="form.email"
                          name="email"
                          type="email"
                          autocomplete="email"
                          required
                          class="field-input"
                          :disabled="saving"
                        />
                      </div>

                      <div class="sm:col-span-2">
                        <label
                          for="soa-mailing-address"
                          class="field-label"
                        >
                          Mailing address
                        </label>

                        <textarea
                          id="soa-mailing-address"
                          v-model.trim="form.mailing_address"
                          name="mailingAddress"
                          autocomplete="street-address"
                          rows="3"
                          required
                          class="field-input resize-y"
                          :disabled="saving"
                        ></textarea>
                      </div>
                    </div>
                  </fieldset>

                  <!-- Error -->
                  <div
                    v-if="message"
                    role="alert"
                    class="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
                  >
                    <ExclamationCircleIcon
                      class="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                    />

                    <p class="text-sm text-red-800">
                      {{ message }}
                    </p>
                  </div>

                  <!-- Success -->
                  <div
                    v-if="savedCode"
                    role="status"
                    class="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5"
                  >
                    <div class="flex items-start gap-3">
                      <CheckCircleIcon
                        class="mt-0.5 h-6 w-6 shrink-0 text-green-700"
                      />

                      <div>
                        <p class="font-bold text-green-950">
                          Request saved
                        </p>

                        <p class="mt-2 text-sm leading-6 text-green-900">
                          Your request code is
                          <strong class="font-mono">
                            {{ savedCode }}
                          </strong>.
                        </p>

                        <p class="mt-1 text-sm text-green-800">
                          Current status:
                          <strong>PENDING</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="mt-8 flex flex-wrap gap-3 border-t border-slate-200 pt-6"
                  >
                    <button
                      type="submit"
                      :disabled="
                        saving ||
                        !!savedCode
                      "
                      class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3.5 text-base font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 sm:w-auto"
                    >
                      <ArrowPathIcon
                        v-if="saving"
                        class="h-5 w-5 animate-spin"
                      />

                      <DocumentPlusIcon
                        v-else
                        class="h-5 w-5"
                      />

                      {{
                        saving
                          ? 'Saving...'
                          : savedCode
                            ? 'Request saved'
                            : 'Submit Request'
                      }}
                    </button>

                    <button
                      v-if="savedCode"
                      type="button"
                      class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                      @click="trackSavedRequest"
                    >
                      <MagnifyingGlassIcon class="h-4 w-4" />

                      Track this request
                    </button>
                  </div>
                </form>
              </TabPanel>

              <!-- Track -->
              <TabPanel
                :unmount="false"
                class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700"
                  >
                    <MagnifyingGlassIcon
                      class="h-6 w-6"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h2 class="text-2xl font-bold text-slate-900">
                      Track your request
                    </h2>

                    <p class="mt-2 text-sm leading-6 text-slate-600">
                      Enter a request code belonging to your signed-in account.
                    </p>
                  </div>
                </div>

                <div
                  class="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-6 text-blue-950"
                >
                  For security, only requests associated with your account can
                  be viewed here.
                </div>

                <form
                  class="mt-8"
                  @submit.prevent="trackRequest"
                >
                  <label
                    for="soa-request-code"
                    class="field-label"
                  >
                    Request code
                  </label>

                  <input
                    id="soa-request-code"
                    v-model.trim="trackingCode"
                    name="requestCode"
                    type="text"
                    autocomplete="off"
                    placeholder="Enter your request code"
                    class="field-input font-mono uppercase"
                    :disabled="tracking"
                  />

                  <button
                    type="submit"
                    :disabled="
                      tracking ||
                      !trackingCode.trim()
                    "
                    class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3.5 text-base font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
                  >
                    <ArrowPathIcon
                      v-if="tracking"
                      class="h-5 w-5 animate-spin"
                    />

                    <MagnifyingGlassIcon
                      v-else
                      class="h-5 w-5"
                    />

                    {{
                      tracking
                        ? 'Checking...'
                        : 'Check request status'
                    }}
                  </button>

                  <div
                    v-if="trackingMessage"
                    role="status"
                    class="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700"
                  >
                    {{ trackingMessage }}
                  </div>

                  <div
                    v-if="trackedRequest"
                    class="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <dl class="grid gap-5 sm:grid-cols-2">
                      <div>
                        <dt class="detail-label">
                          Request code
                        </dt>

                        <dd class="detail-value font-mono">
                          {{ trackedRequest.request_code }}
                        </dd>
                      </div>

                      <div>
                        <dt class="detail-label">
                          Status
                        </dt>

                        <dd class="mt-2">
                          <span
                            class="inline-flex rounded-full px-3 py-1 text-xs font-bold"
                            :class="statusColor(trackedRequest.status)"
                          >
                            {{ trackedRequest.status }}
                          </span>
                        </dd>
                      </div>

                      <div
                        v-if="trackedRequest.remarks"
                        class="sm:col-span-2"
                      >
                        <dt class="detail-label">
                          Remarks
                        </dt>

                        <dd class="detail-value">
                          {{ trackedRequest.remarks }}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </form>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <!-- Account -->
          <div
            class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700"
            >
              <UserCircleIcon class="h-6 w-6" />
            </div>

            <h2 class="mt-5 text-xl font-bold text-slate-900">
              Your account
            </h2>

            <dl class="mt-6 space-y-5">
              <div>
                <dt class="detail-label">
                  Name
                </dt>

                <dd class="detail-value">
                  {{ displayName }}
                </dd>
              </div>

              <div>
                <dt class="detail-label">
                  Email
                </dt>

                <dd class="detail-value break-all">
                  {{ currentUser?.email || 'Not provided' }}
                </dd>
              </div>

              <div>
                <dt class="detail-label">
                  Mailing address
                </dt>

                <dd class="detail-value">
                  {{
                    currentUser?.mailing_address ||
                    'Not provided'
                  }}
                </dd>
              </div>
            </dl>

            <NuxtLink
              to="/my-requests"
              class="mt-7 inline-flex items-center gap-2 text-sm font-bold text-green-700 transition hover:text-green-900"
            >
              View My Requests

              <ArrowRightIcon class="h-4 w-4" />
            </NuxtLink>
          </div>

          <!-- How it works -->
          <div
            class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-800"
            >
              <InformationCircleIcon
                class="h-6 w-6"
                aria-hidden="true"
              />
            </div>

            <h2 class="mt-5 text-xl font-bold text-slate-900">
              How it works
            </h2>

            <ol class="mt-6 space-y-6">
              <li
                v-for="(instruction, index) in instructions"
                :key="instruction.title"
                class="flex gap-4"
              >
                <span
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white"
                >
                  {{ index + 1 }}
                </span>

                <div>
                  <h3 class="font-bold text-slate-900">
                    {{ instruction.title }}
                  </h3>

                  <p class="mt-1 text-sm leading-6 text-slate-600">
                    {{ instruction.description }}
                  </p>
                </div>
              </li>
            </ol>

            <div
              class="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5"
            >
              <p class="font-bold text-amber-900">
                Important
              </p>

              <p class="mt-1 text-sm leading-6 text-amber-800">
                Submitting a request does not automatically approve or print
                the Statement of Account. Requests are subject to review by
                the City Treasurer's Office.
              </p>
            </div>

            <div class="mt-8 border-t border-slate-200 pt-6">
              <h3 class="font-bold text-slate-900">
                Request statuses
              </h3>

              <div class="mt-4 space-y-4">
                <div
                  v-for="status in statuses"
                  :key="status.label"
                >
                  <span
                    class="inline-flex rounded-full px-3 py-1 text-xs font-bold"
                    :class="status.color"
                  >
                    {{ status.label }}
                  </span>

                  <p class="mt-1 text-sm leading-6 text-slate-600">
                    {{ status.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </PublicPageShell>
</template>

<script setup lang="ts">
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/vue'

import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  DocumentPlusIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'

import { useUserStore } from '~/store/user'

definePageMeta({
  middleware: 'auth',
})

interface AuthenticatedUser {
  id: string
  username?: string
  fname?: string
  mname?: string | null
  lname?: string
  email?: string
  mailing_address?: string | null
}

interface MeResponse {
  data?: AuthenticatedUser
}

interface UserRequestData {
  request_code?: string
  status?: string
  remarks?: string | null
}

interface UserRequestResponse {
  data?: UserRequestData
  message?: string
}

const config = useRuntimeConfig()
const userStore = useUserStore()

const loadingAccount = ref(true)
const currentUser =
  ref<AuthenticatedUser | null>(null)

const saving = ref(false)
const savedCode = ref('')
const message = ref('')

const trackingCode = ref('')
const tracking = ref(false)
const trackingMessage = ref('')

const trackedRequest =
  ref<UserRequestData | null>(null)

const deliveryMethod = ref('postal')

const form = reactive({
  pin: '',
  land_owner: '',
  requester_name: '',
  mailing_address: '',
  email: '',
})

const displayName = computed(() => {
  const user = currentUser.value

  if (!user) {
    return 'Account holder'
  }

  const fullName = [
    user.fname,
    user.mname,
    user.lname,
  ]
    .filter(
      (value): value is string =>
        typeof value === 'string' &&
        value.trim() !== '',
    )
    .join(' ')
    .trim()

  return (
    fullName ||
    user.username ||
    'Account holder'
  )
})

function getApiBaseUrl(): string {
  return String(
    config.public.apiBaseUrl || '',
  ).replace(/\/+$/, '')
}

function getToken(): string {
  if (!import.meta.client) {
    return ''
  }

  return localStorage.getItem('_token') || ''
}

function authHeaders(): Record<string, string> {
  const token = getToken()

  return {
    Accept: 'application/json',

    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
  }
}

async function redirectToLogin(): Promise<void> {
  if (import.meta.client) {
    localStorage.removeItem('_token')
  }

  userStore.resetUser()

  await navigateTo('/login')
}

function getFullName(
  user: AuthenticatedUser,
): string {
  const name = [
    user.fname,
    user.mname,
    user.lname,
  ]
    .filter(
      (value): value is string =>
        typeof value === 'string' &&
        value.trim() !== '',
    )
    .join(' ')
    .trim()

  return name || user.username || ''
}

async function loadAccount(): Promise<void> {
  const apiBaseUrl = getApiBaseUrl()
  const token = getToken()

  if (!apiBaseUrl || !token) {
    await redirectToLogin()
    return
  }

  try {
    const response =
      await $fetch<MeResponse>(
        `${apiBaseUrl}/me`,
        {
          method: 'GET',
          headers: authHeaders(),
        },
      )

    if (!response?.data) {
      await redirectToLogin()
      return
    }

    currentUser.value = response.data
    userStore.setUser(response.data)

    form.requester_name =
      getFullName(response.data)

    form.mailing_address =
      response.data.mailing_address || ''

    form.email =
      response.data.email || ''
  } catch {
    await redirectToLogin()
  } finally {
    loadingAccount.value = false
  }
}

async function submitRequest(): Promise<void> {
  if (
    saving.value ||
    savedCode.value
  ) {
    return
  }

  const apiBaseUrl = getApiBaseUrl()

  if (!apiBaseUrl) {
    message.value =
      'The application API is not configured.'

    return
  }

  saving.value = true
  message.value = ''

  try {
    const response =
      await $fetch<UserRequestResponse>(
        `${apiBaseUrl}/user-requests/soa`,
        {
          method: 'POST',

          headers: authHeaders(),

          body: {
            request_type:
              'SOA_PRINT',

            pin:
              form.pin
                .trim()
                .toUpperCase(),

            land_owner:
              form.land_owner.trim(),

            requester_name:
              form.requester_name.trim(),

            mailing_address:
              form.mailing_address.trim(),

            email:
              form.email
                .trim()
                .toLowerCase(),

            delivery_preference:
              deliveryMethod.value.toUpperCase(),
          },
        },
      )

    const requestCode =
      response?.data?.request_code
        ?.trim()
        .toUpperCase()

    if (!requestCode) {
      throw new Error(
        'The server did not return a request code.',
      )
    }

    savedCode.value = requestCode
    trackingCode.value = requestCode
  } catch (error: any) {
    const status =
      error?.statusCode ??
      error?.status ??
      error?.response?.status

    if (status === 401) {
      await redirectToLogin()
      return
    }

    if (status === 403) {
      message.value =
        'You do not have permission to submit this request.'

      return
    }

    if (
      status === 400 ||
      status === 422
    ) {
      message.value =
        error?.data?.message ||
        'Please review the information you entered.'

      return
    }

    if (status === 429) {
      message.value =
        'Too many requests have been submitted. Please wait before trying again.'

      return
    }

    if (
      status === 502 ||
      status === 503 ||
      (status && status >= 500)
    ) {
      message.value =
        'The request service is temporarily unavailable. Please try again later.'

      return
    }

    message.value =
      error?.data?.message ||
      error?.message ||
      'Unable to save the request. Please try again.'
  } finally {
    saving.value = false
  }
}

async function trackRequest(): Promise<void> {
  if (
    tracking.value ||
    !trackingCode.value.trim()
  ) {
    return
  }

  const apiBaseUrl = getApiBaseUrl()

  if (!apiBaseUrl) {
    trackingMessage.value =
      'The application API is not configured.'

    return
  }

  const code =
    trackingCode.value
      .trim()
      .toUpperCase()

  trackingCode.value = code

  tracking.value = true
  trackingMessage.value = ''
  trackedRequest.value = null

  try {
    const response =
      await $fetch<UserRequestResponse>(
        `${apiBaseUrl}/user-requests/${encodeURIComponent(code)}`,
        {
          method: 'GET',
          headers: authHeaders(),
        },
      )

    const request = response?.data

    if (!request) {
      trackingMessage.value =
        'Request not found for your account.'

      return
    }

    const status =
      request.status
        ?.trim()
        .toUpperCase() ||
      'UNKNOWN'

    trackedRequest.value = {
      ...request,
      request_code:
        request.request_code ||
        code,
      status,
    }

    trackingMessage.value =
      `Current status: ${status}`
  } catch (error: any) {
    const status =
      error?.statusCode ??
      error?.status ??
      error?.response?.status

    if (status === 401) {
      await redirectToLogin()
      return
    }

    if (status === 404) {
      trackingMessage.value =
        'No request with that code was found for your account.'

      return
    }

    if (status === 429) {
      trackingMessage.value =
        'Too many tracking requests. Please wait before trying again.'

      return
    }

    trackingMessage.value =
      error?.data?.message ||
      'Request tracking is currently unavailable.'
  } finally {
    tracking.value = false
  }
}

async function trackSavedRequest(): Promise<void> {
  if (!savedCode.value) {
    return
  }

  trackingCode.value =
    savedCode.value

  await nextTick()
}

function statusColor(
  status?: string,
): string {
  const normalized =
    status
      ?.trim()
      .toUpperCase() || ''

  switch (normalized) {
    case 'PENDING':
      return 'bg-amber-100 text-amber-800'

    case 'FOR REVIEW':
      return 'bg-blue-100 text-blue-800'

    case 'APPROVED':
      return 'bg-emerald-100 text-emerald-800'

    case 'READY FOR PRINTING':
      return 'bg-violet-100 text-violet-800'

    case 'COMPLETED':
      return 'bg-green-100 text-green-800'

    case 'REJECTED':
      return 'bg-red-100 text-red-800'

    case 'CANCELLED':
      return 'bg-slate-200 text-slate-800'

    default:
      return 'bg-slate-200 text-slate-800'
  }
}

const tabs = [
  {
    label: 'New request',
    icon: DocumentPlusIcon,
  },
  {
    label: 'Track request',
    icon: MagnifyingGlassIcon,
  },
]

const instructions = [
  {
    title: 'Enter the property details',
    description:
      'Provide the PIN and the name of the property owner.',
  },
  {
    title: 'Choose your delivery preference',
    description:
      'Select a printed copy by postal mail or a PDF copy by email.',
  },
  {
    title: 'Submit your request',
    description:
      'The request is saved under your signed-in account for review.',
  },
  {
    title: 'Track the request',
    description:
      'Use the request code or visit My Requests to check its progress.',
  },
]

const statuses = [
  {
    label: 'PENDING',
    description:
      'The request was received and is awaiting review.',
    color:
      'bg-amber-100 text-amber-800',
  },
  {
    label: 'FOR REVIEW',
    description:
      'The request is being checked by the office.',
    color:
      'bg-blue-100 text-blue-800',
  },
  {
    label: 'APPROVED',
    description:
      'The request was approved for processing.',
    color:
      'bg-emerald-100 text-emerald-800',
  },
  {
    label: 'READY FOR PRINTING',
    description:
      'The requested document is ready for printing.',
    color:
      'bg-violet-100 text-violet-800',
  },
  {
    label: 'COMPLETED',
    description:
      'The request has been completed.',
    color:
      'bg-green-100 text-green-800',
  },
  {
    label: 'REJECTED',
    description:
      'The request was not approved.',
    color:
      'bg-red-100 text-red-800',
  },
  {
    label: 'CANCELLED',
    description:
      'The request was cancelled.',
    color:
      'bg-slate-200 text-slate-800',
  },
]

onMounted(() => {
  void loadAccount()
})
</script>

<style scoped>
.soa-header-gradient {
  background:
    radial-gradient(
      circle at top right,
      rgba(22, 163, 74, 0.3),
      transparent 38%
    ),
    linear-gradient(
      135deg,
      rgba(2, 12, 27, 0.99),
      rgba(5, 55, 45, 0.94)
    );
}

.field-label {
  @apply block text-sm font-bold text-slate-700;
}

.field-input {
  @apply mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500;
}

.detail-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(100 116 139);
}

.detail-value {
  margin-top: 0.4rem;
  overflow-wrap: anywhere;
  font-size: 0.95rem;
  font-weight: 700;
  color: rgb(15 23 42);
}
</style>