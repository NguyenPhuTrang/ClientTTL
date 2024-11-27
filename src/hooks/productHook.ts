import { ICommonListQuery } from "../common/interfaces";
import { productApi } from "../services/product.service";

export async function getAllProducts(query: ICommonListQuery): Promise<any> {
    try {
        const response = await productApi.getAll<any>(query);
        return response;
    } catch (error) {
        console.error("Error fetching all products:", error);
        throw error;
    }
}