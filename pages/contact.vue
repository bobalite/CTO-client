<template>
  <PublicPageShell>
    <Head><Title>Contact Us | City Treasurer's Office</Title><Meta name="description" content="Contact and visit the City Treasurer's Office of Davao City." /></Head>
    <section class="bg-[#173a67] text-white"><div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><p class="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Contact us</p><h1 class="mt-4 text-4xl font-extrabold sm:text-5xl">How can we help?</h1><p class="mt-5 max-w-2xl text-lg leading-8 text-white/75">Reach the City Treasurer's Office for questions about taxes, payments, clearances, receipts, and other treasury services.</p></div></section>
    <section class="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
      <a href="https://maps.google.com/?q=Room+1+City+Hall+San+Pedro+Street+Davao+City" target="_blank" rel="noopener" class="group border-t-4 border-[#15803d] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><MapPinIcon class="h-8 w-8 text-[#15803d]"/><h2 class="mt-5 text-xl font-extrabold text-[#173a67]">Visit the office</h2><p class="mt-3 text-sm leading-6 text-slate-600">Room 1, City Hall Building<br/>San Pedro Street, Davao City</p><span class="mt-5 inline-block text-sm font-bold text-[#15803d]">Open in Maps →</span></a>
      <a href="tel:+63822411000" class="group border-t-4 border-[#15803d] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><PhoneIcon class="h-8 w-8 text-[#15803d]"/><h2 class="mt-5 text-xl font-extrabold text-[#173a67]">Call us</h2><p class="mt-3 text-sm leading-6 text-slate-600">(082) 241-1000 local 232<br/>Hotline: (082) 225-0200</p><span class="mt-5 inline-block text-sm font-bold text-[#15803d]">Call main line →</span></a>
      <a href="mailto:cto@davaocity.gov.ph" class="group border-t-4 border-[#15803d] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><EnvelopeIcon class="h-8 w-8 text-[#15803d]"/><h2 class="mt-5 text-xl font-extrabold text-[#173a67]">Email us</h2><p class="mt-3 text-sm leading-6 text-slate-600">cto@davaocity.gov.ph<br/>Office hours: 8:00 AM–5:00 PM</p><span class="mt-5 inline-block text-sm font-bold text-[#15803d]">Write an email →</span></a>
    </section>
    <section class="bg-white py-14"><div class="mx-auto max-w-4xl px-4 text-center sm:px-6"><h2 class="text-2xl font-extrabold text-[#173a67]">Before you visit</h2><p class="mt-4 leading-7 text-slate-600">Bring the documents related to your transaction and, when applicable, your property index number, tax declaration, statement of account, or official receipt. Calling ahead can help confirm the correct counter or district office.</p></div></section>
  </PublicPageShell>
</template>

<script setup lang="ts">
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/vue/24/outline'
</script>
