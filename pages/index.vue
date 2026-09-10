<template>
  <div class="min-h-screen bg-slate-50">
    <Head>
      <Title>City Treasurer's Office | Davao City</Title>

      <Meta name="description" content="Official online portal of the City Treasurer's Office of Davao City." />
    </Head>

    <!-- Government Top Bar -->
    <div class="bg-[#16283f] text-white">
      <div class="mx-auto flex min-h-10 max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <div class="flex items-center gap-2">
          <div class="flex h-5 w-7 overflow-hidden rounded-sm border border-white/20" aria-hidden="true">
            <span class="text-xl leading-none" role="img" aria-label="Flag of the Philippines">
              <img :src="philippinesFlag" alt="Flag of the Philippines"
                class="h-5 w-8 shrink-0 object-cover shadow-sm" />
            </span>

          </div>

          <p class="text-[11px] font-medium sm:text-xs">
            The Official Website of the City Government of Davao
          </p>
        </div>

        <div class="hidden items-center gap-5 text-xs sm:flex">
          <a href="https://www.facebook.com/davaocitygov" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-white/80 transition hover:text-white">
            <GlobeAltIcon class="h-4 w-4" />
            Facebook
          </a>

          <NuxtLink to="/contact" class="inline-flex items-center gap-1.5 text-white/80 transition hover:text-white">
            <PhoneIcon class="h-4 w-4" />
            Contact Us
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <header
      class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md"
    >
      <div
        class="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8"
      >
        <!-- Branding -->
        <NuxtLink
          to="/"
          class="flex min-w-0 items-center gap-3"
          aria-label="City Treasurer's Office home"
        >
        <div
            class="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden "
          >
            <img
              :src="dcplinado2"
              alt="dcplinado Logo"
              class="h-full w-full object-contain p-1"
            />
          </div>

           <div
            class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-slate-200"
          >
            <img
              :src="dvologo"
              alt="City Treasurer's Office Logo"
              class="h-full w-full object-contain p-1"
            />
          </div>
          
          <div
            class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-1 ring-slate-200"
          >
            <img
              :src="ctoLogo"
              alt="City Treasurer's Office Logo"
              class="h-full w-full object-contain p-1"
            />
          </div>


          <div class="min-w-0">
            

            <p
              class="truncate text-lg font-extrabold leading-tight text-[#173a67] sm:text-lg"
            >
              City Treasurer's Office
            </p>

           
          </div>

        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav
          class="hidden items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.label"
            :to="item.link"
            class="rounded-md px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-[#15803d]"
            active-class="bg-slate-100 text-[#15803d]"
          >
            {{ item.label }}
          </NuxtLink>

          <NuxtLink
            to="/verify"
            class="ml-2 inline-flex items-center gap-2 rounded-md bg-[#15803d] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#166534]"
          >
            <ShieldCheckIcon class="h-4 w-4" />
            Verify Clearance
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle navigation menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <XMarkIcon
            v-if="isMobileMenuOpen"
            class="h-6 w-6"
          />

          <Bars3Icon
            v-else
            class="h-6 w-6"
          />
        </button>
      </div>

      <!-- Mobile Navigation -->
      <Transition name="mobile-menu">
        <div
          v-if="isMobileMenuOpen"
          class="border-t border-slate-200 bg-white lg:hidden"
        >
          <nav
            class="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:px-6"
            aria-label="Mobile navigation"
          >
            <NuxtLink
              v-for="item in navigationItems"
              :key="item.label"
              :to="item.link"
              class="rounded-lg px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-[#15803d]"
              @click="closeMobileMenu"
            >
              {{ item.label }}
            </NuxtLink>

            <NuxtLink
              to="/verify"
              class="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#15803d] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#166534]"
              @click="closeMobileMenu"
            >
              <ShieldCheckIcon class="h-5 w-5" />
              Verify Tax Clearance
            </NuxtLink>
          </nav>
        </div>
      </Transition>
    </header>

    <main>
      <!-- Hero -->
      <section
        class="relative flex min-h-[78vh] items-center overflow-hidden bg-slate-950"
      >
        <div class="absolute inset-0">
          <img
            v-for="(imageItem, index) in heroImages"
            :key="imageItem"
            :src="imageItem"
            alt=""
            class="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000"
            :class="
              currentImageIndex === index
                ? 'opacity-100'
                : 'opacity-0'
            "
          />
        </div>

        <div class="absolute inset-0 hero-overlay"></div>

        <div
          class="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
        ></div>

        <div
          class="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
        >
          <div class="max-w-3xl">
            <div
              class="mb-6 inline-flex items-center gap-2 border-l-4 border-[#15803d] bg-white/10 px-4 py-2 backdrop-blur-md"
            >
              <span
                class="text-xs font-bold uppercase tracking-[0.2em] text-white"
              >
                Official Treasury Services Portal
              </span>
            </div>

            <h1
              class="text-5xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              City Treasurer's

              <span class="block text-cyan-300">
                Office
              </span>

              <span
                class="mt-3 block text-2xl font-bold uppercase tracking-[0.12em] text-white/80 sm:text-3xl"
              >
                Davao City
              </span>
            </h1>

            <p
              class="mt-7 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
            >
              Access tax information, treasury services, payment guidance,
             official announcements, and document verification services.
            </p>

            <div class="mt-10 flex flex-wrap gap-4">
              <NuxtLink to="/services"
                class="group inline-flex items-center gap-2 rounded-md bg-[#bb1e2d] px-7 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#991827]">
                <BoltIcon class="h-5 w-5" />

                View Services

                <ArrowRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </NuxtLink>

              <NuxtLink to="/verify"
                class="group inline-flex items-center gap-2 rounded-md bg-white px-7 py-4 font-bold text-[#173a67] shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100">
                <ShieldCheckIcon class="h-5 w-5" />

                Verify Tax Clearance
              </NuxtLink>

              <NuxtLink to="/rpt-calculator"
                class="group inline-flex items-center gap-2 rounded-md bg-cyan-400 px-7 py-4 font-bold text-[#102c50] shadow-lg transition hover:-translate-y-0.5 hover:bg-cyan-300">
                <CalculatorIcon class="h-5 w-5" />

                RPT Tax Calculator
              </NuxtLink>

              <NuxtLink to="/updates"
                class="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20">
                <MegaphoneIcon class="h-5 w-5" />

                Latest Updates
              </NuxtLink>

              <NuxtLink to="/login"
                class="group inline-flex items-center gap-2 rounded-md border border-white/40 bg-[#173a67] px-7 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#102c50]">
                <ArrowRightOnRectangleIcon class="h-5 w-5" />

                Login
              </NuxtLink>
            </div>

          </div>
        </div>
        <!-- Slideshow Controls -->
        <div
          class="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2"
        >
          <button
            v-for="(_, index) in heroImages"
            :key="index"
            type="button"
            class="h-2.5 transition-all"
            :class="
              currentImageIndex === index
                ? 'w-9 bg-[#15803d]'
                : 'w-3 bg-white/50 hover:bg-white'
            "
            :aria-label="`Show slide ${index + 1}`"
            @click="setCurrentImage(index)"
          ></button>
        </div>
      </section>

      <!-- Service Notices -->
      <section class="border-b border-slate-200 bg-white py-5">
        <div
          class="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:px-6 md:flex-row md:items-center lg:px-8"
        >
          <div
            class="inline-flex shrink-0 items-center gap-2 bg-[#15803d] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white"
          >
            <MegaphoneIcon class="h-4 w-4" />
            Advisory
          </div>

          <p class="text-sm leading-relaxed text-slate-600">
            Online treasury services and document verification are available
            through this official portal. For assistance, contact the City
            Treasurer's Office.
          </p>
        </div>
      </section>

      <!-- Quick Services -->
      <section class="py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <p
              class="text-sm font-bold uppercase tracking-[0.2em] text-[#15803d]"
            >
              Services
            </p>

            <h2
              class="mt-3 text-3xl font-extrabold text-[#173a67] sm:text-4xl"
            >
              City Treasurer's Office Services
            </h2>

            <div class="mx-auto mt-5 h-1 w-16 bg-[#15803d]"></div>

            <p
              class="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-600"
            >
              Access important services for tax payments, clearances,
              official receipts, statements of account, and treasury-related
              transactions.
            </p>
          </div>

          <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <NuxtLink
              v-for="service in quickServices"
              :key="service.title"
              :to="service.link"
              class="group border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#15803d] hover:shadow-xl"
            >
              <div
                class="flex h-14 w-14 items-center justify-center rounded-full bg-[#173a67] text-white transition group-hover:bg-[#15803d]"
              >
                <component
                  :is="service.icon"
                  class="h-7 w-7"
                />
              </div>

              <h3 class="mt-6 text-lg font-extrabold text-[#173a67]">
                {{ service.title }}
              </h3>

              <p class="mt-3 text-sm leading-relaxed text-slate-600">
                {{ service.description }}
              </p>

              <span
                class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#15803d]"
              >
                Access service

                <ArrowRightIcon
                  class="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Verification CTA -->
      <section class="bg-[#173a67] py-20">
        <div
          class="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8"
        >
          <div class="max-w-3xl">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-cyan-300"
            >
              <ShieldCheckIcon class="h-8 w-8" />
            </div>

            <p
              class="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-cyan-300"
            >
              Online Verification
            </p>

            <h2
              class="mt-3 text-3xl font-extrabold text-white sm:text-4xl"
            >
              Verify an issued tax clearance
            </h2>

            <p
              class="mt-5 max-w-2xl text-base leading-relaxed text-white/70"
            >
              Use the verification hash or scan the QR code printed on a tax
              clearance to confirm that it exists in the official records.
            </p>
          </div>

          <NuxtLink
            to="/verify"
            class="group inline-flex w-fit items-center gap-3 rounded-md bg-[#15803d] px-8 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#166534]"
          >
            <MagnifyingGlassIcon class="h-5 w-5" />
            Verify Tax Clearance

            <ArrowRightIcon
              class="h-5 w-5 transition-transform group-hover:translate-x-1"
            />
          </NuxtLink>
        </div>
      </section>

      <!-- About -->
      <section class="bg-white py-20">
        <div
          class="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8"
        >
          <div class="relative">
            <div
              class="absolute -left-4 -top-4 h-full w-full border-4 border-[#15803d]"
            ></div>

            <img
              :src="cityhallImg"
              alt="Davao City Hall"
              class="relative h-[420px] w-full object-cover shadow-xl"
            />
          </div>

          <div>
            <p
              class="text-sm font-bold uppercase tracking-[0.2em] text-[#15803d]"
            >
              About the Office
            </p>

            <h2
              class="mt-4 text-3xl font-extrabold text-[#173a67] sm:text-4xl"
            >
              Transparent and accessible treasury services
            </h2>

            <div class="mt-5 h-1 w-16 bg-[#15803d]"></div>

            <p class="mt-6 text-base leading-relaxed text-slate-600">
              The City Treasurer's Office manages local revenue collection,
              real property tax payments, official receipts, certifications,
              clearances, and related financial services.
            </p>

            <p class="mt-4 text-base leading-relaxed text-slate-600">
              This portal makes important treasury information and public
              services more accessible to residents, property owners,
              businesses, and government offices.
            </p>

            <NuxtLink
              to="/about"
              class="mt-8 inline-flex items-center gap-2 rounded-md bg-[#173a67] px-6 py-3.5 font-bold text-white transition hover:bg-[#102c50]"
            >
              Learn More

              <ArrowRightIcon class="h-4 w-4" />
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Latest Updates -->
      <section class="bg-slate-100 py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p
                class="text-sm font-bold uppercase tracking-[0.2em] text-[#15803d]"
              >
                Latest News
              </p>

              <h2
                class="mt-3 text-3xl font-extrabold text-[#173a67] sm:text-4xl"
              >
                News and Advisories
              </h2>

              <div class="mt-5 h-1 w-16 bg-[#15803d]"></div>
            </div>

            <NuxtLink
              to="/updates"
              class="inline-flex items-center gap-2 font-bold text-[#15803d] hover:text-[#166534]"
            >
              View More Articles

              <ArrowRightIcon class="h-4 w-4" />
            </NuxtLink>
          </div>

          <div class="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="updateItem in latestUpdates"
              :key="updateItem.id"
              class="group overflow-hidden border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div class="h-52 overflow-hidden">
                <img
                  :src="updateItem.image"
                  :alt="updateItem.title"
                  class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div class="p-6">
                <div
                  class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#15803d]"
                >
                  <CalendarDaysIcon class="h-4 w-4" />
                  {{ formatDate(updateItem.date) }}
                </div>

                <h3
                  class="mt-4 text-xl font-extrabold leading-snug text-[#173a67] transition group-hover:text-[#15803d]"
                >
                  {{ updateItem.title }}
                </h3>

                <p
                  class="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600"
                >
                  {{ updateItem.summary }}
                </p>

                <NuxtLink
                  to="/updates"
                  class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#15803d]"
                >
                  Read More

                  <ArrowRightIcon class="h-4 w-4" />
                </NuxtLink>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-[#13263d] text-white">
      <div
        class="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8"
      >
        <!-- Visit -->
        <div>
          <h2
            class="border-b border-white/15 pb-4 text-sm font-extrabold uppercase tracking-[0.15em]"
          >
            Visit Us
          </h2>

          <div class="mt-6 flex items-start gap-3">
            <MapPinIcon
              class="mt-0.5 h-5 w-5 shrink-0 text-cyan-300"
            />

            <div class="text-sm leading-7 text-white/70">
              <p class="font-bold text-white">
                City Treasurer's Office
              </p>

              <p>City Hall Building</p>
              <p>San Pedro Street, Davao City</p>
              <p>8000 Philippines</p>
            </div>
          </div>

          <div class="mt-5 flex items-start gap-3">
            <PhoneIcon
              class="mt-0.5 h-5 w-5 shrink-0 text-cyan-300"
            />

            <div class="text-sm leading-7 text-white/70">
              <p>(082) 241-1000</p>
            </div>
          </div>
        </div>

        <!-- About -->
        <div>
          <h2
            class="border-b border-white/15 pb-4 text-sm font-extrabold uppercase tracking-[0.15em]"
          >
            About the LGU
          </h2>

          <ul class="mt-6 space-y-3">
            <li
              v-for="link in aboutLinks"
              :key="link.label"
            >
              <NuxtLink
                :to="link.link"
                class="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
              >
                <ChevronRightIcon
                  class="h-3.5 w-3.5 text-cyan-300"
                />

                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h2
            class="border-b border-white/15 pb-4 text-sm font-extrabold uppercase tracking-[0.15em]"
          >
            Services
          </h2>

          <ul class="mt-6 space-y-3">
            <li
              v-for="link in serviceLinks"
              :key="link.label"
            >
              <NuxtLink
                :to="link.link"
                class="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
              >
                <ChevronRightIcon
                  class="h-3.5 w-3.5 text-cyan-300"
                />

                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Government Links -->
        <div>
          <h2
            class="border-b border-white/15 pb-4 text-sm font-extrabold uppercase tracking-[0.15em]"
          >
            Government Links
          </h2>

          <ul class="mt-6 space-y-3">
            <li
              v-for="link in governmentLinks"
              :key="link.label"
            >
              <a
                :href="link.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
              >
                <ChevronRightIcon
                  class="h-3.5 w-3.5 text-cyan-300"
                />

                {{ link.label }}
              </a>
            </li>
          </ul>

          <div class="mt-8">
            <h3
              class="text-xs font-extrabold uppercase tracking-[0.15em] text-white"
            >
              Social Media
            </h3>

            <div class="mt-4 flex gap-3">
              <a
                href="https://www.facebook.com/davaocitygov"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#15803d]"
                aria-label="Facebook"
              >
                <GlobeAltIcon class="h-5 w-5" />
              </a>

              <NuxtLink
                to="/contact"
                class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#15803d]"
                aria-label="Contact"
              >
                <EnvelopeIcon class="h-5 w-5" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="border-t border-white/10 bg-[#0d1c2d]">
        <div
          class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/60 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"
        >
          <p>
            © {{ currentYear }} City Government of Davao City.
            All Rights Reserved.
          </p>

          <div class="flex flex-wrap gap-4">
            <NuxtLink
              to="/transparency"
              class="transition hover:text-white"
            >
              Privacy Policy
            </NuxtLink>

            <NuxtLink
              to="/contact"
              class="transition hover:text-white"
            >
              Contact Us
            </NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRightIcon,
  ArrowRightOnRectangleIcon,
  BanknotesIcon,
  Bars3Icon,
  BoltIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  CalculatorIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  MegaphoneIcon,
  PhoneIcon,
  ReceiptPercentIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

import cityhallImg from '~/assets/images/cityhall.webp'
import eagleImg from '~/assets/images/eagle.webp'
import roseImg from '~/assets/images/rose.webp'
import ctoLogo from '~/assets/images/CTOLogo.png'
import philippinesFlag from '~/assets/images/flag.png'
import dcplinado2 from '~/assets/images/dcplinado2.png'
import dvologo from '~/assets/images/dvologo.png'

interface NavigationItem {
  label: string
  link: string
}

interface ServiceItem {
  title: string
  description: string
  link: string
  icon: typeof BanknotesIcon
}

interface UpdateItem {
  id: number
  title: string
  slug: string
  summary: string
  category: string
  date: string
  image: string
}

const isMobileMenuOpen = ref(false)
const currentImageIndex = ref(0)

let slideInterval: ReturnType<typeof setInterval> | undefined

const currentYear = new Date().getFullYear()

const heroImages = [
  cityhallImg,
  eagleImg,
  roseImg,
]

const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'About',
    link: '/about',
  },
  {
    label: 'Services',
    link: '/services',
  },
  {
    label: 'Transparency',
    link: '/transparency',
  },
  {
    label: 'Updates',
    link: '/updates',
  },
  {
    label: 'Contact Us',
    link: '/contact',
  },
]

