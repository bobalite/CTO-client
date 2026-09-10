<template>
  <div class="flex min-h-screen flex-col bg-slate-50">
    <Head>
      <Title>Sign In | City Treasurer's Office</Title>

      <Meta
        name="description"
        content="Sign in to the City Treasurer's Office online portal of Davao City."
      />
    </Head>

    <!-- Government Top Bar -->
    <div class="bg-[#16283f] text-white">
      <div
        class="mx-auto flex min-h-10 max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8"
      >
        <div class="flex items-center gap-2">
          <div
            class="flex h-5 w-7 overflow-hidden rounded-sm border border-white/20"
            aria-hidden="true"
          >
            <span class="h-full w-1/2 bg-blue-600"></span>
            <span class="h-full w-1/2 bg-red-600"></span>
          </div>

          <p class="text-[11px] font-medium sm:text-xs">
            The Official Website of the City Government of Davao
          </p>
        </div>

        <div class="hidden items-center gap-5 text-xs sm:flex">
          <a
            href="https://www.facebook.com/davaocitygov"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-white/80 transition hover:text-white"
          >
            <GlobeAltIcon class="h-4 w-4" />
            Facebook
          </a>

          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-1.5 text-white/80 transition hover:text-white"
          >
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
              class="truncate text-xs font-bold uppercase tracking-[0.16em] text-[#bb1e2d]"
            >
              City Government of Davao
            </p>

            <p
              class="truncate text-lg font-extrabold leading-tight text-[#173a67] sm:text-xl"
            >
              City Treasurer's Office
            </p>

            <p class="text-xs font-medium text-slate-500">
              Republic of the Philippines
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
            class="rounded-md px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-[#bb1e2d]"
          >
            {{ item.label }}
          </NuxtLink>

          <NuxtLink
            to="/verify"
            class="ml-2 inline-flex items-center gap-2 rounded-md bg-[#bb1e2d] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#991827]"
          >
            <ShieldCheckIcon class="h-4 w-4" />
            Verify Clearance
          </NuxtLink>
        </nav>

        <!-- Mobile Menu -->
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

      <Transition name="mobile-menu">
        <div
          v-if="isMobileMenuOpen"
          class="border-t border-slate-200 bg-white lg:hidden"
        >
          <nav
            class="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:px-6"
          >
            <NuxtLink
              v-for="item in navigationItems"
              :key="item.label"
              :to="item.link"
              class="rounded-lg px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-[#bb1e2d]"
              @click="closeMobileMenu"
            >
              {{ item.label }}
            </NuxtLink>

            <NuxtLink
              to="/verify"
              class="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#bb1e2d] px-4 py-3 text-sm font-bold text-white"
              @click="closeMobileMenu"
            >
              <ShieldCheckIcon class="h-5 w-5" />
              Verify Tax Clearance
            </NuxtLink>
          </nav>
        </div>
      </Transition>
    </header>

    <!-- Login Content -->
    <main
      class="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-14 sm:px-6 lg:px-8"
    >
      <!-- Background -->
      <div class="absolute inset-0">
        <img
          :src="cityhallImg"
          alt=""
          class="h-full w-full object-cover"
        />

        <div class="absolute inset-0 login-overlay"></div>
      </div>

      <div
        class="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl"
      ></div>

      <div
        class="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-red-500/10 blur-3xl"
      ></div>

      <!-- Login Card -->
      <section
        class="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/30 bg-white shadow-2xl shadow-slate-950/30"
      >
        <div class="h-2 bg-[#bb1e2d]"></div>

        <div class="p-6 sm:p-8">
          <div class="text-center">
            <div
              class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#173a67] text-white shadow-lg"
            >
              <LockClosedIcon class="h-8 w-8" />
            </div>

            <p
              class="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#bb1e2d]"
            >
              Authorized Access
            </p>

            <h1 class="mt-2 text-2xl font-extrabold text-[#173a67]">
              Sign in to your account
            </h1>

            <p class="mt-2 text-sm leading-relaxed text-slate-600">
              Access the City Treasurer's Office administration portal.
            </p>
          </div>

          <!-- Error Alert -->
          <div
            v-if="state.error || state.api_error"
            class="mt-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4"
          >
            <ExclamationCircleIcon
              class="mt-0.5 h-5 w-5 shrink-0 text-red-600"
            />

            <div>
              <p class="font-bold text-red-800">
                Sign in failed
              </p>

              <p class="mt-1 text-sm text-red-700">
                {{
                  state.api_error ||
                  state.error?.message ||
                  'Unable to sign in.'
                }}
              </p>
            </div>
          </div>

          <!-- Social Login -->
          <div class="mt-7 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              class="social-button"
              :disabled="state.isLoading || state.socialProvider !== null || !socialLoginUrls.google"
              aria-describedby="social-login-notice"
              @click="loginWithGoogle"
            >
              <svg
                class="h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M21.6 12.227c0-.709-.064-1.391-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.509h3.232c1.891-1.741 2.982-4.309 2.982-7.35Z"
                />
                <path
                  fill="#34A853"
                  d="M12 22c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.041.955-3.386.955-2.605 0-4.809-1.759-5.6-4.123H3.059v2.591A9.999 9.999 0 0 0 12 22Z"
                />
                <path
                  fill="#FBBC05"
                  d="M6.4 13.9A6.01 6.01 0 0 1 6.086 12c0-.659.114-1.3.314-1.9V7.509H3.059A9.999 9.999 0 0 0 2 12c0 1.614.386 3.141 1.059 4.491L6.4 13.9Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.977c1.468 0 2.786.505 3.823 1.495l2.868-2.868C16.959 2.991 14.695 2 12 2a9.999 9.999 0 0 0-8.941 5.509L6.4 10.1c.791-2.364 2.995-4.123 5.6-4.123Z"
                />
              </svg>

              <span>
                {{
                  state.socialProvider === 'google'
                    ? 'Connecting...'
                    : 'Continue with Google'
                }}
              </span>
            </button>

            <button
              type="button"
              class="social-button"
              :disabled="state.isLoading || state.socialProvider !== null || !socialLoginUrls.facebook"
              aria-describedby="social-login-notice"
              @click="loginWithFacebook"
            >
              <svg
                class="h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#1877F2"
                  d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.414c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.971h-1.513c-1.49 0-1.956.931-1.956 1.887v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z"
                />
              </svg>

              <span>
                {{
                  state.socialProvider === 'facebook'
                    ? 'Connecting...'
                    : 'Continue with Facebook'
                }}
              </span>
            </button>
          </div>

          <p id="social-login-notice" class="mt-3 text-sm leading-6 text-slate-500">
            {{ !socialLoginUrls.google || !socialLoginUrls.facebook
              ? 'Unavailable sign-in options will be enabled when the service is ready.'
              : 'Continue securely with your Google or Facebook account.' }}
          </p>

          <div class="my-7 flex items-center gap-4">
            <div class="h-px flex-1 bg-slate-200"></div>

            <span
              class="text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              Or use your account
            </span>

            <div class="h-px flex-1 bg-slate-200"></div>
          </div>

          <!-- Login Form -->
          <form
            class="space-y-5"
            @submit.prevent="login"
          >
            <div>
              <FormLabel
                for="email"
                label="Email address"
              />

              <FormEmail
                name="email"
                v-model="state.email"
                :disabled="state.isLoading"
              />

              <FormError
                :error="
                  v$.email?.$errors?.length > 0
                    ? v$.email.$errors[0].$message
                    : null
                "
              />
            </div>

            <div>
              <div class="flex items-center justify-between gap-4">
                <FormLabel
                  for="password"
                  label="Password"
                />

                <NuxtLink
                  to="/forgot-password"
                  class="text-xs font-bold text-[#bb1e2d] transition hover:text-[#991827]"
                >
                  Forgot password?
                </NuxtLink>
              </div>

              <FormPassword
                name="password"
                v-model="state.password"
                :disabled="state.isLoading"
              />

              <FormError
                :error="
                  v$.password?.$errors?.length > 0
                    ? v$.password.$errors[0].$message
                    : null
                "
 />
            </div>

            <button type="submit" class="cto-login-button" :disabled="state.isLoading || state.socialProvider !== null">
              <ArrowPathIcon v-if="state.isLoading" class="h-5 w-5 animate-spin" />

              <ArrowRightOnRectangleIcon v-else class="h-5 w-5" />

              <span>
                {{ state.isLoading ? 'Signing in...' : 'Login' }}
              </span>
            </button>
          </form>

          <div
            class="mt-6 flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4"
          >
            <ShieldCheckIcon
              class="mt-0.5 h-5 w-5 shrink-0 text-[#173a67]"
            />

            <p class="text-xs leading-relaxed text-slate-600">
              This portal is for authorized City Treasurer's Office
              personnel. Unauthorized access attempts may be recorded.
            </p>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-[#16283f] text-white">
      <div
        class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8"
      >
        <div>
          <div class="flex items-center gap-3">
            <div
              class="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white"
            >
              <img
                :src="ctoLogo"
                alt="City Treasurer's Office Logo"
                class="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <p class="font-extrabold">
                City Treasurer's Office
              </p>

              <p class="text-sm text-white/65">
                City Government of Davao
              </p>
            </div>
          </div>

          <p class="mt-5 text-sm leading-relaxed text-white/65">
            Providing accessible, reliable, and transparent treasury
            services to the people of Davao City.
          </p>
        </div>

        <div>
          <h2 class="font-bold">
            Quick Links
          </h2>

          <div class="mt-4 grid gap-3 text-sm">
            <NuxtLink
              to="/services"
              class="text-white/65 transition hover:text-white"
            >
              Services
            </NuxtLink>

            <NuxtLink
              to="/real-property-tax"
              class="text-white/65 transition hover:text-white"
            >
              Real Property Tax
            </NuxtLink>

            <NuxtLink
              to="/verify"
              class="text-white/65 transition hover:text-white"
            >
              Verify Tax Clearance
            </NuxtLink>

            <NuxtLink
              to="/updates"
              class="text-white/65 transition hover:text-white"
            >
              News and Advisories
            </NuxtLink>
          </div>
        </div>

        <div>
          <h2 class="font-bold">
            Contact Information
          </h2>

          <div class="mt-4 space-y-3 text-sm text-white/65">
            <p class="flex items-start gap-2">
              <MapPinIcon class="mt-0.5 h-4 w-4 shrink-0" />

              City Hall Building, San Pedro Street, Davao City
            </p>

            <p class="flex items-center gap-2">
              <PhoneIcon class="h-4 w-4 shrink-0" />

              (082) 241-1000
            </p>

            <p class="flex items-center gap-2">
              <EnvelopeIcon class="h-4 w-4 shrink-0" />

              cto@davaocity.gov.ph
            </p>
          </div>
        </div>
      </div>

      <div class="border-t border-white/10">
        <div
          class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
        >
          <p>
            © {{ currentYear }} City Government of Davao. All rights reserved.
          </p>

          <p>
            City Treasurer's Office Online Portal
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { authService } from '~/components/api/AuthService'
import { useUserStore } from '~/store/user'
import { useVuelidate } from '@vuelidate/core'
import {
  required,
  email,
  helpers,
} from '@vuelidate/validators'

import {
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  EnvelopeIcon,
  ExclamationCircleIcon,
  GlobeAltIcon,
  LockClosedIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

import ctoLogo from '~/assets/images/CTOLogo.png'
import cityhallImg from '~/assets/images/cityhall.webp'

definePageMeta({
  layout: false,
})

const runtimeConfig = useRuntimeConfig()
const socialLoginUrls = {
  google: String(runtimeConfig.public.googleLoginUrl || '').trim(),
  facebook: String(runtimeConfig.public.facebookLoginUrl || '').trim(),
}
const userStore = useUserStore()

const currentYear = new Date().getFullYear()

const isMobileMenuOpen = ref(false)

const navigationItems = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Services',
    link: '/services',
  },
  {
    label: 'RPT Information',
    link: '/real-property-tax',
  },
  {
    label: 'Updates',
    link: '/updates',
  },
  {
    label: 'Contact',
    link: '/contact',
  },
]

