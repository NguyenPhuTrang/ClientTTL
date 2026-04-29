import { IBodyResponse } from "../common/interfaces";
import axiosInstance, { ApiService } from "../plugins/axios";

class CartApiService extends ApiService {
    constructor() {
        super({ baseUrl: '/cart' }, axiosInstance);
    }

    getMyCart<R>(): Promise<R> {
        return this.client.get(`${this.baseUrl}/my-cart`);
    }

    addToCart<P, R>(params: P): Promise<R> {
        return this.client.post(`${this.baseUrl}/add`, params);
    }

    updateCartItem<P, R>(params: P): Promise<R> {
        return this.client.patch(`${this.baseUrl}/update`, params);
    }

    removeCartItem<R>(productId: string): Promise<R> {
        return this.client.delete(`${this.baseUrl}/remove/${productId}`);
    }

    clearCart<R>(): Promise<R> {
        return this.client.delete(`${this.baseUrl}/clear`);
    }
}

export const cartApi = new CartApiService();