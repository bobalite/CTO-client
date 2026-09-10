<template>
  <PublicPageShell>
    <Head><Title>Transparency | City Treasurer's Office</Title><Meta name="description" content="Access official transparency, compliance, and public accountability resources for Davao City." /></Head>
    <section class="bg-[#173a67] text-white"><div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><p class="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Open government</p><h1 class="mt-4 text-4xl font-extrabold sm:text-5xl">Transparency and accountability</h1><p class="mt-5 max-w-2xl text-lg leading-8 text-white/75">Find official city records, compliance documents, public reports, and service standards from the City Government of Davao.</p></div></section>
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <a v-for="resource in resources" :key="resource.title" :href="resource.href" target="_blank" rel="noopener" class="group flex min-h-48 flex-col border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#15803d] hover:shadow-lg"><DocumentTextIcon class="h-8 w-8 text-[#15803d]"/><h2 class="mt-5 text-lg font-extrabold text-[#173a67]">{{ resource.title }}</h2><p class="mt-3 flex-1 text-sm leading-6 text-slate-600">{{ resource.description }}</p><span class="mt-5 text-sm font-bold text-[#15803d]">View official resource →</span></a>
      </div>
      <div class="mt-10 border-l-4 border-amber-400 bg-amber-50 p-5 text-sm leading-6 text-amber-950">Documents are maintained by the City Government of Davao. The official source page should be treated as the authoritative version.</div>
    </section>
  </PublicPageShell>
</template>

<script setup lang="ts">
import { DocumentTextIcon } from '@heroicons/vue/24/outline'
const root = 'https://davaocity.gov.ph/transparency/'
const resources = [
  { title: 'Executive Orders', description: 'City executive issuances organized by year.', href: `${root}executive-orders/` },
  { title: 'Resolutions', description: 'Official resolutions and related city records.', href: `${root}resolutions/` },
  { title: 'Citizen’s Charter', description: 'Service standards, requirements, steps, and processing times.', href: root },
  { title: 'Certificates of Compliance', description: 'Published compliance certificates and supporting records.', href: root },
  { title: 'Forms and Reports', description: 'Public forms, reports, and government disclosures.', href: root },
  { title: 'Quality Management System', description: 'Materials supporting consistent, accountable public service.', href: root },
]
</script>
