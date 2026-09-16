// plugins/inactivity.client.js

import { useRouter } from '#app'
import { authService } from '~/api/AuthService'

export default defineNuxtPlugin(() => {
  const router = useRouter()

  let inactivityTimer = null

  const INACTIVITY_LIMIT = 5 * 60 * 1000 // 5 minutes

  const logoutUser = async () => {
    // Do not auto-logout demo sessions
    if (sessionStorage.getItem('cto-demo-session')) {
      return
    }

    // If there is no token, there is nothing to log out
    const token = localStorage.getItem('_token')

    if (!token) {
      return
    }

    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('_token')
      sessionStorage.removeItem('_token')
      sessionStorage.removeItem('cto-demo-session')

      await router.push('/')
    }
  }

  const resetTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
    }

    inactivityTimer = setTimeout(() => {
      void logoutUser()
    }, INACTIVITY_LIMIT)
  }

  const activityEvents = [
    'click',
    'mousemove',
    'keydown',
    'scroll',
    'touchstart',
  ]

  activityEvents.forEach((event) => {
    window.addEventListener(
      event,
      resetTimer,
      {
        passive: true,
      },
    )
  })

  // Start inactivity timer
  resetTimer()
})