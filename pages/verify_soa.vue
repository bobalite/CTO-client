<template>
  <div class="min-h-screen bg-slate-50">
    <Head>
      <Title>
        SOA Verification | City Treasurer's Office
      </Title>

      <Meta
        name="description"
        content="Verify a Statement of Account issued by the City Treasurer's Office."
      />
    </Head>

    <!-- Page Header -->
    <section class="relative overflow-hidden bg-slate-950">
      <div class="absolute inset-0 verification-header-gradient"></div>

      <div
        class="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-green-500/20 blur-3xl"
      ></div>

      <div
        class="absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl"
      ></div>

      <div
        class="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8"
      >
        <NuxtLink
          to="/"
          class="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
        >
          <ArrowLeftIcon class="h-4 w-4" />

          Back to home
        </NuxtLink>

        <div class="max-w-3xl">
          <div
            class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
          >
            <DocumentCheckIcon class="h-4 w-4 text-emerald-300" />

            <span
              class="text-xs font-semibold uppercase tracking-[0.18em] text-white/90"
            >
              Official SOA Verification Service
            </span>
          </div>

          <h1
            class="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Statement of Account Verification
          </h1>

          <p
            class="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            Enter the Statement of Account number or scan the QR code printed
            on the document to confirm that it exists in the official records.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-[1fr_0.72fr]">
        <section>
          <!-- Verification Form -->
          <div
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
                  Verify a Statement of Account
                </h2>

                <p class="mt-2 text-sm leading-relaxed text-slate-600">
                  Enter the SOA number or paste the complete verification URL
                  encoded in the QR code.
                </p>
              </div>
            </div>

            <form
              class="mt-8"
              @submit.prevent="verifySoa"
            >
              <label
                for="soaVerificationValue"
                class="block text-sm font-bold text-slate-800"
              >
                SOA number
              </label>

              <div class="relative mt-2">
                <DocumentMagnifyingGlassIcon
                  class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="soaVerificationValue"
                  v-model.trim="verificationValue"
                  type="text"
                  autocomplete="off"
                  placeholder="Example: 0124-15749-000009"
                  class="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 pr-12 font-mono text-base font-medium uppercase text-slate-900 outline-none transition placeholder:font-sans placeholder:normal-case placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
                  :disabled="isLoading"
                  @input="clearMessages"
                />

                <button
                  v-if="verificationValue"
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Clear SOA number"
                  :disabled="isLoading"
                  @click="clearForm"
                >
                  <XMarkIcon class="h-5 w-5" />
                </button>
              </div>

              <p class="mt-2 text-xs leading-relaxed text-slate-500">
                You may paste a URL such as
                <span class="font-mono">
                  /verify_soa?code=0124-15749-000009
                </span>
                or enter the SOA number directly.
              </p>

              <!-- Validation Error -->
              <div
                v-if="validationMessage"
                class="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4"
              >
                <ExclamationTriangleIcon
                  class="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                />

                <p class="text-sm text-amber-800">
                  {{ validationMessage }}
                </p>
              </div>

              <!-- API Error -->
              <div
                v-if="requestError"
                class="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
              >
                <ExclamationCircleIcon
                  class="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                />

                <div>
                  <p class="font-bold text-red-800">
                    Verification failed
                  </p>

                  <p class="mt-1 text-sm text-red-700">
                    {{ requestError }}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                class="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-6 py-4 font-bold text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-0.5 hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
                :disabled="isLoading"
              >
                <ArrowPathIcon
                  v-if="isLoading"
                  class="h-5 w-5 animate-spin"
                />

                <DocumentCheckIcon
                  v-else
                  class="h-5 w-5"
                />

                {{
                  isLoading
                    ? 'Verifying...'
                    : 'Verify Statement of Account'
                }}
              </button>
            </form>
          </div>

          <!-- Verification Result -->
          <Transition name="result">
            <section
              v-if="verificationResult"
              ref="printResultSection"
              class="mt-8 overflow-hidden rounded-3xl border bg-white shadow-sm"
              :class="
                verificationResult.found
                  ? resultBorderClass
                  : 'border-red-200'
              "
            >
              <!-- Result Header -->
              <div
                class="result-header flex flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8"
                :class="
                  verificationResult.found
                    ? resultHeaderClass
                    : 'bg-red-50'
                "
              >
                <div class="flex items-center gap-4">
                  <div
                    class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                    :class="
                      verificationResult.found
                        ? resultIconClass
                        : 'bg-red-100 text-red-700'
                    "
                  >
                    <CheckCircleIcon
                      v-if="verificationResult.found"
                      class="h-8 w-8"
                    />

                    <XCircleIcon
                      v-else
                      class="h-8 w-8"
                    />
                  </div>

                  <div>
                    <p
                      class="text-xs font-bold uppercase tracking-[0.16em]"
                      :class="
                        verificationResult.found
                          ? resultTitleClass
                          : 'text-red-700'
                      "
                    >
                      Verification result
                    </p>

                    <h2
                      class="mt-1 text-2xl font-bold"
                      :class="
                        verificationResult.found
                          ? resultHeadingClass
                          : 'text-red-950'
                      "
                    >
                      {{
                        verificationResult.found
                          ? 'Statement of Account Found'
                          : 'Statement of Account Not Found'
                      }}
                    </h2>
                  </div>
                </div>

                <span
                  class="inline-flex w-fit items-center rounded-full px-4 py-2 text-sm font-bold"
                  :class="
                    verificationResult.found
                      ? statusBadgeClass
                      : 'bg-red-600 text-white'
                  "
                >
                  {{ verificationResult.status }}
                </span>
              </div>

              <!-- Found Result -->
              <div
                v-if="verificationResult.found"
                class="result-body p-6 sm:p-8"
              >
                <!-- Status notice -->
                <div
                  class="mb-8 flex items-start gap-3 rounded-2xl border p-4"
                  :class="statusNoticeClass"
                >
                  <InformationCircleIcon
                    class="mt-0.5 h-5 w-5 shrink-0"
                  />

                  <div>
                    <p class="font-bold">
                      {{ statusNoticeTitle }}
                    </p>

                    <p class="mt-1 text-sm leading-relaxed">
                      {{ statusNoticeMessage }}
                    </p>
                  </div>
                </div>

                <dl class="result-details grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  <div class="detail-item sm:col-span-2">
                    <dt class="detail-label">
                      SOA Number
                    </dt>

                    <dd class="detail-value break-all font-mono">
                      {{ displayValue(verificationResult.soaNumber) }}
                    </dd>
                  </div>

                  <div class="detail-item">
                    <dt class="detail-label">
                      SOA Status
                    </dt>

                    <dd>
                      <span
                        class="mt-2 inline-flex rounded-full px-3 py-1 text-sm font-bold"
                        :class="statusBadgeClass"
                      >
                        {{ displayValue(verificationResult.soaStatus) }}
                      </span>
                    </dd>
                  </div>

                  <div class="detail-item">
                    <dt class="detail-label">
                      SOA Creation Date
                    </dt>

                    <dd class="detail-value">
                      {{
                        formatDate(
                          verificationResult.soaCreateDatetime,
                        )
                      }}
                    </dd>
                  </div>

                  <div class="detail-item sm:col-span-2">
                    <dt class="detail-label">
                      Taxpayer / Owner
                    </dt>

                    <dd class="detail-value">
                      {{
                        displayValue(
                          verificationResult.taxpayerName,
                        )
                      }}
                    </dd>

                    <p class="mt-2 text-xs text-slate-500">
                      The taxpayer name is partially redacted for privacy.
                    </p>
                  </div>

                  <div class="detail-item sm:col-span-2">
                    <dt class="detail-label">
                      Taxpayer Address
                    </dt>

                    <dd class="detail-value">
                      {{
                        displayValue(
                          verificationResult.taxpayerAddress,
                        )
                      }}
                    </dd>

                    <p class="mt-2 text-xs text-slate-500">
                      The taxpayer address is partially redacted for privacy.
                    </p>
                  </div>

                  <div class="detail-item">
                    <dt class="detail-label">
                      SOA Requestor
                    </dt>

                    <dd class="detail-value">
                      {{
                        displayValue(
                          verificationResult.soaRequestor,
                        )
                      }}
                    </dd>
                  </div>

                  <div class="detail-item">
                    <dt class="detail-label">
                      Property Identification Number
                    </dt>

                    <dd class="detail-value font-mono">
                      {{ displayValue(verificationResult.pin) }}
                    </dd>
                  </div>

                  <div class="detail-item sm:col-span-2">
                    <dt class="detail-label">
                      Verification Date
                    </dt>

                    <dd class="detail-value">
                      {{ currentVerificationDate }}
                    </dd>
                  </div>
                </dl>

                <div
                  v-if="verificationResult.message"
                  class="result-message mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <p class="text-sm leading-relaxed text-slate-700">
                    {{ verificationResult.message }}
                  </p>
                </div>

                <div
                  class="result-actions mt-8 flex flex-wrap gap-3 border-t border-slate-200 pt-6"
                >
                  <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                    @click="printResult"
                  >
                    <PrinterIcon class="h-4 w-4" />

                    Print result
                  </button>

                  <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                    @click="verifyAnother"
                  >
                    <ArrowPathIcon class="h-4 w-4" />

                    Verify another
                  </button>
                </div>
              </div>

              <!-- Not Found Result -->
              <div
                v-else
                class="result-body p-6 sm:p-8"
              >
                <p class="leading-relaxed text-slate-700">
                  {{
                    verificationResult.message ||
                    'No Statement of Account was found for the supplied SOA number.'
                  }}
                </p>

                <div
                  class="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4"
                >
                  <p class="text-sm leading-relaxed text-amber-800">
                    Check that the SOA number was entered exactly as printed on
                    the document. The SOA number normally follows a format such
                    as
                    <span class="font-mono font-bold">
                      0124-15749-000009
                    </span>.
                  </p>
                </div>

                <div class="result-actions mt-6">
                  <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                    @click="verifyAnother"
                  >
                    <ArrowPathIcon class="h-4 w-4" />

                    Try another SOA number
                  </button>
                </div>
              </div>
            </section>
          </Transition>
        </section>

        <!-- Instructions -->
        <aside>
          <div
            class="sticky top-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-800"
            >
              <InformationCircleIcon class="h-6 w-6" />
            </div>

            <h2 class="mt-5 text-xl font-bold text-slate-900">
              How to verify
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

                  <p class="mt-1 text-sm leading-relaxed text-slate-600">
                    {{ instruction.description }}
                  </p>
                </div>
              </li>
            </ol>

            <div
              class="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5"
            >
              <div class="flex items-start gap-3">
                <ExclamationTriangleIcon
                  class="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                />

                <div>
                  <p class="font-bold text-amber-900">
                    Important
                  </p>

                  <p class="mt-1 text-sm leading-relaxed text-amber-800">
                    A found result confirms that the SOA exists in the official
                    system. Always review its status and compare the displayed
                    information with the printed document.
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-8 border-t border-slate-200 pt-6">
              <h3 class="font-bold text-slate-900">
                SOA statuses
              </h3>

              <div class="mt-4 space-y-3">
                <div class="flex items-center gap-3">
                  <span
                    class="inline-flex min-w-24 justify-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800"
                  >
                    ACTIVE
                  </span>

                  <p class="text-sm text-slate-600">
                    The SOA is currently active.
                  </p>
                </div>

                <div class="flex items-center gap-3">
                  <span
                    class="inline-flex min-w-24 justify-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800"
                  >
                    PAID
                  </span>

                  <p class="text-sm text-slate-600">
                    The account represented by the SOA has been paid.
                  </p>
                </div>

                <div class="flex items-center gap-3">
                  <span
                    class="inline-flex min-w-24 justify-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800"
                  >
                    NEW ENTRY
                  </span>

                  <p class="text-sm text-slate-600">
                    The SOA was newly entered into the system.
                  </p>
                </div>

                <div class="flex items-center gap-3">
                  <span
                    class="inline-flex min-w-24 justify-center rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800"
                  >
                    CANCELLED
                  </span>

                  <p class="text-sm text-slate-600">
                    The SOA exists but has been cancelled.
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-8 border-t border-slate-200 pt-6">
              <h3 class="font-bold text-slate-900">
                Need assistance?
              </h3>

              <p class="mt-2 text-sm leading-relaxed text-slate-600">
                Contact the City Treasurer's Office when the printed SOA does
                not match the verification result.
              </p>

              <NuxtLink
                to="/contact"
                class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-green-700 transition hover:text-green-900"
              >
                Contact the office

                <ArrowRightIcon class="h-4 w-4" />
              </NuxtLink>
            </div>
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
  DocumentCheckIcon,
  DocumentMagnifyingGlassIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  PrinterIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

