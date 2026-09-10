<template>
  <div class="min-h-screen bg-slate-50">
    <Head>
      <Title>
        Tax Clearance Print Request | City Treasurer's Office
      </Title>

      <Meta
        name="description"
        content="Submit and track a request for tax clearance printing."
      />
    </Head>

    <!-- Page Header -->
    <section class="relative overflow-hidden bg-slate-950">
      <div class="absolute inset-0 request-header-gradient"></div>

      <div
        class="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-green-500/20 blur-3xl"
      ></div>

      <div
        class="absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl"
      ></div>

      <div
        class="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8"
      >
        <NuxtLink
          to="/services"
          class="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
        >
          <ArrowLeftIcon class="h-4 w-4" />

          Back to services
        </NuxtLink>

        <div class="max-w-3xl">
          <div
            class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
          >
            <PrinterIcon class="h-4 w-4 text-emerald-300" />

            <span
              class="text-xs font-semibold uppercase tracking-[0.18em] text-white/90"
            >
              Online Tax Clearance Service
            </span>
          </div>

          <h1
            class="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Request Tax Clearance Print
          </h1>

          <p
            class="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            Submit a print request for one or more property identification
            numbers, or use your request code to check the current status.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-[1fr_0.72fr]">
        <section>
          <!-- Tabs -->
          <div
            class="mb-6 inline-flex w-full rounded-2xl border border-slate-200 bg-white p-1 shadow-sm sm:w-auto"
          >
            <button
              type="button"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition sm:flex-none"
              :class="
                activeTab === 'submit'
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              "
              @click="switchTab('submit')"
            >
              <DocumentPlusIcon class="h-5 w-5" />

              New request
            </button>

            <button
              type="button"
              class="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition sm:flex-none"
              :class="
                activeTab === 'track'
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              "
              @click="switchTab('track')"
            >
              <MagnifyingGlassIcon class="h-5 w-5" />

              Track request
            </button>
          </div>

          <!-- New Request Form -->
          <section
            v-if="activeTab === 'submit'"
            class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700"
              >
                <DocumentPlusIcon class="h-6 w-6" />
              </div>

              <div>
                <h2 class="text-2xl font-bold text-slate-900">
                  Submit a print request
                </h2>

                <p class="mt-2 text-sm leading-relaxed text-slate-600">
                  Provide your contact details and enter all PINs that should
                  appear in the tax clearance request.
                </p>
              </div>
            </div>

            <form
              class="mt-8 space-y-7"
              @submit.prevent="submitRequest"
            >
              <!-- Requestee Name -->
              <div>
                <label
                  for="requesteeName"
                  class="block text-sm font-bold text-slate-800"
                >
                  Name of requestee
                </label>

                <div class="relative mt-2">
                  <UserIcon
                    class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="requesteeName"
                    v-model.trim="form.requesteeName"
                    type="text"
                    maxlength="300"
                    autocomplete="name"
                    placeholder="Enter complete name"
                    class="form-input pl-12"
                    :disabled="isSubmitting"
                    @input="clearSubmitMessages"
                  />
                </div>
              </div>

              <!-- Mailing Address -->
              <div>
                <label
                  for="mailingAddress"
                  class="block text-sm font-bold text-slate-800"
                >
                  Mailing address
                </label>

                <div class="relative mt-2">
                  <MapPinIcon
                    class="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-400"
                  />

                  <textarea
                    id="mailingAddress"
                    v-model.trim="form.mailingAddress"
                    rows="4"
                    maxlength="1000"
                    autocomplete="street-address"
                    placeholder="Enter complete mailing address"
                    class="form-input resize-y pl-12"
                    :disabled="isSubmitting"
                    @input="clearSubmitMessages"
                  ></textarea>
                </div>
              </div>

              <!-- Email -->
              <div>
                <label
                  for="emailAddress"
                  class="block text-sm font-bold text-slate-800"
                >
                  Email address
                </label>

                <div class="relative mt-2">
                  <EnvelopeIcon
                    class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="emailAddress"
                    v-model.trim="form.emailAddress"
                    type="email"
                    maxlength="320"
                    autocomplete="email"
                    placeholder="name@example.com"
                    class="form-input pl-12"
                    :disabled="isSubmitting"
                    @input="clearSubmitMessages"
                  />
                </div>

                <p class="mt-2 text-xs leading-relaxed text-slate-500">
                  Keep your request code. It will be required to check your
                  request status.
                </p>
              </div>

              <!-- PINs -->
              <div>
                <div
                  class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
                >
                  <div>
                    <label
                      for="pinInput"
                      class="block text-sm font-bold text-slate-800"
                    >
                      Property Identification Numbers
                    </label>

                    <p class="mt-1 text-xs text-slate-500">
                      Add one or more PINs. A maximum of 50 PINs is allowed.
                    </p>
                  </div>

                  <span
                    class="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
                  >
                    {{ form.pins.length }} / 50 PINs
                  </span>
                </div>

                <div
                  class="mt-3 flex flex-col gap-3 sm:flex-row"
                >
                  <div class="relative flex-1">
                    <HashtagIcon
                      class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="pinInput"
                      v-model.trim="pinInput"
                      type="text"
                      autocomplete="off"
                      placeholder="Example: 0124-01-001-001-001"
                      class="form-input pl-12 font-mono uppercase"
                      :disabled="isSubmitting || form.pins.length >= 50"
                      @keydown.enter.prevent="addPin"
                      @input="pinMessage = ''"
                    />
                  </div>

                  <button
                    type="button"
                    class="inline-flex items-center justify-center gap-2 rounded-2xl border border-green-700 bg-white px-5 py-4 font-bold text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                    :disabled="isSubmitting || form.pins.length >= 50"
                    @click="addPin"
                  >
                    <PlusIcon class="h-5 w-5" />

                    Add PIN
                  </button>
                </div>

                <div
                  v-if="pinMessage"
                  class="mt-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3"
                >
                  <ExclamationTriangleIcon
                    class="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
                  />

                  <p class="text-sm text-amber-800">
                    {{ pinMessage }}
                  </p>
                </div>

                <div
                  v-if="form.pins.length > 0"
                  class="mt-4 overflow-hidden rounded-2xl border border-slate-200"
                >
                  <div
                    class="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-3"
                  >
                    <span
                      class="text-xs font-bold uppercase tracking-[0.08em] text-slate-600"
                    >
                      Added PINs
                    </span>

                    <button
                      type="button"
                      class="text-xs font-bold text-red-600 transition hover:text-red-800"
                      :disabled="isSubmitting"
                      @click="clearPins"
                    >
                      Remove all
                    </button>
                  </div>

                  <ul>
                    <li
                      v-for="(pin, index) in form.pins"
                      :key="pin"
                      class="flex items-center justify-between gap-4 px-4 py-3"
                      :class="
                        index < form.pins.length - 1
                          ? 'border-b border-slate-200'
                          : ''
                      "
                    >
                      <div class="flex min-w-0 items-center gap-3">
                        <span
                          class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700"
                        >
                          {{ index + 1 }}
                        </span>

                        <span
                          class="break-all font-mono text-sm font-bold text-slate-800"
                        >
                          {{ pin }}
                        </span>
                      </div>

                      <button
                        type="button"
                        class="shrink-0 rounded-full p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        :aria-label="`Remove ${pin}`"
                        :disabled="isSubmitting"
                        @click="removePin(index)"
                      >
                        <TrashIcon class="h-5 w-5" />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Submit validation -->
              <div
                v-if="submitValidationMessage"
                class="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4"
              >
                <ExclamationTriangleIcon
                  class="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                />

                <p class="text-sm text-amber-800">
                  {{ submitValidationMessage }}
                </p>
              </div>

              <!-- Submit error -->
              <div
                v-if="submitError"
                class="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
              >
                <ExclamationCircleIcon
                  class="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                />

                <div>
                  <p class="font-bold text-red-800">
                    Request could not be submitted
                  </p>

                  <p class="mt-1 text-sm text-red-700">
                    {{ submitError }}
                  </p>
                </div>
              </div>

              <div
                class="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row"
              >
                <button
                  type="submit"
                  class="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-700 px-6 py-4 font-bold text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-0.5 hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  :disabled="isSubmitting"
                >
                  <ArrowPathIcon
                    v-if="isSubmitting"
                    class="h-5 w-5 animate-spin"
                  />

                  <PaperAirplaneIcon
                    v-else
                    class="h-5 w-5"
                  />

                  {{
                    isSubmitting
                      ? 'Submitting request...'
                      : 'Submit print request'
                  }}
                </button>

                <button
                  type="button"
                  class="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-4 font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  :disabled="isSubmitting"
                  @click="resetSubmitForm"
                >
                  <ArrowPathIcon class="h-5 w-5" />

                  Reset form
                </button>
              </div>
            </form>
          </section>

          <!-- Successful submission -->
          <Transition name="result">
            <section
              v-if="submittedRequest"
              class="mt-8 overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-sm"
            >
              <div
                class="flex flex-col gap-5 bg-emerald-50 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
                  >
                    <CheckCircleIcon class="h-8 w-8" />
                  </div>

                  <div>
                    <p
                      class="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700"
                    >
                      Request submitted
                    </p>

                    <h2 class="mt-1 text-2xl font-bold text-emerald-950">
                      Save your request code
                    </h2>
                  </div>
                </div>

                <span
                  class="inline-flex w-fit rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-white"
                >
                  {{ submittedRequest.status }}
                </span>
              </div>

              <div class="p-6 sm:p-8">
                <div
                  class="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center"
                >
                  <p
                    class="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700"
                  >
                    Request code
                  </p>

                  <p
                    class="mt-3 break-all font-mono text-3xl font-black tracking-[0.12em] text-emerald-950 sm:text-4xl"
                  >
                    {{ submittedRequest.requestCode }}
                  </p>

                  <p class="mt-4 text-sm leading-relaxed text-emerald-800">
                    Keep this code in a safe place. It is required to track the
                    status of your request.
                  </p>

                  <button
                    type="button"
                    class="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
                    @click="copyRequestCode"
                  >
                    <ClipboardDocumentIcon class="h-5 w-5" />

                    {{
                      codeCopied
                        ? 'Copied'
                        : 'Copy request code'
                    }}
                  </button>
                </div>

                <dl
                  class="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2"
                >
                  <div class="detail-item">
                    <dt class="detail-label">
                      Status
                    </dt>

                    <dd class="detail-value">
                      {{ submittedRequest.status }}
                    </dd>
                  </div>

                  <div class="detail-item">
                    <dt class="detail-label">
                      Number of PINs
                    </dt>

                    <dd class="detail-value">
                      {{ submittedRequest.pinCount }}
                    </dd>
                  </div>

                  <div class="detail-item sm:col-span-2">
                    <dt class="detail-label">
                      Date submitted
                    </dt>

                    <dd class="detail-value">
                      {{ formatDate(submittedRequest.requestedOn) }}
                    </dd>
                  </div>
                </dl>

                <div
                  class="mt-7 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row"
                >
                  <button
                    type="button"
                    class="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                    @click="trackSubmittedRequest"
                  >
                    <MagnifyingGlassIcon class="h-4 w-4" />

                    Track this request
                  </button>

                  <button
                    type="button"
                    class="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                    @click="startNewRequest"
                  >
                    <DocumentPlusIcon class="h-4 w-4" />

                    Submit another request
                  </button>
                </div>
              </div>
            </section>
          </Transition>

          <!-- Track Request -->
          <section
            v-if="activeTab === 'track'"
            class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700"
              >
                <MagnifyingGlassIcon class="h-6 w-6" />
              </div>

              <div>
                <h2 class="text-2xl font-bold text-slate-900">
                  Track your request
                </h2>

                <p class="mt-2 text-sm leading-relaxed text-slate-600">
                  Enter the 10-character request code received after submitting
                  your tax clearance print request.
                </p>
              </div>
            </div>

            <form
              class="mt-8"
              @submit.prevent="trackRequest"
            >
              <label
                for="requestCode"
                class="block text-sm font-bold text-slate-800"
              >
                Request code
              </label>

              <div class="relative mt-2">
                <KeyIcon
                  class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="requestCode"
                  v-model.trim="trackingCode"
                  type="text"
                  maxlength="10"
                  autocomplete="off"
                  placeholder="Example: 8RFK-3ZQ_T"
                  class="form-input pl-12 pr-12 font-mono uppercase tracking-widest"
                  :disabled="isTracking"
                  @input="handleTrackingCodeInput"
                />

                <button
                  v-if="trackingCode"
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Clear request code"
                  :disabled="isTracking"
                  @click="clearTracking"
                >
                  <XMarkIcon class="h-5 w-5" />
                </button>
              </div>

              <p class="mt-2 text-xs text-slate-500">
                Request codes contain 10 letters, numbers, hyphens, or
                underscores.
              </p>

              <div
                v-if="trackingValidationMessage"
                class="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4"
              >
                <ExclamationTriangleIcon
                  class="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                />

                <p class="text-sm text-amber-800">
                  {{ trackingValidationMessage }}
                </p>
              </div>

              <div
                v-if="trackingError"
                class="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
              >
                <ExclamationCircleIcon
                  class="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                />

                <div>
                  <p class="font-bold text-red-800">
                    Tracking failed
                  </p>

                  <p class="mt-1 text-sm text-red-700">
                    {{ trackingError }}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                class="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-6 py-4 font-bold text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-0.5 hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
                :disabled="isTracking"
              >
                <ArrowPathIcon
                  v-if="isTracking"
                  class="h-5 w-5 animate-spin"
                />

                <MagnifyingGlassIcon
                  v-else
                  class="h-5 w-5"
                />

                {{
                  isTracking
                    ? 'Checking status...'
                    : 'Check request status'
                }}
              </button>
            </form>
          </section>

          <!-- Tracking Result -->
          <Transition name="result">
            <section
              v-if="trackingResult"
              ref="trackingResultSection"
              class="mt-8 overflow-hidden rounded-3xl border bg-white shadow-sm"
              :class="
                trackingResult.found
                  ? requestStatusBorderClass
                  : 'border-red-200'
              "
            >
              <div
                class="flex flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8"
                :class="
                  trackingResult.found
                    ? requestStatusHeaderClass
                    : 'bg-red-50'
                "
              >
                <div class="flex items-center gap-4">
                  <div
                    class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                    :class="
                      trackingResult.found
                        ? requestStatusIconClass
                        : 'bg-red-100 text-red-700'
                    "
                  >
                    <ClipboardDocumentCheckIcon
                      v-if="trackingResult.found"
                      class="h-8 w-8"
                    />

                    <XCircleIcon
                      v-else
                      class="h-8 w-8"
                    />
                  </div>

                  <div>
                    <p
                      class="text-xs font-bold uppercase tracking-[0.16em]"
                      :class="
                        trackingResult.found
                          ? requestStatusTitleClass
                          : 'text-red-700'
                      "
                    >
                      Request tracking
                    </p>

                    <h2
                      class="mt-1 text-2xl font-bold"
                      :class="
                        trackingResult.found
                          ? requestStatusHeadingClass
                          : 'text-red-950'
                      "
                    >
                      {{
                        trackingResult.found
                          ? 'Request found'
                          : 'Request not found'
                      }}
                    </h2>
                  </div>
                </div>

                <span
                  class="inline-flex w-fit rounded-full px-4 py-2 text-sm font-bold"
                  :class="
                    trackingResult.found
                      ? requestStatusBadgeClass
                      : 'bg-red-600 text-white'
                  "
                >
                  {{
                    trackingResult.found
                      ? trackingResult.status
                      : 'NOT FOUND'
                  }}
                </span>
              </div>

              <div
                v-if="trackingResult.found"
                class="p-6 sm:p-8"
              >
                <div
                  class="mb-8 flex items-start gap-3 rounded-2xl border p-4"
                  :class="requestStatusNoticeClass"
                >
                  <InformationCircleIcon
                    class="mt-0.5 h-5 w-5 shrink-0"
                  />

                  <div>
                    <p class="font-bold">
                      {{ requestStatusNoticeTitle }}
                    </p>

                    <p class="mt-1 text-sm leading-relaxed">
                      {{ requestStatusNoticeMessage }}
                    </p>
                  </div>
                </div>

                <dl
                  class="grid gap-x-8 gap-y-7 sm:grid-cols-2"
                >
                  <div class="detail-item sm:col-span-2">
                    <dt class="detail-label">
                      Request code
                    </dt>

                    <dd class="detail-value font-mono tracking-widest">
                      {{ trackingResult.requestCode }}
                    </dd>
                  </div>

                  <div class="detail-item">
                    <dt class="detail-label">
                      Status
                    </dt>

                    <dd>
                      <span
                        class="mt-2 inline-flex rounded-full px-3 py-1 text-sm font-bold"
                        :class="requestStatusBadgeClass"
                      >
                        {{ trackingResult.status }}
                      </span>
                    </dd>
                  </div>

                  <div class="detail-item">
                    <dt class="detail-label">
                      Number of PINs
                    </dt>

                    <dd class="detail-value">
                      {{ trackingResult.pinCount }}
                    </dd>
                  </div>

                  <div class="detail-item sm:col-span-2">
                    <dt class="detail-label">
                      Remarks
                    </dt>

                    <dd class="detail-value whitespace-pre-line">
                      {{
                        displayValue(
                          trackingResult.remarks,
                          'No remarks have been provided.',
                        )
                      }}
                    </dd>
                  </div>

                  <div class="detail-item">
                    <dt class="detail-label">
                      Date requested
                    </dt>

                    <dd class="detail-value">
                      {{ formatDate(trackingResult.requestedOn) }}
                    </dd>
                  </div>

                  <div class="detail-item">
                    <dt class="detail-label">
                      Last updated
                    </dt>

                    <dd class="detail-value">
                      {{
                        trackingResult.updatedOn
                          ? formatDate(trackingResult.updatedOn)
                          : 'Not yet updated'
                      }}
                    </dd>
                  </div>
                </dl>

                <div
                  v-if="trackingResult.message"
                  class="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <p class="text-sm leading-relaxed text-slate-700">
                    {{ trackingResult.message }}
                  </p>
                </div>

                <div
                  class="mt-8 flex flex-wrap gap-3 border-t border-slate-200 pt-6"
                >
                  <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                    @click="refreshTracking"
                  >
                    <ArrowPathIcon class="h-4 w-4" />

                    Refresh status
                  </button>

                  <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                    @click="clearTracking"
                  >
                    <MagnifyingGlassIcon class="h-4 w-4" />

                    Track another
                  </button>
                </div>
              </div>

              <div
                v-else
                class="p-6 sm:p-8"
              >
                <p class="leading-relaxed text-slate-700">
                  {{
                    trackingResult.message ||
                    'No tax clearance print request was found for this request code.'
                  }}
                </p>

                <div
                  class="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4"
                >
                  <p class="text-sm leading-relaxed text-amber-800">
                    Check that the 10-character request code was entered exactly
                    as provided after submission.
                  </p>
                </div>

                <button
                  type="button"
                  class="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                  @click="clearTracking"
                >
                  <ArrowPathIcon class="h-4 w-4" />

                  Try another request code
                </button>
              </div>
            </section>
          </Transition>
        </section>

        <!-- Sidebar -->
        <aside>
          <div
            class="sticky top-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-800"
            >
              <InformationCircleIcon class="h-6 w-6" />
            </div>

            <h2 class="mt-5 text-xl font-bold text-slate-900">
              How it works
            </h2>

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

                  <p class="mt-1 text-sm leading-relaxed text-slate-600">
                    {{ instruction.description }}
                  </p>
                </div>
              </li>
            </ol>

            <div
              class="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5"
            >
              <div class="flex items-start gap-3">
                <ExclamationTriangleIcon
                  class="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                />

                <div>
                  <p class="font-bold text-amber-900">
                    Important
                  </p>

                  <p class="mt-1 text-sm leading-relaxed text-amber-800">
                    Submission of a request does not automatically approve or
                    print the tax clearance. The request will be reviewed by
                    the City Treasurer's Office.
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-8 border-t border-slate-200 pt-6">
              <h3 class="font-bold text-slate-900">
                Request statuses
              </h3>

              <div class="mt-4 space-y-3">
                <StatusLegend
                  status="PENDING"
                  description="The request was received and is awaiting review."
                  badge-class="bg-amber-100 text-amber-800"
                />

                <StatusLegend
                  status="FOR REVIEW"
                  description="The request is being checked by the office."
                  badge-class="bg-blue-100 text-blue-800"
                />

                <StatusLegend
                  status="APPROVED"
                  description="The request was approved for processing."
                  badge-class="bg-emerald-100 text-emerald-800"
                />

                <StatusLegend
                  status="READY FOR PRINTING"
                  description="The requested document is ready for printing."
                  badge-class="bg-violet-100 text-violet-800"
                />

                <StatusLegend
                  status="COMPLETED"
                  description="The request has been completed."
                  badge-class="bg-green-100 text-green-800"
                />

                <StatusLegend
                  status="REJECTED"
                  description="The request was not approved."
                  badge-class="bg-red-100 text-red-800"
                />

                <StatusLegend
                  status="CANCELLED"
                  description="The request was cancelled."
                  badge-class="bg-slate-200 text-slate-800"
                />
              </div>
            </div>

            <div class="mt-8 border-t border-slate-200 pt-6">
              <h3 class="font-bold text-slate-900">
                Need assistance?
              </h3>

              <p class="mt-2 text-sm leading-relaxed text-slate-600">
                Contact the City Treasurer's Office for questions regarding
                your tax clearance print request.
              </p>

              <NuxtLink
                to="/contact"
                class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-green-700 transition hover:text-green-900"
              >
                Contact the office

                <ArrowRightIcon class="h-4 w-4" />
              </NuxtLink>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  DocumentPlusIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  HashtagIcon,
  InformationCircleIcon,
  KeyIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  PlusIcon,
  PrinterIcon,
  TrashIcon,
  UserIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

