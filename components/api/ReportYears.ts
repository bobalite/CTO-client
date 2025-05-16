import BaseAPIService from "./BaseAPIService";

class ReportYearService extends BaseAPIService {
    async getReportYears(params: object): Promise<any> { 
        return await this.request(`/report_year`, "GET");
    }
    async getReportYear(id: any): Promise<any> {
        return await this.request(`/report_year/${id}`, "GET");
    }
  
    async createReportYear(params: object): Promise<any> {
        return await this.request(`/report_year`, "POST", params);
    }

    async updateReportYear(id: any, params: object): Promise<any> {
        return await this.request(`/report_year/${id}`, "PUT", params);
    }

    async deleteReportYear(id: any): Promise<any> {
        return await this.request(`/report_year/${id}`, "DELETE");
    }
}

export const report_yearService = new ReportYearService();