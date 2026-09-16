<template>
  <div class="min-h-screen bg-slate-50">
    <Head>
      <Title>
        My Tax Clearance Request | City Treasurer's Office
      </Title>

      <Meta
        name="description"
        content="Submit and track your authenticated tax clearance print requests."
      />
    </Head>

    <!-- Header -->
    <section class="relative overflow-hidden bg-slate-950">
      <div class="absolute inset-0 request-header-gradient"></div>

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
              to="/logged/my-services"
              class="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
            >
              <ArrowLeftIcon class="h-4 w-4" />
              Back to services
            </NuxtLink>

            <div
              class="mb-5 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
            >
              <PrinterIcon class="h-4 w-4 text-emerald-300" />

              <span
                class="text-xs font-semibold uppercase tracking-[0.18em] text-white/90"
              >
                Authenticated Tax Clearance Service
              </span>
            </div>

            <h1
              class="text-4xl font-black tracking-tight text-white sm:text-5xl"
            >
              Request Tax Clearance Print
            </h1>

            <p
              class="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
            >
              Submit and track tax clearance requests associated with your
              signed-in account.
            </p>
          </div>

          <!-- Signed-in user -->
          <div
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
                  {{ userDisplayName }}
                </p>

                <p class="truncate text-sm text-white/65">
                  {{ currentUser?.email || 'Loading account...' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main -->
    <main class="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <!-- Loading account -->
      <div
        v-if="loadingAccount"
        class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <div class="flex items-center gap-3 text-slate-600">
          <ArrowPathIcon class="h-5 w-5 animate-spin" />
          Loading your account...
        </div>
      </div>

      <div
        v-else
        class="grid gap-10 lg:grid-cols-[1fr_0.72fr]"
      >
        <section>
          <!-- Tabs -->
          <div
            class="mb-6 inline-flex w-full rounded-2xl border border-slate-200 bg-white p-1 shadow-sm sm:w-auto"
          >
            <button
              type="button"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition sm:flex-none"
              :class="
                activeTab === 'submit'
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              "
              @click="switchTab('submit')"
            >
              <DocumentPlusIcon class="h-5 w-5" />
              New request
            </button>

            <button
              type="button"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition sm:flex-none"
              :class="
                activeTab === 'track'
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              "
              @click="switchTab('track')"
            >
              <MagnifyingGlassIcon class="h-5 w-5" />
              Track request
            </button>
          </div>

          <!-- Submit -->
          <section
            v-if="activeTab === 'submit'"
            class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700"
              >
                <DocumentPlusIcon class="h-6 w-6" />
              </div>

              <div>
                <h2 class="text-2xl font-bold text-slate-900">
                  Submit a print request
                </h2>

                <p class="mt-2 text-sm leading-7 text-slate-600">
                  Your account information has been pre-filled. Add the
                  property identification numbers to include in this request.
                </p>
              </div>
            </div>

            <!-- Account identity -->
            <div
              class="mt-7 rounded-2xl border border-blue-200 bg-blue-50 p-5"
            >
              <div class="flex items-start gap-3">
                <ShieldCheckIcon
                  class="mt-0.5 h-5 w-5 shrink-0 text-blue-700"
                />

                <div>
                  <p class="font-bold text-blue-950">
                    Request linked to your account
                  </p>

                  <p class="mt-1 text-sm leading-6 text-blue-800">
                    The server will associate this request with your signed-in
                    user account. The user ID is not supplied by the browser.
                  </p>
                </div>
              </div>
            </div>

            <form
              class="mt-8 space-y-7"
              @submit.prevent="submitRequest"
            >
              <!-- Requester -->
              <div>
                <label class="form-label">
                  Name of requestee
                </label>

                <div class="relative mt-2">
                  <UserIcon
                    class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    v-model.trim="form.requesteeName"
                    type="text"
                    maxlength="300"
                    autocomplete="name"
                    class="form-input form-input-with-icon"
                    :disabled="isSubmitting"
                  />
                </div>
              </div>

              <!-- Address -->
              <div>
                <label class="form-label">
                  Mailing address
                </label>

                <div class="relative mt-2">
                  <MapPinIcon
                    class="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-400"
                  />

                  <textarea
                    v-model.trim="form.mailingAddress"
                    rows="4"
                    maxlength="2000"
                    autocomplete="street-address"
                    class="form-input form-input-with-icon resize-y"
                    :disabled="isSubmitting"
                  ></textarea>
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="form-label">
                  Email address
                </label>

                <div class="relative mt-2">
                  <EnvelopeIcon
                    class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    v-model.trim="form.emailAddress"
                    type="email"
                    maxlength="320"
                    autocomplete="email"
                    class="form-input form-input-with-icon"
                    :disabled="isSubmitting"
                  />
                </div>
              </div>

              <!-- Delivery Preference -->
              <fieldset class="border-t border-slate-200 pt-7">
                <legend
                  class="pr-3 text-lg font-bold text-slate-900"
                >
                  Delivery preference
                </legend>

                <p class="mt-1 text-sm leading-6 text-slate-600">
                  How would you like to receive your Tax Clearance?
                </p>

                <div class="mt-4 grid gap-3 sm:grid-cols-2">
                  <!-- Postal -->
                  <label
                    class="flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition"
                    :class="
                      deliveryMethod === 'postal'
                        ? 'border-green-700 bg-green-50 ring-1 ring-green-700/10'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    "
                  >
                    <input
                      v-model="deliveryMethod"
                      type="radio"
                      name="deliveryMethod"
                      value="postal"
                      required
                      class="mt-1 h-4 w-4 shrink-0 accent-green-700"
                      :disabled="isSubmitting"
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

                  <!-- Email -->
                  <label
                    class="flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition"
                    :class="
                      deliveryMethod === 'email'
                        ? 'border-green-700 bg-green-50 ring-1 ring-green-700/10'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    "
                  >
                    <input
                      v-model="deliveryMethod"
                      type="radio"
                      name="deliveryMethod"
                      value="email"
                      required
                      class="mt-1 h-4 w-4 shrink-0 accent-green-700"
                      :disabled="isSubmitting"
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

                <!-- Selected delivery -->
                <div
                  class="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <p
                    class="text-xs font-bold uppercase tracking-wider text-slate-500"
                  >
                    Selected delivery
                  </p>

                  <p class="mt-1 text-sm font-semibold text-slate-800">
                    {{
                      deliveryMethod === 'postal'
                        ? 'Printed copy by postal mail'
                        : 'PDF file by email'
                    }}
                  </p>
                </div>
              </fieldset>

              <!-- PIN -->
              <div class="border-t border-slate-200 pt-7">
                <div
                  class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
                >
                  <div>
                    <label class="form-label">
                      Property Identification Numbers
                    </label>

                    <p class="mt-1 text-xs text-slate-500">
                      Add one or more PINs. Maximum 50.
                    </p>
                  </div>

                  <span
                    class="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
                  >
                    {{ form.pins.length }} / 50 PINs
                  </span>
                </div>

                <div class="mt-3 flex flex-col gap-3 sm:flex-row">
                  <div class="relative flex-1">
                    <HashtagIcon
                      class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      v-model.trim="pinInput"
                      type="text"
                      autocomplete="off"
                      placeholder="Example: 0124-01-001-001-001"
                      class="form-input form-input-with-icon font-mono uppercase"
                      :disabled="
                        isSubmitting ||
                        form.pins.length >= 50
                      "
                      @keydown.enter.prevent="addPin"
                      @input="pinMessage = ''"
                    />
                  </div>

                  <button
                    type="button"
                    class="rounded-2xl border border-green-700 bg-white px-6 py-4 font-bold text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                    :disabled="
                      isSubmitting ||
                      form.pins.length >= 50
                    "
                    @click="addPin"
                  >
                    <span class="flex items-center gap-2">
                      <PlusIcon class="h-5 w-5" />
                      Add PIN
                    </span>
                  </button>
                </div>

                <p
                  v-if="pinMessage"
                  class="mt-3 text-sm text-amber-700"
                >
                  {{ pinMessage }}
                </p>

                <div
                  v-if="form.pins.length"
                  class="mt-4 overflow-hidden rounded-2xl border border-slate-200"
                >
                  <div
                    class="flex justify-between border-b border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <span
                      class="text-xs font-bold uppercase tracking-wider text-slate-600"
                    >
                      Added PINs
                    </span>

                    <button
                      type="button"
                      class="text-xs font-bold text-red-600 transition hover:text-red-800"
                      :disabled="isSubmitting"
                      @click="clearPins"
                    >
                      Remove all
                    </button>
                  </div>

                  <ul>
                    <li
                      v-for="(pin, index) in form.pins"
                      :key="pin"
                      class="flex items-center justify-between gap-4 px-4 py-3"
                      :class="
                        index < form.pins.length - 1
                          ? 'border-b border-slate-200'
                          : ''
                      "
                    >
                      <div class="flex min-w-0 items-center gap-3">
                        <span
                          class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700"
                        >
                          {{ index + 1 }}
                        </span>

                        <span
                          class="break-all font-mono text-sm font-bold text-slate-800"
                        >
                          {{ pin }}
                        </span>
                      </div>

                      <button
                        type="button"
                        class="rounded-full p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        :disabled="isSubmitting"
                        @click="removePin(index)"
                      >
                        <TrashIcon class="h-5 w-5" />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Messages -->
              <div
                v-if="submitValidationMessage"
                class="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
              >
                {{ submitValidationMessage }}
              </div>

              <div
                v-if="submitError"
                class="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
              >
                {{ submitError }}
              </div>

              <button
                type="submit"
                class="inline-flex items-center gap-2 rounded-2xl bg-green-700 px-6 py-4 font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="isSubmitting"
              >
                <ArrowPathIcon
                  v-if="isSubmitting"
                  class="h-5 w-5 animate-spin"
                />

                <PaperAirplaneIcon
                  v-else
                  class="h-5 w-5"
                />

                {{
                  isSubmitting
                    ? 'Submitting request...'
                    : 'Submit request'
                }}
              </button>
            </form>
          </section>

          <!-- Submission success -->
          <section
            v-if="submittedRequest"
            class="mt-8 overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-sm"
          >
            <div class="bg-emerald-50 p-7">
              <div class="flex items-center gap-4">
                <CheckCircleIcon
                  class="h-10 w-10 text-emerald-700"
                />

                <div>
                  <p
                    class="text-xs font-bold uppercase tracking-wider text-emerald-700"
                  >
                    Request submitted
                  </p>

                  <h2
                    class="mt-1 text-2xl font-bold text-emerald-950"
                  >
                    {{ submittedRequest.requestCode }}
                  </h2>
                </div>
              </div>
            </div>

            <div class="p-7">
              <dl class="grid gap-6 sm:grid-cols-2">
                <div>
                  <dt class="detail-label">
                    Status
                  </dt>

                  <dd class="detail-value">
                    {{ submittedRequest.status }}
                  </dd>
                </div>

                <div>
                  <dt class="detail-label">
                    PIN count
                  </dt>

                  <dd class="detail-value">
                    {{ submittedRequest.pinCount }}
                  </dd>
                </div>

                <div class="sm:col-span-2">
                  <dt class="detail-label">
                    Delivery preference
                  </dt>

                  <dd class="detail-value">
                    {{ submittedRequest.deliveryPreference }}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                class="mt-6 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                @click="trackSubmittedRequest"
              >
                Track this request
              </button>
            </div>
          </section>

          <!-- Tracking -->
          <section
            v-if="activeTab === 'track'"
            class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700"
              >
                <MagnifyingGlassIcon class="h-6 w-6" />
              </div>

              <div>
                <h2 class="text-2xl font-bold text-slate-900">
                  Track your request
                </h2>

                <p class="mt-2 text-sm leading-6 text-slate-600">
                  Only requests belonging to your signed-in account can be
                  viewed here.
                </p>
              </div>
            </div>

            <form
              class="mt-8"
              @submit.prevent="trackRequest"
            >
              <label class="form-label">
                Request code
              </label>

              <input
                v-model.trim="trackingCode"
                type="text"
                maxlength="50"
                autocomplete="off"
                class="form-input mt-2 font-mono uppercase"
                placeholder="Enter your request code"
                :disabled="isTracking"
              />

              <button
                type="submit"
                class="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-6 py-4 font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="isTracking"
              >
                <ArrowPathIcon
                  v-if="isTracking"
                  class="h-5 w-5 animate-spin"
                />

                <MagnifyingGlassIcon
                  v-else
                  class="h-5 w-5"
                />

                {{
                  isTracking
                    ? 'Checking status...'
                    : 'Check request status'
                }}
              </button>
            </form>

            <div
              v-if="trackingError"
              class="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            >
              {{ trackingError }}
            </div>

            <div
              v-if="trackingResult"
              class="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <div
                class="flex flex-col gap-4 sm:flex-row sm:justify-between"
              >
                <div>
                  <p class="detail-label">
                    Request code
                  </p>

                  <p class="mt-2 font-mono font-bold">
                    {{ trackingResult.requestCode }}
                  </p>
                </div>

                <span
                  class="h-fit w-fit rounded-full px-4 py-2 text-sm font-bold"
                  :class="requestStatusBadgeClass"
                >
                  {{ trackingResult.status }}
                </span>
              </div>

              <div class="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p class="detail-label">
                    Requested
                  </p>

                  <p class="detail-value">
                    {{ formatDate(trackingResult.requestedOn) }}
                  </p>
                </div>

                <div>
                  <p class="detail-label">
                    Last updated
                  </p>

                  <p class="detail-value">
                    {{ formatDate(trackingResult.updatedOn) }}
                  </p>
                </div>

                <div
                  v-if="trackingResult.deliveryPreference"
                  class="sm:col-span-2"
                >
                  <p class="detail-label">
                    Delivery preference
                  </p>

                  <p class="detail-value">
                    {{
                      formatDeliveryPreference(
                        trackingResult.deliveryPreference,
                      )
                    }}
                  </p>
                </div>
              </div>

              <div class="mt-6">
                <p class="detail-label">
                  Remarks
                </p>

                <p class="detail-value">
                  {{
                    trackingResult.remarks ||
                    'No remarks have been provided.'
                  }}
                </p>
              </div>
            </div>
          </section>
        </section>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <!-- User information -->
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
                  {{ userDisplayName }}
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
              View all my requests
              <ArrowRightIcon class="h-4 w-4" />
            </NuxtLink>
          </div>

          <!-- Help -->
          <div
            class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <InformationCircleIcon
              class="h-8 w-8 text-green-700"
            />

            <h2 class="mt-5 text-xl font-bold text-slate-900">
              How it works
            </h2>

            <ol class="mt-6 space-y-5">
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
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  DocumentPlusIcon,
  EnvelopeIcon,
  HashtagIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  PlusIcon,
  PrinterIcon,
  ShieldCheckIcon,
  TrashIcon,
  UserCircleIcon,
  UserIcon,
} from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: 'auth',
})