type PageTab = 'submit' | 'track'

interface SubmitApiRequest {
  requestee_name: string
  mailing_address: string
  email_address: string
  pins: string[]
}

interface SubmitApiResponse {
  success?: boolean
  message?: string | null
  request?: {
    request_code?: string | null
    status?: string | null
    remarks?: string | null
    pin_count?: number | null
    requested_on?: string | null
  } | null
}

interface TrackingApiResponse {
  success?: boolean
  found?: boolean
  message?: string | null
  request?: {
    request_code?: string | null
    status?: string | null
    remarks?: string | null
    pin_count?: number | null
    requested_on?: string | null
    updated_on?: string | null
  } | null
}

interface SubmittedRequest {
  requestCode: string
  status: string
  remarks: string | null
  pinCount: number
  requestedOn: string | null
}

interface TrackingResult {
  found: boolean
  message: string
  requestCode: string
  status: string
  remarks: string | null
  pinCount: number
  requestedOn: string | null
  updatedOn: string | null
}

const StatusLegend = defineComponent({
  props: {
    status: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    badgeClass: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () =>
      h(
        'div',
        {
          class: 'flex items-start gap-3',
        },
        [
          h(
            'span',
            {
              class: [
                'inline-flex min-w-28 shrink-0 justify-center rounded-full px-3 py-1 text-[0.68rem] font-bold',
                props.badgeClass,
              ],
            },
            props.status,
          ),
          h(
            'p',
            {
              class: 'pt-0.5 text-sm leading-relaxed text-slate-600',
            },
            props.description,
          ),
        ],
      )
  },
})

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const activeTab = ref<PageTab>('submit')

