import BaseAPIService from "./BaseAPIService";

class RightsService extends BaseAPIService {
    async getRights(params: object): Promise<any> { 
        return await this.request(`/childrens_rights`, "GET", params);
    }

    async getRight(id: any): Promise<any> {
        return await this.request(`/childrens_rights/${id}`, "GET");
    }

    async createRights(params: object): Promise<any> {
        return await this.request(`/childrens_rights`, "POST", params);
    }

    async updateRights(id: any, params: object): Promise<any> {
        return await this.request(`/childrens_rights/${id}`, "PUT", params);
    }

    async deleteRights(id: any): Promise<any> {
        return await this.request(`/childrens_rights/${id}`, "DELETE");
    }
}

export const Childrens_rightsService = new RightsService();