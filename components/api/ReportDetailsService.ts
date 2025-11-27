import BaseAPIService from "./BaseAPIService";

class ReportDetailsService extends BaseAPIService {
    
    async getReportDetails(params: object): Promise<any> { 
        return await this.request(`/report-detail`, "GET", params);
    }

    async getReportDetail(id: any): Promise<any> {
        return await this.request(`/report-detail/${id}`, "GET");
    }

    async createReportDetails(params: object): Promise<any> {
        return await this.request(`/report-detail`, "POST", params);
    }

    async storeReportDetails(params: object): Promise<any> {
        return await this.request(`/report-detail`, "POST", params);
    }

    async updateReportDetails(params: object, id: any ): Promise<any> {
        return await this.request(`/report-detail/${id}`, "PUT", params);
    }

    async deleteReportDetails(id: any): Promise<any> {
        return await this.request(`/report-detail/${id}`, "DELETE");
    }
   

}

export const reportDetailsService = new ReportDetailsService(); 