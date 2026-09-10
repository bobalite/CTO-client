<template>
  <PublicPageShell>
    <Head><Title>About | City Treasurer's Office</Title><Meta name="description" content="Learn about the mandate and services of the City Treasurer's Office of Davao City." /></Head>
    <section class="bg-[#173a67] text-white">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p class="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">About the office</p>
        <h1 class="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">Responsible stewardship of Davao City's public funds</h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-white/75">The City Treasurer's Office is the collection arm of the City Government, serving residents, property owners, businesses, and public offices.</p>
      </div>
    </section>
    <section class="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
      <div>
        <h2 class="text-3xl font-extrabold text-[#173a67]">Our mandate</h2>
        <p class="mt-5 text-base leading-8 text-slate-600">The office generates local revenue, safeguards and disburses city funds, maintains tax information, implements the City Revenue Tax Code, and provides public-finance information for local and national decision-making.</p>
        <p class="mt-4 text-base leading-8 text-slate-600">Its work supports a systematic, accountable approach to real property, business establishments, collections, deposits, and other treasury transactions.</p>
      </div>
      <aside class="border-l-4 border-[#15803d] bg-white p-7 shadow-sm">
        <p class="text-sm font-bold uppercase tracking-[0.18em] text-[#15803d]">City Treasurer</p>
        <p class="mt-3 text-2xl font-extrabold text-[#173a67]">Atty. Lawrence D. Bantiding</p>
        <p class="mt-3 text-sm leading-6 text-slate-600">The office traces its public-service role to the creation of the municipal government of Davao in 1901 and the city's charter in 1937.</p>
      </aside>
    </section>
    <section class="bg-white py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-[#173a67]">What we handle</h2>
        <div class="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article v-for="service in services" :key="service" class="border border-slate-200 p-6 text-sm font-semibold leading-6 text-slate-700">{{ service }}</article>
        </div>
      </div>
    </section>
  </PublicPageShell>
</template>

<script setup lang="ts">
const services = [
  'Assessment and payment of real property and transfer taxes',
  'Real property tax clearances and certifications',
  'Business permit assessment, payment, renewal, and retirement',
  'Community Tax Certificates and Professional Tax Receipts',
  'Amusement tax, market fees, rentals, and other local charges',
  'Collection deposits, remittances, disbursement, and checks',
]
</script>
