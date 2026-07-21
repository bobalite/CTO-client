<template>
  <div class="min-h-screen bg-slate-50">
    <Head>
      <Title>
        Real Property Tax Information | City Treasurer's Office
      </Title>

      <Meta
        name="description"
        content="Information about real property tax, payment schedules, discounts, deadlines, and payment options in Davao City."
      />
    </Head>

    <!-- Hero -->
    <section class="relative overflow-hidden bg-slate-950">
      <div class="absolute inset-0 rpt-header-gradient"></div>

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
          to="/services"
          class="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
        >
          <ArrowLeftIcon class="h-4 w-4" />

          Back to services
        </NuxtLink>

        <div class="max-w-4xl">
          <div
            class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
          >
            <BuildingOffice2Icon class="h-4 w-4 text-emerald-300" />

            <span
              class="text-xs font-semibold uppercase tracking-[0.18em] text-white/90"
            >
              City Treasurer's Office
            </span>
          </div>

          <h1
            class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Real Property Tax Information
          </h1>

          <p
            class="mt-6 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            Learn about real property tax, quarterly payment deadlines,
            available discounts, penalties, and the information you may need
            before making a payment.
          </p>

          <div class="mt-9 flex flex-wrap gap-3">
            <a
              href="#payment-schedule"
              class="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
            >
              <CalendarDaysIcon class="h-5 w-5" />

              View payment schedule
            </a>

            <NuxtLink
              to="/verify_soa"
              class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              <DocumentMagnifyingGlassIcon class="h-5 w-5" />

              Verify an SOA
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Important notice -->
    <section class="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
      <div
        class="flex items-start gap-4 rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
      >
        <ExclamationTriangleIcon
          class="mt-0.5 h-6 w-6 shrink-0 text-amber-600"
        />

        <div>
          <h2 class="font-bold text-amber-950">
            Payment schedule information
          </h2>

          <p class="mt-1 text-sm leading-relaxed text-amber-800">
            The schedules and discounts shown on this page apply to the 2026
            tax year. Deadline extensions, special discounts, or temporary
            payment arrangements may be announced separately by the City
            Government.
          </p>
        </div>
      </div>
    </section>

    <main class="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <!-- Introduction -->
      <section class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div
          class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700"
          >
            <HomeModernIcon class="h-6 w-6" />
          </div>

          <h2 class="mt-5 text-2xl font-bold text-slate-900">
            What is Real Property Tax?
          </h2>

          <p class="mt-4 leading-relaxed text-slate-600">
            Real Property Tax, commonly called RPT, is an annual local tax
            imposed on real properties such as land, buildings, machinery, and
            other improvements. The amount due is generally based on the
            property's assessed value and the applicable local tax rates.
          </p>

          <p class="mt-4 leading-relaxed text-slate-600">
            The property owner or the person legally responsible for the
            property should settle the tax within the prescribed payment
            period. RPT may be paid in full or through four quarterly
            installments.
          </p>

          <div class="mt-7 grid gap-4 sm:grid-cols-2">
            <div
              v-for="property in taxableProperties"
              :key="property.title"
              class="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <component
                :is="property.icon"
                class="h-6 w-6 text-green-700"
              />

              <h3 class="mt-3 font-bold text-slate-900">
                {{ property.title }}
              </h3>

              <p class="mt-1 text-sm leading-relaxed text-slate-600">
                {{ property.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Quick facts -->
        <aside
          class="rounded-3xl bg-gradient-to-br from-green-800 to-emerald-950 p-6 text-white shadow-lg sm:p-8"
        >
          <p
            class="text-xs font-bold uppercase tracking-[0.16em] text-green-200"
          >
            2026 Quick Guide
          </p>

          <h2 class="mt-3 text-2xl font-bold">
            Payment at a glance
          </h2>

          <div class="mt-7 space-y-5">
            <div
              class="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
            >
              <div class="flex items-center gap-3">
                <BanknotesIcon class="h-6 w-6 text-green-200" />

                <p class="font-bold">
                  Annual payment
                </p>
              </div>

              <p class="mt-3 text-3xl font-black">
                20% discount
              </p>

              <p class="mt-2 text-sm leading-relaxed text-white/75">
                Pay the full annual real property tax on or before
                March 31, 2026.
              </p>
            </div>

            <div
              class="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
            >
              <div class="flex items-center gap-3">
                <CalendarDaysIcon class="h-6 w-6 text-green-200" />

                <p class="font-bold">
                  Quarterly installments
                </p>
              </div>

              <p class="mt-3 text-3xl font-black">
                10% discount
              </p>

              <p class="mt-2 text-sm leading-relaxed text-white/75">
                Pay each quarterly installment on or before the applicable
                quarterly deadline.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <!-- Payment schedule -->
      <section
        id="payment-schedule"
        class="scroll-mt-8 pt-16"
      >
        <div class="max-w-3xl">
          <p
            class="text-xs font-bold uppercase tracking-[0.16em] text-green-700"
          >
            Payment deadlines
          </p>

          <h2 class="mt-2 text-3xl font-bold text-slate-900">
            2026 quarterly payment schedule
          </h2>

          <p class="mt-4 leading-relaxed text-slate-600">
            Real property tax may be paid in four equal installments. Pay on
            or before the relevant due date to qualify for the applicable
            quarterly discount.
          </p>
        </div>

        <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="schedule in paymentSchedules"
            :key="schedule.quarter"
            class="relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm"
            :class="schedule.cardClass"
          >
            <div
              class="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full opacity-20"
              :class="schedule.decorationClass"
            ></div>

            <div class="relative">
              <div class="flex items-center justify-between gap-4">
                <span
                  class="inline-flex rounded-full px-3 py-1 text-xs font-bold"
                  :class="schedule.badgeClass"
                >
                  {{ schedule.quarter }}
                </span>

                <CalendarIcon
                  class="h-6 w-6"
                  :class="schedule.iconClass"
                />
              </div>

              <p class="mt-8 text-sm font-semibold text-slate-500">
                Due on or before
              </p>

              <h3 class="mt-1 text-2xl font-black text-slate-900">
                {{ schedule.deadline }}
              </h3>

              <div class="mt-5 border-t border-slate-200 pt-5">
                <p class="text-sm text-slate-600">
                  Installment discount
                </p>

                <p class="mt-1 text-xl font-black text-green-700">
                  10%
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Discounts -->
      <section class="pt-16">
        <div
          class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          <div
            class="border-b border-slate-200 bg-slate-900 px-6 py-8 text-white sm:px-8"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-500/20 text-green-300"
              >
                <ReceiptPercentIcon class="h-7 w-7" />
              </div>

              <div>
                <p
                  class="text-xs font-bold uppercase tracking-[0.16em] text-green-300"
                >
                  Save by paying on time
                </p>

                <h2 class="mt-2 text-3xl font-bold">
                  Real property tax discounts
                </h2>
              </div>
            </div>
          </div>

          <div class="grid md:grid-cols-2">
            <div class="p-6 sm:p-8 md:border-r md:border-slate-200">
              <div
                class="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800"
              >
                Best discount
              </div>

              <p class="mt-5 text-5xl font-black text-emerald-700">
                20%
              </p>

              <h3 class="mt-3 text-xl font-bold text-slate-900">
                Full annual payment
              </h3>

              <p class="mt-3 leading-relaxed text-slate-600">
                A taxpayer who pays the full annual real property tax on or
                before March 31, 2026 may receive a 20% discount.
              </p>

              <ul class="mt-5 space-y-3">
                <li
                  v-for="item in annualDiscountRequirements"
                  :key="item"
                  class="flex items-start gap-3 text-sm text-slate-600"
                >
                  <CheckCircleIcon
                    class="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                  />

                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <div class="p-6 sm:p-8">
              <div
                class="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800"
              >
                Flexible payment
              </div>

              <p class="mt-5 text-5xl font-black text-blue-700">
                10%
              </p>

              <h3 class="mt-3 text-xl font-bold text-slate-900">
                Quarterly installment
              </h3>

              <p class="mt-3 leading-relaxed text-slate-600">
                A taxpayer who pays a quarterly installment on or before its
                applicable due date may receive a 10% discount on that
                installment.
              </p>

              <ul class="mt-5 space-y-3">
                <li
                  v-for="item in quarterlyDiscountRequirements"
                  :key="item"
                  class="flex items-start gap-3 text-sm text-slate-600"
                >
                  <CheckCircleIcon
                    class="mt-0.5 h-5 w-5 shrink-0 text-blue-600"
                  />

                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Calculation overview -->
      <section class="pt-16">
        <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p
              class="text-xs font-bold uppercase tracking-[0.16em] text-green-700"
            >
              Understanding your tax
            </p>

            <h2 class="mt-2 text-3xl font-bold text-slate-900">
              How RPT is generally determined
            </h2>

            <p class="mt-4 leading-relaxed text-slate-600">
              The exact amount depends on the property classification,
              applicable assessment level, assessed value, and local tax
              rates. Additional levies may also apply.
            </p>
          </div>

          <div class="space-y-4">
            <div
              v-for="(step, index) in computationSteps"
              :key="step.title"
              class="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white"
              >
                {{ index + 1 }}
              </span>

              <div>
                <h3 class="font-bold text-slate-900">
                  {{ step.title }}
                </h3>

                <p class="mt-1 text-sm leading-relaxed text-slate-600">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8"
        >
          <div class="flex items-start gap-4">
            <CalculatorIcon
              class="mt-0.5 h-7 w-7 shrink-0 text-blue-700"
            />

            <div>
              <NuxtLink
                to="/rpt-calculator"
                class="service-link"
              >
              <h3 class="text-lg font-bold text-blue-950">
                Real Property Tax Calculator
              </h3>

              </NuxtLink>
               

                
             

              <div
                class="mt-4 grid gap-4 font-mono text-sm text-blue-900 sm:grid-cols-2"
              >
                <div class="rounded-xl bg-white/70 p-4">
                  Assessed value = Fair market value × Assessment level
                </div>

                <div class="rounded-xl bg-white/70 p-4">
                  Basic RPT = Assessed value × Applicable tax rate
                </div>
              </div>

              <p class="mt-4 text-sm leading-relaxed text-blue-800">
                This is a general explanation only. The official amount due
                must be based on the Statement of Account issued by the City
                Treasurer's Office.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Late payment -->
      <section class="pt-16">
        <div
          class="rounded-3xl border border-red-200 bg-red-50 p-6 sm:p-8"
        >
          <div class="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-700"
              >
                <ExclamationCircleIcon class="h-7 w-7" />
              </div>

              <h2 class="mt-5 text-2xl font-bold text-red-950">
                Late and delinquent payments
              </h2>

              <p class="mt-3 leading-relaxed text-red-800">
                Payments made after the applicable due date may become
                delinquent and may be subject to interest, penalties, or other
                collection measures prescribed by law and local ordinances.
              </p>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div
                v-for="item in latePaymentItems"
                :key="item.title"
                class="rounded-2xl border border-red-200 bg-white/70 p-5"
              >
                <component
                  :is="item.icon"
                  class="h-6 w-6 text-red-700"
                />

                <h3 class="mt-3 font-bold text-red-950">
                  {{ item.title }}
                </h3>

                <p class="mt-1 text-sm leading-relaxed text-red-800">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- What to prepare -->
      <section class="pt-16">
        <div class="max-w-3xl">
          <p
            class="text-xs font-bold uppercase tracking-[0.16em] text-green-700"
          >
            Before payment
          </p>

          <h2 class="mt-2 text-3xl font-bold text-slate-900">
            Information you may need
          </h2>
        </div>

        <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="requirement in paymentRequirements"
            :key="requirement.title"
            class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700"
            >
              <component
                :is="requirement.icon"
                class="h-6 w-6"
              />
            </div>

            <h3 class="mt-4 font-bold text-slate-900">
              {{ requirement.title }}
            </h3>

            <p class="mt-2 text-sm leading-relaxed text-slate-600">
              {{ requirement.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Online services -->
      <section class="pt-16">
        <div
          class="rounded-3xl bg-gradient-to-r from-slate-900 to-emerald-950 p-6 text-white shadow-xl sm:p-10"
        >
          <div
            class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div class="max-w-2xl">
              <p
                class="text-xs font-bold uppercase tracking-[0.16em] text-green-300"
              >
                Online services
              </p>

              <h2 class="mt-3 text-3xl font-bold">
                Access real property tax services
              </h2>

              <p class="mt-4 leading-relaxed text-white/70">
                Verify a Statement of Account, verify an issued tax clearance,
                or submit a request for tax clearance printing.
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <NuxtLink
                to="/verify_soa"
                class="service-link"
              >
                <DocumentMagnifyingGlassIcon class="h-5 w-5" />

                Verify SOA
              </NuxtLink>

              <NuxtLink
                to="/verify"
                class="service-link"
              >
                <ShieldCheckIcon class="h-5 w-5" />

                Verify tax clearance
              </NuxtLink>

              <NuxtLink
                to="/tax-clearance-request"
                class="service-link"
              >
                <PrinterIcon class="h-5 w-5" />

                Request tax clearance print
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="pt-16">
        <div class="max-w-3xl">
          <p
            class="text-xs font-bold uppercase tracking-[0.16em] text-green-700"
          >
            Frequently asked questions
          </p>

          <h2 class="mt-2 text-3xl font-bold text-slate-900">
            Common RPT questions
          </h2>
        </div>

        <div class="mt-8 space-y-4">
          <details
            v-for="faq in frequentlyAskedQuestions"
            :key="faq.question"
            class="group rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <summary
              class="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 font-bold text-slate-900 sm:px-6"
            >
              <span>{{ faq.question }}</span>

              <ChevronDownIcon
                class="h-5 w-5 shrink-0 text-slate-500 transition group-open:rotate-180"
              />
            </summary>

            <div
              class="border-t border-slate-200 px-5 py-5 text-sm leading-relaxed text-slate-600 sm:px-6"
            >
              {{ faq.answer }}
            </div>
          </details>
        </div>
      </section>

      <!-- Contact -->
      <section class="pt-16">
        <div
          class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div class="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700"
              >
                <BuildingOfficeIcon class="h-7 w-7" />
              </div>

              <h2 class="mt-5 text-2xl font-bold text-slate-900">
                City Treasurer's Office
              </h2>

              <p class="mt-3 leading-relaxed text-slate-600">
                Contact the office for official assessments, payment
                confirmation, delinquency questions, or corrections to real
                property tax records.
              </p>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div class="contact-card">
                <MapPinIcon class="h-6 w-6 text-green-700" />

                <h3 class="mt-3 font-bold text-slate-900">
                  Office address
                </h3>

                <p class="mt-1 text-sm leading-relaxed text-slate-600">
                  Room 1, City Hall Building, San Pedro Street, Davao City
                </p>
              </div>

              <div class="contact-card">
                <ClockIcon class="h-6 w-6 text-green-700" />

                <h3 class="mt-3 font-bold text-slate-900">
                  Office hours
                </h3>

                <p class="mt-1 text-sm leading-relaxed text-slate-600">
                  Monday to Friday, 8:00 AM to 5:00 PM, except holidays
                </p>
              </div>

              <div class="contact-card">
                <PhoneIcon class="h-6 w-6 text-green-700" />

                <h3 class="mt-3 font-bold text-slate-900">
                  Telephone
                </h3>

                <p class="mt-1 text-sm leading-relaxed text-slate-600">
                  (082) 241-1000 local 232 or 225-02-00
                </p>
              </div>

              <div class="contact-card">
                <EnvelopeIcon class="h-6 w-6 text-green-700" />

                <h3 class="mt-3 font-bold text-slate-900">
                  Email address
                </h3>

                <p class="mt-1 break-all text-sm leading-relaxed text-slate-600">
                  cto@davaocity.gov.ph
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeftIcon,
  BanknotesIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  CalculatorIcon,
  CalendarDaysIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ClockIcon,
  Cog6ToothIcon,
  DocumentMagnifyingGlassIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  HashtagIcon,
  HomeModernIcon,
  IdentificationIcon,
  MapPinIcon,
  PhoneIcon,
  PrinterIcon,
  ReceiptPercentIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
} from '@heroicons/vue/24/outline'

const taxableProperties = [
  {
    title: 'Land',
    description:
      'Residential, commercial, agricultural, industrial, and other taxable land.',
    icon: MapPinIcon,
  },
  {
    title: 'Buildings',
    description:
      'Houses, commercial structures, warehouses, and other permanent buildings.',
    icon: BuildingOffice2Icon,
  },
  {
    title: 'Machinery',
    description:
      'Taxable machinery and equipment classified as real property.',
    icon: Cog6ToothIcon,
  },
  {
    title: 'Improvements',
    description:
      'Other taxable structures or improvements attached to the property.',
    icon: Squares2X2Icon,
  },
]

const paymentSchedules = [
  {
    quarter: 'First Quarter',
    deadline: 'March 31, 2026',
    cardClass: 'border-emerald-200',
    badgeClass: 'bg-emerald-100 text-emerald-800',
    iconClass: 'text-emerald-700',
    decorationClass: 'bg-emerald-500',
  },
  {
    quarter: 'Second Quarter',
    deadline: 'June 30, 2026',
    cardClass: 'border-blue-200',
    badgeClass: 'bg-blue-100 text-blue-800',
    iconClass: 'text-blue-700',
    decorationClass: 'bg-blue-500',
  },
  {
    quarter: 'Third Quarter',
    deadline: 'September 30, 2026',
    cardClass: 'border-amber-200',
    badgeClass: 'bg-amber-100 text-amber-800',
    iconClass: 'text-amber-700',
    decorationClass: 'bg-amber-500',
  },
  {
    quarter: 'Fourth Quarter',
    deadline: 'December 31, 2026',
    cardClass: 'border-violet-200',
    badgeClass: 'bg-violet-100 text-violet-800',
    iconClass: 'text-violet-700',
    decorationClass: 'bg-violet-500',
  },
]

const annualDiscountRequirements = [
  'The full annual RPT must be paid.',
  'Payment must be completed on or before March 31, 2026.',
  'The discount applies subject to the official assessment and applicable city rules.',
]

const quarterlyDiscountRequirements = [
  'The applicable quarterly installment must be paid.',
  'Payment must be made on or before the relevant quarterly deadline.',
  'Late installments may no longer qualify for the discount.',
]

const computationSteps = [
  {
    title: 'Determine the fair market value',
    description:
      'The property is valued according to the applicable schedule of market values and property records.',
  },
  {
    title: 'Apply the assessment level',
    description:
      'The applicable assessment level is based on the property classification and actual use.',
  },
  {
    title: 'Determine the assessed value',
    description:
      'The fair market value is multiplied by the applicable assessment level.',
  },
  {
    title: 'Apply the tax rate and additional levies',
    description:
      'The basic RPT rate and applicable additional levies, such as the Special Education Fund levy, are applied.',
  },
]

const latePaymentItems = [
  {
    title: 'Interest and penalties',
    description:
      'Late or delinquent balances may accumulate statutory interest or penalties.',
    icon: ReceiptPercentIcon,
  },
  {
    title: 'Loss of discount',
    description:
      'A payment made after the applicable deadline may no longer receive the prompt-payment discount.',
    icon: BanknotesIcon,
  },
  {
    title: 'Delinquency notices',
    description:
      'The local treasurer may issue notices and begin collection procedures for delinquent taxes.',
    icon: DocumentTextIcon,
  },
  {
    title: 'Clearance restrictions',
    description:
      'Outstanding taxes may affect the issuance of a real property tax clearance or certification.',
    icon: ShieldCheckIcon,
  },
]

const paymentRequirements = [
  {
    title: 'Property PIN',
    description:
      'Prepare the Property Identification Number printed on the tax declaration or previous SOA.',
    icon: HashtagIcon,
  },
  {
    title: 'Statement of Account',
    description:
      'Use the current SOA to confirm the amount, coverage, and payment status.',
    icon: DocumentTextIcon,
  },
  {
    title: 'Owner information',
    description:
      'Prepare the registered owner or taxpayer name associated with the property.',
    icon: IdentificationIcon,
  },
  {
    title: 'Previous receipt',
    description:
      'A previous official receipt may help confirm the account and latest payment.',
    icon: BanknotesIcon,
  },
]

const frequentlyAskedQuestions = [
  {
    question: 'Can I pay my real property tax quarterly?',
    answer:
      'Yes. Real property tax may be paid in four equal quarterly installments due on or before March 31, June 30, September 30, and December 31.',
  },
  {
    question: 'What discount is available for full annual payment?',
    answer:
      'For the 2026 tax year, taxpayers who pay the full annual real property tax on or before March 31, 2026 may receive a 20% discount.',
  },
  {
    question: 'Is there a discount for quarterly payments?',
    answer:
      'For 2026, a 10% discount may be granted when the quarterly installment is paid on or before the applicable quarterly due date.',
  },
  {
    question: 'What happens when payment is late?',
    answer:
      'A late installment may lose the available discount and may become subject to interest, penalties, and delinquency collection procedures.',
  },
  {
    question: 'Where can I confirm the exact amount due?',
    answer:
      'Obtain or verify a current Statement of Account from the City Treasurer’s Office. The official SOA should be used as the basis for payment.',
  },
  {
    question: 'Can a representative pay on behalf of the owner?',
    answer:
      'Payment may generally be made by a representative, but additional identification or authorization may be required for certain related transactions or document requests.',
  },
]
</script>

<style scoped>
.rpt-header-gradient {
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

.service-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 9999px;
  border: 1px solid rgb(255 255 255 / 0.2);
  background: rgb(255 255 255 / 0.1);
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: white;
  transition:
    background-color 150ms ease,
    transform 150ms ease;
}

.service-link:hover {
  background: rgb(255 255 255 / 0.18);
  transform: translateY(-1px);
}

.contact-card {
  border-radius: 1rem;
  border: 1px solid rgb(226 232 240);
  background: rgb(248 250 252);
  padding: 1.25rem;
}

details summary::-webkit-details-marker {
  display: none;
}
</style>