const quickServices: ServiceItem[] = [
  {
    title: 'Real Property Tax',
    description:
      'Access real property tax information, payment guidance, and related services.',
    link: '/real-property-tax',
    icon: BuildingOffice2Icon,
  },
  {
    title: 'Tax Clearance Verification',
    description:
      'Verify an issued tax clearance using its QR code or verification hash.',
    link: '/verify',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Statement of Account',
    description:
      'Request or review a real property tax statement of account.',
    link: '/verify_soa',
    icon: DocumentTextIcon,
  },
  {
    title: 'Official Receipts',
    description:
      'Review official receipt information and treasury payment guidance.',
    link: '/services',
    icon: ReceiptPercentIcon,
  },
]

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}


const latestUpdates: UpdateItem[] = [
  {
    id: 1,
    title: 'Updated Office Transaction Schedule',
    slug: 'updated-office-transaction-schedule',
    summary:
      'Please be advised of the updated transaction and payment schedule for selected City Treasurer’s Office services.',
    category: 'Advisory',
    date: '2026-07-20',
    image: cityhallImg,
  },
  {
    id: 2,
    title: 'Online Real Property Tax Services Now Available',
    slug: 'online-real-property-tax-services',
    summary:
      'Property owners may now access selected real property tax services through the official online portal.',
    category: 'Services',
    date: '2026-07-18',
    image: eagleImg,
  },
  {
    id: 3,
    title: 'Reminder on Official Receipt Verification',
    slug: 'official-receipt-verification-reminder',
    summary:
      'Clients are reminded to verify details printed on official receipts before leaving the transaction counter.',
    category: 'Payment Notice',
    date: '2026-07-15',
    image: roseImg,
  },
]