type SoaStatus =
  | 'ACTIVE'
  | 'PAID'
  | 'NEW ENTRY'
  | 'CANCELLED'
  | 'UNKNOWN'
  | string

interface SoaApiData {
  soa_no?: string | null
  soa_status?: string | null
  taxpayer_name?: string | null
  taxpayer_address?: string | null
  soa_requestor?: string | null
  pin?: string | null
  soa_create_datetime?: string | null
}

interface SoaApiResponse {
  success?: boolean
  valid?: boolean
  message?: string | null
  soa?: SoaApiData | null
}

interface SoaVerificationResult {
  found: boolean
  status: SoaStatus
  message: string
  verificationCode: string
  soaNumber: string | null
  soaStatus: SoaStatus | null
  taxpayerName: string | null
  taxpayerAddress: string | null
  soaRequestor: string | null
  pin: string | null
  soaCreateDatetime: string | null
}

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const verificationValue = ref('')
const isLoading = ref(false)
const validationMessage = ref('')
const requestError = ref('')

const verificationResult =
  ref<SoaVerificationResult | null>(null)

const printResultSection =
  ref<HTMLElement | null>(null)

const instructions = [
  {
    title: 'Locate the SOA number',
    description:
      'Find the Statement of Account number or QR code printed on the document.',
  },
  {
    title: 'Enter or scan the SOA number',
    description:
      'Enter the SOA number manually or scan the QR code to open this page automatically.',
  },
  {
    title: 'Review the result',
    description:
      'Compare the SOA number, taxpayer, requestor, PIN, status, and creation date with the printed document.',
  },
]

