<template>
    <div class="flex h-screen flex-1">
        <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <div>
                    <img class="h-100 w-auto place-self-center"  src="/assets/images/file.png"
                        alt="my agency" />
                     
                     <!--<h1 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      SPECIAL OFFICE FOR CHILDREN'S CONCERNS
  
                     </h1> -->
                    <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account
                    </h2>
                    
                </div>
  
                <div class="mt-10">
                    <div>
                        <form @submit.prevent="login" method="POST" class="space-y-6">
                            <div>
                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                                    address</label>
                                <div class="mt-2">
                                    <FormText v-model="state.email" name="email" id="email" />
                                </div>
                            </div>
  
                            <div>
                                <label for="password"
                                    class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div class="mt-2">
                                    <FormPassword v-model="state.password" name="password" id="password" />
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
  
                  <div id="hero-carousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
  
                      <div class="carousel-item active">
                          <img class="bg-blend-darken"  src="/assets/images/bg.jpg" >
  
                          <div class="carousel-container" style="text-align: center;"> <!-- Center the content inside carousel-container -->
                          
                          <!-- Logos in a grid -->
                          <div style="display: grid; grid-template-columns: 1fr 1fr; justify-items: center; align-items: center;">
                              <!-- Logo 1 -->
                              <img src="/assets/images/davao.png" style="width: 100px; height: auto; ">
                              <!-- Logo 2 -->
                              <img src="/assets/images/Davao_City_Logo.png" style="width: 230px; height: 75px; ">
                          </div>
  
                          <!-- Heading Text -->
                          <h2 class="text-white">SPECIAL OFFICE FOR CHILDREN'S CONCERNS</h2>
  
                          <!-- Contact Info Section -->
                          <div class="contact-info" style="display: flex; gap: 18px; align-items: center; justify-content: center;">
                              <!-- Location --> 
                              <a href="https://www.google.com/maps?q=Magsaysay+Park,+Davao+City" class="flex items-center text-white no-underline">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="#007221" viewBox="0 0 16 16" class="w-6 h-6 mr-2">
                                      <path fill-rule="evenodd" d="M8 0a5.5 5.5 0 0 1 5.5 5.5c0 3.425-3.612 8.005-4.97 9.674a1 1 0 0 1-1.56 0C6.112 13.505 2.5 8.925 2.5 5.5A5.5 5.5 0 0 1 8 0Zm0 2a3.5 3.5 0 0 0-3.5 3.5c0 1.82 1.393 4.378 3.5 6.914 2.107-2.536 3.5-5.094 3.5-6.914A3.5 3.5 0 0 0 8 2Zm0 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                                  </svg>
                                  <span class="text-lg">Magsaysay Park, Davao City</span>
                              </a>
  
                              <a href="tel:+63822919657" class="flex items-center text-white no-underline">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="#007221" viewBox="0 0 20 20" class="w-6 h-6 mr-2">
                                      <path d="M2.75 1.5c-.69 0-1.25.56-1.25 1.25 0 7.89 6.61 14.5 14.5 14.5.69 0 1.25-.56 1.25-1.25V13c0-.69-.56-1.25-1.25-1.25a9.78 9.78 0 0 1-3.18-.54c-.35-.13-.74-.03-1 .23l-1.6 1.6a12.35 12.35 0 0 1-5.7-5.7l1.6-1.6c.26-.26.36-.65.23-1A9.78 9.78 0 0 1 5.25 3C4.56 3 4 3.56 4 4.25v2.5c0 .69-.56 1.25-1.25 1.25H2.75Z"/>
                                  </svg>
                                  <span class="text-lg">(082) 291-9657</span>
                              </a>
  
                              <a href="mailto:socc@davaocity.gov.ph" class="flex items-center text-white no-underline">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="#007221" viewBox="0 0 16 16" class="w-6 h-6 mr-2">
                                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm14 0L8 7.5L2 4h12Zm0 1.2l-6 3.6l-6-3.6V12h12V5.2Z"/>
                                  </svg>
                                  <span class="text-lg">socc@davaocity.gov.ph</span>
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
  
  
  const userStore = useUserStore()
  
  const state = reactive({
    email: null,
    password: null
  })
  
  async function login() {
    try {
        let params = {
            email: state.email,
            password: state.password
        }
        const response = await authService.login(params)
        if (response.data) {
            localStorage.setItem("_token", response.data.token)
            userStore.setUser(response.data.user)
            navigateTo('/dashboard')
        }
    } catch (error) {
        console.log(error)
    }
  }
  </script>