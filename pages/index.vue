<template>
    <div class="flex h-screen flex-1">
        <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="mx-auto w-full max-w-sm lg:w-96">
                
                <div >
                    <img class="h-full w-full object-contain" src="/assets/images/file.png" alt="socc logo" />

                    <!--<h1 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    SPECIAL OFFICE FOR CHILDREN'S CONCERNS

                   </h1> -->
                    <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account
                    </h2>

                </div>
                <Alert :text="state.error && state.error.message" v-if="state.error" />
                <div class="mt-10">
                    <div>
                        <form @submit.prevent="login" class="space-y-6">
                            <div>
                                <div class="mt-2">
                                    <FormLabel for="email" label="Email address" />
                                    <FormEmail name="email"  v-model="state.email" />
                                    <FormError :error="v$.email &&
                                        v$.email.$errors &&
                                        v$.email.$errors.length > 0
                                        ? v$.email.$errors[0].$message
                                        : null
                                        " />
                                </div>
                            </div>

                            <div>
                                <div>
                                    <FormLabel for="password" label="Password" />
                                    <FormPassword name="password" v-model="state.password"/>
                                    <FormError :error="v$.password && v$.password.$errors && v$.password.$errors.length > 0
                                        ? v$.password.$errors[0].$message : null " />
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div class="flex items-center">

                                </div>


                            </div>

                            <div>
                                <button type="submit"
                                    class="flex w-full justify-center rounded-md primary-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                                    Sign in
                                </button>
                                <FormError :error="state.api_error" />

                            </div>
                        </form>
                    </div>

                    <div class="mt-10">
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                <div class="w-full border-t border-gray-200" />
                            </div>
                            <div class="relative flex justify-center text-sm font-medium leading-6">

                            </div>
                        </div>

                        <div class="mt-6 grid grid-cols-2 gap-4">



                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative hidden w-0 flex-1 lg:block">
            <!-- <img class="absolute inset-0 h-full w-full object-cover"
              src="/assets/images/splash.jpg"
              alt="" /> -->
            <!-- Right Panel -->

            <section id="hero" class="hero section dark-background">

                <div id="hero-carousel" class="carousel slide carousel-fade" data-bs-ride="carousel"
                    data-bs-interval="5000">

                    <div class="carousel-item active">
                        <img class="bg-blend-darken" src="/assets/images/bg.jpg">

                        <div class="carousel-container" style="text-align: center;">
                            <!-- Center the content inside carousel-container -->

                            <!-- Logos in a grid -->
                            <div
                                style="display: grid; grid-template-columns: 1fr 1fr; justify-items: center; align-items: center;">
                                <!-- Logo 1 -->
                                <img src="/assets/images/davao.png" style="width: 100px; height: auto; ">
                                <!-- Logo 2 -->
                                <img src="/assets/images/Davao_City_Logo.png" style="width: 230px; height: 75px; ">
                            </div>

                            <h2 style="font-size: clamp(24px, 4vw, 36px); padding-top: 24px; color: white">
                                SPECIAL OFFICE FOR CHILDREN'S CONCERN
                            </h2>

                            <div class="contact-info mt-0"
                                style="display: flex; gap: 24px; align-items: center; justify-content: center; flex-wrap: wrap;">
                                <a href="https://www.google.com/maps?q=Magsaysay+Park,+Davao+City">
                                    <i class="bi bi-geo-alt-fill"></i>
                                    <span style="color: #fff;">Magsaysay Park, Davao City</span>
                                </a>
                                <a href="tel:+63822919657">
                                    <i class="bi bi-telephone-fill"></i>
                                    <span style="color: #fff;">(082) 291-9657</span>
                                </a>
                                <a href="mailto:socc@davaocity.gov.ph">
                                    <i class="bi bi-envelope-fill"></i>
                                    <span style="color: #fff;">socc@davaocity.gov.ph</span>
                                </a>
                            </div>

                            <!-- Get Started Button -->
                            <!--<a href="#" class="mt-4"
                            style="background: #198754; color: var(--contrast-color, #fff); font-family: var(--heading-font, Arial, sans-serif); font-weight: 500; font-size: 16px; letter-spacing: 1px; padding: 12px 24px; border-radius: 30px; transition: 0.3s; display: inline-flex; align-items: center; justify-content: center; text-decoration: none; text-transform: none;">
                            <span>Get Started</span>
                        </a>-->
                        </div>

                    </div><!-- End Carousel Item -->

                </div><!-- End Carousel -->

            </section><!-- /Hero Section -->


        </div>
    </div>
</template>

<script setup>
import { authService } from '~/components/api/AuthService'
import { useUserStore } from '~/store/user'
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";


const userStore = useUserStore()
const state = reactive({
    isLoading: false,
    email: null,
    password: null,
    error: null,
    api_error: null,
});


const rules = computed(() => {
    return {
        email: {
            required: helpers.withMessage("The email field is required", required),
        },
        password: {
            required: helpers.withMessage("The password field is required", required),
        }
    }
})

const v$ = useVuelidate(rules, state);


async function login() {
    state.error = null
    v$.value.$validate();
    if (!v$.value.$error) {
        state.isLoading = true;
        try {
            const params = {
                email: state.email,
                password: state.password
            }
            const response = await authService.login(params)
            if (response.data) {
                localStorage.setItem("_token", response.data.token)
                userStore.setUser(response.data.user)
                await navigateTo('/dashboard')
            }
        } catch (error) {
            state.isLoading = false;

            if (error.message == "Invalid password.") {
              state.api_error = "Invalid password or email."
            } else if (error.message == "Invalid email address.") {
              state.api_error = "Invalid password or email."
            }
           
        }
    }
}
</script>