const normalizedStatus = computed(() => {
  return (
    verificationResult.value?.soaStatus
      ?.trim()
      .toUpperCase() || 'UNKNOWN'
  )
})

const currentVerificationDate = computed(() => {
  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Manila',
  }).format(new Date())
})

const statusBadgeClass = computed(() => {
  switch (normalizedStatus.value) {
    case 'ACTIVE':
      return 'bg-emerald-600 text-white'

    case 'PAID':
      return 'bg-blue-600 text-white'

    case 'NEW ENTRY':
      return 'bg-amber-500 text-white'

    case 'CANCELLED':
      return 'bg-red-600 text-white'

    default:
      return 'bg-slate-600 text-white'
  }
})

const resultBorderClass = computed(() => {
  switch (normalizedStatus.value) {
    case 'ACTIVE':
      return 'border-emerald-200'

    case 'PAID':
      return 'border-blue-200'

    case 'NEW ENTRY':
      return 'border-amber-200'

    case 'CANCELLED':
      return 'border-red-200'

    default:
      return 'border-slate-200'
  }
})

const resultHeaderClass = computed(() => {
  switch (normalizedStatus.value) {
    case 'ACTIVE':
      return 'bg-emerald-50'

    case 'PAID':
      return 'bg-blue-50'

    case 'NEW ENTRY':
      return 'bg-amber-50'

    case 'CANCELLED':
      return 'bg-red-50'

    default:
      return 'bg-slate-50'
  }
})

