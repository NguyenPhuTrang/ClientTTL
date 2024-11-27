import { IBodyRegister, IBodyResponse } from "../../../common/interfaces";
import axiosInstance, { ApiService } from "../../../plugins/axios";
import { updateUserProps } from "../../../types";
import { IBodyLogin, ILoginResponse } from "../interfaces";

class AuthApiService extends ApiService {
    login(body: IBodyLogin): Promise<IBodyResponse<ILoginResponse>> {
        return this.client.post(`${this.baseUrl}/login-user`, body);
    }
    register(body: IBodyRegister): Promise<IBodyResponse<ILoginResponse>> {
        return this.client.post(`${this.baseUrl}/register-user`, body);
    }
    updateProfile(body: updateUserProps): Promise<IBodyResponse<any>> {
        return this.client.patch(`user/${body.id}`, body.body);
    }
}

export const authApi = new AuthApiService({
    baseUrl: '/auth',
}, axiosInstance)