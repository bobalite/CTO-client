<template>
  <div class="min-h-screen bg-slate-50">
    <Head>
      <Title>Real Property Tax Calculator</Title>

      <Meta
        name="description"
        content="Estimate assessed value, basic real property tax, SEF, idle land tax, discount, penalty, and quarterly or annual tax due."
      />
    </Head>

    <!-- Hero -->
    <section class="relative overflow-hidden bg-slate-950">
      <div class="absolute inset-0 hero-gradient"></div>

      <div
        class="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl"
      ></div>

      <div
        class="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8"
      >
        <NuxtLink
          to="/real-property-tax"
          class="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
        >
          <ArrowLeftIcon class="h-4 w-4" />

          Back to RPT information
        </NuxtLink>

        <div class="max-w-3xl">
          <div
            class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2"
          >
            <CalculatorIcon class="h-4 w-4 text-emerald-300" />

            <span
              class="text-xs font-bold uppercase tracking-[0.16em] text-white/90"
            >
              Estimated computation
            </span>
          </div>

          <h1
            class="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Real Property Tax Calculator
          </h1>

          <p class="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
            Estimate assessed value, basic RPT, SEF, idle land tax,
            discounts, penalties, and annual or quarterly payment.
          </p>
        </div>
      </div>
    </section>

    <main class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <!-- Input form -->
        <section
          class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div class="flex items-start gap-4">
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700"
            >
              <HomeModernIcon class="h-6 w-6" />
            </div>

            <div>
              <h2 class="text-2xl font-bold text-slate-900">
                Property information
              </h2>

              <p class="mt-1 text-sm leading-relaxed text-slate-600">
                Enter the property value, classification, type, and payment
                details.
              </p>
            </div>
          </div>

          <form class="mt-8 space-y-7" @submit.prevent>
            <!-- Market value -->
            <div>
              <label class="field-label" for="marketValue">
                Fair market value
              </label>

              <div class="relative mt-2">
                <span
                  class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500"
                >
                  ₱
                </span>

                <input
                  id="marketValue"
                  v-model.number="form.marketValue"
                  type="number"
                  min="0"
                  step="0.01"
                  class="form-input pl-10"
                  placeholder="0.00"
                />
              </div>
            </div>

            <!-- Classification and type -->
            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label class="field-label" for="classification">
                  Property classification
                </label>

                <select
                  id="classification"
                  v-model="form.classification"
                  class="form-input mt-2"
                  @change="applySuggestedAssessmentLevel"
                >
                  <option value="AGRICULTURAL">
                    Agricultural
                  </option>

                  <option value="RESIDENTIAL">
                    Residential
                  </option>

                  <option value="COMMERCIAL">
                    Commercial
                  </option>

                  <option value="INDUSTRIAL">
                    Industrial
                  </option>

                  <option value="MINERAL">
                    Mineral
                  </option>

                  <option value="SPECIAL">
                    Special
                  </option>
                </select>
              </div>

              <div>
                <label class="field-label" for="propertyType">
                  Property type
                </label>

                <select
                  id="propertyType"
                  v-model="form.propertyType"
                  class="form-input mt-2"
                  @change="applySuggestedAssessmentLevel"
                >
                  <option value="LAND">
                    Land
                  </option>

                  <option value="BUILDING">
                    Building
                  </option>

                  <option value="MACHINERY">
                    Machinery
                  </option>

                  <option value="OTHER_IMPROVEMENT">
                    Other improvement
                  </option>
                </select>
              </div>
            </div>

            <!-- Assessment and tax rates -->
            <div
              class="rounded-2xl border border-blue-200 bg-blue-50 p-5"
            >
              <div class="flex items-start gap-3">
                <InformationCircleIcon
                  class="mt-0.5 h-5 w-5 shrink-0 text-blue-700"
                />

                <div>
                  <h3 class="font-bold text-blue-950">
                    Rates may be adjusted
                  </h3>

                  <p class="mt-1 text-sm leading-relaxed text-blue-800">
                    Confirm the assessment level and applicable tax rates
                    against the official tax declaration or Statement of
                    Account.
                  </p>
                </div>
              </div>

              <div class="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label class="field-label" for="assessmentLevel">
                    Assessment level
                  </label>

                  <div class="relative mt-2">
                    <input
                      id="assessmentLevel"
                      v-model.number="form.assessmentLevel"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      class="form-input pr-10"
                    />

                    <span class="percentage-symbol">%</span>
                  </div>
                </div>

                <div>
                  <label class="field-label" for="basicRate">
                    Basic RPT rate
                  </label>

                  <div class="relative mt-2">
                    <input
                      id="basicRate"
                      v-model.number="form.basicRate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.001"
                      class="form-input pr-10"
                    />

                    <span class="percentage-symbol">%</span>
                  </div>
                </div>

                <div>
                  <label class="field-label" for="sefRate">
                    SEF rate
                  </label>

                  <div class="relative mt-2">
                    <input
                      id="sefRate"
                      v-model.number="form.sefRate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      class="form-input pr-10"
                    />

                    <span class="percentage-symbol">%</span>
                  </div>
                </div>

                <div>
                  <label class="field-label" for="idleLandRate">
                    Idle land rate
                  </label>

                  <div class="relative mt-2">
                    <input
                      id="idleLandRate"
                      v-model.number="form.idleLandRate"
                      type="number"
                      min="0"
                      max="5"
                      step="0.01"
                      class="form-input pr-10"
                      :disabled="!form.isIdleLand"
                    />

                    <span class="percentage-symbol">%</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Idle land -->
            <label
              class="flex cursor-pointer items-start gap-4 rounded-2xl border border-slate-200 p-5 transition hover:bg-slate-50"
            >
              <input
                v-model="form.isIdleLand"
                type="checkbox"
                class="mt-1 h-5 w-5 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
              />

              <div>
                <span class="font-bold text-slate-900">
                  Property is subject to idle land tax
                </span>

                <p class="mt-1 text-sm leading-relaxed text-slate-600">
                  Enable only when the property has officially been classified
                  as idle land.
                </p>
              </div>
            </label>

            <!-- Payment coverage -->
            <div>
              <label class="field-label">
                Payment coverage
              </label>

              <div class="mt-3 grid gap-4 sm:grid-cols-2">
                <label
                  class="payment-option"
                  :class="
                    form.paymentCoverage === 'ANNUAL'
                      ? 'payment-option-active'
                      : ''
                  "
                >
                  <input
                    v-model="form.paymentCoverage"
                    type="radio"
                    value="ANNUAL"
                    class="sr-only"
                  />

                  <CalendarDaysIcon class="h-6 w-6" />

                  <span>
                    <span class="block font-bold">
                      Annual payment
                    </span>

                    <span class="mt-1 block text-xs opacity-75">
                      Complete tax for the year
                    </span>
                  </span>
                </label>

                <label
                  class="payment-option"
                  :class="
                    form.paymentCoverage === 'QUARTERLY'
                      ? 'payment-option-active'
                      : ''
                  "
                >
                  <input
                    v-model="form.paymentCoverage"
                    type="radio"
                    value="QUARTERLY"
                    class="sr-only"
                  />

                  <Squares2X2Icon class="h-6 w-6" />

                  <span>
                    <span class="block font-bold">
                      Quarterly payment
                    </span>

                    <span class="mt-1 block text-xs opacity-75">
                      One-fourth of annual tax
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <!-- Discount -->
            <div
              class="rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
            >
              <div class="flex items-center justify-between gap-4">
                <div>
                  <h3 class="font-bold text-emerald-950">
                    Prompt-payment discount
                  </h3>

                  <p class="mt-1 text-sm text-emerald-800">
                    Set to zero when the payment is no longer eligible.
                  </p>
                </div>

                <ReceiptPercentIcon
                  class="h-7 w-7 shrink-0 text-emerald-700"
                />
              </div>

              <div class="relative mt-4">
                <input
                  v-model.number="form.discountRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  class="form-input pr-10"
                  :disabled="form.monthsDelinquent > 0"
                />

                <span class="percentage-symbol">%</span>
              </div>
            </div>

            <!-- Penalty -->
            <div
              class="rounded-2xl border border-red-200 bg-red-50 p-5"
            >
              <div class="flex items-center justify-between gap-4">
                <div>
                  <h3 class="font-bold text-red-950">
                    Delinquency penalty
                  </h3>

                  <p class="mt-1 text-sm text-red-800">
                    Enter the number of months after the applicable deadline.
                  </p>
                </div>

                <ExclamationTriangleIcon
                  class="h-7 w-7 shrink-0 text-red-700"
                />
              </div>

              <div class="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label class="field-label" for="monthsDelinquent">
                    Months delinquent
                  </label>

                  <input
                    id="monthsDelinquent"
                    v-model.number="form.monthsDelinquent"
                    type="number"
                    min="0"
                    max="36"
                    step="1"
                    class="form-input mt-2"
                  />
                </div>

                <div>
                  <label class="field-label" for="monthlyPenaltyRate">
                    Monthly penalty rate
                  </label>

                  <div class="relative mt-2">
                    <input
                      id="monthlyPenaltyRate"
                      v-model.number="form.monthlyPenaltyRate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      class="form-input pr-10"
                    />

                    <span class="percentage-symbol">%</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              class="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-4 font-bold text-slate-700 transition hover:bg-slate-100"
              @click="resetCalculator"
            >
              <ArrowPathIcon class="h-5 w-5" />

              Reset calculator
            </button>
          </form>
        </section>

        <!-- Results -->
        <aside>
          <div class="sticky top-6 space-y-6">
            <section
              class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div class="bg-slate-900 p-6 text-white sm:p-8">
                <p
                  class="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300"
                >
                  Estimated amount
                </p>

                <p class="mt-3 text-4xl font-black sm:text-5xl">
                  {{ currency(finalAmountDue) }}
                </p>

                <p class="mt-3 text-sm text-white/70">
                  {{
                    form.paymentCoverage === 'ANNUAL'
                      ? 'Annual amount due'
                      : 'Quarterly installment amount due'
                  }}
                </p>
              </div>

              <div class="p-6 sm:p-8">
                <dl class="space-y-5">
                  <ResultRow
                    label="Fair market value"
                    :value="currency(safeMarketValue)"
                  />

                  <ResultRow
                    label="Assessment level"
                    :value="percent(form.assessmentLevel)"
                  />

                  <ResultRow
                    label="Assessed value"
                    :value="currency(assessedValue)"
                    highlighted
                  />

                  <div class="border-t border-slate-200"></div>

                  <ResultRow
                    label="Basic RPT"
                    :value="currency(basicRPT)"
                  />

                  <ResultRow
                    label="SEF"
                    :value="currency(sefAmount)"
                  />

                  <ResultRow
                    label="Idle land tax"
                    :value="currency(idleLandTax)"
                  />

                  <ResultRow
                    label="Annual tax before adjustments"
                    :value="currency(annualTaxBeforeAdjustments)"
                    highlighted
                  />

                  <ResultRow
                    v-if="form.paymentCoverage === 'QUARTERLY'"
                    label="Quarterly tax before adjustments"
                    :value="currency(coveredTaxBeforeAdjustments)"
                  />

                  <div class="border-t border-slate-200"></div>

                  <ResultRow
                    label="Discount"
                    :value="`− ${currency(discountAmount)}`"
                    value-class="text-emerald-700"
                  />

                  <ResultRow
                    label="Penalty"
                    :value="`+ ${currency(penaltyAmount)}`"
                    value-class="text-red-700"
                  />

                  <div class="border-t border-slate-300"></div>

                  <div
                    class="flex items-end justify-between gap-5 rounded-2xl bg-emerald-50 p-5"
                  >
                    <dt>
                      <p class="text-sm font-bold text-emerald-900">
                        Estimated amount due
                      </p>

                      <p class="mt-1 text-xs text-emerald-700">
                        Including discount and penalty
                      </p>
                    </dt>

                    <dd
                      class="text-right text-2xl font-black text-emerald-800"
                    >
                      {{ currency(finalAmountDue) }}
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            <!-- Formula -->
            <section
              class="rounded-3xl border border-blue-200 bg-blue-50 p-6"
            >
              <div class="flex items-start gap-3">
                <InformationCircleIcon
                  class="mt-0.5 h-6 w-6 shrink-0 text-blue-700"
                />

                <div>
                  <h2 class="font-bold text-blue-950">
                    Computation used
                  </h2>

                  <div class="mt-4 space-y-2 text-sm text-blue-900">
                    <p>
                      Assessed value = Market value × Assessment level
                    </p>

                    <p>
                      Basic RPT = Assessed value × Basic rate
                    </p>

                    <p>
                      SEF = Assessed value × SEF rate
                    </p>

                    <p>
                      Idle land = Assessed value × Idle-land rate
                    </p>

                    <p>
                      Penalty = Covered tax × Monthly rate × Months delinquent
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Disclaimer -->
            <section
              class="rounded-3xl border border-amber-200 bg-amber-50 p-6"
            >
              <div class="flex items-start gap-3">
                <ExclamationTriangleIcon
                  class="mt-0.5 h-6 w-6 shrink-0 text-amber-700"
                />

                <div>
                  <h2 class="font-bold text-amber-950">
                    Estimate only
                  </h2>

                  <p class="mt-2 text-sm leading-relaxed text-amber-800">
                    The official assessed value, assessment level, tax rates,
                    discounts, penalties, exemptions, and other adjustments
                    must come from the City Assessor and City Treasurer's
                    official records.
                  </p>
                </div>
              </div>
            </section>
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
  CalculatorIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  HomeModernIcon,
  InformationCircleIcon,
  ReceiptPercentIcon,
  Squares2X2Icon,
} from '@heroicons/vue/24/outline'

