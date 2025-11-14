import BaseAPIService from "./BaseAPIService";

class ReportDetailsService extends BaseAPIService {
    
    async getReportDetails(params: object): Promise<any> { 
        return await this.request(`/report_detail`, "GET", params);
    }

    async getReportDetail(id: any): Promise<any> {
        return await this.request(`/report_detail/${id}`, "GET");
    }

    async createReportDetails(params: object): Promise<any> {
        return await this.request(`/report_detail`, "POST", params);
    }

    async storeReportDetails(params: object): Promise<any> {
        return await this.request(`/report_detail`, "POST", params);
    }

    async updateReportDetails(params: object, id: any ): Promise<any> {
        return await this.request(`/report_detail/${id}`, "PUT", params);
    }

    async deleteReportDetails(id: any): Promise<any> {
        return await this.request(`/report_detail/${id}`, "DELETE");
    }
    
    async getCountDetails(params: object, group_id: number): Promise<any> { 
        return await this.request(`/report_detail/${group_id}`, "GET", params );
    }

  

}

export const reportDetailsService = new ReportDetailsService(); 