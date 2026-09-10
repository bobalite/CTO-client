<template>
  <PublicPageShell>
    <Head><Title>2026 Tax Schedule | City Treasurer's Office</Title><Meta name="description" content="Davao City real property tax payment deadlines and official treasury advisories for 2026." /></Head>
    <section class="bg-[#173a67] text-white"><div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div class="inline-flex bg-[#15803d] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">2026 tax advisory</div><h1 class="mt-5 max-w-4xl text-4xl font-extrabold sm:text-5xl">Real property tax payment schedule</h1><p class="mt-5 max-w-2xl text-lg leading-8 text-white/75">Real property tax for calendar year 2026 may be paid in full or in four equal installments without penalty by the dates below.</p></div></section>
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <article v-for="(deadline, index) in deadlines" :key="deadline.date" class="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-sm"><span class="absolute right-4 top-3 text-5xl font-black text-slate-100">0{{ index + 1 }}</span><p class="relative text-xs font-bold uppercase tracking-[0.18em] text-[#15803d]">{{ deadline.label }}</p><p class="relative mt-5 text-2xl font-extrabold text-[#173a67]">{{ deadline.date }}</p><p class="relative mt-3 text-sm text-slate-600">Pay on or before this date to avoid penalty.</p></article>
      </div>
      <div class="mt-10 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
        <div class="border-l-4 border-[#15803d] bg-white p-7 shadow-sm"><h2 class="text-xl font-extrabold text-[#173a67]">Discount reminder</h2><p class="mt-3 leading-7 text-slate-600">Taxpayers who pay the full year on or before March 31, 2026 receive a 20% discount. A 10% discount applies when installments are paid on or before their quarterly due dates.</p></div>
        <a href="https://davaocity.gov.ph/wp-content/uploads/2026/01/Notice-of-Payment-of-RPT-for-CY-2026-1.pdf" target="_blank" rel="noopener" class="flex flex-col justify-between bg-[#15803d] p-7 text-white shadow-sm transition hover:bg-[#166534]"><DocumentArrowDownIcon class="h-9 w-9"/><div><p class="mt-8 text-lg font-extrabold">Official 2026 notice</p><p class="mt-2 text-sm text-white/75">Open the signed City Treasurer notice (PDF).</p></div></a>
      </div>
      <div class="mt-8 rounded-md bg-amber-50 p-5 text-sm leading-6 text-amber-950"><strong>Payment locations:</strong> Office of the City Treasurer, Sangguniang Panlungsod Building, or any of the ten district treasury offices. Confirm office operations before travelling on holidays or during service advisories.</div>
    </section>
  </PublicPageShell>
</template>

<script setup lang="ts">
import { DocumentArrowDownIcon } from '@heroicons/vue/24/outline'
const deadlines = [
  { label: 'First installment', date: 'March 31, 2026' },
  { label: 'Second installment', date: 'June 30, 2026' },
  { label: 'Third installment', date: 'September 30, 2026' },
  { label: 'Fourth installment', date: 'December 31, 2026' },
]
</script>
