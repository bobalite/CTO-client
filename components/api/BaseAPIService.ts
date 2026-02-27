
import APIError from "./APIError";
import { useRuntimeConfig, navigateTo } from "#app";
import { $fetch } from "ofetch";

class BaseAPIService {
  async request(
    url: string,
    method: string,
    params: Record<string, any> | null = null
  ): Promise<any> {
    const runtimeConfig = useRuntimeConfig();

    // Nuxt 3: use import.meta.client (avoids TS squiggles)
    const token = import.meta.client ? localStorage.getItem("_token") : null;

    const config: {
      baseURL: string;
      method: string;
      headers: Record<string, string>;
      query?: Record<string, any>;
      body?: Record<string, any> | null;
    } = {
      baseURL: runtimeConfig.public.apiBaseURL as string,
      method,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/json",
      },
    };

    // ofetch uses `query` for GET params
    if (method.toUpperCase() === "GET") {
      if (params) config.query = params;
    } else {
      config.body = params;
    }

    try {
      return await $fetch(url, config);
    } catch (error: any) {
      // ofetch error shape: error.status + error.data
      const status: number | undefined = error?.status;
      const data: any = error?.data;

      if (status === 401) {
        this.revokeAccess();
        throw new APIError(data ?? { message: "Unauthorized" });
      }

      if (status === 400 || status === 404 || status === 422) {
        throw new APIError(data ?? { message: "Request error" });
      }

      if (status === 500) {
        throw new APIError({
          message: "API error - 500 Internal Server Error. Please try again later.",
        });
      }

      throw new APIError({
        message: data?.message ?? "Network error. Please check your connection.",
      });
    }
  }

  revokeAccess() {
    if (import.meta.client) {
      localStorage.removeItem("_token");
    }
    return navigateTo("/login");
  }
}

export default BaseAPIService;


