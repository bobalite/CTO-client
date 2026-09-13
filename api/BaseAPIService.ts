import APIError from './APIError'
import { useRuntimeConfig, navigateTo } from '#app'
import { $fetch } from 'ofetch'

class BaseAPIService {
  async request(
    url: string,
    method: string,
    params: Record<string, any> | null = null,
  ): Promise<any> {
    const runtimeConfig = useRuntimeConfig()

    const token = import.meta.client
      ? localStorage.getItem('_token')
      : null

    const config: {
      baseURL: string
      method: string
      headers: Record<string, string>
      query?: Record<string, any>
      body?: Record<string, any> | null
    } = {
      baseURL: runtimeConfig.public.apiBaseUrl as string,

      method,

      headers: {
        Accept: 'application/json',

        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
    }

    /*
     * GET requests use query parameters.
     */
    if (method.toUpperCase() === 'GET') {
      if (params) {
        config.query = params
      }
    }

    /*
     * POST, PUT, PATCH, DELETE requests
     * send request body.
     */
    else {
      if (params) {
        config.body = params
      }
    }

    try {
      return await $fetch(url, config)
    } catch (error: any) {
      const status =
        error?.statusCode ??
        error?.status ??
        error?.response?.status

      const data =
        error?.data ??
        error?.response?._data ??
        error?.response?.data

      /*
       * Unauthorized.
       */
      if (status === 401) {
        await this.revokeAccess()

        throw new APIError(
          data ?? {
            message: 'Unauthenticated.',
          },
        )
      }

      /*
       * Forbidden.
       */
      if (status === 403) {
        throw new APIError(
          data ?? {
            message:
              'You do not have permission to perform this action.',
          },
        )
      }

      /*
       * Bad request / validation / missing resource.
       */
      if (
        status === 400 ||
        status === 404 ||
        status === 422
      ) {
        throw new APIError(
          data ?? {
            message: 'The request could not be processed.',
          },
        )
      }

      /*
       * Too many requests.
       */
      if (status === 429) {
        throw new APIError(
          data ?? {
            message:
              'Too many requests. Please try again later.',
          },
        )
      }

      /*
       * Laravel / server error.
       */
      if (status && status >= 500) {
        throw new APIError({
          message:
            'The server is currently unavailable. Please try again later.',
        })
      }

      /*
       * Network or unknown error.
       */
      throw new APIError({
        message:
          data?.message ??
          error?.message ??
          'Network error. Please check your connection.',
      })
    }
  }

  async revokeAccess(): Promise<void> {
    if (!import.meta.client) {
      return
    }

    localStorage.removeItem('_token')

    await navigateTo('/login')
  }
}

export default BaseAPIService