const form = reactive({
  requesteeName: '',
  mailingAddress: '',
  emailAddress: '',
  pins: [] as string[],
})

const pinInput = ref('')
const pinMessage = ref('')

const isSubmitting = ref(false)
const submitValidationMessage = ref('')
const submitError = ref('')
const submittedRequest = ref<SubmittedRequest | null>(null)
const codeCopied = ref(false)

const trackingCode = ref('')
const isTracking = ref(false)
const trackingValidationMessage = ref('')
const trackingError = ref('')
const trackingResult = ref<TrackingResult | null>(null)
const trackingResultSection = ref<HTMLElement | null>(null)

const instructions = [
  {
    title: 'Enter your information',
    description:
      'Provide the requestee name, mailing address, and a valid email address.',
  },
  {
    title: 'Add one or more PINs',
    description:
      'Enter every property identification number that should be included in the request.',
  },
  {
    title: 'Save your request code',
    description:
      'After submission, keep the generated 10-character request code.',
  },
  {
    title: 'Track the request',
    description:
      'Use the request code on this page to view the status and remarks.',
  },
]

const normalizedRequestStatus = computed(() => {
  return (
    trackingResult.value?.status
      ?.trim()
      .toUpperCase() || 'UNKNOWN'
  )
})

const requestStatusBadgeClass = computed(() => {
  switch (normalizedRequestStatus.value) {
    case 'PENDING':
      return 'bg-amber-500 text-white'

    case 'FOR REVIEW':
      return 'bg-blue-600 text-white'

    case 'APPROVED':
      return 'bg-emerald-600 text-white'

    case 'READY FOR PRINTING':
      return 'bg-violet-600 text-white'

    case 'COMPLETED':
      return 'bg-green-700 text-white'

    case 'REJECTED':
      return 'bg-red-600 text-white'

    case 'CANCELLED':
      return 'bg-slate-600 text-white'

    default:
      return 'bg-slate-600 text-white'
  }
})

