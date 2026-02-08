// import APIError from "./APIError";

// import { useRuntimeConfig, navigateTo } from "#app"; // added from chatgpt suggestion
// import { $fetch } from "ofetch"; // added from chatgpt suggestion

// class BaseAPIService {
//     async request(
//         url: string,
//         method: string,
//         //params: object = null
//         params: Record<string, any> | null = null
//     ): Promise<any> {
//         const runtimeConfig = useRuntimeConfig();
//         let config = null;
//         if (method === "GET") {
//             // GET
//             config = {
//                 baseURL: runtimeConfig.public.apiBaseURL,
//                 method: method,
//                 headers: {
//                     Authorization: "Bearer " + localStorage.getItem("_token"),
//                 },
//                 async onRequest({ request, options }) {
//                     options.params = params;
//                 },
//             };
//         } else {
//             // POST, PUT, DELETE
//             config = {
//                 baseURL: runtimeConfig.public.apiBaseURL,
//                 method: method,
//                 headers: {
//                     Authorization: "Bearer " + localStorage.getItem("_token"),
//                 },
//                 body: params,
//             };
//         }

//         try {
//             return await $fetch(url, config);
//         } catch (error) {
//             switch (error.response.status) {
//                 case 400:
//                      throw new APIError(error.response._data);
//                     // throw new APIError("400 Bad Request");
//                 case 422:
//                     throw new APIError(error.response._data);
//                     // throw new APIError("422 Unprocessable Entity");
//                 case 404:
//                     throw navigateTo("/Login");
//                     throw new APIError(error.response._data);
//                     // throw new APIError("404 Not Found");
//                 case 401:
//                     this.revokeAccess();
//                     throw new APIError(error.response._data);
//                     // throw new APIError("401 Unauthorized");
//                 case 500:
//                     this.revokeAccess();
//                     //throw new APIError(error.response._data);
//                     throw new APIError({
//                         message:
//                             "API error - 500 Internal Server Error. Please try again later.",
//                     });
//                 default:
//                     throw new APIError({
//                         message:
//                             "Something went wrong. Please try again. If the problem persists, contact your system administrator",
//                     });
//             }
//         }
//     }

//     revokeAccess() {
//         localStorage.removeItem("_token");
//         navigateTo("/Login");
//     }
// }

// export default BaseAPIService;

//-------------------------------------------------------------------------------------changed---------------------------------------------------------------------

// import APIError from "./APIError";
// import { useRuntimeConfig,  navigateTo } from "#app";
// import { $fetch } from "ofetch"; // added from chatgpt suggestion

// class BaseAPIService {
//     async request(
//         url: string,
//         method: string,
//         params: Record<string, any> | null = null
//     ): Promise<any> {
//         const runtimeConfig = useRuntimeConfig();

//         const config: any = {
//             baseURL: runtimeConfig.public.apiBaseURL,
//             method,
//             headers: {
//                 Authorization: "Bearer " + localStorage.getItem("_token"),
//             },
//         };

//         if (method === "GET") {
//             config.params = params;
//         } else {
//             config.body = params;
//         }

//         try {
//             return await $fetch(url, config);
//         } catch (error: any) {
//             if (error?.response?.status) {
//                 switch (error.response.status) {
//                     case 400:
//                     case 422:
//                     case 404:
//                     case 401:
//                         if (error.response.status === 401) this.revokeAccess();
//                         if (error.response.status === 404) navigateTo("/login");
//                         throw new APIError(error.response._data);

//                     case 500:
//                         //this.revokeAccess();
//                         throw new APIError({
//                             message:
//                                 "API error - 500 Internal Server Error. Please try again later.",
//                         });

//                     default:
//                         throw new APIError({
//                             message:
//                                 "Something went wrong. Please try again. If the problem persists, contact your system administrator.",
//                         });
//                 }
//             } else {
//                 // No response (network or server unreachable)
//                 throw new APIError({
//                     message: "Network error. Please check your connection.",
//                 });
//             }
//         }
//     }

//     revokeAccess() {
//         localStorage.removeItem("_token");
//         navigateTo("/login");
//     }
// }

// export default BaseAPIService;


//------------------------------------------------------------------------------------------------------------------------------------------------------


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


