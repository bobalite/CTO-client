<template>
    <div class="services-page">
        <Head>
            <Title>{{ runtimeConfig.public.appName }} | Services</Title>
            <Meta
                name="description"
                content="Online tax clearance and Statement of Account verification and printing services."
            />
        </Head>

        <!-- Page Banner -->
        <section class="services-banner">
            <div class="services-banner__overlay"></div>

            <div class="container services-banner__content">
                <p class="services-banner__eyebrow">
                    Online Government Services
                </p>

                <h1>Our Services</h1>

                <p>
                    Verify documents and submit requests for tax clearance and
                    Statement of Account printing.
                </p>
            </div>
        </section>

        <!-- Services -->
        <section class="services-section">
            <div class="container">
                <div class="services-heading">
                    <div>
                        <p class="services-heading__eyebrow">
                            Quick Services
                        </p>

                        <h2>Choose a Service</h2>
                    </div>

                    <p class="services-heading__description">
                        Select the service you need. Verification services allow
                        you to confirm whether a document was issued by the City
                        Treasurer's Office.
                    </p>
                </div>

                <div class="services-grid">
                    <!-- Tax Clearance Verification -->
                    <article
                        class="service-card service-card--available"
                        @click="navigateToService('/verify')"
                    >
                        <div class="service-card__top">
                            <div class="service-card__icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                    />
                                    <polyline points="14 2 14 8 20 8" />
                                    <path d="m9 15 2 2 4-4" />
                                </svg>
                            </div>

                            <span class="service-status service-status--active">
                                Available
                            </span>
                        </div>

                        <div class="service-card__body">
                            <h3>Tax Clearance Verification</h3>

                            <p>
                                Verify the authenticity and validity of a tax
                                clearance using its QR verification code.
                            </p>
                        </div>

                        <div class="service-card__footer">
                            <span>Verify Tax Clearance</span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M5 12h14" />
                                <path d="m13 6 6 6-6 6" />
                            </svg>
                        </div>
                    </article>

                    <!-- SOA Verification -->
                    <article
                        class="service-card"
                        @click="navigateToService('/verify_soa')"
                    >
                        <div class="service-card__top">
                            <div class="service-card__icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z"
                                    />
                                    <path d="M16 3v5h5" />
                                    <path d="M8 13h8" />
                                    <path d="M8 17h5" />
                                    <circle cx="17" cy="17" r="3" />
                                    <path d="m19.2 19.2 1.8 1.8" />
                                </svg>
                            </div>

                            <span class="service-status service-status--active">
                                Available
                            </span>
                        </div>

                        <div class="service-card__body">
                            <h3>SOA Verification</h3>

                            <p>
                                Verify a real property tax Statement of Account
                                using the SOA number printed on the document.
                            </p>
                        </div>

                        <div class="service-card__footer">
                            <span>Verify SOA</span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M5 12h14" />
                                <path d="m13 6 6 6-6 6" />
                            </svg>
                        </div>
                    </article>

                    <!-- Request Tax Clearance Print -->
                    <article
                        class="service-card"
                        @click="
                            navigateToService(
                                '/tax-clearance-request'
                            )
                        "
                    >
                        <div class="service-card__top">
                            <div class="service-card__icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <polyline points="6 9 6 2 18 2 18 9" />
                                    <path
                                        d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
                                    />
                                    <rect
                                        x="6"
                                        y="14"
                                        width="12"
                                        height="8"
                                    />
                                    <path d="M18 11h.01" />
                                </svg>
                            </div>

                            <span class="service-status">
                                Online Request
                            </span>
                        </div>

                        <div class="service-card__body">
                            <h3>Request Tax Clearance Print</h3>

                            <p>
                                Submit a request for a printed tax clearance by
                                providing the required property and payment
                                information.
                            </p>
                        </div>

                        <div class="service-card__footer">
                            <span>Request Tax Clearance</span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M5 12h14" />
                                <path d="m13 6 6 6-6 6" />
                            </svg>
                        </div>
                    </article>

                    <!-- Request SOA Print -->
                    <article
                        class="service-card"
                        @click="navigateToService('/request-soa-print')"
                    >
                        <div class="service-card__top">
                            <div class="service-card__icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        d="M6 2h9l5 5v15H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
                                    />
                                    <path d="M14 2v6h6" />
                                    <path d="M8 13h8" />
                                    <path d="M8 17h8" />
                                    <path d="M8 9h2" />
                                </svg>
                            </div>

                            <span class="service-status">
                                Online Request
                            </span>
                        </div>

                        <div class="service-card__body">
                            <h3>Request SOA Print</h3>

                            <p>
                                Request a printed Statement of Account for one or
                                more real property tax identification numbers.
                            </p>
                        </div>

                        <div class="service-card__footer">
                            <span>Request SOA</span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M5 12h14" />
                                <path d="m13 6 6 6-6 6" />
                            </svg>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <!-- Information Section -->
        <section class="services-information">
            <div class="container">
                <div class="information-card">
                    <div class="information-card__icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>
                    </div>

                    <div>
                        <h2>Before using an online service</h2>

                        <p>
                            Prepare the PIN, SOA number, tax clearance QR code,
                            or Official Receipt information required by the
                            selected service.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

function navigateToService(path: string) {
    navigateTo(path)
}
</script>

