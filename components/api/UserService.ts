import BaseAPIService from "./BaseAPIService";

class UserService extends BaseAPIService {

    async me(): Promise<any> {
        // backend route will be GET /api/me
        return await this.request(`/me`, "GET");
    }


    async getUsers(params: object): Promise<any> { 
        //return await this.request(`/users`, "GET", params);
        return await this.request(`/users`, "GET");
    }

    async getUser(id: any): Promise<any> {
        return await this.request(`/users/${id}`, "GET");
    }

    async createUser(params: object): Promise<any> {
        return await this.request(`/users`, "POST", params);
    }

    async updateUser(id: any, params: object): Promise<any> {
        return await this.request(`/users/${id}`, "PUT", params);
    }

    async deleteUser(id: any): Promise<any> {
        return await this.request(`/users/${id}`, "DELETE");
    }
}

export const userService = new UserService();