interface UserData {
  id?: string
  username?: string
  fname?: string
  mname?: string | null
  lname?: string
  email?: string
  mailing_address?: string | null
}

interface MeResponse {
  data?: UserData
}

interface RequestResponse {
  data?: {
    request_code?: string
    status?: string
    remarks?: string | null
    requested_at?: string | null
    updated_at?: string | null
    pin_count?: number
    delivery_preference?: string | null
  }

  message?: string
}

interface SubmittedRequest {
  requestCode: string
  status: string
  pinCount: number
  deliveryPreference: string
}

interface TrackingResult {
  requestCode: string
  status: string
  remarks: string | null
  requestedOn: string | null
  updatedOn: string | null
  deliveryPreference: string | null
}

type PageTab =
  | 'submit'
  | 'track'

const config =
  useRuntimeConfig()

const activeTab =
  ref<PageTab>('submit')

const loadingAccount =
  ref(true)

const currentUser =
  ref<UserData | null>(null)

const isSubmitting =
  ref(false)

const submitValidationMessage =
  ref('')

const submitError =
  ref('')

const submittedRequest =
  ref<SubmittedRequest | null>(null)

const pinInput =
  ref('')

const pinMessage =
  ref('')

const trackingCode =
  ref('')

const isTracking =
  ref(false)