const requestStatusBorderClass = computed(() => {
  switch (normalizedRequestStatus.value) {
    case 'PENDING':
      return 'border-amber-200'

    case 'FOR REVIEW':
      return 'border-blue-200'

    case 'APPROVED':
      return 'border-emerald-200'

    case 'READY FOR PRINTING':
      return 'border-violet-200'

    case 'COMPLETED':
      return 'border-green-200'

    case 'REJECTED':
      return 'border-red-200'

    case 'CANCELLED':
      return 'border-slate-300'

    default:
      return 'border-slate-200'
  }
})

const requestStatusHeaderClass = computed(() => {
  switch (normalizedRequestStatus.value) {
    case 'PENDING':
      return 'bg-amber-50'

    case 'FOR REVIEW':
      return 'bg-blue-50'

    case 'APPROVED':
      return 'bg-emerald-50'

    case 'READY FOR PRINTING':
      return 'bg-violet-50'

    case 'COMPLETED':
      return 'bg-green-50'

    case 'REJECTED':
      return 'bg-red-50'

    case 'CANCELLED':
      return 'bg-slate-100'

    default:
      return 'bg-slate-50'
  }
})

const requestStatusIconClass = computed(() => {
  switch (normalizedRequestStatus.value) {
    case 'PENDING':
      return 'bg-amber-100 text-amber-700'

    case 'FOR REVIEW':
      return 'bg-blue-100 text-blue-700'

    case 'APPROVED':
      return 'bg-emerald-100 text-emerald-700'

    case 'READY FOR PRINTING':
      return 'bg-violet-100 text-violet-700'

    case 'COMPLETED':
      return 'bg-green-100 text-green-700'

    case 'REJECTED':
      return 'bg-red-100 text-red-700'

    case 'CANCELLED':
      return 'bg-slate-200 text-slate-700'

    default:
      return 'bg-slate-100 text-slate-700'
  }
})

