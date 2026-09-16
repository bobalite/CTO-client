<template>
  <PublicPageShell>
    <Head>
      <Title>
        Transparency | City Treasurer's Office
      </Title>

      <Meta
        name="description"
        content="Access official transparency, compliance, and public accountability resources for Davao City."
      />
    </Head>

    <!-- Hero -->
    <section class="relative overflow-hidden bg-slate-950 text-white">
      <div class="absolute inset-0 transparency-header-gradient"></div>

      <div
        class="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
      ></div>

      <div
        class="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-green-500/10 blur-3xl"
      ></div>

      <div
        class="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8"
      >
        <div class="max-w-3xl">
          <div
            class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm"
          >
            <ShieldCheckIcon class="h-4 w-4 text-cyan-300" />

            <span
              class="text-xs font-bold uppercase tracking-[0.18em] text-white/90"
            >
              Open Government
            </span>
          </div>

          <h1
            class="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Transparency and accountability
          </h1>

          <p
            class="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg"
          >
            Access official city records, compliance documents, public reports,
            service standards, and other transparency resources published by
            the City Government of Davao.
          </p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <main class="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
      <!-- Intro -->
      <div
        class="mb-10 flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p
            class="text-xs font-bold uppercase tracking-[0.16em] text-green-700"
          >
            Public Resources
          </p>

          <h2 class="mt-2 text-3xl font-black text-slate-900">
            Official transparency documents
          </h2>

          <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Select a category below to open the corresponding official City
            Government resource.
          </p>
        </div>

        <div
          class="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600"
        >
          <DocumentTextIcon class="h-4 w-4" />

          {{ resources.length }} resource categories
        </div>
      </div>

      <!-- Cards -->
      <section class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="resource in resources"
          :key="resource.title"
          :href="resource.href"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative flex min-h-[240px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl"
        >
          <!-- subtle accent -->
          <div
            class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-600 via-emerald-500 to-cyan-500 opacity-0 transition group-hover:opacity-100"
          ></div>

          <div
            class="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700 transition group-hover:bg-green-700 group-hover:text-white"
          >
            <component
              :is="resource.icon"
              class="h-6 w-6"
            />
          </div>

          <div class="mt-6 flex-1">
            <h3
              class="text-xl font-black tracking-tight text-slate-900 transition group-hover:text-green-800"
            >
              {{ resource.title }}
            </h3>

            <p class="mt-3 text-sm leading-7 text-slate-600">
              {{ resource.description }}
            </p>
          </div>

          <div
            class="mt-7 flex items-center justify-between border-t border-slate-100 pt-5"
          >
            <span class="text-sm font-bold text-green-700">
              View official resource
            </span>

            <ArrowTopRightOnSquareIcon
              class="h-5 w-5 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-green-700"
            />
          </div>
        </a>
      </section>

      <!-- Notice -->
      <section
        class="mt-12 overflow-hidden rounded-3xl border border-amber-200 bg-amber-50"
      >
        <div class="flex items-start gap-4 p-6 sm:p-7">
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700"
          >
            <ExclamationTriangleIcon class="h-6 w-6" />
          </div>

          <div>
            <h3 class="font-black text-amber-950">
              Official source notice
            </h3>

            <p class="mt-2 text-sm leading-7 text-amber-900">
              Documents and records are maintained by the City Government of
              Davao. The official source page should be treated as the
              authoritative and most current version of each document.
            </p>
          </div>
        </div>
      </section>

      <!-- Accountability note -->
      <section
        class="mt-10 grid gap-6 rounded-3xl bg-slate-900 p-7 text-white sm:p-8 lg:grid-cols-[auto_1fr]"
      >
        <div
          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-cyan-300"
        >
          <ScaleIcon class="h-7 w-7" />
        </div>

        <div>
          <p
            class="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300"
          >
            Public Accountability
          </p>

          <h3 class="mt-2 text-2xl font-black">
            Access to information supports better public service
          </h3>

          <p class="mt-3 max-w-3xl text-sm leading-7 text-white/70">
            These resources support transparency, informed public participation,
            and accountability by making official city records and service
            standards more accessible to the public.
          </p>
        </div>
      </section>
    </main>
  </PublicPageShell>
</template>

<script setup lang="ts">
import {
  ArrowTopRightOnSquareIcon,
  ClipboardDocumentCheckIcon,
  DocumentChartBarIcon,
  DocumentTextIcon,
  FolderOpenIcon,
  ScaleIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/outline'

const root = 'https://davaocity.gov.ph/transparency/'

const resources = [
  {
    title: 'Executive Orders',
    description:
      'Browse city executive issuances and directives organized by year.',
    href: `${root}executive-orders/`,
    icon: DocumentTextIcon,
  },
  {
    title: 'Resolutions',
    description:
      'Access official resolutions and related legislative city records.',
    href: `${root}resolutions/`,
    icon: ScaleIcon,
  },
  {
    title: 'Citizen’s Charter',
    description:
      'Review service standards, documentary requirements, procedures, and processing times.',
    href: root,
    icon: ClipboardDocumentCheckIcon,
  },
  {
    title: 'Certificates of Compliance',
    description:
      'View published compliance certificates and supporting accountability records.',
    href: root,
    icon: ShieldCheckIcon,
  },
  {
    title: 'Forms and Reports',
    description:
      'Access public forms, reports, disclosures, and other government documents.',
    href: root,
    icon: FolderOpenIcon,
  },
  {
    title: 'Quality Management System',
    description:
      'View materials supporting consistent, efficient, and accountable public service delivery.',
    href: root,
    icon: DocumentChartBarIcon,
  },
]
</script>

<style scoped>
.transparency-header-gradient {
  background:
    radial-gradient(
      circle at top right,
      rgba(34, 211, 238, 0.14),
      transparent 38%
    ),
    radial-gradient(
      circle at bottom left,
      rgba(22, 163, 74, 0.12),
      transparent 42%
    ),
    linear-gradient(
      135deg,
      rgba(2, 12, 27, 0.99),
      rgba(8, 47, 73, 0.96)
    );
}
</style>