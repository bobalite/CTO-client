import BaseAPIService from "./BaseAPIService";

class GraphService extends BaseAPIService {
    async getGraphs(params: object): Promise<any> {
        return await this.request(`/graphs`, "GET", params);
    }

    async getGraph(uuid: any): Promise<any> {
        return await this.request(`/graphs/${uuid}`, "GET");
    }
}

export const graphService = new GraphService();