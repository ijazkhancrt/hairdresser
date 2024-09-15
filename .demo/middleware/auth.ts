// middleware/guest.ts
import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Check if the user is authenticated
  if (!authStore.is_login) {
    // Redirect to home page if already authenticated
    return navigateTo('/auth')
  }
})