const state = reactive({
  isLoading: false,
  socialProvider: null,
  email: '',
  password: '',
  error: null,
  api_error: null,
})

const rules = computed(() => ({
  email: {
    required: helpers.withMessage(
      'The email field is required.',
      required,
    ),
    email: helpers.withMessage(
      'Enter a valid email address.',
      email,
    ),
  },

  password: {
    required: helpers.withMessage(
      'The password field is required.',
      required,
    ),
  },
}))

const v$ = useVuelidate(rules, state)

onMounted(() => {
  localStorage.removeItem('_token')
  sessionStorage.removeItem('_token')
  sessionStorage.removeItem('cto-demo-session')
  userStore.resetUser()
})

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

function clearLoginError() {
  state.error = null
  state.api_error = null
}

async function login() {
  clearLoginError()

  const isValid = await v$.value.$validate()

  if (!isValid) {
    return
  }

  state.isLoading = true

  try {
    const response = await authService.login({
      email: state.email.trim(),
      password: state.password,
    })

    if (!response?.data?.token) {
      throw new Error(
        'The authentication server did not return a token.',
      )
    }

    localStorage.setItem(
      '_token',
      response.data.token,
    )

    userStore.setUser(response.data.user)

    await navigateTo('/my-requests')
  } catch (error) {
    state.error = error

    const message =
      error?.data?.message ||
      error?.response?.data?.message ||
      error?.message ||
      ''

    if (
      message === 'Invalid password.' ||
      message === 'Invalid email address.' ||
      message.toLowerCase().includes('invalid credentials')
    ) {
      state.api_error =
        'Invalid email address or password.'
    } else if (
      error?.statusCode === 429 ||
      error?.response?.status === 429
    ) {
      state.api_error =
        'Too many login attempts. Please wait before trying again.'
    } else {
      state.api_error =
        message ||
        'The authentication service is currently unavailable.'
    }
  } finally {
    state.isLoading = false
  }
}

