<template>
  <PublicPageShell>
    <Head>
      <Title>
        Services | City Treasurer's Office
      </Title>

      <Meta
        name="description"
        content="Access authenticated City Treasurer's Office services for tax clearance and Statement of Account requests."
      />
    </Head>

    <!-- Hero -->
    <section class="relative overflow-hidden bg-slate-950 text-white">
      <div class="absolute inset-0 services-header-gradient"></div>

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
            <div
              class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm"
            >
              <Squares2X2Icon class="h-4 w-4 text-emerald-300" />

              <span
                class="text-xs font-bold uppercase tracking-[0.18em] text-white/90"
              >
                Online Government Services
              </span>
            </div>

            <h1
              class="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl"
            >
              My Services
            </h1>

            <p
              class="mt-5 max-w-2xl text-base leading-8 text-white/75 sm:text-lg"
            >
              Access verification services and submit treasury requests using
              your signed-in City Treasurer's Office account.
            </p>
          </div>

          <!-- Signed-in account summary -->
          <div
            v-if="ready"
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
                  {{ userStore.user?.email || 'No email provided' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading -->
    <main
      v-if="!ready"
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
    <main
      v-else
      class="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16"
    >
      <!-- Account Actions -->
      <section
        class="mb-10 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p
            class="text-xs font-bold uppercase tracking-[0.15em] text-green-700"
          >
            Account Services
          </p>

          <h2 class="mt-2 text-2xl font-black text-slate-900">
            Welcome, {{ displayName }}
          </h2>

          <p class="mt-2 text-sm leading-6 text-slate-600">
            Select a service below or review requests already submitted through
            your account.
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <NuxtLink
            to="/my-requests"
            class="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-800"
          >
            <ClipboardDocumentListIcon class="h-4 w-4" />

            My Requests
          </NuxtLink>

          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            @click="signOut"
          >
            <ArrowRightOnRectangleIcon class="h-4 w-4" />

            Sign out
          </button>
        </div>
      </section>

      <!-- Section Heading -->
      <section
        class="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-8"
      >
        <div>
          <p
            class="text-xs font-bold uppercase tracking-[0.16em] text-green-700"
          >
            Quick Services
          </p>

          <h2 class="mt-2 text-3xl font-black text-slate-900">
            Choose a service
          </h2>
        </div>

        <p class="text-base leading-7 text-slate-600">
          Verification services confirm whether a document exists in the
          official records. Request services are linked to your authenticated
          account.
        </p>
      </section>

      <!-- Service Cards -->
      <section class="mt-8 grid gap-6 md:grid-cols-2">
        <NuxtLink
          v-for="service in services"
          :key="service.to"
          :to="service.to"
          class="group relative flex min-h-[280px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
        >
          <!-- top accent -->
          <div
            class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-600 via-emerald-500 to-cyan-500 opacity-0 transition group-hover:opacity-100"
          ></div>

          <div class="flex items-start justify-between gap-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700 transition group-hover:bg-green-700 group-hover:text-white"
            >
              <component
                :is="service.icon"
                class="h-6 w-6"
                aria-hidden="true"
              />
            </div>

            <span
              class="inline-flex rounded-full px-3 py-1 text-xs font-bold"
              :class="service.statusClass"
            >
              {{ service.status }}
            </span>
          </div>

          <div class="mt-6 flex-1">
            <p
              v-if="service.accountService"
              class="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-green-700"
            >
              Account service
            </p>

            <h3
              class="text-xl font-black tracking-tight text-slate-900 transition group-hover:text-green-800"
            >
              {{ service.title }}
            </h3>

            <p class="mt-3 text-sm leading-7 text-slate-600">
              {{ service.description }}
            </p>
          </div>

          <div
            class="mt-7 flex items-center justify-between border-t border-slate-100 pt-5"
          >
            <span class="text-sm font-bold text-green-700">
              {{ service.action }}
            </span>

            <ArrowRightIcon
              class="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-green-700"
            />
          </div>
        </NuxtLink>
      </section>

      <!-- Request Services -->
      <section
        class="mt-12 rounded-3xl bg-slate-900 p-7 text-white sm:p-8"
      >
        <div
          class="grid gap-7 lg:grid-cols-[auto_1fr_auto] lg:items-center"
        >
          <div
            class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-emerald-300"
          >
            <ShieldCheckIcon class="h-7 w-7" />
          </div>

          <div>
            <p
              class="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300"
            >
              Authenticated Requests
            </p>

            <h2 class="mt-2 text-2xl font-black">
              Requests are linked to your account
            </h2>

            <p class="mt-3 max-w-3xl text-sm leading-7 text-white/70">
              Tax Clearance and Statement of Account requests submitted from
              this page are associated with your signed-in account. You can
              review their progress from My Requests.
            </p>
          </div>

          <NuxtLink
            to="/my-requests"
            class="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
          >
            <ClipboardDocumentListIcon class="h-4 w-4" />

            View My Requests
          </NuxtLink>
        </div>
      </section>

      <!-- Preparation note -->
      <section
        class="mt-10 overflow-hidden rounded-3xl border border-amber-200 bg-amber-50"
      >
        <div class="flex items-start gap-4 p-6 sm:p-7">
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700"
          >
            <InformationCircleIcon class="h-6 w-6" />
          </div>

          <div>
            <h3 class="font-black text-amber-950">
              Before using an online service
            </h3>

            <p class="mt-2 text-sm leading-7 text-amber-900">
              Prepare the PIN, SOA number, tax clearance verification code, or
              other property information required by the service you select.
            </p>
          </div>
        </div>
      </section>
    </main>
  </PublicPageShell>
</template>

<script setup lang="ts">
import {
  ArrowPathIcon,
  ArrowRightIcon,
  ArrowRightOnRectangleIcon,
  ClipboardDocumentListIcon,
  DocumentMagnifyingGlassIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  PrinterIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'

import { useUserStore } from '~/store/user'
import { authService } from '~/api/AuthService'

definePageMeta({
  middleware: 'auth',
})

const userStore = useUserStore()

const ready = ref(false)

const displayName = computed(() => {
  const user = userStore.user

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

const services = [
  {
    title: 'Tax Clearance Verification',
    description:
      'Verify the authenticity and validity of a tax clearance using its QR verification code.',
    to: '/verify',
    icon: ShieldCheckIcon,
    status: 'Available',
    statusClass: 'bg-emerald-100 text-emerald-800',
    action: 'Verify Tax Clearance',
    accountService: false,
  },

  {
    title: 'SOA Verification',
    description:
      'Verify a real property tax Statement of Account using the SOA number printed on the document.',
    to: '/verify_soa',
    icon: DocumentMagnifyingGlassIcon,
    status: 'Available',
    statusClass: 'bg-emerald-100 text-emerald-800',
    action: 'Verify SOA',
    accountService: false,
  },

  {
    title: 'Request Tax Clearance Print',
    description:
      'Submit a Tax Clearance print request using your authenticated account.',
    to: '/logged/my-tax-clearance-request',
    icon: PrinterIcon,
    status: 'Signed in',
    statusClass: 'bg-blue-100 text-blue-800',
    action: 'Request Tax Clearance',
    accountService: true,
  },

  {
    title: 'Request SOA Print',
    description:
      'Submit a Statement of Account print request using your authenticated account.',
    to: '/logged/my-request-print-soa',
    icon: DocumentTextIcon,
    status: 'Signed in',
    statusClass: 'bg-blue-100 text-blue-800',
    action: 'Request SOA',
    accountService: true,
  },
]

onMounted(() => {
  /*
   * The auth middleware already verifies the token.
   *
   * userStore should normally have the user after login.
   * If the store survives navigation through Pinia persistence,
   * no additional request is required here.
   */
  ready.value = true
})

async function signOut(): Promise<void> {
  try {
    await authService.logout()
  } catch {
    /*
     * The local session is still removed if
     * Laravel is temporarily unavailable.
     */
  }

  if (import.meta.client) {
    localStorage.removeItem('_token')
    sessionStorage.removeItem('_token')
    sessionStorage.removeItem(
      'cto-demo-session',
    )
  }

  userStore.resetUser()

  await navigateTo('/login')
}
</script>

<style scoped>
.services-header-gradient {
  background:
    radial-gradient(
      circle at top right,
      rgba(22, 163, 74, 0.3),
      transparent 38%
    ),
    radial-gradient(
      circle at bottom left,
      rgba(16, 185, 129, 0.12),
      transparent 42%
    ),
    linear-gradient(
      135deg,
      rgba(2, 12, 27, 0.99),
      rgba(5, 55, 45, 0.96)
    );
}
</style>