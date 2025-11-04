import BaseAPIService from "./BaseAPIService";

class IndicatorCategoryService extends BaseAPIService {
    /**
     * 🟢 GET all indicator categories (optionally with filters)
     * Matches backend: IndicatorCategoryController@index
     */
    async getIndicatorCategories(filters: Record<string, any> = {}): Promise<any> {
        const query = new URLSearchParams(filters).toString();
        const url = query ? `/indicator_category?${query}` : `/indicator_category`;
        return await this.request(url, "GET");
    }

    /**
     * 🟢 GET single indicator category by ID
     * Matches backend: IndicatorCategoryController@show
     */
    async getIndicatorCategory(id: number): Promise<any> {
        return await this.request(`/indicator_category/${id}`, "GET");
    }

    /**
     * 🟢 CREATE a new indicator category
     * Matches backend: IndicatorCategoryController@store
     */
    async createIndicatorCategory(data: Record<string, any>): Promise<any> {
        return await this.request(`/indicator_category`, "POST", data);
    }

    /**
     * 🟢 UPDATE an existing indicator category
     * Matches backend: IndicatorCategoryController@update
     */
    async updateIndicatorCategory(id: number, data: Record<string, any>): Promise<any> {
        return await this.request(`/indicator_category/${id}`, "PUT", data);
    }

    /**
     * 🟢 DELETE an indicator category
     * Matches backend: IndicatorCategoryController@destroy
     */
    async deleteIndicatorCategory(id: number): Promise<any> {
        return await this.request(`/indicator_category/${id}`, "DELETE");
    }
}

export const indicatorService = new IndicatorCategoryService();
