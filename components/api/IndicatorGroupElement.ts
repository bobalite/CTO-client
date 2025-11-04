import BaseAPIService from "./BaseAPIService";

class IndicatorGroupElementService extends BaseAPIService {
    async getIndicatorGroups(): Promise<any> { 
        return await this.request(`/indicator_group_element`, "GET");
    }
    async getIndicatorGroup(id: any): Promise<any> {
        return await this.request(`/indicator_group_element/${id}`, "GET");
    }
}
export const cService = new IndicatorGroupElementService();