import BaseAPIService from "./BaseAPIService";

class RolesService extends BaseAPIService {
    async getRoles(): Promise<any> { 
        return await this.request(`/roles`, "GET");
    }
    async getRole(id: any): Promise<any> {
        return await this.request(`/roles/${id}`, "GET");
    }
}
export const rolesService = new RolesService();