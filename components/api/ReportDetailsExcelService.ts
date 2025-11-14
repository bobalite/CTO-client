import BaseAPIService from "./BaseAPIService";

class ReportDetailsExcelService extends BaseAPIService {
    
    async getReportExcelDetails(params: object): Promise<any> { 
        return await this.request(`/report_detail`, "GET", params);
    }

    async getReportExcelDetail(id: any): Promise<any> {
        return await this.request(`/report_detail/${id}`, "GET");
    }

    async createReportExcelDetails(params: object): Promise<any> {
        return await this.request(`/report_detail`, "POST", params);
    }

    async storeReportExcelDetails(params: object): Promise<any> {
        return await this.request(`/report_detail`, "POST", params);
    }

    async updateReportExcelDetails(params: object, id: any ): Promise<any> {
        return await this.request(`/report_detail/${id}`, "PUT", params);
    }

    async deleteReportExcelDetails(id: any): Promise<any> {
        return await this.request(`/report_detail/${id}`, "DELETE");
    }

    async saveExcelRows(params: object, id: any /* { indicator_no, report_year_id, rows: [...] } */) {
        // I prefer a dedicated route like /report_detail_excel/bulk to avoid collisions
        return await this.request(`/report_detail_excel/bulk`, "POST", params);
    }
    
    

}

export const reportDetailsExcelService = new ReportDetailsExcelService(); 