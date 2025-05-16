import BaseAPIService from "./BaseAPIService";

class AgenciesService extends BaseAPIService {
    async getAgencies(): Promise<any> { 
        return await this.request(`/agencies`, "GET");
    }
    async getAgency(id: any): Promise<any> {
        return await this.request(`/agencies/${id}`, "GET");
    }
}
export const agenciesService = new AgenciesService();