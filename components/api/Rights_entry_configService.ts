import BaseAPIService from "./BaseAPIService";

class Rights_entry_configService extends BaseAPIService {

    async getRights_entry_config(params: object): Promise<any> {
        return await this.request(`/rights_entry_config`, "GET", params); // tested this works 
    }

    async getRECByRightsId(rights_id: any): Promise<any> { 
        return await this.request(`/rights_entry_config/${rights_id}`, "GET");
    }
 
    // async getRECBySequenceHeader(sequence_header: any): Promise<any> { 
    //    return await this.request(`/rights_entry_config/${sequence_header}`, "GET"); 
    // }
   
}

export const Rights_entry_configServices = new Rights_entry_configService(); 