const resultIconClass = computed(() => {
  switch (normalizedStatus.value) {
    case 'ACTIVE':
      return 'bg-emerald-100 text-emerald-700'

    case 'PAID':
      return 'bg-blue-100 text-blue-700'

    case 'NEW ENTRY':
      return 'bg-amber-100 text-amber-700'

    case 'CANCELLED':
      return 'bg-red-100 text-red-700'

    default:
      return 'bg-slate-100 text-slate-700'
  }
})

const resultTitleClass = computed(() => {
  switch (normalizedStatus.value) {
    case 'ACTIVE':
      return 'text-emerald-700'

    case 'PAID':
      return 'text-blue-700'

    case 'NEW ENTRY':
      return 'text-amber-700'

    case 'CANCELLED':
      return 'text-red-700'

    default:
      return 'text-slate-700'
  }
})

const resultHeadingClass = computed(() => {
  switch (normalizedStatus.value) {
    case 'ACTIVE':
      return 'text-emerald-950'

    case 'PAID':
      return 'text-blue-950'

    case 'NEW ENTRY':
      return 'text-amber-950'

    case 'CANCELLED':
      return 'text-red-950'

    default:
      return 'text-slate-950'
  }
})

const statusNoticeClass = computed(() => {
  switch (normalizedStatus.value) {
    case 'ACTIVE':
      return 'border-emerald-200 bg-emerald-50 text-emerald-900'

    case 'PAID':
      return 'border-blue-200 bg-blue-50 text-blue-900'

    case 'NEW ENTRY':
      return 'border-amber-200 bg-amber-50 text-amber-900'

    case 'CANCELLED':
      return 'border-red-200 bg-red-50 text-red-900'

    default:
      return 'border-slate-200 bg-slate-50 text-slate-900'
  }
})