type PropertyClassification =
  | 'AGRICULTURAL'
  | 'RESIDENTIAL'
  | 'COMMERCIAL'
  | 'INDUSTRIAL'
  | 'MINERAL'
  | 'SPECIAL'

type PropertyType =
  | 'LAND'
  | 'BUILDING'
  | 'MACHINERY'
  | 'OTHER_IMPROVEMENT'

type PaymentCoverage = 'ANNUAL' | 'QUARTERLY'

interface CalculatorForm {
  marketValue: number
  classification: PropertyClassification
  propertyType: PropertyType
  assessmentLevel: number
  basicRate: number
  sefRate: number
  isIdleLand: boolean
  idleLandRate: number
  paymentCoverage: PaymentCoverage
  discountRate: number
  monthsDelinquent: number
  monthlyPenaltyRate: number
}

const ResultRow = defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    highlighted: {
      type: Boolean,
      default: false,
    },
    valueClass: {
      type: String,
      default: 'text-slate-900',
    },
  },

  setup(props) {
    return () =>
      h(
        'div',
        {
          class: [
            'flex items-center justify-between gap-5',
            props.highlighted
              ? 'rounded-xl bg-slate-100 px-4 py-3'
              : '',
          ],
        },
        [
          h(
            'dt',
            {
              class: 'text-sm font-semibold text-slate-600',
            },
            props.label,
          ),
          h(
            'dd',
            {
              class: [
                'text-right font-bold',
                props.valueClass,
              ],
            },
            props.value,
          ),
        ],
      )
  },
})

