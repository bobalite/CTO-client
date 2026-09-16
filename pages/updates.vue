<template>
  <PublicPageShell>
    <Head>
      <Title>
        2026 Tax Schedule | City Treasurer's Office
      </Title>

      <Meta
        name="description"
        content="Davao City real property tax payment deadlines and official treasury advisories for 2026."
      />
    </Head>

    <!-- Hero -->
    <section class="relative overflow-hidden bg-slate-950 text-white">
      <div class="absolute inset-0 tax-header-gradient"></div>

      <div
        class="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-green-500/20 blur-3xl"
      ></div>

      <div
        class="absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl"
      ></div>

      <div
        class="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8"
      >
        <div class="max-w-4xl">
          <div
            class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm"
          >
            <CalendarDaysIcon class="h-4 w-4 text-emerald-300" />

            <span
              class="text-xs font-bold uppercase tracking-[0.18em] text-white/90"
            >
              2026 Tax Advisory
            </span>
          </div>

          <h1
            class="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Real property tax payment schedule
          </h1>

          <p
            class="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg"
          >
            Real property tax for calendar year 2026 may be paid in full or in
            four equal installments without penalty by the dates below.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
      <!-- Intro -->
      <div
        class="mb-10 flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p
            class="text-xs font-bold uppercase tracking-[0.16em] text-green-700"
          >
            Quarterly Deadlines
          </p>

          <h2 class="mt-2 text-3xl font-black text-slate-900">
            2026 payment due dates
          </h2>

          <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Pay on or before each deadline to avoid penalties and keep your
            account current.
          </p>
        </div>

        <div
          class="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600"
        >
          <CalendarIcon class="h-4 w-4" />

          4 installment dates
        </div>
      </div>

      <!-- Deadline Cards -->
      <section class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(deadline, index) in deadlines"
          :key="deadline.date"
          class="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl"
        >
          <div
            class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-600 via-emerald-500 to-cyan-500 opacity-0 transition group-hover:opacity-100"
          ></div>

          <span
            class="absolute right-5 top-4 text-6xl font-black text-slate-100 transition group-hover:text-green-50"
          >
            0{{ index + 1 }}
          </span>

          <div
            class="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700"
          >
            <CalendarDaysIcon class="h-5 w-5" />
          </div>

          <p
            class="relative mt-6 text-xs font-bold uppercase tracking-[0.16em] text-green-700"
          >
            {{ deadline.label }}
          </p>

          <h3
            class="relative mt-4 text-2xl font-black tracking-tight text-slate-900"
          >
            {{ deadline.date }}
          </h3>

          <p class="relative mt-3 text-sm leading-7 text-slate-600">
            Pay on or before this date to avoid penalty.
          </p>
        </article>
      </section>

      <!-- Discount + Official Notice -->
      <section class="mt-10 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div
          class="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
        >
          <div class="flex items-start gap-4">
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700"
            >
              <BanknotesIcon class="h-6 w-6" />
            </div>

            <div>
              <p
                class="text-xs font-bold uppercase tracking-[0.16em] text-green-700"
              >
                Tax Incentives
              </p>

              <h2 class="mt-2 text-2xl font-black text-slate-900">
                Discount reminder
              </h2>

              <p class="mt-4 leading-7 text-slate-600">
                Taxpayers who pay the full year on or before March 31, 2026
                receive a
                <strong class="font-black text-green-800">
                  20% discount
                </strong>.
                A
                <strong class="font-black text-green-800">
                  10% discount
                </strong>
                applies when installments are paid on or before their quarterly
                due dates.
              </p>
            </div>
          </div>
        </div>

        <a
          href="https://davaocity.gov.ph/wp-content/uploads/2026/01/Notice-of-Payment-of-RPT-for-CY-2026-1.pdf"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex min-h-[230px] flex-col justify-between rounded-3xl bg-green-700 p-7 text-white shadow-sm transition hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"
          >
            <DocumentArrowDownIcon class="h-6 w-6" />
          </div>

          <div class="mt-8">
            <p
              class="text-xs font-bold uppercase tracking-[0.16em] text-emerald-200"
            >
              Official Document
            </p>

            <h2 class="mt-2 text-xl font-black">
              Official 2026 notice
            </h2>

            <p class="mt-2 text-sm leading-6 text-white/75">
              Open the signed City Treasurer notice in PDF format.
            </p>

            <div class="mt-5 flex items-center gap-2 text-sm font-bold">
              View official notice

              <ArrowTopRightOnSquareIcon
                class="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </div>
        </a>
      </section>

      <!-- Payment Locations -->
      <section
        class="mt-10 overflow-hidden rounded-3xl border border-amber-200 bg-amber-50"
      >
        <div class="flex items-start gap-4 p-6 sm:p-7">
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700"
          >
            <MapPinIcon class="h-6 w-6" />
          </div>

          <div>
            <h3 class="font-black text-amber-950">
              Payment locations
            </h3>

            <p class="mt-2 text-sm leading-7 text-amber-900">
              Payments may be made at the Office of the City Treasurer,
              Sangguniang Panlungsod Building, or any of the ten district
              treasury offices. Confirm office operations before travelling on
              holidays or during service advisories.
            </p>
          </div>
        </div>
      </section>

      <!-- Reminder -->
      <section
        class="mt-10 grid gap-6 rounded-3xl bg-slate-900 p-7 text-white sm:p-8 lg:grid-cols-[auto_1fr]"
      >
        <div
          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-emerald-300"
        >
          <BellAlertIcon class="h-7 w-7" />
        </div>

        <div>
          <p
            class="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300"
          >
            Payment Reminder
          </p>

          <h3 class="mt-2 text-2xl font-black">
            Pay early when possible
          </h3>

          <p class="mt-3 max-w-3xl text-sm leading-7 text-white/70">
            Paying ahead of the quarterly deadline helps avoid late penalties,
            long queues, and possible service interruptions near the due date.
          </p>
        </div>
      </section>
    </main>
  </PublicPageShell>
</template>

<script setup lang="ts">
import {
  ArrowTopRightOnSquareIcon,
  BanknotesIcon,
  BellAlertIcon,
  CalendarDaysIcon,
  CalendarIcon,
  DocumentArrowDownIcon,
  MapPinIcon,
} from '@heroicons/vue/24/outline'

const deadlines = [
  {
    label: 'First installment',
    date: 'March 31, 2026',
  },
  {
    label: 'Second installment',
    date: 'June 30, 2026',
  },
  {
    label: 'Third installment',
    date: 'September 30, 2026',
  },
  {
    label: 'Fourth installment',
    date: 'December 31, 2026',
  },
]
</script>

<style scoped>
.tax-header-gradient {
  background:
    radial-gradient(
      circle at top right,
      rgba(34, 197, 94, 0.22),
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