const statusNoticeTitle = computed(() => {
  switch (normalizedStatus.value) {
    case 'ACTIVE':
      return 'Active Statement of Account'

    case 'PAID':
      return 'Paid Statement of Account'

    case 'NEW ENTRY':
      return 'Newly Entered Statement of Account'

    case 'CANCELLED':
      return 'Cancelled Statement of Account'

    default:
      return 'Statement of Account Found'
  }
})

const statusNoticeMessage = computed(() => {
  switch (normalizedStatus.value) {
    case 'ACTIVE':
      return 'This Statement of Account is currently marked as active in the official records.'

    case 'PAID':
      return 'This Statement of Account exists in the official records and is currently marked as paid.'

    case 'NEW ENTRY':
      return 'This Statement of Account exists in the official records and is currently marked as a new entry.'

    case 'CANCELLED':
      return 'This Statement of Account exists in the official records but is currently marked as cancelled.'

    default:
      return 'This Statement of Account was found in the official records.'
  }
})

function clearMessages(): void {
  validationMessage.value = ''
  requestError.value = ''
  verificationResult.value = null
}

function clearForm(): void {
  verificationValue.value = ''
  clearMessages()
}

function normalizeVerificationValue(
  value: string,
): string {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return ''
  }

  try {
    const url = new URL(trimmedValue)

    const queryValue =
      url.searchParams.get('code') ||
      url.searchParams.get('soa_no') ||
      url.searchParams.get('soa_number') ||
      url.searchParams.get('soa') ||
      url.searchParams.get('reference') ||
      url.searchParams.get('token')

    if (queryValue) {
      return queryValue.trim().toUpperCase()
    }

    const pathParts = url.pathname
      .split('/')
      .filter((pathPart) => pathPart.length > 0)

    return (
      pathParts[pathParts.length - 1]
        ?.trim()
        .toUpperCase() || ''
    )
  } catch {
    const queryMatch = trimmedValue.match(
      /(?:code|soa_no|soa_number|soa|reference|token)=([^&]+)/i,
    )

    if (queryMatch?.[1]) {
      try {
        return decodeURIComponent(queryMatch[1])
          .trim()
          .toUpperCase()
      } catch {
        return queryMatch[1]
          .trim()
          .toUpperCase()
      }
    }

    return trimmedValue.toUpperCase()
  }
}

