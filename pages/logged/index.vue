<template>
  <PublicPageShell>
    <Head>
      <Title>
        My Requests | City Treasurer's Office
      </Title>

      <Meta
        name="description"
        content="Review your City Treasurer's Office service requests and their current status."
      />
    </Head>

    <!-- Hero -->
    <section class="relative overflow-hidden bg-slate-950 text-white">
      <div class="absolute inset-0 requests-header-gradient"></div>

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
              <ClipboardDocumentListIcon
                class="h-4 w-4 text-emerald-300"
              />

              <span
                class="text-xs font-bold uppercase tracking-[0.18em] text-white/90"
              >
                Your Account
              </span>
            </div>

            <h1
              class="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl"
            >
              My Requests
            </h1>

            <p
              class="mt-5 max-w-2xl text-base leading-8 text-white/75 sm:text-lg"
            >
              Review your treasury service requests and track their current
              processing status.
            </p>
          </div>

          <!-- Account summary -->
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

    <!-- Initial loading -->
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
      class="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14"
    >
      <!-- Account controls -->
      <section
        class="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p
            class="text-xs font-bold uppercase tracking-[0.15em] text-green-700"
          >
            Account Dashboard
          </p>

          <h2 class="mt-2 text-2xl font-black text-slate-900">
            Welcome, {{ displayName }}
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            {{ userStore.user?.email }}
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="loadingRequests"
            @click="loadRequests"
          >
            <ArrowPathIcon
              class="h-4 w-4"
              :class="loadingRequests ? 'animate-spin' : ''"
            />

            Refresh
          </button>

          <NuxtLink
            to="/logged/my-services"
            class="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-800"
          >
            <PlusIcon class="h-4 w-4" />

            New request
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

      <!-- Request loading -->
      <section
        v-if="loadingRequests"
        class="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm"
      >
        <ArrowPathIcon
          class="mx-auto h-8 w-8 animate-spin text-green-700"
        />

        <p class="mt-4 font-semibold text-slate-700">
          Loading your requests...
        </p>
      </section>

      <!-- API error -->
      <section
        v-else-if="requestError"
        class="mt-8 rounded-3xl border border-red-200 bg-red-50 p-7"
      >
        <div class="flex items-start gap-4">
          <ExclamationTriangleIcon
            class="mt-0.5 h-6 w-6 shrink-0 text-red-600"
          />

          <div>
            <h2 class="font-bold text-red-950">
              Unable to load your requests
            </h2>

            <p class="mt-2 text-sm leading-6 text-red-800">
              {{ requestError }}
            </p>

            <button
              type="button"
              class="mt-4 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-800"
              @click="loadRequests"
            >
              Try again
            </button>
          </div>
        </div>
      </section>

      <!-- No requests -->
      <section
        v-else-if="requests.length === 0"
        class="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm"
      >
        <div
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500"
        >
          <ClipboardDocumentListIcon class="h-7 w-7" />
        </div>

        <h2 class="mt-5 text-2xl font-black text-slate-900">
          No requests yet
        </h2>

        <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
          Requests submitted using your signed-in account will appear here.
        </p>

        <NuxtLink
          to="/logged/my-services"
          class="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-800"
        >
          <PlusIcon class="h-4 w-4" />

          Submit a new request
        </NuxtLink>
      </section>

      <!-- Request history -->
      <template v-else>
        <!-- Filter -->
        <section
          class="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div
            class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p
                class="text-xs font-bold uppercase tracking-[0.15em] text-green-700"
              >
                Request History
              </p>

              <h2 class="mt-2 text-2xl font-black text-slate-900">
                Your recent requests
              </h2>

              <p class="mt-2 text-sm text-slate-500">
                Filter requests by their current status.
              </p>
            </div>

            <div
              class="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600"
            >
              <ClipboardDocumentListIcon class="h-4 w-4" />

              {{ requests.length }} total
            </div>
          </div>

          <div
            class="mt-6 flex flex-wrap gap-2"
            aria-label="Filter request history"
          >
            <button
              v-for="filter in filters"
              :key="filter"
              type="button"
              :aria-pressed="activeFilter === filter"
              class="rounded-full border px-5 py-2.5 text-sm font-bold transition"
              :class="
                activeFilter === filter
                  ? 'border-green-700 bg-green-700 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              "
              @click="activeFilter = filter"
            >
              {{ filter }}

              <span class="ml-1 opacity-80">
                ({{ count(filter) }})
              </span>
            </button>
          </div>
        </section>

        <p
          class="mt-5 text-sm text-slate-500"
          aria-live="polite"
        >
          {{ visibleRequests.length }}
          {{
            visibleRequests.length === 1
              ? 'request'
              : 'requests'
          }}
          · Most recent first
        </p>

        <!-- Request cards -->
        <section class="mt-4 space-y-6">
          <article
            v-for="request in visibleRequests"
            :key="request.id"
            class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <!-- Card header -->
            <header
              class="flex flex-col gap-4 border-b border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="flex flex-wrap gap-x-10 gap-y-4">
                <div>
                  <p class="detail-label">
                    Request code
                  </p>

                  <p
                    class="mt-1 font-mono font-black tracking-wide text-[#173a67]"
                  >
                    {{ request.request_code }}
                  </p>
                </div>

                <div>
                  <p class="detail-label">
                    Requested on
                  </p>

                  <p class="mt-1 text-sm font-semibold text-slate-700">
                    {{ formatDate(request.requested_at) }}
                  </p>
                </div>
              </div>

              <span
                class="inline-flex w-fit rounded-full px-4 py-2 text-xs font-bold"
                :class="statusColor(request.status)"
              >
                {{ formatStatus(request.status) }}
              </span>
            </header>

            <!-- Card body -->
            <div class="p-6 sm:p-7">
              <div
                class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700"
                  >
                    <DocumentTextIcon
                      class="h-6 w-6"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h3 class="text-xl font-black text-slate-900">
                      {{ requestTypeLabel(request.request_type) }}
                    </h3>

                    <div class="mt-3 space-y-2">
                      <!-- SOA single PIN -->
                      <p
                        v-if="
                          request.request_type === 'SOA_PRINT' &&
                          request.pin
                        "
                        class="text-sm text-slate-600"
                      >
                        <span class="font-bold text-slate-700">
                          PIN:
                        </span>

                        <span class="font-mono">
                          {{ request.pin }}
                        </span>
                      </p>

                      <!-- Tax Clearance multiple PINs -->
                      <div
                        v-if="
                          request.request_type === 'TAX_CLEARANCE'
                        "
                        class="text-sm text-slate-600"
                      >
                        <span class="font-bold text-slate-700">
                          PINs:
                        </span>

                        <span v-if="request.pins?.length">
                          {{ request.pins.join(', ') }}
                        </span>

                        <span v-else>
                          No PIN information
                        </span>
                      </div>

                      <p class="text-sm text-slate-600">
                        <span class="font-bold text-slate-700">
                          Delivery:
                        </span>

                        {{
                          deliveryLabel(
                            request.delivery_preference,
                          )
                        }}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p
                    class="text-xs font-bold uppercase tracking-[0.1em] text-slate-500"
                  >
                    Latest update
                  </p>

                  <p class="mt-2 text-sm leading-6 text-slate-700">
                    {{
                      request.remarks ||
                      defaultRemark(request.status)
                    }}
                  </p>
                </div>
              </div>

              <!-- Progress -->
              <div
                v-if="requestStage(request.status) >= 0"
                class="mt-7 border-t border-slate-200 pt-6"
              >
                <p
                  class="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-500"
                >
                  Request progress
                </p>

                <ol
                  class="grid grid-cols-2 gap-3 sm:grid-cols-4"
                  aria-label="Request progress"
                >
                  <li
                    v-for="(step, index) in steps"
                    :key="step"
                    class="relative border-t-4 pt-3 text-sm"
                    :class="
                      index <= requestStage(request.status)
                        ? 'border-green-600 font-semibold text-green-800'
                        : 'border-slate-200 text-slate-500'
                    "
                  >
                    <div class="flex items-center gap-2">
                      <span
                        class="flex h-6 w-6 items-center justify-center rounded-full text-xs font-black"
                        :class="
                          index < requestStage(request.status)
                            ? 'bg-green-700 text-white'
                            : index === requestStage(request.status)
                              ? 'bg-green-100 text-green-800'
                              : 'bg-slate-100 text-slate-500'
                        "
                      >
                        <CheckIcon
                          v-if="index < requestStage(request.status)"
                          class="h-4 w-4"
                        />

                        <span v-else>
                          {{ index + 1 }}
                        </span>
                      </span>

                      {{ step }}
                    </div>
                  </li>
                </ol>
              </div>

              <!-- Rejected / Cancelled -->
              <div
                v-else
                class="mt-7 rounded-2xl border border-red-200 bg-red-50 p-4"
              >
                <div class="flex items-start gap-3">
                  <XCircleIcon
                    class="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                  />

                  <div>
                    <p class="font-bold text-red-900">
                      Request processing stopped
                    </p>

                    <p class="mt-1 text-sm leading-6 text-red-800">
                      Review the latest update and request details for more
                      information.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Cancel action -->
              <div
                v-if="canCancelRequest(request)"
                class="mt-7 border-t border-slate-200 pt-6"
              >
                <div
                  class="flex flex-col gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p class="font-bold text-red-950">
                      Cancel this request
                    </p>

                    <p class="mt-1 text-sm leading-6 text-red-700">
                      You may cancel this request while payment has not yet
                      been made.
                    </p>
                  </div>

                  <button
                    type="button"
                    class="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-600 bg-white px-4 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    :disabled="
                      cancellingRequestCode === request.request_code
                    "
                    @click="openCancelDialog(request)"
                  >
                    <ArrowPathIcon
                      v-if="
                        cancellingRequestCode === request.request_code
                      "
                      class="h-4 w-4 animate-spin"
                    />

                    <XCircleIcon
                      v-else
                      class="h-4 w-4"
                    />

                    {{
                      cancellingRequestCode === request.request_code
                        ? 'Cancelling...'
                        : 'Cancel request'
                    }}
                  </button>
                </div>
              </div>

              <!-- Details -->
              <details
                class="group mt-6 border-t border-slate-200 pt-5"
              >
                <summary
                  class="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-green-700"
                >
                  <span class="flex items-center gap-2">
                    <InformationCircleIcon class="h-4 w-4" />

                    View request details
                  </span>

                  <ChevronDownIcon
                    class="h-5 w-5 transition group-open:rotate-180"
                  />
                </summary>

                <dl
                  class="mt-5 grid gap-5 rounded-2xl bg-slate-50 p-5 text-sm sm:grid-cols-2"
                >
                  <div
                    v-if="request.land_owner"
                  >
                    <dt class="detail-label">
                      Land owner
                    </dt>

                    <dd class="mt-1 font-semibold text-slate-800">
                      {{ request.land_owner }}
                    </dd>
                  </div>

                  <div>
                    <dt class="detail-label">
                      Requester
                    </dt>

                    <dd class="mt-1 font-semibold text-slate-800">
                      {{
                        request.requester_name ||
                        'Not provided'
                      }}
                    </dd>
                  </div>

                  <div>
                    <dt class="detail-label">
                      Email
                    </dt>

                    <dd
                      class="mt-1 break-all font-semibold text-slate-800"
                    >
                      {{
                        request.email ||
                        'Not provided'
                      }}
                    </dd>
                  </div>

                  <div>
                    <dt class="detail-label">
                      Mailing address
                    </dt>

                    <dd class="mt-1 font-semibold text-slate-800">
                      {{
                        request.mailing_address ||
                        'Not provided'
                      }}
                    </dd>
                  </div>

                  <div>
                    <dt class="detail-label">
                      Delivery
                    </dt>

                    <dd class="mt-1 font-semibold text-slate-800">
                      {{
                        deliveryLabel(
                          request.delivery_preference,
                        )
                      }}
                    </dd>
                  </div>

                  <div>
                    <dt class="detail-label">
                      Last updated
                    </dt>

                    <dd class="mt-1 font-semibold text-slate-800">
                      {{ formatDate(request.updated_at) }}
                    </dd>
                  </div>
                </dl>
              </details>
            </div>
          </article>

          <!-- Empty filtered result -->
          <div
            v-if="!visibleRequests.length"
            class="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm"
          >
            <div
              class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500"
            >
              <MagnifyingGlassIcon class="h-7 w-7" />
            </div>

            <h3 class="mt-5 text-lg font-black text-slate-900">
              No requests found
            </h3>

            <p class="mt-2 text-sm text-slate-600">
              There are no requests in this category.
            </p>
          </div>
        </section>
      </template>
    </main>

    <!-- Cancel confirmation modal -->
    <div
      v-if="requestToCancel"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
      @click.self="closeCancelDialog"
    >
      <div
        class="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-7"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-request-title"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-700"
        >
          <ExclamationTriangleIcon class="h-6 w-6" />
        </div>

        <h2
          id="cancel-request-title"
          class="mt-5 text-xl font-black text-slate-900"
        >
          Cancel this request?
        </h2>

        <p class="mt-3 text-sm leading-6 text-slate-600">
          You are about to cancel request
          <span class="font-mono font-bold text-slate-900">
            {{ requestToCancel.request_code }}
          </span>.
        </p>

        <p class="mt-2 text-sm leading-6 text-slate-600">
          Once cancelled, this request will no longer be processed.
        </p>

        <div
          v-if="cancelError"
          class="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {{ cancelError }}
        </div>

        <div class="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            class="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="!!cancellingRequestCode"
            @click="closeCancelDialog"
          >
            Keep request
          </button>

          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="!!cancellingRequestCode"
            @click="confirmCancelRequest"
          >
            <ArrowPathIcon
              v-if="cancellingRequestCode"
              class="h-4 w-4 animate-spin"
            />

            <XCircleIcon
              v-else
              class="h-4 w-4"
            />

            {{
              cancellingRequestCode
                ? 'Cancelling...'
                : 'Yes, cancel request'
            }}
          </button>
        </div>
      </div>
    </div>
  </PublicPageShell>