const defaultForm: CalculatorForm = {
  marketValue: 0,
  classification: 'RESIDENTIAL',
  propertyType: 'LAND',
  assessmentLevel: 20,
  basicRate: 1.125,
  sefRate: 1,
  isIdleLand: false,
  idleLandRate: 5,
  paymentCoverage: 'ANNUAL',
  discountRate: 20,
  monthsDelinquent: 0,
  monthlyPenaltyRate: 2,
}

const form = reactive<CalculatorForm>({
  ...defaultForm,
})

/*
 * Suggested assessment levels.
 *
 * These are calculator defaults only. Building assessment levels may depend
 * on graduated market-value brackets. Confirm against the applicable local
 * ordinance and tax declaration.
 */
const suggestedAssessmentLevels: Record<
  PropertyType,
  Partial<Record<PropertyClassification, number>>
> = {
  LAND: {
    AGRICULTURAL: 40,
    RESIDENTIAL: 20,
    COMMERCIAL: 50,
    INDUSTRIAL: 50,
    MINERAL: 50,
    SPECIAL: 15,
  },

  BUILDING: {
    AGRICULTURAL: 25,
    RESIDENTIAL: 20,
    COMMERCIAL: 50,
    INDUSTRIAL: 50,
    MINERAL: 50,
    SPECIAL: 15,
  },

  MACHINERY: {
    AGRICULTURAL: 40,
    RESIDENTIAL: 50,
    COMMERCIAL: 80,
    INDUSTRIAL: 80,
    MINERAL: 50,
    SPECIAL: 15,
  },

  OTHER_IMPROVEMENT: {
    AGRICULTURAL: 40,
    RESIDENTIAL: 20,
    COMMERCIAL: 50,
    INDUSTRIAL: 50,
    MINERAL: 50,
    SPECIAL: 15,
  },
}