const requestStatusTitleClass = computed(() => {
  switch (normalizedRequestStatus.value) {
    case 'PENDING':
      return 'text-amber-700'

    case 'FOR REVIEW':
      return 'text-blue-700'

    case 'APPROVED':
      return 'text-emerald-700'

    case 'READY FOR PRINTING':
      return 'text-violet-700'

    case 'COMPLETED':
      return 'text-green-700'

    case 'REJECTED':
      return 'text-red-700'

    case 'CANCELLED':
      return 'text-slate-700'

    default:
      return 'text-slate-700'
  }
})

const requestStatusHeadingClass = computed(() => {
  switch (normalizedRequestStatus.value) {
    case 'PENDING':
      return 'text-amber-950'

    case 'FOR REVIEW':
      return 'text-blue-950'

    case 'APPROVED':
      return 'text-emerald-950'

    case 'READY FOR PRINTING':
      return 'text-violet-950'

    case 'COMPLETED':
      return 'text-green-950'

    case 'REJECTED':
      return 'text-red-950'

    case 'CANCELLED':
      return 'text-slate-950'

    default:
      return 'text-slate-950'
  }
})

const requestStatusNoticeClass = computed(() => {
  switch (normalizedRequestStatus.value) {
    case 'PENDING':
      return 'border-amber-200 bg-amber-50 text-amber-900'

    case 'FOR REVIEW':
      return 'border-blue-200 bg-blue-50 text-blue-900'

    case 'APPROVED':
      return 'border-emerald-200 bg-emerald-50 text-emerald-900'

    case 'READY FOR PRINTING':
      return 'border-violet-200 bg-violet-50 text-violet-900'

    case 'COMPLETED':
      return 'border-green-200 bg-green-50 text-green-900'

    case 'REJECTED':
      return 'border-red-200 bg-red-50 text-red-900'

    case 'CANCELLED':
      return 'border-slate-300 bg-slate-100 text-slate-900'

    default:
      return 'border-slate-200 bg-slate-50 text-slate-900'
  }
})

