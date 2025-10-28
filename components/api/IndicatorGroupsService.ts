import BaseAPIService from "./BaseAPIService";

class IndicatorGroupsService extends BaseAPIService {
    async getIndicatorGroups(): Promise<any> { 
        return await this.request(`/IndicatorGroups`, "GET");
    }
    async getIndicatorGroup(id: any): Promise<any> {
        return await this.request(`/IndicatorGroup/${id}`, "GET");
    }
}
export const cService = new IndicatorGroupsService();