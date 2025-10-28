import BaseAPIService from "./BaseAPIService";

class ReportDetailsGroupsService extends BaseAPIService {
    async getReportDetailsGroups(): Promise<any> { 
        return await this.request(`/report_details_group`, "GET");
    }
    async getReportDetailsGroup(id: any): Promise<any> {
        return await this.request(`/report_details_group/${id}`, "GET");
    }

     async getReportDetailsGroupparams(params: object): Promise<any> {
        return await this.request(`/report_details_group`, "GET", params);
    }
  
}
export const reportDetailsGroupsService = new ReportDetailsGroupsService();