const requestStatusNoticeTitle = computed(() => {
  switch (normalizedRequestStatus.value) {
    case 'PENDING':
      return 'Request pending'

    case 'FOR REVIEW':
      return 'Request under review'

    case 'APPROVED':
      return 'Request approved'

    case 'READY FOR PRINTING':
      return 'Ready for printing'

    case 'COMPLETED':
      return 'Request completed'

    case 'REJECTED':
      return 'Request rejected'

    case 'CANCELLED':
      return 'Request cancelled'

    default:
      return 'Request status'
  }
})

const requestStatusNoticeMessage = computed(() => {
  switch (normalizedRequestStatus.value) {
    case 'PENDING':
      return 'Your request was received and is waiting to be reviewed by the City Treasurer’s Office.'

    case 'FOR REVIEW':
      return 'Your submitted information and property identification numbers are currently being reviewed.'

    case 'APPROVED':
      return 'Your request has been approved and may proceed to the next processing step.'

    case 'READY FOR PRINTING':
      return 'Your tax clearance request has been processed and is ready for printing.'

    case 'COMPLETED':
      return 'The tax clearance print request has been completed.'

    case 'REJECTED':
      return 'The request was not approved. Review the remarks for additional information.'

    case 'CANCELLED':
      return 'The request was cancelled. Review the remarks for additional information.'

    default:
      return 'Review the current request status and remarks below.'
  }
})

function getApiBaseUrl(): string {
  return String(
      runtimeConfig.public.apiBaseURL || '',
  ).replace(/\/+$/, '')
}

function getRequestsEndpoint(): string {
  const apiBaseUrl = getApiBaseUrl()

  if (!apiBaseUrl) {
    throw new Error(
      'The ORDS API base URL is not configured.',
    )
  }

  return `${apiBaseUrl}/tax-clearance/requests`
}

function normalizePin(value: string): string {
  return value.trim().toUpperCase()
}

function isValidPin(value: string): boolean {
  return /^[A-Z0-9-]+$/.test(value)
}