const trackingError =
  ref('')

const trackingResult =
  ref<TrackingResult | null>(null)

const deliveryMethod =
  ref<'postal' | 'email'>(
    'postal',
  )

const form = reactive({
  requesteeName: '',
  mailingAddress: '',
  emailAddress: '',
  pins: [] as string[],
})

const instructions = [
  {
    title:
      'Review your contact information',

    description:
      'Your profile information is loaded automatically from your account.',
  },

  {
    title:
      'Choose your delivery preference',

    description:
      'Choose whether you want a printed copy by postal mail or a PDF file by email.',
  },

  {
    title:
      'Add the property PINs',

    description:
      'Add every property identification number required for the clearance.',
  },

  {
    title:
      'Submit the request',

    description:
      'The request will be linked to your authenticated user account.',
  },

  {
    title:
      'Track its status',

    description:
      'Use your request code or view your requests from your account.',
  },
]

const apiBaseUrl = computed(() =>
  String(
    config.public.apiBaseUrl || '',
  ).replace(/\/+$/, ''),
)

const userDisplayName =
  computed(() => {
    if (!currentUser.value) {
      return 'User'
    }

    const name = [
      currentUser.value.fname,
      currentUser.value.mname,
      currentUser.value.lname,
    ]
      .filter(
        (value): value is string =>
          typeof value === 'string' &&
          value.trim() !== '',
      )
      .join(' ')
      .trim()

    return (
      name ||
      currentUser.value.username ||
      'User'
    )
  })

