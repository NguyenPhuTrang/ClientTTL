export type IBodyLogin = {
    email?: string;
    password?: string;
    // code?: string;
    // redirectUrl?: string;
}

export type ILoginResponse = {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
};

export interface IUserUpdatePassword {
    oldPassword: string;
    newPassword: string;
}

export interface IUserChangePassword {
    password?: string;
    code: string;
    email: string;
}

export interface RegisterFormInputs {
    name: string;
    email: string;
    numberPhone: string;
    birthday: string;
    avatarUrl: string;
    role?: string;
    password: string;
}