function addPin(): void {
  pinMessage.value = ''
  submitValidationMessage.value = ''
  submitError.value = ''
  submittedRequest.value = null

  const normalizedPin = normalizePin(pinInput.value)

  if (!normalizedPin) {
    pinMessage.value = 'Enter a PIN before clicking Add PIN.'
    return
  }

  if (normalizedPin.length > 100) {
    pinMessage.value =
      'A PIN must not exceed 100 characters.'
    return
  }

  if (!isValidPin(normalizedPin)) {
    pinMessage.value =
      'PIN values may contain only letters, numbers, and hyphens.'
    return
  }

  if (form.pins.includes(normalizedPin)) {
    pinMessage.value =
      'This PIN has already been added.'
    return
  }

  if (form.pins.length >= 50) {
    pinMessage.value =
      'A maximum of 50 PINs is allowed per request.'
    return
  }

  form.pins.push(normalizedPin)
  pinInput.value = ''
}

function removePin(index: number): void {
  form.pins.splice(index, 1)
  clearSubmitMessages()
}

function clearPins(): void {
  form.pins.splice(0)
  pinInput.value = ''
  pinMessage.value = ''
  clearSubmitMessages()
}

function clearSubmitMessages(): void {
  submitValidationMessage.value = ''
  submitError.value = ''
  submittedRequest.value = null
  codeCopied.value = false
}

function validateSubmitForm(): string | null {
  if (!form.requesteeName.trim()) {
    return 'Name of requestee is required.'
  }

  if (!form.mailingAddress.trim()) {
    return 'Mailing address is required.'
  }

  if (!form.emailAddress.trim()) {
    return 'Email address is required.'
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(form.emailAddress.trim())) {
    return 'Enter a valid email address.'
  }

  if (form.pins.length === 0) {
    return 'Add at least one property identification number.'
  }

  return null
}

async function submitRequest(): Promise<void> {
  submitValidationMessage.value = ''
  submitError.value = ''
  submittedRequest.value = null
  codeCopied.value = false

  const validationError = validateSubmitForm()

  if (validationError) {
    submitValidationMessage.value = validationError
    return
  }

  isSubmitting.value = true

  try {
    const payload: SubmitApiRequest = {
      requestee_name: form.requesteeName.trim(),
      mailing_address: form.mailingAddress.trim(),
      email_address: form.emailAddress
        .trim()
        .toLowerCase(),
      pins: [...form.pins],
    }

    const response =
      await $fetch<SubmitApiResponse>(
        getRequestsEndpoint(),
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: payload,
        },
      )

    const request = response.request
    const requestCode =
      request?.request_code?.trim().toUpperCase()

    if (
      response.success !== true ||
      !request ||
      !requestCode
    ) {
      throw new Error(
        response.message ||
          'The server did not return a request code.',
      )
    }

    submittedRequest.value = {
      requestCode,
      status:
        request.status?.trim().toUpperCase() ||
        'PENDING',
      remarks: request.remarks || null,
      pinCount:
        Number(request.pin_count) ||
        form.pins.length,
      requestedOn:
        request.requested_on || null,
    }

    trackingCode.value = requestCode

    await router.replace({
      query: {
        code: requestCode,
      },
    })
  } catch (error: unknown) {
    const fetchError = error as {
      data?: {
        message?: string
        error?: string
      }
      message?: string
      statusCode?: number
      status?: number
    }

    const statusCode =
      fetchError.statusCode ||
      fetchError.status

    if (statusCode === 400 || statusCode === 422) {
      submitValidationMessage.value =
        fetchError.data?.message ||
        'Review the submitted information and try again.'

      return
    }

    if (statusCode === 429) {
      submitError.value =
        'Too many requests were submitted from your connection. Please wait before trying again.'

      return
    }

    submitError.value =
      fetchError.data?.message ||
      fetchError.data?.error ||
      fetchError.message ||
      'The tax clearance request service is currently unavailable.'
  } finally {
    isSubmitting.value = false
  }
}

function resetSubmitForm(): void {
  form.requesteeName = ''
  form.mailingAddress = ''
  form.emailAddress = ''
  form.pins.splice(0)

  pinInput.value = ''
  pinMessage.value = ''
  submitValidationMessage.value = ''
  submitError.value = ''
  submittedRequest.value = null
  codeCopied.value = false
}

async function copyRequestCode(): Promise<void> {
  const code = submittedRequest.value?.requestCode

  if (!code || !import.meta.client) {
    return
  }

  try {
    await navigator.clipboard.writeText(code)
    codeCopied.value = true

    window.setTimeout(() => {
      codeCopied.value = false
    }, 2000)
  } catch {
    submitError.value =
      'The request code could not be copied automatically.'
  }
}

async function trackSubmittedRequest(): Promise<void> {
  if (!submittedRequest.value) {
    return
  }

  trackingCode.value =
    submittedRequest.value.requestCode

  activeTab.value = 'track'
  await nextTick()
  await trackRequest()
}

function startNewRequest(): void {
  resetSubmitForm()
  activeTab.value = 'submit'

  void router.replace({
    query: {},
  })
}

function normalizeRequestCode(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_-]/g, '')
    .slice(0, 10)
}

function handleTrackingCodeInput(): void {
  trackingCode.value =
    normalizeRequestCode(trackingCode.value)

  trackingValidationMessage.value = ''
  trackingError.value = ''
  trackingResult.value = null
}

function isValidRequestCode(value: string): boolean {
  return /^[A-Z0-9_-]{10}$/.test(value)
}

function createNotFoundTrackingResult(
  code: string,
  message: string,
): TrackingResult {
  return {
    found: false,
    message,
    requestCode: code,
    status: 'NOT FOUND',
    remarks: null,
    pinCount: 0,
    requestedOn: null,
    updatedOn: null,
  }
}

