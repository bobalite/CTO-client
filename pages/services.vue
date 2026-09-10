<template>
  <PublicPageShell>
    <Head>
      <Title>Services | City Treasurer's Office</Title>
      <Meta name="description" content="Online tax clearance and Statement of Account verification and printing services." />
    </Head>

    <section class="bg-[#173a67] text-white">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p class="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Online government services</p>
        <h1 class="mt-4 text-4xl font-extrabold sm:text-5xl">Our Services</h1>
        <p class="mt-5 max-w-2xl text-lg leading-8 text-white/75">Verify documents and submit requests for tax clearance and Statement of Account printing.</p>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-8">
        <div>
          <p class="text-sm font-bold uppercase tracking-[0.2em] text-[#15803d]">Quick services</p>
          <h2 class="mt-3 text-3xl font-extrabold text-[#173a67]">Choose a Service</h2>
        </div>
        <p class="text-base leading-7 text-slate-600">Select the service you need. Verification services allow you to confirm whether a document was issued by the City Treasurer's Office.</p>
      </div>

      <div class="mt-8 grid gap-6 md:grid-cols-2">
        <NuxtLink
          v-for="service in services"
          :key="service.to"
          :to="service.to"
          class="group flex flex-col border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#15803d] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803d] motion-reduce:transform-none motion-reduce:transition-none"
        >
          <div class="flex flex-wrap items-center justify-between gap-4">
            <component :is="service.icon" class="h-8 w-8 text-[#15803d]" aria-hidden="true" />
            <span class="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-[#15803d]">{{ service.status }}</span>
          </div>
          <h3 class="mt-5 text-xl font-extrabold text-[#173a67]">{{ service.title }}</h3>
          <p class="mt-3 flex-1 text-base leading-7 text-slate-600">{{ service.description }}</p>
          <span class="mt-6 inline-flex items-center gap-2 border-t border-slate-100 pt-5 text-sm font-bold text-[#15803d]">
            {{ service.action }}
            <ArrowRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
          </span>
        </NuxtLink>
      </div>
    </section>

    <section class="bg-white py-14">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 class="text-2xl font-extrabold text-[#173a67]">Before using an online service</h2>
        <p class="mt-4 text-base leading-7 text-slate-600">Prepare the PIN, SOA number, tax clearance QR code, or Official Receipt information required by the selected service.</p>
      </div>
    </section>
  </PublicPageShell>
</template>

<script setup lang="ts">
import { ArrowRightIcon, DocumentMagnifyingGlassIcon, DocumentTextIcon, PrinterIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'

const services = [
  {
    title: 'Tax Clearance Verification',
    description: 'Verify the authenticity and validity of a tax clearance using its QR verification code.',
    to: '/verify',
    icon: ShieldCheckIcon,
    status: 'Available',
    action: 'Verify Tax Clearance',
  },
  {
    title: 'SOA Verification',
    description: 'Verify a real property tax Statement of Account using the SOA number printed on the document.',
    to: '/verify_soa',
    icon: DocumentMagnifyingGlassIcon,
    status: 'Available',
    action: 'Verify SOA',
  },
  {
    title: 'Request Tax Clearance Print',
    description: 'Submit a request for a printed tax clearance by providing the required property and payment information.',
    to: '/tax-clearance-request',
    icon: PrinterIcon,
    status: 'Online Request',
    action: 'Request Tax Clearance',
  },
  {
    title: 'Request SOA Print',
    description: 'Prepare a printed Statement of Account request using your PIN, land owner, and requester details.',
    to: '/request-soa-print',
    icon: DocumentTextIcon,
    status: 'Sign in to request',
    action: 'Request SOA',
  },
]
</script>
