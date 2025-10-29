import BaseAPIService from "./BaseAPIService";

class AuthService extends BaseAPIService {
    async login(params: object): Promise<any> {
        return await this.request(`/auth/login`, "POST", params);
    }

    async logout(): Promise<any> {
        return await this.request(`/auth/logout`, "POST");
        //return await authService.logout()
    }
}

export const authService = new AuthService();