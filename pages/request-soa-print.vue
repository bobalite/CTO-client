<template>
  <PublicPageShell>
    <Head>
      <Title>
        Request SOA Print | City Treasurer's Office
      </Title>

      <Meta
        name="description"
        content="Prepare a request for a printed real property tax Statement of Account."
      />
    </Head>

    <!-- Header -->
    <section class="relative overflow-hidden bg-slate-950 text-white">
      <div class="absolute inset-0 soa-header-gradient"></div>

      <div
        class="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-green-500/20 blur-3xl"
      ></div>

      <div
        class="absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl"
      ></div>

      <div
        class="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8"
      >
        <div class="max-w-3xl">
          <div
            class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
          >
            <DocumentPlusIcon
              class="h-4 w-4 text-emerald-300"
            />

            <span
              class="text-xs font-bold uppercase tracking-[0.18em] text-white/90"
            >
              Online Government Services
            </span>
          </div>

          <h1
            class="mt-6 text-4xl font-black tracking-tight sm:text-5xl"
          >
            Request SOA Print
          </h1>

          <p
            class="mt-5 max-w-2xl text-lg leading-8 text-white/75"
          >
            Provide the property and requester details for a printed
            Statement of Account.
          </p>
        </div>
      </div>
    </section>

    <!-- Main -->
    <section
      class="mx-auto max-w-7xl px-6 py-14 lg:px-8"
    >
      <NuxtLink
        to="/services"
        class="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:underline"
      >
        <ArrowLeftIcon
          class="h-4 w-4"
          aria-hidden="true"
        />

        Back to Services
      </NuxtLink>

      <div
        class="mt-6 grid items-start gap-10 lg:grid-cols-[1fr_0.72fr]"
      >
        <div class="min-w-0">
          <TabGroup>
            <TabList
              class="mb-6 flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm sm:w-fit"
            >
              <Tab
                v-for="tab in tabs"
                :key="tab.label"
                v-slot="{ selected }"
                as="template"
              >
                <button
                  type="button"
                  class="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                  :class="
                    selected
                      ? 'bg-green-700 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  "
                >
                  <component
                    :is="tab.icon"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />

                  {{ tab.label }}
                </button>
              </Tab>
            </TabList>

            <TabPanels>
              <!-- New Request -->
              <TabPanel :unmount="false">
                <!-- Submission notice -->
                <div
                  id="submission-notice"
                  class="rounded-2xl border p-5 text-base leading-7"
                  :class="
                    authenticated
                      ? 'border-green-200 bg-green-50 text-green-950'
                      : 'border-blue-200 bg-blue-50 text-blue-950'
                  "
                >
                  <div class="flex items-start gap-3">
                    <UserCircleIcon
                      v-if="authenticated"
                      class="mt-0.5 h-5 w-5 shrink-0 text-green-700"
                    />

                    <InformationCircleIcon
                      v-else
                      class="mt-0.5 h-5 w-5 shrink-0 text-blue-700"
                    />

                    <div>
                      <p class="font-bold">
                        {{
                          authenticated
                            ? 'Submitting with your account'
                            : 'Submitting without an account'
                        }}
                      </p>

                      <p class="mt-1">
                        <span v-if="authenticated">
                          Your request will be linked to your account and will
                          also appear in My Requests.
                        </span>

                        <span v-else>
                          You can submit this request without signing in.
                          Keep the request code shown after submission because
                          you will need it to track the request.
                        </span>
                      </p>

                      <NuxtLink
                        v-if="!authenticated"
                        to="/login"
                        class="mt-2 inline-flex font-bold text-blue-800 underline"
                      >
                        Sign in instead
                      </NuxtLink>
                    </div>
                  </div>
                </div>

                <!-- Form -->
                <form
                  class="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                  aria-describedby="submission-notice"
                  @submit.prevent="submitRequest"
                >
                  <div
                    class="mb-6 flex items-start gap-4"
                  >
                    <div
                      class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700"
                    >
                      <DocumentPlusIcon
                        class="h-6 w-6"
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <h2
                        class="text-2xl font-bold text-slate-900"
                      >
                        Submit a print request
                      </h2>

                      <p
                        class="mt-2 text-sm leading-6 text-slate-600"
                      >
                        Enter the property details and contact information for
                        your SOA request.
                      </p>
                    </div>
                  </div>

                  <p class="text-sm text-slate-600">
                    All fields are required.
                  </p>

                  <!-- Property -->
                  <fieldset class="mt-6">
                    <legend
                      class="text-xl font-extrabold text-[#173a67]"
                    >
                      Property details
                    </legend>

                    <div
                      class="mt-5 grid gap-6 sm:grid-cols-2"
                    >
                      <!-- PIN -->
                      <div>
                        <label
                          for="soa-pin"
                          class="field-label"
                        >
                          Property Index Number (PIN)
                        </label>

                        <input
                          id="soa-pin"
                          v-model.trim="form.pin"
                          name="pin"
                          type="text"
                          inputmode="numeric"
                          maxlength="23"
                          required
                          placeholder="172-01-001-001-001"
                          class="field-input font-mono uppercase"
                          aria-describedby="pin-help"
                          :disabled="saving"
                          @input="handlePinInput"
                        />

                        <p
                          id="pin-help"
                          class="mt-2 text-sm leading-6 text-slate-500"
                        >
                          Accepted format:
                          <span class="font-mono font-semibold">
                            172-XX-XXX-XXX-XXX
                          </span>
                          or
                          <span class="font-mono font-semibold">
                            172-XX-XXX-XXX-XXX-XXXX
                          </span>.
                        </p>
                      </div>

                      <!-- Land owner -->
                      <div>
                        <label
                          for="soa-land-owner"
                          class="field-label"
                        >
                          Land owner's name
                        </label>

                        <input
                          id="soa-land-owner"
                          v-model.trim="form.land_owner"
                          name="landOwner"
                          type="text"
                          maxlength="300"
                          required
                          class="field-input"
                          :disabled="saving"
                          @input="clearMessage"
                        />
                      </div>
                    </div>
                  </fieldset>

                  <!-- Delivery -->
                  <fieldset
                    class="mt-8 border-t border-slate-200 pt-6"
                  >
                    <legend
                      class="pr-3 text-xl font-extrabold text-[#173a67]"
                    >
                      Delivery preference
                    </legend>

                    <p
                      class="text-sm leading-6 text-slate-600"
                    >
                      How would you like to receive your Statement of Account?
                    </p>

                    <div
                      class="mt-4 grid gap-3 sm:grid-cols-2"
                    >
                      <!-- Postal -->
                      <label
                        class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
                        :class="
                          deliveryMethod === 'POSTAL'
                            ? 'border-green-700 bg-green-50'
                            : 'border-slate-200 hover:border-slate-300'
                        "
                      >
                        <input
                          v-model="deliveryMethod"
                          type="radio"
                          name="deliveryMethod"
                          value="POSTAL"
                          required
                          class="mt-1 h-4 w-4 accent-green-700"
                          :disabled="saving"
                          @change="clearMessage"
                        />

                        <span>
                          <span
                            class="block text-sm font-bold text-slate-800"
                          >
                            Printed copy by postal mail
                          </span>

                          <span
                            class="mt-1 block text-sm leading-6 text-slate-600"
                          >
                            Send a printed copy to your mailing address.
                          </span>
                        </span>
                      </label>

                      <!-- Email -->
                      <label
                        class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
                        :class="
                          deliveryMethod === 'EMAIL'
                            ? 'border-green-700 bg-green-50'
                            : 'border-slate-200 hover:border-slate-300'
                        "
                      >
                        <input
                          v-model="deliveryMethod"
                          type="radio"
                          name="deliveryMethod"
                          value="EMAIL"
                          required
                          class="mt-1 h-4 w-4 accent-green-700"
                          :disabled="saving"
                          @change="clearMessage"
                        />

                        <span>
                          <span
                            class="block text-sm font-bold text-slate-800"
                          >
                            PDF file by email
                          </span>

                          <span
                            class="mt-1 block text-sm leading-6 text-slate-600"
                          >
                            Send a PDF copy to your email address.
                          </span>
                        </span>
                      </label>
                    </div>
                  </fieldset>

                  <!-- Requester -->
                  <fieldset
                    class="mt-8 border-t border-slate-200 pt-6"
                  >
                    <legend
                      class="pr-3 text-xl font-extrabold text-[#173a67]"
                    >
                      Requester details
                    </legend>

                    <div
                      class="grid gap-6 sm:grid-cols-2"
                    >
                      <!-- Requester -->
                      <div>
                        <label
                          for="soa-requester"
                          class="field-label"
                        >
                          Requester's name
                        </label>

                        <input
                          id="soa-requester"
                          v-model.trim="form.requester_name"
                          name="requesterName"
                          type="text"
                          maxlength="300"
                          autocomplete="name"
                          required
                          class="field-input"
                          :disabled="saving"
                          @input="clearMessage"
                        />
                      </div>

                      <!-- Email -->
                      <div>
                        <label
                          for="soa-email"
                          class="field-label"
                        >
                          Email address
                        </label>

                        <input
                          id="soa-email"
                          v-model.trim="form.email"
                          name="email"
                          type="email"
                          maxlength="255"
                          autocomplete="email"
                          required
                          class="field-input"
                          :disabled="saving"
                          @input="clearMessage"
                        />
                      </div>

                      <!-- Address -->
                      <div class="sm:col-span-2">
                        <label
                          for="soa-mailing-address"
                          class="field-label"
                        >
                          Mailing address
                        </label>

                        <textarea
                          id="soa-mailing-address"
                          v-model.trim="form.mailing_address"
                          name="mailingAddress"
                          autocomplete="street-address"
                          rows="3"
                          maxlength="1000"
                          required
                          class="field-input resize-y"
                          :disabled="saving"
                          @input="clearMessage"
                        ></textarea>
                      </div>
                    </div>
                  </fieldset>

                  <!-- Error -->
                  <div
                    v-if="message"
                    role="alert"
                    class="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4"
                  >
                    <div class="flex items-start gap-3">
                      <ExclamationCircleIcon
                        class="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                      />

                      <div>
                        <p class="font-bold text-red-900">
                          Request could not be submitted
                        </p>

                        <p
                          class="mt-1 text-sm leading-6 text-red-800"
                        >
                          {{ message }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Success -->
                  <div
                    v-if="savedCode"
                    role="status"
                    class="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5 text-green-900"
                  >
                    <div class="flex items-start gap-3">
                      <CheckCircleIcon
                        class="mt-0.5 h-6 w-6 shrink-0 text-green-700"
                      />

                      <div class="min-w-0">
                        <p class="font-bold">
                          Request saved successfully.
                        </p>

                        <p class="mt-2 text-sm leading-6">
                          Your request code is:
                        </p>

                        <p
                          class="mt-2 break-all font-mono text-xl font-black tracking-wide text-green-950"
                        >
                          {{ savedCode }}
                        </p>

                        <p class="mt-3 text-sm leading-6">
                          Status:
                          <strong>PENDING</strong>
                        </p>

                        <p
                          v-if="!authenticated"
                          class="mt-3 text-sm leading-6"
                        >
                          Keep this code in a safe place. Because this request
                          was submitted without an account, you will need the
                          request code to track it later.
                        </p>

                        <button
                          type="button"
                          class="mt-4 inline-flex items-center gap-2 rounded-xl border border-green-700 bg-white px-4 py-2 text-sm font-bold text-green-800 transition hover:bg-green-100"
                          @click="copySavedCode"
                        >
                          <ClipboardDocumentIcon
                            class="h-4 w-4"
                          />

                          {{
                            codeCopied
                              ? 'Copied'
                              : 'Copy request code'
                          }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Buttons -->
                  <div
                    class="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row"
                  >
                    <button
                      type="submit"
                      :disabled="
                        saving ||
                        !!savedCode
                      "
                      aria-describedby="submission-notice"
                      class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3.5 text-base font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 sm:w-auto"
                    >
                      <ArrowPathIcon
                        v-if="saving"
                        class="h-5 w-5 animate-spin"
                      />

                      <PaperAirplaneIcon
                        v-else
                        class="h-5 w-5"
                      />

                      {{
                        saving
                          ? 'Saving...'
                          : savedCode
                            ? 'Request saved'
                            : 'Submit Request'
                      }}
                    </button>

                    <button
                      v-if="savedCode"
                      type="button"
                      class="w-full rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-bold text-slate-700 transition hover:bg-slate-100 sm:w-auto"
                      @click="startAnotherRequest"
                    >
                      Submit another request
                    </button>
                  </div>
                </form>
              </TabPanel>

              <!-- Track -->
              <TabPanel
                :unmount="false"
                class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700"
                  >
                    <MagnifyingGlassIcon
                      class="h-6 w-6"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h2
                      class="text-2xl font-bold text-slate-900"
                    >
                      Track your request
                    </h2>

                    <p
                      class="mt-2 text-sm leading-6 text-slate-600"
                    >
                      Enter the request code provided when the SOA request was
                      submitted.
                    </p>
                  </div>
                </div>

                <div
                  id="tracking-notice"
                  class="mt-6 rounded-2xl border p-5 text-sm leading-6"
                  :class="
                    authenticated
                      ? 'border-green-200 bg-green-50 text-green-950'
                      : 'border-blue-200 bg-blue-50 text-blue-950'
                  "
                >
                  <span v-if="authenticated">
                    Requests submitted using your account will be checked
                    against your account. Public request codes can also be
                    checked when available.
                  </span>

                  <span v-else>
                    Enter the request code you received after submitting your
                    public SOA request. No account is required.
                  </span>
                </div>

                <form
                  class="mt-8"
                  @submit.prevent="trackRequest"
                >
                  <label
                    for="soa-request-code"
                    class="field-label"
                  >
                    Request code
                  </label>

                  <input
                    id="soa-request-code"
                    v-model.trim="trackingCode"
                    name="requestCode"
                    type="text"
                    maxlength="14"
                    autocomplete="off"
                    placeholder="Example: SOA-XXXXXXXXXX"
                    class="field-input font-mono uppercase"
                    aria-describedby="tracking-notice"
                    :disabled="tracking"
                    @input="handleTrackingCodeInput"
                  />

                  <p
                    class="mt-2 text-sm text-slate-500"
                  >
                    Enter the complete request code exactly as provided after
                    submission.
                  </p>

                  <button
                    type="submit"
                    :disabled="
                      tracking ||
                      !trackingCode.trim()
                    "
                    aria-describedby="tracking-notice"
                    class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3.5 text-base font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 sm:w-auto"
                  >
                    <ArrowPathIcon
                      v-if="tracking"
                      class="h-5 w-5 animate-spin"
                    />

                    <MagnifyingGlassIcon
                      v-else
                      class="h-5 w-5"
                    />

                    {{
                      tracking
                        ? 'Checking...'
                        : 'Check request status'
                    }}
                  </button>

                  <!-- Tracking result -->
                  <div
                    v-if="trackingResult"
                    class="mt-6 overflow-hidden rounded-2xl border border-slate-200"
                  >
                    <div
                      class="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p
                          class="text-xs font-bold uppercase tracking-[0.1em] text-slate-500"
                        >
                          Request
                        </p>

                        <p
                          class="mt-1 font-mono font-bold text-[#173a67]"
                        >
                          {{ trackingResult.request_code }}
                        </p>
                      </div>

                      <span
                        class="inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-bold"
                        :class="
                          statusColor(
                            trackingResult.status,
                          )
                        "
                      >
                        {{
                          formatStatus(
                            trackingResult.status,
                          )
                        }}
                      </span>
                    </div>

                    <div class="p-5">
                      <dl
                        class="grid gap-5 text-sm sm:grid-cols-2"
                      >
                        <div>
                          <dt class="detail-label">
                            Request type
                          </dt>

                          <dd class="detail-value">
                            Statement of Account
                          </dd>
                        </div>

                        <div>
                          <dt class="detail-label">
                            PIN
                          </dt>

                          <dd
                            class="detail-value font-mono"
                          >
                            {{
                              trackingResult.pin ||
                              'Not provided'
                            }}
                          </dd>
                        </div>

                        <div>
                          <dt class="detail-label">
                            Delivery
                          </dt>

                          <dd class="detail-value">
                            {{
                              deliveryLabel(
                                trackingResult.delivery_preference,
                              )
                            }}
                          </dd>
                        </div>

                        <div>
                          <dt class="detail-label">
                            Date requested
                          </dt>

                          <dd class="detail-value">
                            {{
                              formatDate(
                                trackingResult.requested_at,
                              )
                            }}
                          </dd>
                        </div>

                        <div class="sm:col-span-2">
                          <dt class="detail-label">
                            Latest update
                          </dt>

                          <dd class="detail-value">
                            {{
                              trackingResult.remarks ||
                              defaultRemark(
                                trackingResult.status,
                              )
                            }}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <!-- Tracking error -->
                  <div
                    v-if="trackingMessage"
                    role="status"
                    class="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                  >
                    {{ trackingMessage }}
                  </div>
                </form>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>

        <!-- Sidebar -->
        <aside
          class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-800"
          >
            <InformationCircleIcon
              class="h-6 w-6"
              aria-hidden="true"
            />
          </div>

          <h2 class="mt-5 text-xl font-bold text-slate-900">
            How it works
          </h2>

          <p class="mt-2 text-sm leading-6 text-slate-600">
            You may submit a request with or without an account.
          </p>

          <ol class="mt-6 space-y-6">
            <li
              v-for="(instruction, index) in instructions"
              :key="instruction.title"
              class="flex gap-4"
            >
              <span
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white"
              >
                {{ index + 1 }}
              </span>

              <div>
                <h3 class="font-bold text-slate-900">
                  {{ instruction.title }}
                </h3>

                <p
                  class="mt-1 text-sm leading-6 text-slate-600"
                >
                  {{ instruction.description }}
                </p>
              </div>
            </li>
          </ol>

          <div
            class="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5"
          >
            <p class="font-bold text-amber-900">
              Important
            </p>

            <p
              class="mt-1 text-sm leading-6 text-amber-800"
            >
              Submitting a request does not automatically approve or print the
              Statement of Account. Requests are subject to review by the City
              Treasurer's Office.
            </p>
          </div>

          <div
            class="mt-8 border-t border-slate-200 pt-6"
          >
            <h3 class="font-bold text-slate-900">
              Request statuses
            </h3>

            <div class="mt-4 space-y-4">
              <div
                v-for="status in statuses"
                :key="status.label"
              >
                <span
                  class="inline-flex rounded-full px-3 py-1 text-xs font-bold"
                  :class="status.color"
                >
                  {{ status.label }}
                </span>

                <p
                  class="mt-1 text-sm leading-6 text-slate-600"
                >
                  {{ status.description }}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </PublicPageShell>
</template>

<script setup lang="ts">
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/vue'

import {
  ArrowLeftIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  DocumentPlusIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'

type DeliveryPreference =
  | 'POSTAL'
  | 'EMAIL'

interface AuthenticatedUser {
  id?: string
  username?: string
  fname?: string
  mname?: string | null
  lname?: string
  email?: string
  mailing_address?: string | null
}

interface MeResponse {
  data?: AuthenticatedUser
}

interface UserRequestData {
  id?: string

  request_code?: string

  request_type?:
    | 'SOA_PRINT'
    | 'TAX_CLEARANCE'

  delivery_preference?:
    | DeliveryPreference
    | null

  pin?: string | null

  land_owner?: string | null

  requester_name?: string | null

  mailing_address?: string | null

  email?: string | null

  status?: string

  remarks?: string | null

  requested_at?: string | null

  created_at?: string | null

  updated_at?: string | null
}

interface UserRequestResponse {
  data?: UserRequestData
  message?: string
}

const config =
  useRuntimeConfig()

const authenticated =
  ref(false)

const saving =
  ref(false)

const savedCode =
  ref('')

const message =
  ref('')

const trackingCode =
  ref('')

const tracking =
  ref(false)

const trackingMessage =
  ref('')

const trackingResult =
  ref<UserRequestData | null>(
    null,
  )

const deliveryMethod =
  ref<DeliveryPreference>(
    'POSTAL',
  )

const codeCopied =
  ref(false)

const form = reactive({
  pin:
    '',

  land_owner:
    '',

  requester_name:
    '',

  mailing_address:
    '',

  email:
    '',
})

/*
|--------------------------------------------------------------------------
| API Helpers
|--------------------------------------------------------------------------
*/

function getApiBaseUrl():
  string {
  return String(
    config.public.apiBaseUrl ||
    '',
  ).replace(
    /\/+$/,
    '',
  )
}

function getToken():
  string {
  if (
    !import.meta.client
  ) {
    return ''
  }

  return (
    localStorage.getItem(
      '_token',
    ) ||
    ''
  )
}

function authHeaders():
  Record<string, string> {
  const token =
    getToken()

  return {
    Accept:
      'application/json',

    ...(token
      ? {
          Authorization:
            `Bearer ${token}`,
        }
      : {}),
  }
}

function publicHeaders():
  Record<string, string> {
  return {
    Accept:
      'application/json',
  }
}

function logoutLocal():
  void {
  authenticated.value =
    false

  if (
    import.meta.client
  ) {
    localStorage.removeItem(
      '_token',
    )
  }
}

/*
|--------------------------------------------------------------------------
| User
|--------------------------------------------------------------------------
*/

function getFullName(
  user: AuthenticatedUser,
):
  string {
  const name = [
    user.fname,
    user.mname,
    user.lname,
  ]
    .filter(
      value =>
        typeof value ===
          'string' &&
        value.trim() !== '',
    )
    .join(' ')
    .trim()

  return (
    name ||
    user.username ||
    ''
  )
}

/*
|--------------------------------------------------------------------------
| PIN Validation
|--------------------------------------------------------------------------
*/

function normalizePin(
  value: string,
):
  string {
  return value
    .trim()
    .toUpperCase()
}

function handlePinInput():
  void {
  form.pin =
    form.pin
      .replace(
        /[^0-9-]/g,
        '',
      )
      .slice(
        0,
        23,
      )

  clearMessage()
}

function isValidPin(
  value: string,
):
  boolean {
  return /^172-\d{2}-\d{3}-\d{3}-\d{3}(?:-\d{4})?$/.test(
    value,
  )
}

/*
|--------------------------------------------------------------------------
| Page Initialization
|--------------------------------------------------------------------------
*/

onMounted(
  async () => {
    const apiBaseUrl =
      getApiBaseUrl()

    const token =
      getToken()

    /*
     * No token:
     * stay in anonymous/public mode.
     */
    if (
      !apiBaseUrl ||
      !token
    ) {
      authenticated.value =
        false

      return
    }

    try {
      const response =
        await $fetch<MeResponse>(
          `${apiBaseUrl}/me`,
          {
            method:
              'GET',

            headers:
              authHeaders(),
          },
        )

      if (
        !response?.data
      ) {
        logoutLocal()

        return
      }

      authenticated.value =
        true

      form.requester_name =
        getFullName(
          response.data,
        )

      form.mailing_address =
        response.data
          .mailing_address ||
        ''

      form.email =
        response.data.email ||
        ''

    } catch (
      error: any
    ) {
      const status =
        error?.statusCode ??
        error?.status ??
        error?.response?.status

      if (
        status === 401
      ) {
        logoutLocal()

        return
      }

      /*
       * If /me cannot be reached,
       * permit use of the public request form.
       */
      authenticated.value =
        false
    }
  },
)

/*
|--------------------------------------------------------------------------
| Submit
|--------------------------------------------------------------------------
*/

function validateForm():
  string | null {
  const pin =
    normalizePin(
      form.pin,
    )

  if (!pin) {
    return 'Property Index Number is required.'
  }

  if (
    !isValidPin(
      pin,
    )
  ) {
    return 'Enter a valid PIN using 172-XX-XXX-XXX-XXX or 172-XX-XXX-XXX-XXX-XXXX.'
  }

  if (
    !form.land_owner.trim()
  ) {
    return 'Land owner name is required.'
  }

  if (
    !form.requester_name.trim()
  ) {
    return 'Requester name is required.'
  }

  if (
    !form.email.trim()
  ) {
    return 'Email address is required.'
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (
    !emailPattern.test(
      form.email.trim(),
    )
  ) {
    return 'Enter a valid email address.'
  }

  if (
    !form.mailing_address.trim()
  ) {
    return 'Mailing address is required.'
  }

  return null
}

function clearMessage():
  void {
  message.value =
    ''
}

async function submitRequest():
  Promise<void> {
  if (
    saving.value ||
    savedCode.value
  ) {
    return
  }

  const apiBaseUrl =
    getApiBaseUrl()

  if (!apiBaseUrl) {
    message.value =
      'The application API is not configured.'

    return
  }

  const validationError =
    validateForm()

  if (
    validationError
  ) {
    message.value =
      validationError

    return
  }

  saving.value =
    true

  message.value =
    ''

  codeCopied.value =
    false

  try {
    const payload = {
      pin:
        normalizePin(
          form.pin,
        ),

      land_owner:
        form.land_owner
          .trim(),

      requester_name:
        form.requester_name
          .trim(),

      mailing_address:
        form.mailing_address
          .trim(),

      email:
        form.email
          .trim()
          .toLowerCase(),

      delivery_preference:
        deliveryMethod.value,
    }

    /*
     * Signed-in:
     * POST /api/user-requests/soa
     *
     * Anonymous:
     * POST /api/public-requests/soa
     */
    const endpoint =
      authenticated.value
        ? `${apiBaseUrl}/user-requests/soa`
        : `${apiBaseUrl}/public-requests/soa`

    const response =
      await $fetch<UserRequestResponse>(
        endpoint,
        {
          method:
            'POST',

          headers:
            authenticated.value
              ? authHeaders()
              : publicHeaders(),

          body:
            payload,
        },
      )

    const requestCode =
      response?.data
        ?.request_code
        ?.trim()
        .toUpperCase()

    if (
      !requestCode
    ) {
      throw new Error(
        'The server did not return a request code.',
      )
    }

    savedCode.value =
      requestCode

    trackingCode.value =
      requestCode

  } catch (
    error: any
  ) {
    const status =
      error?.statusCode ??
      error?.status ??
      error?.response?.status

    const responseData =
      error?.data ??
      error?.response?._data

    console.error(
      'SOA REQUEST SUBMIT ERROR:',
      error,
    )

    if (
      status === 401
    ) {
      /*
       * The stored login token may have expired.
       *
       * Do not automatically convert a request
       * already attempted as authenticated into
       * an anonymous request. The user can retry.
       */
      logoutLocal()

      message.value =
        'Your login session has expired. Please submit the form again to continue without signing in, or sign in again.'

      return
    }

    if (
      status === 403
    ) {
      message.value =
        responseData?.message ||
        'You do not have permission to submit this request.'

      return
    }

    if (
      status === 400 ||
      status === 422
    ) {
      const errors =
        responseData?.errors

      if (
        errors &&
        typeof errors ===
          'object'
      ) {
        const firstError =
          Object.values(
            errors,
          )
            .flat()
            .find(
              value =>
                typeof value ===
                'string',
            )

        message.value =
          String(
            firstError ||
            responseData?.message ||
            'Please review the information you entered.',
          )
      } else {
        message.value =
          responseData?.message ||
          'Please review the information you entered.'
      }

      return
    }

    if (
      status === 429
    ) {
      message.value =
        'Too many requests have been submitted. Please wait before trying again.'

      return
    }

    if (
      status === 502 ||
      status === 503 ||
      (
        status &&
        status >= 500
      )
    ) {
      message.value =
        'The request service is temporarily unavailable. Please try again later.'

      return
    }

    message.value =
      responseData?.message ||
      responseData?.error ||
      error?.message ||
      'Unable to save the request. Please try again.'

  } finally {
    saving.value =
      false
  }
}

/*
|--------------------------------------------------------------------------
| Copy Request Code
|--------------------------------------------------------------------------
*/

async function copySavedCode():
  Promise<void> {
  if (
    !savedCode.value ||
    !import.meta.client
  ) {
    return
  }

  try {
    await navigator
      .clipboard
      .writeText(
        savedCode.value,
      )

    codeCopied.value =
      true

    window.setTimeout(
      () => {
        codeCopied.value =
          false
      },
      2000,
    )

  } catch {
    message.value =
      'The request code could not be copied automatically.'
  }
}

/*
|--------------------------------------------------------------------------
| New Request
|--------------------------------------------------------------------------
*/

function startAnotherRequest():
  void {
  savedCode.value =
    ''

  message.value =
    ''

  codeCopied.value =
    false

  form.pin =
    ''

  form.land_owner =
    ''

  /*
   * Keep requester information populated
   * because the same person may submit
   * another SOA request.
   */
}

/*
|--------------------------------------------------------------------------
| Tracking
|--------------------------------------------------------------------------
*/

function normalizeRequestCode(
  value: string,
):
  string {
  return value
    .trim()
    .toUpperCase()
    .replace(
      /[^A-Z0-9-]/g,
      '',
    )
    .slice(
      0,
      20,
    )
}

function handleTrackingCodeInput():
  void {
  trackingCode.value =
    normalizeRequestCode(
      trackingCode.value,
    )

  trackingMessage.value =
    ''

  trackingResult.value =
    null
}

async function trackAuthenticatedRequest(
  apiBaseUrl: string,
  code: string,
):
  Promise<UserRequestData | null> {
  try {
    const response =
      await $fetch<UserRequestResponse>(
        `${apiBaseUrl}/user-requests/${encodeURIComponent(code)}`,
        {
          method:
            'GET',

          headers:
            authHeaders(),
        },
      )

    return (
      response?.data ||
      null
    )

  } catch (
    error: any
  ) {
    const status =
      error?.statusCode ??
      error?.status ??
      error?.response?.status

    /*
     * 404 means this may be an anonymous
     * public request code, so allow fallback.
     */
    if (
      status === 404
    ) {
      return null
    }

    if (
      status === 401
    ) {
      logoutLocal()

      return null
    }

    throw error
  }
}

async function trackPublicRequest(
  apiBaseUrl: string,
  code: string,
):
  Promise<UserRequestData | null> {
  try {
    const response =
      await $fetch<UserRequestResponse>(
        `${apiBaseUrl}/public-requests/${encodeURIComponent(code)}`,
        {
          method:
            'GET',

          headers:
            publicHeaders(),
        },
      )

    return (
      response?.data ||
      null
    )

  } catch (
    error: any
  ) {
    const status =
      error?.statusCode ??
      error?.status ??
      error?.response?.status

    if (
      status === 404
    ) {
      return null
    }

    throw error
  }
}

async function trackRequest():
  Promise<void> {
  if (
    tracking.value ||
    !trackingCode.value.trim()
  ) {
    return
  }

  const apiBaseUrl =
    getApiBaseUrl()

  if (
    !apiBaseUrl
  ) {
    trackingMessage.value =
      'The application API is not configured.'

    return
  }

  const code =
    normalizeRequestCode(
      trackingCode.value,
    )

  trackingCode.value =
    code

  if (!code) {
    trackingMessage.value =
      'Enter a request code.'

    return
  }

  tracking.value =
    true

  trackingMessage.value =
    ''

  trackingResult.value =
    null

  try {
    let request:
      UserRequestData |
      null =
      null

    /*
     * If signed in, first search the account's
     * requests.
     */
    if (
      authenticated.value
    ) {
      request =
        await trackAuthenticatedRequest(
          apiBaseUrl,
          code,
        )
    }

    /*
     * If not found, try anonymous/public
     * requests.
     */
    if (!request) {
      request =
        await trackPublicRequest(
          apiBaseUrl,
          code,
        )
    }

    if (!request) {
      trackingMessage.value =
        'No SOA request with that code was found.'

      return
    }

    /*
     * Prevent a Tax Clearance code from being
     * displayed on the SOA tracking page.
     */
    if (
      request.request_type &&
      request.request_type !==
        'SOA_PRINT'
    ) {
      trackingMessage.value =
        'The request code belongs to a different service.'

      return
    }

    trackingResult.value =
      request

  } catch (
    error: any
  ) {
    const status =
      error?.statusCode ??
      error?.status ??
      error?.response?.status

    const responseData =
      error?.data ??
      error?.response?._data

    console.error(
      'SOA TRACKING ERROR:',
      error,
    )

    if (
      status === 429
    ) {
      trackingMessage.value =
        'Too many tracking requests. Please wait before trying again.'

      return
    }

    trackingMessage.value =
      responseData?.message ||
      responseData?.error ||
      error?.message ||
      'Request tracking is currently unavailable.'

  } finally {
    tracking.value =
      false
  }
}

/*
|--------------------------------------------------------------------------
| Display Helpers
|--------------------------------------------------------------------------
*/

function formatStatus(
  status:
    | string
    | undefined,
):
  string {
  return (
    status
      ?.trim()
      .replaceAll(
        '_',
        ' ',
      )
      .toUpperCase() ||
    'UNKNOWN'
  )
}

function statusColor(
  status:
    | string
    | undefined,
):
  string {
  const normalized =
    formatStatus(
      status,
    )

  const colors:
    Record<
      string,
      string
    > = {
      PENDING:
        'bg-amber-100 text-amber-800',

      'FOR REVIEW':
        'bg-blue-100 text-blue-800',

      APPROVED:
        'bg-emerald-100 text-emerald-800',

      'READY FOR PRINTING':
        'bg-violet-100 text-violet-800',

      PAID:
        'bg-cyan-100 text-cyan-800',

      COMPLETED:
        'bg-green-100 text-green-800',

      REJECTED:
        'bg-red-100 text-red-800',

      CANCELLED:
        'bg-slate-200 text-slate-800',
    }

  return (
    colors[normalized] ||
    'bg-slate-200 text-slate-800'
  )
}

function defaultRemark(
  status:
    | string
    | undefined,
):
  string {
  switch (
    formatStatus(
      status,
    )
  ) {
    case 'PENDING':
      return 'Your request has been received and is awaiting review.'

    case 'FOR REVIEW':
      return 'Your request is currently being reviewed.'

    case 'APPROVED':
      return 'Your request has been approved.'

    case 'READY FOR PRINTING':
      return 'Your Statement of Account is ready for printing or delivery.'

    case 'PAID':
      return 'Payment has been recorded for this request.'

    case 'COMPLETED':
      return 'Your request has been completed.'

    case 'REJECTED':
      return 'Your request was not approved.'

    case 'CANCELLED':
      return 'Your request has been cancelled.'

    default:
      return 'No additional update is available.'
  }
}

function deliveryLabel(
  delivery:
    | string
    | null
    | undefined,
):
  string {
  switch (
    delivery
      ?.trim()
      .toUpperCase()
  ) {
    case 'POSTAL':
      return 'Printed copy by postal mail'

    case 'EMAIL':
      return 'PDF file by email'

    default:
      return 'Not provided'
  }
}

function formatDate(
  value:
    | string
    | null
    | undefined,
):
  string {
  if (!value) {
    return 'Not provided'
  }

  const date =
    new Date(
      value,
    )

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return value
  }

  return new Intl.DateTimeFormat(
    'en-PH',
    {
      year:
        'numeric',

      month:
        'long',

      day:
        'numeric',

      hour:
        'numeric',

      minute:
        '2-digit',

      timeZone:
        'Asia/Manila',
    },
  ).format(
    date,
  )
}

/*
|--------------------------------------------------------------------------
| UI Data
|--------------------------------------------------------------------------
*/

const tabs = [
  {
    label:
      'New request',

    icon:
      DocumentPlusIcon,
  },

  {
    label:
      'Track request',

    icon:
      MagnifyingGlassIcon,
  },
]

const instructions = [
  {
    title:
      'Enter the property details',

    description:
      'Provide the PIN and the name of the land owner.',
  },

  {
    title:
      'Choose delivery and provide your details',

    description:
      'Choose postal delivery or email, then provide your name, mailing address, and email address.',
  },

  {
    title:
      'Save your request code',

    description:
      'Keep the request code provided after submission, especially when submitting without an account.',
  },

  {
    title:
      'Track the request',

    description:
      'Use the Track request tab and your request code to check the current status.',
  },
]

const statuses = [
  {
    label:
      'PENDING',

    description:
      'The request was received and is awaiting review.',

    color:
      'bg-amber-100 text-amber-800',
  },

  {
    label:
      'FOR REVIEW',

    description:
      'The request is being checked by the office.',

    color:
      'bg-blue-100 text-blue-800',
  },

  {
    label:
      'APPROVED',

    description:
      'The request was approved for processing.',

    color:
      'bg-emerald-100 text-emerald-800',
  },

  {
    label:
      'READY FOR PRINTING',

    description:
      'The requested document is ready for printing.',

    color:
      'bg-violet-100 text-violet-800',
  },

  {
    label:
      'PAID',

    description:
      'Payment for the request has been recorded.',

    color:
      'bg-cyan-100 text-cyan-800',
  },

  {
    label:
      'COMPLETED',

    description:
      'The request has been completed.',

    color:
      'bg-green-100 text-green-800',
  },

  {
    label:
      'REJECTED',

    description:
      'The request was not approved.',

    color:
      'bg-red-100 text-red-800',
  },

  {
    label:
      'CANCELLED',

    description:
      'The request was cancelled.',

    color:
      'bg-slate-200 text-slate-800',
  },
]
</script>

<style scoped>
.soa-header-gradient {
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

.field-label {
  @apply block text-sm font-bold text-slate-700;
}

.field-input {
  @apply mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-green-700 focus:ring-4 focus:ring-green-700/10 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500;
}

.detail-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(100 116 139);
}

.detail-value {
  margin-top: 0.35rem;
  overflow-wrap: anywhere;
  font-weight: 700;
  color: rgb(15 23 42);
}
</style>