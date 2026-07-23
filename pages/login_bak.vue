
<template>
    <div class="flex h-screen">
        <!-- Login Section -->
        <div class="flex flex-col justify-center w-full px-6 py-6 sm:max-w-md lg:w-2/5 lg:px-12 xl:px-16">
            <div class="mx-auto w-full">
                <!-- Logo + Title -->
                <div class="flex flex-col items-center">
                    <img class="w-32 h-auto object-contain" src="/assets/images/file.png" alt="SOCC logo" />
                    <h2 class="mt-6 text-2xl font-bold text-gray-900 text-center">
                        Sign in to your account
                    </h2>
                </div>

                <!-- Error Alert -->
                <Alert :text="state.error && state.error.message" v-if="state.error" />

                <!-- Login Form -->
                <form @submit.prevent="login" class="mt-8 space-y-6">
                    <!-- Email -->
                    <div>
                        <FormLabel for="email" label="Email address" />
                        <FormEmail name="email" v-model="state.email" />
                        <FormError :error="v$.email?.$errors?.length > 0 ? v$.email.$errors[0].$message : null" />
                    </div>

                    <!-- Password -->
                    <div>
                        <FormLabel for="password" label="Password" />
                        <FormPassword name="password" v-model="state.password" />
                        <FormError :error="v$.password?.$errors?.length > 0 ? v$.password.$errors[0].$message : null" />
                    </div>

                    <!-- Submit Button -->
                    <div>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600">
                            Sign in
                        </button>
                        <FormError :error="state.api_error" />
                    </div>

                    <!-- Logos -->
                    <div class="mt-6 grid grid-cols-2 gap-6 place-items-center">
                        <img src="/assets/images/dcplinado.png" class="w-40 h-40 object-contain" />
                        <img src="/assets/images/davao.png" class="w-28 h-auto object-contain" />
                    </div>
                </form>
            </div>
        </div>

        <!-- Hero Section -->
        <!-- Hero Section -->
        <div class="hidden lg:flex lg:flex-1 relative">
            <section id="hero" class="w-full h-full relative">
                <!-- Background image -->
                <img src="/assets/images/bg.jpg" class="absolute inset-0 w-full h-full object-cover" />

                <!-- Overlay Content -->
                <div
                    class="relative z-10 flex flex-col justify-center items-center h-full bg-black/40 px-8 text-center">
                    <h2 class="text-white text-3xl font-bold md:text-4xl lg:text-5xl max-w-3xl">
                        SPECIAL OFFICE FOR CHILDREN'S CONCERNS <br />
                        Analytical and Reporting System
                    </h2>

                    <!-- Contact Info -->
                    <div class="mt-6 flex flex-wrap justify-center gap-6 text-white text-sm">
                        <a href="https://www.google.com/maps?q=Magsaysay+Park,+Davao+City"
                            class="flex items-center gap-2 hover:underline">
                            <i class="bi bi-geo-alt-fill"></i>
                            <span>Magsaysay Park, Davao City</span>
                        </a>
                        <a href="tel:+63822919657" class="flex items-center gap-2 hover:underline">
                            <i class="bi bi-telephone-fill"></i>
                            <span>(082) 291-9657</span>
                        </a>
                        <a href="mailto:socc@davaocity.gov.ph" class="flex items-center gap-2 hover:underline">
                            <i class="bi bi-envelope-fill"></i>
                            <span>socc@davaocity.gov.ph</span>
                        </a>
                    </div>
                </div>
            </section>
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

onMounted(() => {
    localStorage.removeItem("_token");

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