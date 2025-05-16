import BaseAPIService from "./BaseAPIService";

class UserDashboardWidgetsService extends BaseAPIService {

  async getUserDashboardWidgets(): Promise<any> { 
    return await this.request(`/user_dashboard_widgets`, "GET");
  }

  async getUserDashboardWidget(id: any): Promise<any> {
    return await this.request(`/user_dashboard_widgets/${id}`, "GET");
}
 
  async createUserDashboardWidget(params: object): Promise<any> {
    return await this.request(`/user_dashboard_widgets`, "POST", params);
  }

 
  async deleteUserDashboardWidgets(id: any): Promise<any> {
    return await this.request(`/user_dashboard_widgets/${id}`, "DELETE");
  }

  async clearUserDashboardWidgets(id: any, params: object): Promise<any> {
    return await this.request(`/user_dashboard_widgets/${id}`, "DELETE", params);
  } 


}

export const userDashboardWidgetsService = new UserDashboardWidgetsService();