const aboutLinks: NavigationItem[] = [
  {
    label: 'About the Office',
    link: '/about',
  },
  {
    label: 'Departments',
    link: '/about',
  },
  {
    label: 'Transparency',
    link: '/transparency',
  },
  {
    label: 'News and Updates',
    link: '/updates',
  },
  {
    label: 'Contact Us',
    link: '/contact',
  },
]

const serviceLinks: NavigationItem[] = [
  {
    label: 'Real Property Tax',
    link: '/real-property-tax',
  },
  {
    label: 'Tax Clearance Verification',
    link: '/verify',
  },
  {
    label: 'Statement of Account',
    link: '/verify_soa',
  },
  {
    label: 'Official Receipts',
    link: '/services',
  },
  {
    label: 'Treasury Forms',
    link: '/services',
  },
]

const governmentLinks = [
  {
    label: 'Republic of the Philippines',
    link: 'https://www.gov.ph/',
  },
  {
    label: 'Department of the Interior and Local Government',
    link: 'https://www.dilg.gov.ph/',
  },
  {
    label: 'Department of Trade and Industry',
    link: 'https://www.dti.gov.ph/',
  },
  {
    label: 'Department of Education',
    link: 'https://www.deped.gov.ph/',
  },
  {
    label: 'Department of Tourism',
    link: 'https://www.tourism.gov.ph/',
  },
]

function closeMobileMenu(): void {
  isMobileMenuOpen.value = false
}

function setCurrentImage(index: number): void {
  currentImageIndex.value = index
  restartSlideshow()
}

function startSlideshow(): void {
  if (heroImages.length <= 1) {
    return
  }

  slideInterval = setInterval(() => {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % heroImages.length
  }, 5000)
}

function restartSlideshow(): void {
  if (slideInterval) {
    clearInterval(slideInterval)
  }

  startSlideshow()
}

function formatDate(date: string): string {
  const parsedDate = new Date(`${date}T00:00:00+08:00`)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Manila',
  }).format(parsedDate)
}

onMounted(() => {
  startSlideshow()
})

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
})
</script>

<style scoped>
.hero-overlay {
  background:
    linear-gradient(
      90deg,
      rgba(7, 24, 45, 0.97) 0%,
      rgba(14, 42, 72, 0.9) 47%,
      rgba(13, 31, 54, 0.55) 100%
    ),
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.05) 0%,
      rgba(0, 0, 0, 0.38) 100%
    );
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