const safeMarketValue = computed(() => {
  return nonNegative(form.marketValue)
})

const assessedValue = computed(() => {
  return roundMoney(
    safeMarketValue.value *
      rateToDecimal(form.assessmentLevel),
  )
})

const basicRPT = computed(() => {
  return roundMoney(
    assessedValue.value *
      rateToDecimal(form.basicRate),
  )
})

const sefAmount = computed(() => {
  return roundMoney(
    assessedValue.value *
      rateToDecimal(form.sefRate),
  )
})

const idleLandTax = computed(() => {
  if (!form.isIdleLand) {
    return 0
  }

  return roundMoney(
    assessedValue.value *
      rateToDecimal(form.idleLandRate),
  )
})

const annualTaxBeforeAdjustments = computed(() => {
  return roundMoney(
    basicRPT.value +
      sefAmount.value +
      idleLandTax.value,
  )
})

const coveredTaxBeforeAdjustments = computed(() => {
  if (form.paymentCoverage === 'QUARTERLY') {
    return roundMoney(
      annualTaxBeforeAdjustments.value / 4,
    )
  }

  return annualTaxBeforeAdjustments.value
})

const applicableDiscountRate = computed(() => {
  if (safeMonthsDelinquent.value > 0) {
    return 0
  }

  return clamp(
    nonNegative(form.discountRate),
    0,
    100,
  )
})