</template>

<script setup lang="ts">
import {
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
  CheckIcon,
  ChevronDownIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline'

import { useUserStore } from '~/store/user'
import { authService } from '~/api/AuthService'

definePageMeta({
  middleware: 'auth',
})

interface UserRequestData {
  id: string

  request_code: string

  request_type:
    | 'SOA_PRINT'
    | 'TAX_CLEARANCE'

  delivery_preference:
    | 'POSTAL'
    | 'EMAIL'
    | null

  pin: string | null

  pins?: string[]

  pin_count?: number

  land_owner: string | null

  requester_name: string | null

  mailing_address: string | null

  email: string | null

  status: string

  remarks?: string | null

  requested_at: string | null

  created_at: string | null

  updated_at: string | null
}

interface UserRequestListResponse {
  data: UserRequestData[]
}

const config =
  useRuntimeConfig()

const userStore =
  useUserStore()

const ready =
  ref(false)

const loadingRequests =
  ref(false)

const requestError =
  ref('')

const requests =
  ref<UserRequestData[]>([])

const activeFilter =
  ref('All')

const requestToCancel =
  ref<UserRequestData | null>(
    null,
  )

const cancellingRequestCode =
  ref('')

const cancelError =
  ref('')

const filters = [
  'All',
  'In progress',
  'Completed',
  'Rejected / Cancelled',
]

const steps = [
  'Received',
  'Review',
  'Ready',
  'Completed',
]

const apiBaseUrl =
  computed(() =>
    String(
      config.public.apiBaseUrl ||
      '',
    ).replace(/\/+$/, ''),
  )

const displayName =
  computed(() => {
    const user =
      userStore.user

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
          typeof value ===
            'string' &&
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

function authHeaders():
  Record<string, string> {
  if (!import.meta.client) {
    return {
      Accept:
        'application/json',
    }
  }

  const token =
    localStorage.getItem(
      '_token',
    )

  return {
    Accept:
      'application/json',

    ...(token
      ? {
          Authorization:
            `Bearer ${token}`,
        }
      : {}),
  }
}

async function loadRequests():
  Promise<void> {
  loadingRequests.value =
    true

  requestError.value =
    ''

  try {
    const response =
      await $fetch<UserRequestListResponse>(
        `${apiBaseUrl.value}/user-requests`,
        {
          method: 'GET',
          headers:
            authHeaders(),
        },
      )

    requests.value =
      Array.isArray(
        response.data,
      )
        ? response.data
        : []

  } catch (error: any) {
    const status =
      error?.statusCode ??
      error?.status ??
      error?.response?.status

    if (status === 401) {
      if (
        import.meta.client
      ) {
        localStorage.removeItem(
          '_token',
        )
      }

      userStore.resetUser()

      await navigateTo(
        '/login',
      )

      return
    }

    requestError.value =
      error?.data?.message ||
      'Unable to load your request history.'

  } finally {
    loadingRequests.value =
      false
  }
}

function matches(
  request: UserRequestData,
  filter: string,
): boolean {
  const status =
    formatStatus(
      request.status,
    )

  if (
    filter === 'All'
  ) {
    return true
  }

  if (
    filter ===
    'Completed'
  ) {
    return (
      status ===
      'COMPLETED'
    )
  }

  if (
    filter ===
    'Rejected / Cancelled'
  ) {
    return [
      'REJECTED',
      'CANCELLED',
    ].includes(status)
  }

  return ![
    'COMPLETED',
    'REJECTED',
    'CANCELLED',
  ].includes(status)
}

const visibleRequests =
  computed(() => {
    return requests.value.filter(
      request =>
        matches(
          request,
          activeFilter.value,
        ),
    )
  })

function count(
  filter: string,
): number {
  return requests.value.filter(
    request =>
      matches(
        request,
        filter,
      ),
  ).length
}

function requestTypeLabel(
  type: string,
): string {
  switch (type) {
    case 'SOA_PRINT':
      return 'Statement of Account'

    case 'TAX_CLEARANCE':
      return 'Tax Clearance Print'

    default:
      return type.replaceAll(
        '_',
        ' ',
      )
  }
}

function deliveryLabel(
  delivery: string | null,
): string {
  switch (
    delivery
      ?.trim()
      .toUpperCase()
  ) {
    case 'POSTAL':
      return 'Printed copy by postal mail'

    case 'EMAIL':
      return 'PDF file by email'

    default:
      return 'Not provided'
  }
}

function formatStatus(
  status: string,
): string {
  return (
    status
      ?.trim()
      .replaceAll(
        '_',
        ' ',
      )
      .toUpperCase() ||
    'UNKNOWN'
  )
}

function statusColor(
  status: string,
): string {
  const normalized =
    formatStatus(status)

  const colors:
    Record<string, string> = {
      PENDING:
        'bg-amber-100 text-amber-800',

      'FOR REVIEW':
        'bg-blue-100 text-blue-800',

      APPROVED:
        'bg-emerald-100 text-emerald-800',

      'READY FOR PRINTING':
        'bg-violet-100 text-violet-800',

      PAID:
        'bg-cyan-100 text-cyan-800',

      COMPLETED:
        'bg-green-100 text-green-800',

      REJECTED:
        'bg-red-100 text-red-800',

      CANCELLED:
        'bg-slate-200 text-slate-800',
    }

  return (
    colors[normalized] ||
    'bg-slate-200 text-slate-800'
  )
}

function requestStage(
  status: string,
): number {
  switch (
    formatStatus(status)
  ) {
    case 'PENDING':
      return 0

    case 'FOR REVIEW':
    case 'APPROVED':
      return 1

    case 'READY FOR PRINTING':
      return 2

    case 'PAID':
    case 'COMPLETED':
      return 3

    case 'REJECTED':
    case 'CANCELLED':
      return -1

    default:
      return 0
  }
}

function defaultRemark(
  status: string,
): string {
  switch (
    formatStatus(status)
  ) {
    case 'PENDING':
      return 'Your request has been received and is awaiting review.'

    case 'FOR REVIEW':
      return 'Your request is currently being reviewed.'

    case 'APPROVED':
      return 'Your request has been approved.'

    case 'READY FOR PRINTING':
      return 'Your requested document is ready for printing or delivery.'

    case 'PAID':
      return 'Payment has been recorded for this request.'

    case 'COMPLETED':
      return 'Your request has been completed.'

    case 'REJECTED':
      return 'Your request was not approved.'

    case 'CANCELLED':
      return 'Your request has been cancelled.'

    default:
      return 'No additional update is available.'
  }
}

function canCancelRequest(
  request: UserRequestData,
): boolean {
  const status =
    formatStatus(
      request.status,
    )

  /*
   * The button is shown only while the
   * request is still unpaid.
   */
  return [
    'PENDING',
    'FOR REVIEW',
    'APPROVED',
    'READY FOR PRINTING',
  ].includes(status)
}

function openCancelDialog(
  request: UserRequestData,
): void {
  cancelError.value =
    ''

  requestToCancel.value =
    request
}

function closeCancelDialog():
  void {
  if (
    cancellingRequestCode.value
  ) {
    return
  }

  requestToCancel.value =
    null

  cancelError.value =
    ''
}

async function confirmCancelRequest():
  Promise<void> {
  const request =
    requestToCancel.value

  if (!request) {
    return
  }

  cancellingRequestCode.value =
    request.request_code

  cancelError.value = ''

  try {
    const response = await $fetch<any>(
      `${apiBaseUrl.value}/user-requests/${encodeURIComponent(request.request_code)}/cancel`,
      {
        method: 'PATCH',

        headers:
          authHeaders(),
      },
    )

    console.log(
      'Cancel success:',
      response,
    )

    requestToCancel.value =
      null

    await loadRequests()

  } catch (error: any) {
    const status =
      error?.statusCode ??
      error?.status ??
      error?.response?.status ??
      'unknown'

    const responseData =
      error?.data ??
      error?.response?._data ??
      null

    console.error(
      'CANCEL REQUEST FAILED',
      {
        status,
        responseData,
        error,
      },
    )

    if (status === 401) {
      cancelError.value =
        'Your login session is no longer valid. Please sign in again.'

      return
    }

    if (status === 403) {
      cancelError.value =
        responseData?.message ||
        'You do not have permission to cancel this request.'

      return
    }

    if (status === 404) {
      cancelError.value =
        responseData?.message ||
        'This request was not found for your account.'

      return
    }

    if (status === 405) {
      cancelError.value =
        'Cancel API returned HTTP 405. The PATCH route is not being reached correctly.'

      return
    }

    if (status === 419) {
      cancelError.value =
        'Cancel API returned HTTP 419. The request may be hitting a CSRF-protected route instead of the API route.'

      return
    }

    if (status === 422) {
      cancelError.value =
        responseData?.errors?.request?.[0] ||
        responseData?.message ||
        'This request can no longer be cancelled.'

      return
    }

    if (status === 429) {
      cancelError.value =
        'Too many cancellation attempts. Please wait before trying again.'

      return
    }

    cancelError.value =
      responseData?.message ||
      responseData?.error ||
      error?.message ||
      `Unable to cancel the request. HTTP ${status}.`

  } finally {
    cancellingRequestCode.value =
      ''
  }
}

function formatDate(
  value: string | null,
): string {
  if (!value) {
    return 'Not provided'
  }

  const date =
    new Date(value)

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return value
  }

  return new Intl.DateTimeFormat(
    'en-PH',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone:
        'Asia/Manila',
    },
  ).format(date)
}

async function signOut():
  Promise<void> {
  try {
    await authService.logout()
  } catch {
    /*
     * Clear browser session even if
     * logout API is temporarily unavailable.
     */
  }

  if (
    import.meta.client
  ) {
    localStorage.removeItem(
      '_token',
    )
  }

  userStore.resetUser()

  await navigateTo(
    '/login',
  )
}

onMounted(async () => {
  if (
    !localStorage.getItem(
      '_token',
    )
  ) {
    await navigateTo(
      '/login',
    )

    return
  }

  /*
   * Auth middleware should normally
   * have loaded the user already.
   */
  if (!userStore.user) {
    try {
      const response =
        await $fetch<{
          data?: any
        }>(
          `${apiBaseUrl.value}/me`,
          {
            method: 'GET',
            headers:
              authHeaders(),
          },
        )

      if (
        response.data
      ) {
        userStore.setUser(
          response.data,
        )
      }

    } catch {
      localStorage.removeItem(
        '_token',
      )

      await navigateTo(
        '/login',
      )

      return
    }
  }

  ready.value =
    true

  await loadRequests()
})
</script>

<style scoped>
.requests-header-gradient {
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

.detail-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: rgb(100 116 139);
}

/*
|--------------------------------------------------------------------------
| Form Inputs
|--------------------------------------------------------------------------
*/
input,
textarea,
select {
  padding-left: 1.25rem;
}

/*
|--------------------------------------------------------------------------
| Reusable Form Input
|--------------------------------------------------------------------------
*/
.form-input {
  width: 100%;

  border-radius: 1rem;
  border:
    1px solid
    rgb(203 213 225);

  background:
    white;

  padding-top:
    1rem;

  padding-right:
    1.25rem;

  padding-bottom:
    1rem;

  padding-left:
    1.25rem;

  color:
    rgb(15 23 42);

  outline:
    none;

  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;
}

.form-input::placeholder {
  color:
    rgb(148 163 184);
}

.form-input:focus {
  border-color:
    rgb(22 163 74);

  box-shadow:
    0 0 0 4px
    rgb(22 163 74 / 0.1);
}

.form-input:disabled {
  cursor:
    not-allowed;

  background:
    rgb(248 250 252);

  opacity:
    0.7;
}
</style>