const normalizedRequestStatus =
  computed(() =>
    trackingResult.value?.status
      ?.trim()
      .toUpperCase() ||
    'UNKNOWN',
  )

const requestStatusBadgeClass =
  computed(() => {
    switch (
      normalizedRequestStatus.value
    ) {
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

async function loadAccount():
  Promise<void> {
  try {
    const response =
      await $fetch<MeResponse>(
        `${apiBaseUrl.value}/me`,
        {
          method: 'GET',
          headers: authHeaders(),
        },
      )

    if (!response.data) {
      throw new Error(
        'User not found.',
      )
    }

    currentUser.value =
      response.data

    form.requesteeName =
      userDisplayName.value

    form.mailingAddress =
      response.data
        .mailing_address ||
      ''

    form.emailAddress =
      response.data.email ||
      ''
  } catch {
    if (import.meta.client) {
      localStorage.removeItem(
        '_token',
      )
    }

    await navigateTo(
      '/login',
    )
  } finally {
    loadingAccount.value =
      false
  }
}

function normalizePin(
  value: string,
): string {
  return value
    .trim()
    .toUpperCase()
}

function addPin(): void {
  pinMessage.value = ''

  const pin =
    normalizePin(
      pinInput.value,
    )

  if (!pin) {
    pinMessage.value =
      'Enter a PIN first.'

    return
  }

  if (pin.length > 100) {
    pinMessage.value =
      'A PIN must not exceed 100 characters.'

    return
  }

  if (
    !/^[A-Z0-9-]+$/.test(
      pin,
    )
  ) {
    pinMessage.value =
      'PINs may contain only letters, numbers, and hyphens.'

    return
  }

  if (
    form.pins.includes(pin)
  ) {
    pinMessage.value =
      'This PIN has already been added.'

    return
  }

  if (
    form.pins.length >= 50
  ) {
    pinMessage.value =
      'A maximum of 50 PINs is allowed.'

    return
  }

  form.pins.push(pin)

  pinInput.value = ''
}

function removePin(
  index: number,
): void {
  form.pins.splice(
    index,
    1,
  )
}

function clearPins():
  void {
  form.pins.splice(0)

  pinInput.value = ''

  pinMessage.value = ''
}

function validateForm():
  string | null {
  if (
    !form.requesteeName.trim()
  ) {
    return 'Requestee name is required.'
  }

  if (
    !form.mailingAddress.trim()
  ) {
    return 'Mailing address is required.'
  }

  if (
    !form.emailAddress.trim()
  ) {
    return 'Email address is required.'
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (
    !emailPattern.test(
      form.emailAddress.trim(),
    )
  ) {
    return 'Enter a valid email address.'
  }

  if (
    deliveryMethod.value !==
      'postal' &&
    deliveryMethod.value !==
      'email'
  ) {
    return 'Select a delivery preference.'
  }

  if (
    form.pins.length === 0
  ) {
    return 'Add at least one PIN.'
  }

  return null
}

async function submitRequest():
  Promise<void> {
  submitError.value = ''

  submitValidationMessage.value =
    ''

  submittedRequest.value =
    null

  const validation =
    validateForm()

  if (validation) {
    submitValidationMessage.value =
      validation

    return
  }

  isSubmitting.value =
    true

  try {
    const response =
      await $fetch<RequestResponse>(
        `${apiBaseUrl.value}/user-requests/tax-clearance`,
        {
          method: 'POST',

          headers:
            authHeaders(),

          body: {
            requester_name:
              form.requesteeName
                .trim(),

            mailing_address:
              form.mailingAddress
                .trim(),

            email:
              form.emailAddress
                .trim()
                .toLowerCase(),

            delivery_preference:
              deliveryMethod.value
                .toUpperCase(),

            pins: [
              ...form.pins,
            ],
          },
        },
      )

    const requestCode =
      response.data
        ?.request_code
        ?.trim()
        .toUpperCase()

    if (!requestCode) {
      throw new Error(
        'The server did not return a request code.',
      )
    }

    submittedRequest.value = {
      requestCode,

      status:
        response.data
          ?.status ||
        'PENDING',

      pinCount:
        response.data
          ?.pin_count ??
        form.pins.length,

      deliveryPreference:
        formatDeliveryPreference(
          deliveryMethod.value,
        ),
    }

    trackingCode.value =
      requestCode

  } catch (error: any) {
    const status =
      error?.statusCode ??
      error?.status ??
      error?.response
        ?.status

    if (status === 401) {
      if (
        import.meta.client
      ) {
        localStorage.removeItem(
          '_token',
        )
      }

      await navigateTo(
        '/login',
      )

      return
    }

    if (status === 403) {
      submitError.value =
        'You do not have permission to submit this request.'

      return
    }

    if (
      status === 400 ||
      status === 422
    ) {
      submitValidationMessage.value =
        error?.data
          ?.message ||
        'Review the information you entered.'

      return
    }

    if (status === 429) {
      submitError.value =
        'Too many requests. Please wait before trying again.'

      return
    }

    if (
      status === 502 ||
      status === 503 ||
      (
        status &&
        status >= 500
      )
    ) {
      submitError.value =
        'The request service is temporarily unavailable. Please try again later.'

      return
    }

    submitError.value =
      error?.data?.message ||
      error?.message ||
      'Unable to submit your request.'

  } finally {
    isSubmitting.value =
      false
  }
}

async function trackSubmittedRequest():
  Promise<void> {
  if (
    !submittedRequest.value
  ) {
    return
  }

  trackingCode.value =
    submittedRequest.value
      .requestCode

  activeTab.value =
    'track'

  await nextTick()

  await trackRequest()
}

async function trackRequest():
  Promise<void> {
  const code =
    trackingCode.value
      .trim()
      .toUpperCase()

  if (!code) {
    trackingError.value =
      'Enter your request code.'

    return
  }

  isTracking.value =
    true

  trackingError.value =
    ''

  trackingResult.value =
    null

  try {
    const response =
      await $fetch<RequestResponse>(
        `${apiBaseUrl.value}/user-requests/${encodeURIComponent(code)}`,
        {
          method: 'GET',
          headers:
            authHeaders(),
        },
      )

    if (!response.data) {
      trackingError.value =
        'Request not found.'

      return
    }

    trackingResult.value = {
      requestCode:
        response.data
          .request_code ||
        code,

      status:
        response.data
          .status ||
        'UNKNOWN',

      remarks:
        response.data
          .remarks ||
        null,

      requestedOn:
        response.data
          .requested_at ||
        null,

      updatedOn:
        response.data
          .updated_at ||
        null,

      deliveryPreference:
        response.data
          .delivery_preference ||
        null,
    }

  } catch (error: any) {
    const status =
      error?.statusCode ??
      error?.status ??
      error?.response
        ?.status

    if (status === 401) {
      if (
        import.meta.client
      ) {
        localStorage.removeItem(
          '_token',
        )
      }

      await navigateTo(
        '/login',
      )

      return
    }

    if (status === 404) {
      trackingError.value =
        'No request with that code belongs to your account.'

      return
    }

    if (status === 429) {
      trackingError.value =
        'Too many tracking requests. Please wait before trying again.'

      return
    }

    trackingError.value =
      error?.data?.message ||
      'Unable to track the request.'

  } finally {
    isTracking.value =
      false
  }
}

function switchTab(
  tab: PageTab,
): void {
  activeTab.value =
    tab

  submitError.value =
    ''

  submitValidationMessage.value =
    ''

  trackingError.value =
    ''
}

function formatDeliveryPreference(
  value:
    | string
    | null
    | undefined,
): string {
  const normalized =
    value
      ?.trim()
      .toUpperCase()

  if (
    normalized ===
    'POSTAL'
  ) {
    return 'Printed copy by postal mail'
  }

  if (
    normalized ===
    'EMAIL'
  ) {
    return 'PDF file by email'
  }

  return 'Not provided'
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

onMounted(() => {
  void loadAccount()
})
</script>

<style scoped>
.request-header-gradient {
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

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  color: rgb(30 41 59);
}

/*
|--------------------------------------------------------------------------
| Standard Form Input
|--------------------------------------------------------------------------
|
| All normal text fields and textareas receive 1.25rem left padding.
|
*/
.form-input {
  width: 100%;

  border-radius: 1rem;
  border: 1px solid rgb(203 213 225);

  background: white;

  padding-top: 1rem;
  padding-right: 1.25rem;
  padding-bottom: 1rem;

  /* Normal left padding */
  padding-left: 1.25rem;

  color: rgb(15 23 42);

  outline: none;

  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;
}

/*
|--------------------------------------------------------------------------
| Inputs With Left Icons
|--------------------------------------------------------------------------
|
| These require additional room so the text does not overlap the icon.
|
*/
.form-input-with-icon {
  padding-left: 3rem;
}

.form-input::placeholder {
  color: rgb(148 163 184);
}

.form-input:focus {
  border-color: rgb(22 163 74);

  box-shadow:
    0 0 0 4px rgb(22 163 74 / 0.1);
}

.form-input:disabled {
  cursor: not-allowed;

  background:
    rgb(248 250 252);

  opacity: 0.7;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 700;

  letter-spacing:
    0.08em;

  text-transform:
    uppercase;

  color:
    rgb(100 116 139);
}

.detail-value {
  margin-top:
    0.45rem;

  overflow-wrap:
    anywhere;

  font-size:
    1rem;

  font-weight:
    700;

  color:
    rgb(15 23 42);
}
</style>