function loginWithGoogle() {
  startSocialLogin('google')
}

function loginWithFacebook() {
  startSocialLogin('facebook')
}

function startSocialLogin(provider) {
  clearLoginError()

  state.socialProvider = provider

  try {
    const configuredUrl = socialLoginUrls[provider]
    if (!configuredUrl) {
      throw new Error('This sign-in option is not available yet.')
    }
    const url = new URL(configuredUrl, window.location.origin)
    if (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname))) {
      throw new Error('This sign-in option is currently unavailable.')
    }
    window.location.assign(url.href)
  } catch (error) {
    state.socialProvider = null

    state.api_error =
      error?.message ||
      `Unable to connect to ${provider}.`
  }
}
</script>

<style scoped>
.login-overlay {
  background:
    linear-gradient(
      135deg,
      rgb(23 58 103 / 0.94),
      rgb(22 40 63 / 0.88),
      rgb(2 12 27 / 0.9)
    );
}

.social-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid rgb(203 213 225);
  background: white;
  padding: 0.8rem 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: rgb(30 41 59);
  transition:
    background-color 150ms ease,
    border-color 150ms ease,
    transform 150ms ease;
}

.social-button:hover:not(:disabled) {
  transform: translateY(-1px);
  border-color: #173a67;
  background: rgb(248 250 252);
}

.social-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.cto-login-button {
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 0;
  border-radius: 0.5rem;
  background-color: #bb1e2d !important;
  padding: 0.875rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #ffffff !important;
  box-shadow: 0 8px 20px rgb(187 30 45 / 0.2);
  transition:
    background-color 150ms ease,
    transform 150ms ease;
}

.cto-login-button:hover:not(:disabled) {
  background-color: #991827 !important;
  transform: translateY(-1px);
}

.cto-login-button:disabled {
  cursor: not-allowed;
  background-color: #cbd5e1 !important;
  color: #64748b !important;
}
</style>
