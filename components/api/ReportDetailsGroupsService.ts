import BaseAPIService from "./BaseAPIService";

class ReportDetailsGroupsService extends BaseAPIService {
    async getReportDetailsGroups(): Promise<any> { 
        return await this.request(`/report_details_groups`, "GET");
    }
    async getReportDetailsGroup(id: any): Promise<any> {
        return await this.request(`/report_details_groups/${id}`, "GET");
    }

     async getReportDetailsGroupparams(params: object): Promise<any> {
        return await this.request(`/report_details_groups`, "GET", params);
    }
  
}
export const reportDetailsGroupsService = new ReportDetailsGroupsService();