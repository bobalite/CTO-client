import BaseAPIService from "./BaseAPIService";

class ReportDetailsGroupsService extends BaseAPIService {
    async getReportDetailsGroups(params: object): Promise<any> { 
        return await this.request(`/report-details-group`, "GET", params);
    }
    async getReportDetailsGroup(id: any): Promise<any> {
        return await this.request(`/report-details-group/${id}`, "GET");
    }

    //  async getReportDetailsGroupparams(params: object): Promise<any> {
    //     return await this.request(`/report_details_group`, "GET", params);
    // }
  
}
export const reportDetailsGroupsService = new ReportDetailsGroupsService();