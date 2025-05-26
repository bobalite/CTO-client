import APIError from "./APIError";

class BaseAPIService {
    async request(
        url: string,
        method: string,
        params: object = null
    ): Promise<any> {
        const runtimeConfig = useRuntimeConfig();
        let config = null;
        if (method === "GET") {
            // GET
            config = {
                baseURL: runtimeConfig.public.apiBaseURL,
                method: method,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("_token"),
                },
                async onRequest({ request, options }) {
                    options.params = params;
                },
            };
        } else {
            // POST, PUT, DELETE
            config = {
                baseURL: runtimeConfig.public.apiBaseURL,
                method: method,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("_token"),
                },
                body: params,
            };
        }

        try {
            return await $fetch(url, config);
        } catch (error) {
            switch (error.response.status) {
                case 400:
                     throw new APIError(error.response._data);
                    // throw new APIError("400 Bad Request");
                case 422:
                    throw new APIError(error.response._data);
                    // throw new APIError("422 Unprocessable Entity");
                case 404:
                    throw navigateTo("/404");
                    throw new APIError(error.response._data);
                    // throw new APIError("404 Not Found");
                case 401:
                    //this.revokeAccess();
                    throw new APIError(error.response._data);
                    // throw new APIError("401 Unauthorized");
                case 500:
                    //this.revokeAccess();
                    //throw new APIError(error.response._data);
                    throw new APIError({
                        message:
                            "API error - 500 Internal Server Error. Please try again later.",
                    });
                default:
                    throw new APIError({
                        message:
                            "Something went wrong. Please try again. If the problem persists, contact your system administrator",
                    });
            }
        }
    }

    revokeAccess() {
        localStorage.removeItem("_token");
        navigateTo("/");
    }
}

export default BaseAPIService;