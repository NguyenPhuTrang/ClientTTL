import axiosInstance, { ApiService } from "../plugins/axios";

class PaymentApiService extends ApiService {
    constructor() {
        super({ baseUrl: '/payment' }, axiosInstance);
    }

    createPaymentLink<P, R>(params: P): Promise<R> {
        return this.client.post(`${this.baseUrl}/create`, params);
    }

    getPaymentList<R>(query?: Record<string, any>): Promise<R> {
        return this.client.get(`${this.baseUrl}`, { params: query });
    }

    getPaymentDetail<R>(orderCode: number): Promise<R> {
        return this.client.get(`${this.baseUrl}/${orderCode}`);
    }

    cancelPaymentLink<P, R>(orderCode: number, params?: P): Promise<R> {
        return this.client.put(`${this.baseUrl}/cancel/${orderCode}`, params);
    }
}

export const paymentApi = new PaymentApiService();