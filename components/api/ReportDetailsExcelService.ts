// components/api/ReportDetailsExcelService.ts
import BaseAPIService from "./BaseAPIService";

class ReportDetailsExcelService extends BaseAPIService {

    async getReportExcelDetails(params: object): Promise<any> { 
        return await this.request(`/report-detail-excel`, "GET", params);
    }

    async getReportExcelDetail(id: any): Promise<any> {
        return await this.request(`/report-detail-excel/${id}`, "GET");
    }

    async createReportExcelDetails(params: object): Promise<any> {
        return await this.request(`/report-detail-excel`, "POST", params);
    }

    async storeReportExcelDetails(params: object): Promise<any> {
        return await this.request(`/report-detail-excel`, "POST", params);
    }

    async updateReportExcelDetails(params: object, id: any ): Promise<any> {
        return await this.request(`/report-detail-excel/${id}`, "PUT", params);
    }

    async deleteReportExcelDetails(id: any): Promise<any> {
        return await this.request(`/report-detail-excel/${id}`, "DELETE");
    }

    /**
     * Bulk save Excel rows
     * payload: { rows: [ { indicator_no, header_name1, header_value1, ... } ] }
     */
    async saveExcelRows(payload: { rows: object[] }): Promise<any> {
        return await this.request(`/report_detail_excel/bulk`, "POST", payload);
    }
}

export const reportDetailsExcelService = new ReportDetailsExcelService();