function isValidSoaNumber(
  value: string,
): boolean {
  return /^[A-Z0-9-]{5,50}$/.test(value)
}

function decodeHtmlEntities(
  value: string | null | undefined,
): string {
  if (!value) {
    return ''
  }

  if (import.meta.client) {
    const textarea =
      document.createElement('textarea')

    textarea.innerHTML = value

    return textarea.value
  }

  return value
    .replace(/&#x2F;/gi, '/')
    .replace(/&#47;/g, '/')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/gi, "'")
}

function createNotFoundResult(
  message: string,
  verificationCode: string,
): SoaVerificationResult {
  return {
    found: false,
    status: 'NOT FOUND',
    message,
    verificationCode,
    soaNumber: verificationCode || null,
    soaStatus: null,
    taxpayerName: null,
    taxpayerAddress: null,
    soaRequestor: null,
    pin: null,
    soaCreateDatetime: null,
  }
}

function mapApiResponse(
  response: SoaApiResponse,
  verificationCode: string,
): SoaVerificationResult {
  const details = response.soa

  /*
   * Only a missing database record is treated as not found.
   *
   * ACTIVE, PAID, NEW ENTRY, and CANCELLED are all displayed.
   */
  if (response.valid !== true || !details) {
    return createNotFoundResult(
      response.message ||
        'No Statement of Account was found for the supplied SOA number.',
      verificationCode,
    )
  }

  const soaStatus =
    details.soa_status
      ?.trim()
      .toUpperCase() || 'UNKNOWN'

  return {
    found: true,
    status: soaStatus,
    message:
      response.message ||
      'The Statement of Account was found in the official records.',
    verificationCode,
    soaNumber:
      details.soa_no?.trim() ||
      verificationCode,
    soaStatus,
    taxpayerName:
      decodeHtmlEntities(
        details.taxpayer_name,
      ) || null,
    taxpayerAddress:
      decodeHtmlEntities(
        details.taxpayer_address,
      ) || null,
    soaRequestor:
      decodeHtmlEntities(
        details.soa_requestor,
      ) || null,
    pin:
      details.pin?.trim() || null,
    soaCreateDatetime:
      details.soa_create_datetime || null,
  }
}

function getApiBaseUrl(): string {
  return String(
      runtimeConfig.public.apiBaseURL || '',
  ).replace(/\/+$/, '')
}

function buildVerificationEndpoint(
  soaNumber: string,
): string {
  const apiBaseUrl = getApiBaseUrl()

  if (!apiBaseUrl) {
    throw new Error(
      'The ORDS API base URL is not configured.',
    )
  }

  const encodedSoaNumber =
    encodeURIComponent(soaNumber)

  /*
   * Expected base URL:
   * http://localhost:8080/ords/rpt/api
   *
   * Final endpoint:
   * /soa-verify/soa-verify/{SOA_NO}
   */
  return `${apiBaseUrl}/soa-verify/soa-verify/${encodedSoaNumber}`
}

async function verifySoa(): Promise<void> {
  validationMessage.value = ''
  requestError.value = ''
  verificationResult.value = null

  const normalizedValue =
    normalizeVerificationValue(
      verificationValue.value,
    )

  if (!normalizedValue) {
    validationMessage.value =
      'Enter a Statement of Account number.'

    return
  }

  if (!isValidSoaNumber(normalizedValue)) {
    validationMessage.value =
      'The SOA number format is invalid. Use only letters, numbers, and hyphens.'

    return
  }

  verificationValue.value = normalizedValue
  isLoading.value = true

  try {
    const endpoint =
      buildVerificationEndpoint(
        normalizedValue,
      )

    const response =
      await $fetch<SoaApiResponse>(
        endpoint,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        },
      )

    verificationResult.value =
      mapApiResponse(
        response,
        normalizedValue,
      )

    await router.replace({
      query: {
        code: normalizedValue,
      },
    })

    await nextTick()

    if (import.meta.client) {
      printResultSection.value?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  } catch (error: unknown) {
    const fetchError = error as {
      data?: {
        message?: string
        error?: string
      }
      message?: string
      statusCode?: number
      status?: number
    }

    const statusCode =
      fetchError.statusCode ||
      fetchError.status

    if (statusCode === 404) {
      verificationResult.value =
        createNotFoundResult(
          fetchError.data?.message ||
            'No Statement of Account was found for the supplied SOA number.',
          normalizedValue,
        )

      return
    }

    if (statusCode === 400) {
      validationMessage.value =
        fetchError.data?.message ||
        'The SOA number supplied is invalid.'

      return
    }

    if (statusCode === 429) {
      requestError.value =
        'Too many verification requests were made from your connection. Please wait about one minute before trying again.'

      return
    }

    requestError.value =
      fetchError.data?.message ||
      fetchError.data?.error ||
      fetchError.message ||
      'The SOA verification service is currently unavailable. Please try again.'
  } finally {
    isLoading.value = false
  }
}

function displayValue(
  value:
    | string
    | number
    | null
    | undefined,
): string {
  if (
    value === null ||
    value === undefined ||
    String(value).trim() === ''
  ) {
    return 'Not provided'
  }

  return String(value)
}

function formatDate(
  value: string | null | undefined,
): string {
  if (!value) {
    return 'Not provided'
  }

  /*
   * The API returns:
   * YYYY-MM-DDTHH24:MI:SS
   *
   * It does not include a timezone offset, so it is displayed
   * as Philippine local database time.
   */
  const localDateMatch = value.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/,
  )

  if (localDateMatch) {
    const [
      ,
      year,
      month,
      day,
      hour,
      minute,
    ] = localDateMatch

    const localDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
    )

    return new Intl.DateTimeFormat(
      'en-PH',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      },
    ).format(localDate)
  }

  const parsedDate = new Date(value)

  if (Number.isNaN(parsedDate.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Manila',
  }).format(parsedDate)
}

