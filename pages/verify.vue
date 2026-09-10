<template>
  <div class="min-h-screen bg-slate-50">
    <Head>
      <Title>
        Tax Clearance Verification | City Treasurer's Office
      </Title>

      <Meta
        name="description"
        content="Verify the authenticity and validity of a City Treasurer's Office tax clearance."
      />
    </Head>

    <!-- Page Header -->
    <section class="relative overflow-hidden bg-slate-950">
      <div class="absolute inset-0 verification-header-gradient"></div>

      <div
        class="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"
      ></div>

      <div
        class="absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
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
            <ShieldCheckIcon class="h-4 w-4 text-cyan-300" />

            <span
              class="text-xs font-semibold uppercase tracking-[0.18em] text-white/90"
            >
              Official Verification Service
            </span>
          </div>

          <h1
            class="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Tax Clearance Verification
          </h1>

          <p
            class="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            Enter the tax clearance verification code or scan the QR code
            printed on the document to confirm its authenticity.
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
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700"
              >
                <MagnifyingGlassIcon class="h-6 w-6" />
              </div>

              <div>
                <h2 class="text-2xl font-bold text-slate-900">
                  Verify a tax clearance
                </h2>

                <p class="mt-2 text-sm leading-relaxed text-slate-600">
                  Enter the verification hash or paste the complete URL
                  encoded in the QR code.
                </p>
              </div>
            </div>

            <form
              class="mt-8"
              @submit.prevent="verifyTaxClearance"
            >
              <label
                for="verificationValue"
                class="block text-sm font-bold text-slate-800"
              >
                Verification code
              </label>

              <div class="relative mt-2">
                <DocumentMagnifyingGlassIcon
                  class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="verificationValue"
                  v-model.trim="verificationValue"
                  type="text"
                  autocomplete="off"
                  placeholder="Enter the verification hash"
                  class="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 pr-12 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                  :disabled="isLoading"
                  @input="clearMessages"
                />

                <button
                  v-if="verificationValue"
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Clear verification value"
                  :disabled="isLoading"
                  @click="clearForm"
                >
                  <XMarkIcon class="h-5 w-5" />
                </button>
              </div>

              <p class="mt-2 text-xs leading-relaxed text-slate-500">
                You may paste a verification URL such as
                <span class="font-mono">
                  /verify?code=...
                </span>
                or the hash value by itself.
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
                class="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-6 py-4 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
                :disabled="isLoading"
              >
                <ArrowPathIcon
                  v-if="isLoading"
                  class="h-5 w-5 animate-spin"
                />

                <ShieldCheckIcon
                  v-else
                  class="h-5 w-5"
                />

                {{
                  isLoading
                    ? 'Verifying...'
                    : 'Verify tax clearance'
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
                verificationResult.valid
                  ? 'border-emerald-200'
                  : 'border-red-200'
              "
            >
              <!-- Result Header -->
              <div
                class="result-header flex flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8"
                :class="
                  verificationResult.valid
                    ? 'bg-emerald-50'
                    : 'bg-red-50'
                "
              >
                <div class="flex items-center gap-4">
                  <div
                    class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                    :class="
                      verificationResult.valid
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    "
                  >
                    <CheckCircleIcon
                      v-if="verificationResult.valid"
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
                        verificationResult.valid
                          ? 'text-emerald-700'
                          : 'text-red-700'
                      "
                    >
                      Verification result
                    </p>

                    <h2
                      class="mt-1 text-2xl font-bold"
                      :class="
                        verificationResult.valid
                          ? 'text-emerald-950'
                          : 'text-red-950'
                      "
                    >
                      {{
                        verificationResult.valid
                          ? 'Valid Tax Clearance'
                          : 'Invalid Tax Clearance'
                      }}
                    </h2>
                  </div>
                </div>

                <span
                  class="inline-flex w-fit items-center rounded-full px-4 py-2 text-sm font-bold"
                  :class="
                    verificationResult.valid
                      ? 'bg-emerald-600 text-white'
                      : 'bg-red-600 text-white'
                  "
                >
                  {{ verificationResult.status }}
                </span>
              </div>

              <!-- Valid Result Details -->
              <div
                v-if="verificationResult.valid"
                class="result-body p-6 sm:p-8"
              >
                <dl class="result-details grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  <!-- Verification Code -->
                  <div class="detail-item sm:col-span-2">
                    <dt class="detail-label">
                      Verification Code
                    </dt>

                    <dd class="detail-value break-all font-mono text-sm">
                      {{
                        displayValue(
                          verificationResult.verificationCode,
                        )
                      }}
                    </dd>
                  </div>

                  <!-- Control Number -->
                  <div class="detail-item">
                    <dt class="detail-label">
                      Control Number
                    </dt>

                    <dd class="detail-value font-mono">
                      {{
                        displayValue(
                          verificationResult.controlNumber,
                        )
                      }}
                    </dd>
                  </div>

                  <!-- Date Issued -->
                  <div class="detail-item">
                    <dt class="detail-label">
                      Date Issued
                    </dt>

                    <dd class="detail-value">
                      {{
                        formatDate(
                          verificationResult.dateIssued,
                        )
                      }}
                    </dd>
                  </div>

                  <!-- Taxpayer -->
                  <div class="detail-item">
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
                  </div>

                  <!-- Tax Year -->
                  <div class="detail-item">
                    <dt class="detail-label">
                      Tax Year
                    </dt>

                    <dd class="detail-value">
                      {{
                        displayValue(
                          verificationResult.taxYear,
                        )
                      }}
                    </dd>
                  </div>

                  <!-- Address -->
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
                  </div>

                  <!-- Location -->
                  <div class="detail-item sm:col-span-2">
                    <dt class="detail-label">
                      Property Location
                    </dt>

                    <dd class="detail-value">
                      {{
                        displayValue(
                          verificationResult.propertyLocation,
                        )
                      }}
                    </dd>
                  </div>

                  <!-- Land PIN -->
                  <div class="detail-item sm:col-span-2">
                    <dt class="detail-label">
                      Land Property Identification Number
                    </dt>

                    <dd class="detail-value font-mono">
                      {{
                        displayValue(
                          verificationResult.landPin,
                        )
                      }}
                    </dd>
                  </div>

                  <!-- Improvements -->
                  <div class="detail-item improvements-section sm:col-span-2">
                    <dt class="detail-label">
                      Property Improvements
                    </dt>

                    <dd class="mt-3">
                      <div
                        v-if="verificationResult.improvements.length > 0"
                        class="improvements-table overflow-hidden rounded-2xl border border-slate-200"
                      >
                        <div
                          class="improvements-header grid grid-cols-[2.2fr_1fr] gap-4 border-b border-slate-200 bg-slate-100 px-4 py-3"
                        >
                          <span
                            class="text-xs font-bold uppercase tracking-wider text-slate-600"
                          >
                            Improvement PIN
                          </span>

                          <span
                            class="text-xs font-bold uppercase tracking-wider text-slate-600"
                          >
                            Improvement Type
                          </span>
                        </div>

                        <div
                          v-for="(improvement, index) in verificationResult.improvements"
                          :key="`${improvement.improvementPin}-${improvement.improvementType}-${index}`"
                          class="improvement-row grid grid-cols-[2.2fr_1fr] gap-4 px-4 py-4"
                          :class="
                            index < verificationResult.improvements.length - 1
                              ? 'border-b border-slate-200'
                              : ''
                          "
                        >
                          <span
                            class="improvement-pin break-all font-mono text-sm font-bold text-slate-900"
                          >
                            {{
                              displayValue(
                                improvement.improvementPin,
                              )
                            }}
                          </span>

                          <span
                            class="improvement-type inline-flex w-fit items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800"
                          >
                            {{
                              formatImprovementType(
                                improvement.improvementType,
                              )
                            }}
                          </span>
                        </div>
                      </div>

                      <p
                        v-else
                        class="improvements-empty rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
                      >
                        No property improvements are linked to this tax
                        clearance.
                      </p>
                    </dd>
                  </div>

                  <!-- OR Number -->
                  <div class="detail-item">
                    <dt class="detail-label">
                      Official Receipt Number
                    </dt>

                    <dd class="detail-value">
                      {{
                        displayValue(
                          verificationResult.orNumber,
                        )
                      }}
                    </dd>
                  </div>

                  <!-- Verification Date -->
                  <div class="detail-item">
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

              <!-- Invalid Result -->
              <div
                v-else
                class="result-body p-6 sm:p-8"
              >
                <p class="leading-relaxed text-slate-700">
                  {{
                    verificationResult.message ||
                    'No valid tax clearance record was found for the supplied verification code.'
                  }}
                </p>

                <div class="result-actions mt-6">
                  <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                    @click="verifyAnother"
                  >
                    <ArrowPathIcon class="h-4 w-4" />

                    Try another code
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
              class="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800"
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
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white"
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
                    A verified result confirms that the document exists in the
                    official system. Altered or inconsistent printed details
                    should still be reported to the City Treasurer's Office.
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-8 border-t border-slate-200 pt-6">
              <h3 class="font-bold text-slate-900">
                Need assistance?
              </h3>

              <p class="mt-2 text-sm leading-relaxed text-slate-600">
                Contact the City Treasurer's Office when the printed document
                does not match the verification result.
              </p>

              <NuxtLink
                to="/contact"
                class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-900"
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
  DocumentMagnifyingGlassIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  PrinterIcon,
  ShieldCheckIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

interface TaxClearanceImprovementDetails {
  improvement_pin?: string | null
  improvement_type?: string | null
}

interface TaxClearanceDetails {
  control_number?: string | null
  pin?: string | null
  tax_year?: number | string | null
  taxpayer_name?: string | null
  taxpayer_address?: string | null
  property_location?: string | null
  or_number?: string | null
  date_issued?: string | null
  improvements?: TaxClearanceImprovementDetails[] | null
}

interface TaxClearanceApiResponse {
  success?: boolean
  valid?: boolean
  status?: string | null
  message?: string | null
  tax_clearance?: TaxClearanceDetails | null
}

interface VerificationImprovement {
  improvementPin: string | null
  improvementType: string | null
}

interface VerificationResult {
  valid: boolean
  status: string
  message: string
  verificationCode: string
  controlNumber: string | null
  taxpayerName: string | null
  taxpayerAddress: string | null
  landPin: string | null
  taxYear: string | number | null
  dateIssued: string | null
  propertyLocation: string | null
  orNumber: string | null
  improvements: VerificationImprovement[]
}

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const verificationValue = ref('')
const isLoading = ref(false)
const validationMessage = ref('')
const requestError = ref('')
const verificationResult = ref<VerificationResult | null>(null)
const printResultSection = ref<HTMLElement | null>(null)

const instructions = [
  {
    title: 'Locate the verification code',
    description:
      'Find the QR code or verification hash printed on the tax clearance document.',
  },
  {
    title: 'Enter or scan the code',
    description:
      'Enter the hash manually or scan the QR code to open this verification page automatically.',
  },
  {
    title: 'Review the result',
    description:
      'Compare the taxpayer, property PINs, improvement types, tax year, issue date, address, and official receipt number with the printed document.',
  },
]

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

function clearMessages(): void {
  validationMessage.value = ''
  requestError.value = ''
  verificationResult.value = null
}

function clearForm(): void {
  verificationValue.value = ''
  clearMessages()
}

function normalizeVerificationValue(value: string): string {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return ''
  }

  try {
    const url = new URL(trimmedValue)

    const queryValue =
      url.searchParams.get('code') ||
      url.searchParams.get('hash') ||
      url.searchParams.get('verification_code') ||
      url.searchParams.get('control_number')

    if (queryValue) {
      return queryValue.trim()
    }

    const pathParts = url.pathname
      .split('/')
      .filter((pathPart) => pathPart.length > 0)

    return pathParts[pathParts.length - 1] || trimmedValue
  } catch {
    return trimmedValue
  }
}

function decodeHtmlEntities(
  value: string | null | undefined,
): string {
  if (!value) {
    return ''
  }

  if (import.meta.client) {
    const textarea = document.createElement('textarea')
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

function createInvalidResult(
  message: string,
  verificationCode: string,
): VerificationResult {
  return {
    valid: false,
    status: 'NOT FOUND',
    message,
    verificationCode,
    controlNumber: null,
    taxpayerName: null,
    taxpayerAddress: null,
    landPin: null,
    taxYear: null,
    dateIssued: null,
    propertyLocation: null,
    orNumber: null,
    improvements: [],
  }
}

function mapImprovements(
  improvements: TaxClearanceImprovementDetails[] | null | undefined,
): VerificationImprovement[] {
  if (!Array.isArray(improvements)) {
    return []
  }

  return improvements.map((improvement) => {
    return {
      improvementPin:
        decodeHtmlEntities(improvement.improvement_pin) ||
        null,
      improvementType:
        decodeHtmlEntities(improvement.improvement_type) ||
        null,
    }
  })
}

function mapApiResponse(
  response: TaxClearanceApiResponse,
  verificationCode: string,
): VerificationResult {
  const details = response.tax_clearance

  if (!response.valid || !details) {
    return createInvalidResult(
      response.message ||
        'No tax clearance record was found for the supplied verification code.',
      verificationCode,
    )
  }

  const taxpayerAddress = decodeHtmlEntities(
    details.taxpayer_address,
  )

  const propertyLocation = decodeHtmlEntities(
    details.property_location,
  )

  return {
    valid: true,
    status: response.status || 'VERIFIED',
    message:
      response.message ||
      'This tax clearance was found in the official records.',
    verificationCode,
    controlNumber:
      details.control_number ||
      null,
    taxpayerName:
      decodeHtmlEntities(details.taxpayer_name) ||
      null,
    taxpayerAddress:
      taxpayerAddress ||
      null,
    landPin:
      details.pin ||
      null,
    taxYear:
      details.tax_year ??
      null,
    dateIssued:
      details.date_issued ||
      null,
    propertyLocation:
      propertyLocation ||
      null,
    orNumber:
      details.or_number ||
      null,
    improvements:
      mapImprovements(details.improvements),
  }
}

async function verifyTaxClearance(): Promise<void> {
  validationMessage.value = ''
  requestError.value = ''
  verificationResult.value = null

  const normalizedValue = normalizeVerificationValue(
    verificationValue.value,
  )

  if (!normalizedValue) {
    validationMessage.value = 'Enter a verification code.'
    return
  }

  isLoading.value = true

  try {
    const apiBaseUrl = String(
      runtimeConfig.public.apiBaseURL || '',
    ).replace(/\/+$/, '')

    if (!apiBaseUrl) {
      throw new Error(
        'The ORDS API base URL is not configured.',
      )
    }

    const encodedCode = encodeURIComponent(normalizedValue)

    const response =
      await $fetch<TaxClearanceApiResponse>(
        `${apiBaseUrl}/tax-clearance/verify/${encodedCode}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        },
      )

    verificationResult.value = mapApiResponse(
      response,
      normalizedValue,
    )

    await router.replace({
      query: {
        code: normalizedValue,
      },
    })
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
        createInvalidResult(
          fetchError.data?.message ||
            'No tax clearance record was found for the supplied verification code.',
          normalizedValue,
        )

      return
    }

    requestError.value =
      fetchError.data?.message ||
      fetchError.data?.error ||
      fetchError.message ||
      'The verification service is currently unavailable. Please try again.'
  } finally {
    isLoading.value = false
  }
}

function displayValue(
  value: string | number | null | undefined,
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

function formatImprovementType(
  value: string | null | undefined,
): string {
  if (!value || !value.trim()) {
    return 'Not provided'
  }

  const normalizedType = value.trim().toUpperCase()

  const improvementTypeLabels: Record<string, string> = {
    BLDG: 'Building',
    BUILDING: 'Building',
    MACH: 'Machinery',
    MACHINERY: 'Machinery',
    OTHER: 'Other Improvement',
    OTHER_IMPROVEMENT: 'Other Improvement',
  }

  return improvementTypeLabels[normalizedType] || value
}

function formatDate(
  value: string | null | undefined,
): string {
  if (!value) {
    return 'Not provided'
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

function escapeHtml(value: string): string {
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

  const resultHtml = printResultSection.value.innerHTML

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

        <title>Tax Clearance Verification Result</title>

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
            border: 1px solid #a7f3d0;
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

          .bg-red-50 {
            background: #fef2f2;
          }

          .bg-emerald-100 {
            background: #d1fae5;
          }

          .bg-red-100 {
            background: #fee2e2;
          }

          .bg-emerald-600 {
            background: #059669;
          }

          .bg-red-600 {
            background: #dc2626;
          }

          .text-emerald-700,
          .text-emerald-950 {
            color: #047857;
          }

          .text-red-700,
          .text-red-950 {
            color: #b91c1c;
          }

          .text-white {
            color: #ffffff;
          }

          .result-details {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 22px 30px;
            margin: 0;
          }

          .detail-item {
            padding-bottom: 14px;
            border-bottom: 1px solid #e2e8f0;
            break-inside: avoid;
          }

          .sm\\:col-span-2 {
            grid-column: span 2 / span 2;
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
            font-family: "Courier New", monospace;
          }

          .improvements-table {
            overflow: hidden;
            margin-top: 12px;
            border: 1px solid #cbd5e1;
            border-radius: 12px;
          }

          .improvements-header,
          .improvement-row {
            display: grid;
            grid-template-columns: 2.2fr 1fr;
            gap: 16px;
            padding: 11px 14px;
          }

          .improvements-header {
            border-bottom: 1px solid #cbd5e1;
            background: #f1f5f9;
            color: #475569;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .improvement-row {
            align-items: center;
            border-bottom: 1px solid #e2e8f0;
            break-inside: avoid;
          }

          .improvement-row:last-child {
            border-bottom: 0;
          }

          .improvement-pin {
            color: #0f172a;
            font-family: "Courier New", monospace;
            font-size: 13px;
            font-weight: 700;
            overflow-wrap: anywhere;
          }

          .improvement-type {
            width: fit-content;
            padding: 4px 10px;
            border-radius: 9999px;
            background: #dbeafe;
            color: #1e40af;
            font-size: 11px;
            font-weight: 700;
          }

          .improvements-empty {
            margin-top: 12px;
            padding: 11px 14px;
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            background: #f8fafc;
            color: #64748b;
            font-size: 13px;
          }

          .result-message {
            margin-top: 24px;
            padding: 15px;
            border: 1px solid #cbd5e1;
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
            border-top: 1px solid #cbd5e1;
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
            <h1>City Treasurer's Office</h1>

            <p>Tax Clearance Verification Result</p>
          </div>

          ${resultHtml}

          <div class="print-footer">
            This document is a verification result only and is not a
            replacement for the original tax clearance.
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
      .getElementById('verificationValue')
      ?.focus()
  }
}

onMounted(() => {
  const codeFromUrl =
    typeof route.query.code === 'string'
      ? route.query.code
      : ''

  if (codeFromUrl) {
    verificationValue.value = codeFromUrl
    verifyTaxClearance()
  }
})
</script>

<style scoped>
.verification-header-gradient {
  background:
    radial-gradient(
      circle at top right,
      rgba(37, 99, 235, 0.3),
      transparent 38%
    ),
    linear-gradient(
      135deg,
      rgba(2, 12, 27, 0.99),
      rgba(5, 42, 72, 0.94)
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