const discountAmount = computed(() => {
  return roundMoney(
    coveredTaxBeforeAdjustments.value *
      rateToDecimal(applicableDiscountRate.value),
  )
})

const safeMonthsDelinquent = computed(() => {
  return Math.trunc(
    clamp(
      nonNegative(form.monthsDelinquent),
      0,
      36,
    ),
  )
})

const penaltyAmount = computed(() => {
  if (safeMonthsDelinquent.value === 0) {
    return 0
  }

  return roundMoney(
    coveredTaxBeforeAdjustments.value *
      rateToDecimal(form.monthlyPenaltyRate) *
      safeMonthsDelinquent.value,
  )
})

const finalAmountDue = computed(() => {
  return Math.max(
    0,
    roundMoney(
      coveredTaxBeforeAdjustments.value -
        discountAmount.value +
        penaltyAmount.value,
    ),
  )
})

function applySuggestedAssessmentLevel(): void {
  const suggestedLevel =
    suggestedAssessmentLevels[form.propertyType]?.[
      form.classification
    ]

  if (typeof suggestedLevel === 'number') {
    form.assessmentLevel = suggestedLevel
  }
}

function resetCalculator(): void {
  Object.assign(form, defaultForm)
}

function rateToDecimal(value: number): number {
  return nonNegative(value) / 100
}

function nonNegative(value: number): number {
  const parsedValue = Number(value)

  if (!Number.isFinite(parsedValue)) {
    return 0
  }

  return Math.max(0, parsedValue)
}

function clamp(
  value: number,
  minimum: number,
  maximum: number,
): number {
  return Math.min(
    Math.max(value, minimum),
    maximum,
  )
}

function roundMoney(value: number): number {
  return Math.round(
    (value + Number.EPSILON) * 100,
  ) / 100
}

function currency(value: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(nonNegative(value))
}

function percent(value: number): string {
  return `${nonNegative(value).toLocaleString(
    'en-PH',
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    },
  )}%`
}

watch(
  () => form.paymentCoverage,
  (coverage) => {
    if (safeMonthsDelinquent.value > 0) {
      form.discountRate = 0
      return
    }

    form.discountRate =
      coverage === 'ANNUAL'
        ? 20
        : 10
  },
)

watch(
  () => form.monthsDelinquent,
  (months) => {
    const normalizedMonths = Math.trunc(
      clamp(
        nonNegative(months),
        0,
        36,
      ),
    )

    if (form.monthsDelinquent !== normalizedMonths) {
      form.monthsDelinquent = normalizedMonths
    }

    if (normalizedMonths > 0) {
      form.discountRate = 0
    }
  },
)

watch(
  () => form.isIdleLand,
  (isIdleLand) => {
    if (!isIdleLand) {
      return
    }

    if (form.propertyType !== 'LAND') {
      form.propertyType = 'LAND'
      applySuggestedAssessmentLevel()
    }
  },
)
</script>

<style scoped>
.hero-gradient {
  background:
    radial-gradient(
      circle at top right,
      rgba(16, 185, 129, 0.25),
      transparent 38%
    ),
    linear-gradient(
      135deg,
      rgba(2, 12, 27, 0.99),
      rgba(5, 55, 45, 0.95)
    );
}

.field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  color: rgb(30 41 59);
}

.form-input {
  width: 100%;
  border-radius: 1rem;
  border: 1px solid rgb(203 213 225);
  background: white;
  padding: 0.95rem 1rem;
  color: rgb(15 23 42);
  outline: none;
  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;
}

.form-input:focus {
  border-color: rgb(5 150 105);
  box-shadow: 0 0 0 4px rgb(5 150 105 / 0.1);
}

.form-input:disabled {
  cursor: not-allowed;
  background: rgb(241 245 249);
  color: rgb(100 116 139);
}

.percentage-symbol {
  pointer-events: none;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 700;
  color: rgb(100 116 139);
}

.payment-option {
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 0.75rem;
  border-radius: 1rem;
  border: 1px solid rgb(203 213 225);
  background: white;
  padding: 1rem;
  color: rgb(71 85 105);
  transition:
    border-color 150ms ease,
    background-color 150ms ease,
    color 150ms ease;
}

.payment-option:hover {
  background: rgb(248 250 252);
}

.payment-option-active {
  border-color: rgb(4 120 87);
  background: rgb(236 253 245);
  color: rgb(4 120 87);
}
</style>