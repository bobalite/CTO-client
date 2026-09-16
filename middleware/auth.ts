export default defineNuxtRouteMiddleware(async () => {
  if (!import.meta.client) {
    return
  }

  const token = localStorage.getItem('_token')

  if (!token) {
    return navigateTo('/login')
  }

  const config = useRuntimeConfig()

  try {
    const response = await $fetch<{
      data?: {
        id?: string
        username?: string
        fname?: string
        mname?: string | null
        lname?: string
        email?: string
        mailing_address?: string | null
      }
    }>(
      `${String(config.public.apiBaseUrl || '').replace(/\/+$/, '')}/me`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!response?.data) {
      localStorage.removeItem('_token')
      return navigateTo('/login')
    }
  } catch (error: any) {
    const status =
      error?.statusCode ??
      error?.status ??
      error?.response?.status

    if (status === 401 || status === 403) {
      localStorage.removeItem('_token')
      return navigateTo('/login')
    }

    // For other errors, fail closed and prevent access.
    localStorage.removeItem('_token')
    return navigateTo('/login')
  }
})