function escapeHtml(
  value: string,
): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function printResult(): void {
  if (!import.meta.client) {
    return
  }

  if (!verificationResult.value) {
    requestError.value =
      'There is no verification result available to print.'

    return
  }

  if (!printResultSection.value) {
    requestError.value =
      'The verification result could not be prepared for printing.'

    return
  }

  const printWindow = window.open(
    '',
    '_blank',
    'width=900,height=700',
  )

  if (!printWindow) {
    requestError.value =
      'The print window was blocked. Please allow pop-ups and try again.'

    return
  }

  const resultHtml =
    printResultSection.value.innerHTML

  printWindow.document.open()

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <title>SOA Verification Result</title>

        <style>
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 32px;
            background: #ffffff;
            color: #0f172a;
            font-family: Arial, Helvetica, sans-serif;
          }

          .print-container {
            max-width: 820px;
            margin: 0 auto;
          }

          .print-header {
            margin-bottom: 28px;
            padding-bottom: 18px;
            border-bottom: 2px solid #15803d;
            text-align: center;
          }

          .print-header h1 {
            margin: 0;
            color: #173a67;
            font-size: 24px;
          }

          .print-header p {
            margin: 6px 0 0;
            color: #475569;
            font-size: 14px;
          }

          section {
            overflow: hidden;
            border: 1px solid #cbd5e1;
            border-radius: 18px;
          }

          .result-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            padding: 22px 26px;
          }

          .result-header > div:first-child {
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .result-body {
            padding: 26px;
          }

          .bg-emerald-50 {
            background: #ecfdf5;
          }

          .bg-blue-50 {
            background: #eff6ff;
          }

          .bg-amber-50 {
            background: #fffbeb;
          }

          .bg-red-50 {
            background: #fef2f2;
          }

          .bg-slate-50 {
            background: #f8fafc;
          }

          .bg-emerald-100 {
            background: #d1fae5;
          }

          .bg-blue-100 {
            background: #dbeafe;
          }

          .bg-amber-100 {
            background: #fef3c7;
          }

          .bg-red-100 {
            background: #fee2e2;
          }

          .bg-slate-100 {
            background: #f1f5f9;
          }

          .bg-emerald-600 {
            background: #059669;
          }

          .bg-blue-600 {
            background: #2563eb;
          }

          .bg-amber-500 {
            background: #f59e0b;
          }

          .bg-red-600 {
            background: #dc2626;
          }

          .bg-slate-600 {
            background: #475569;
          }

          .text-white {
            color: #ffffff;
          }

          .text-emerald-700,
          .text-emerald-900,
          .text-emerald-950 {
            color: #047857;
          }

          .text-blue-700,
          .text-blue-900,
          .text-blue-950 {
            color: #1d4ed8;
          }

          .text-amber-700,
          .text-amber-900,
          .text-amber-950 {
            color: #b45309;
          }

          .text-red-700,
          .text-red-900,
          .text-red-950 {
            color: #b91c1c;
          }

          .text-slate-700,
          .text-slate-900,
          .text-slate-950 {
            color: #0f172a;
          }

          .result-details {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 22px 30px;
            margin: 0;
          }

          .detail-item {
            padding-bottom: 14px;
            border-bottom:
              1px solid #e2e8f0;
            break-inside: avoid;
          }

          .sm\\:col-span-2 {
            grid-column:
              span 2 / span 2;
          }

          .detail-label {
            color: #64748b;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .detail-value {
            margin-top: 7px;
            color: #0f172a;
            font-size: 15px;
            font-weight: 700;
            overflow-wrap: anywhere;
          }

          .font-mono {
            font-family:
              "Courier New",
              monospace;
          }

          .result-message {
            margin-top: 24px;
            padding: 15px;
            border:
              1px solid #cbd5e1;
            border-radius: 12px;
            background: #f8fafc;
          }

          .result-actions,
          button,
          svg {
            display: none !important;
          }

          .print-footer {
            margin-top: 26px;
            padding-top: 16px;
            border-top:
              1px solid #cbd5e1;
            color: #64748b;
            font-size: 11px;
            line-height: 1.5;
            text-align: center;
          }

          @media print {
            body {
              padding: 16px;
            }

            @page {
              size: A4 portrait;
              margin: 15mm;
            }
          }
        </style>
      </head>

      <body>
        <div class="print-container">
          <div class="print-header">
            <h1>
              City Treasurer's Office
            </h1>

            <p>
              Statement of Account Verification Result
            </p>
          </div>

          ${resultHtml}

          <div class="print-footer">
            This document is a verification result only and is not a
            replacement for the original Statement of Account.
            <br />
            Printed on ${escapeHtml(currentVerificationDate.value)}
          </div>
        </div>
      </body>
    </html>
  `)

  printWindow.document.close()

  printWindow.onload = () => {
    printWindow.focus()
    printWindow.print()
    printWindow.close()
  }
}

async function verifyAnother(): Promise<void> {
  verificationValue.value = ''
  verificationResult.value = null
  requestError.value = ''
  validationMessage.value = ''

  await router.replace({
    query: {},
  })

  await nextTick()

  if (import.meta.client) {
    document
      .getElementById(
        'soaVerificationValue',
      )
      ?.focus()
  }
}

onMounted(() => {
  const codeFromUrl =
    typeof route.query.code === 'string'
      ? route.query.code
      : ''

  if (codeFromUrl) {
    verificationValue.value =
      normalizeVerificationValue(
        codeFromUrl,
      )

    void verifySoa()
  }
})
</script>

<style scoped>
.verification-header-gradient {
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

.detail-item {
  border-bottom: 1px solid rgb(226 232 240);
  padding-bottom: 1rem;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(100 116 139);
}

.detail-value {
  margin-top: 0.45rem;
  overflow-wrap: anywhere;
  font-size: 1rem;
  font-weight: 700;
  color: rgb(15 23 42);
}

.result-enter-active,
.result-leave-active {
  transition:
    opacity 250ms ease,
    transform 250ms ease;
}

.result-enter-from,
.result-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