async function trackRequest(): Promise<void> {
  trackingValidationMessage.value = ''
  trackingError.value = ''
  trackingResult.value = null

  const code =
    normalizeRequestCode(trackingCode.value)

  trackingCode.value = code

  if (!code) {
    trackingValidationMessage.value =
      'Enter your request code.'
    return
  }

  if (!isValidRequestCode(code)) {
    trackingValidationMessage.value =
      'The request code must contain exactly 10 letters, numbers, hyphens, or underscores.'
    return
  }

  isTracking.value = true

  try {
    const endpoint =
      `${getRequestsEndpoint()}/${encodeURIComponent(code)}`

    const response =
      await $fetch<TrackingApiResponse>(
        endpoint,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        },
      )

    if (
      response.found !== true ||
      !response.request
    ) {
      trackingResult.value =
        createNotFoundTrackingResult(
          code,
          response.message ||
            'No tax clearance print request was found for this request code.',
        )
    } else {
      const request = response.request

      trackingResult.value = {
        found: true,
        message:
          response.message ||
          'The tax clearance print request was found.',
        requestCode:
          request.request_code
            ?.trim()
            .toUpperCase() || code,
        status:
          request.status
            ?.trim()
            .toUpperCase() || 'UNKNOWN',
        remarks:
          request.remarks || null,
        pinCount:
          Number(request.pin_count) || 0,
        requestedOn:
          request.requested_on || null,
        updatedOn:
          request.updated_on || null,
      }
    }

    await router.replace({
      query: {
        code,
      },
    })

    await nextTick()

    if (import.meta.client) {
      trackingResultSection.value?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  } catch (error: unknown) {
    const fetchError = error as {
      data?: {
        message?: string
        error?: string
      }
      message?: string
      statusCode?: number
      status?: number
    }

    const statusCode =
      fetchError.statusCode ||
      fetchError.status

    if (statusCode === 400) {
      trackingValidationMessage.value =
        fetchError.data?.message ||
        'The request code format is invalid.'

      return
    }

    if (statusCode === 404) {
      trackingResult.value =
        createNotFoundTrackingResult(
          code,
          fetchError.data?.message ||
            'No tax clearance print request was found for this request code.',
        )

      return
    }

    if (statusCode === 429) {
      trackingError.value =
        'Too many status requests were made from your connection. Please wait before trying again.'

      return
    }

    trackingError.value =
      fetchError.data?.message ||
      fetchError.data?.error ||
      fetchError.message ||
      'The request tracking service is currently unavailable.'
  } finally {
    isTracking.value = false
  }
}

async function refreshTracking(): Promise<void> {
  await trackRequest()
}

async function clearTracking(): Promise<void> {
  trackingCode.value = ''
  trackingValidationMessage.value = ''
  trackingError.value = ''
  trackingResult.value = null

  await router.replace({
    query: {},
  })

  await nextTick()

  if (import.meta.client) {
    document
      .getElementById('requestCode')
      ?.focus()
  }
}

function switchTab(tab: PageTab): void {
  activeTab.value = tab

  submitValidationMessage.value = ''
  submitError.value = ''
  trackingValidationMessage.value = ''
  trackingError.value = ''

  if (tab === 'submit') {
    trackingResult.value = null
  }
}

function displayValue(
  value: string | null | undefined,
  fallback = 'Not provided',
): string {
  if (!value || !value.trim()) {
    return fallback
  }

  return value
}

function formatDate(
  value: string | null | undefined,
): string {
  if (!value) {
    return 'Not provided'
  }

  const localDateMatch = value.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?$/,
  )

  if (localDateMatch) {
    const [
      ,
      year,
      month,
      day,
      hour,
      minute,
      second,
      milliseconds,
    ] = localDateMatch

    const localDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second),
      milliseconds
        ? Number(milliseconds.slice(0, 3).padEnd(3, '0'))
        : 0,
    )

    return new Intl.DateTimeFormat('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(localDate)
  }

  const parsedDate = new Date(value)

  if (Number.isNaN(parsedDate.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Manila',
  }).format(parsedDate)
}

onMounted(() => {
  const requestCodeFromUrl =
    typeof route.query.code === 'string'
      ? normalizeRequestCode(route.query.code)
      : ''

  if (requestCodeFromUrl) {
    activeTab.value = 'track'
    trackingCode.value = requestCodeFromUrl

    void trackRequest()
  }
})
</script>

<style scoped>
.request-header-gradient {
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

.form-input {
  width: 100%;
  border-radius: 1rem;
  border: 1px solid rgb(203 213 225);
  background: white;
  padding-top: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  color: rgb(15 23 42);
  outline: none;
  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;
}

.form-input::placeholder {
  color: rgb(148 163 184);
}

.form-input:focus {
  border-color: rgb(22 163 74);
  box-shadow: 0 0 0 4px rgb(22 163 74 / 0.1);
}

.form-input:disabled {
  cursor: not-allowed;
  background: rgb(248 250 252);
  opacity: 0.7;
}

.detail-item {
  border-bottom: 1px solid rgb(226 232 240);
  padding-bottom: 1rem;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(100 116 139);
}

.detail-value {
  margin-top: 0.45rem;
  overflow-wrap: anywhere;
  font-size: 1rem;
  font-weight: 700;
  color: rgb(15 23 42);
}

.result-enter-active,
.result-leave-active {
  transition:
    opacity 250ms ease,
    transform 250ms ease;
}

.result-enter-from,
.result-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