<style scoped>
.services-page {
    min-height: 100vh;
    background: #f6f8fb;
    color: #172033;
}

.container {
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
}

/* Banner */

.services-banner {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 340px;
    overflow: hidden;
    background:
        linear-gradient(
            135deg,
            rgba(10, 55, 103, 0.96),
            rgba(17, 101, 168, 0.9)
        ),
        url('/images/services-banner.jpg') center / cover no-repeat;
}

.services-banner::after {
    position: absolute;
    right: -120px;
    bottom: -170px;
    width: 430px;
    height: 430px;
    content: '';
    border: 70px solid rgba(255, 255, 255, 0.06);
    border-radius: 50%;
}

.services-banner__overlay {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(
            circle at 20% 30%,
            rgba(255, 255, 255, 0.12),
            transparent 34%
        );
}

.services-banner__content {
    position: relative;
    z-index: 2;
    padding-top: 64px;
    padding-bottom: 64px;
    color: #ffffff;
}

.services-banner__eyebrow,
.services-heading__eyebrow {
    margin: 0 0 10px;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.services-banner__eyebrow {
    color: #bfe0ff;
}

.services-banner h1 {
    margin: 0;
    font-size: clamp(2.25rem, 6vw, 4rem);
    font-weight: 800;
    line-height: 1.05;
}

.services-banner p:last-child {
    max-width: 680px;
    margin: 20px 0 0;
    color: rgba(255, 255, 255, 0.88);
    font-size: 1.06rem;
    line-height: 1.75;
}

/* Services */

.services-section {
    padding: 80px 0;
}

.services-heading {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: 48px;
    align-items: end;
    margin-bottom: 40px;
}

.services-heading__eyebrow {
    color: #1468a8;
}

.services-heading h2 {
    margin: 0;
    color: #102a43;
    font-size: clamp(1.9rem, 4vw, 2.8rem);
    line-height: 1.15;
}

.services-heading__description {
    max-width: 650px;
    margin: 0;
    color: #64748b;
    font-size: 1rem;
    line-height: 1.75;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
}

.service-card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 330px;
    overflow: hidden;
    cursor: pointer;
    background: #ffffff;
    border: 1px solid #dfe7ef;
    border-radius: 20px;
    box-shadow: 0 12px 35px rgba(31, 55, 78, 0.06);
    transition:
        transform 0.22s ease,
        border-color 0.22s ease,
        box-shadow 0.22s ease;
}

.service-card::before {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 4px;
    content: '';
    background: linear-gradient(90deg, #1c74b8, #35a2ce);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.22s ease;
}

.service-card:hover {
    border-color: #a8cce5;
    box-shadow: 0 20px 50px rgba(31, 72, 105, 0.13);
    transform: translateY(-5px);
}

.service-card:hover::before {
    transform: scaleX(1);
}

.service-card--available {
    border-color: #b7d9ee;
}

.service-card__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 28px 0;
}

.service-card__icon {
    display: grid;
    width: 64px;
    height: 64px;
    color: #1269aa;
    background: #eaf5fc;
    border-radius: 18px;
    place-items: center;
}

.service-status {
    padding: 7px 11px;
    color: #5a6574;
    background: #edf1f5;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
}

.service-status--active {
    color: #087443;
    background: #e4f7ec;
}

.service-card__body {
    flex: 1;
    padding: 28px;
}

.service-card__body h3 {
    margin: 0 0 14px;
    color: #102a43;
    font-size: 1.4rem;
    line-height: 1.3;
}

.service-card__body p {
    margin: 0;
    color: #64748b;
    line-height: 1.75;
}

.service-card__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 28px;
    color: #1269aa;
    background: #f7fafc;
    border-top: 1px solid #e7edf3;
    font-size: 0.94rem;
    font-weight: 700;
}

.service-card__footer svg {
    transition: transform 0.22s ease;
}

.service-card:hover .service-card__footer svg {
    transform: translateX(5px);
}

/* Information */

.services-information {
    padding: 0 0 80px;
}

.information-card {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    padding: 32px;
    color: #ffffff;
    background: linear-gradient(135deg, #103e6c, #176ea8);
    border-radius: 20px;
    box-shadow: 0 20px 45px rgba(24, 80, 124, 0.18);
}

.information-card__icon {
    display: grid;
    flex: 0 0 54px;
    width: 54px;
    height: 54px;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.14);
    border-radius: 15px;
    place-items: center;
}

.information-card h2 {
    margin: 0 0 8px;
    font-size: 1.35rem;
}

.information-card p {
    max-width: 820px;
    margin: 0;
    color: rgba(255, 255, 255, 0.84);
    line-height: 1.7;
}

/* Responsive */

@media (max-width: 850px) {
    .services-heading {
        grid-template-columns: 1fr;
        gap: 18px;
    }

    .services-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 560px) {
    .container {
        width: min(100% - 22px, 1180px);
    }

    .services-banner {
        min-height: 300px;
    }

    .services-section {
        padding: 56px 0;
    }

    .service-card {
        min-height: 310px;
        border-radius: 16px;
    }

    .service-card__top {
        padding: 22px 22px 0;
    }

    .service-card__body {
        padding: 24px 22px;
    }

    .service-card__footer {
        padding: 18px 22px;
    }

    .information-card {
        padding: 24px;
    }
}
</style>