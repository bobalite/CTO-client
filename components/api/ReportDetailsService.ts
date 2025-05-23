import BaseAPIService from "./BaseAPIService";

class ReportDetailsService extends BaseAPIService {
    async getReportDetails(params: object): Promise<any> { 
        return await this.request(`/report_details`, "GET", params);
    }

    async getReportDetailsTotaled(params: object): Promise<any> { 
        return await this.request(`/report_details`, "GET", params);
    }
    

    async getReportDetail(id: any): Promise<any> {
        return await this.request(`/report_details/${id}`, "GET");
    }

    async createReportDetails(params: object): Promise<any> {
        return await this.request(`/report_details`, "POST", params);
    }

    async updateReportDetails(params: object, id: any ): Promise<any> {
        return await this.request(`/report_details/${id}`, "PUT", params);
    }

    async deleteReportDetails(id: any): Promise<any> {
        return await this.request(`/report_details/${id}`, "DELETE");
    }
    
    async getCountDetails(params: object, group_id: number): Promise<any> { 
        return await this.request(`/report_details/${group_id}`, "GET", params );
    }

}

export const reportDetailsService = new ReportDetailsService();