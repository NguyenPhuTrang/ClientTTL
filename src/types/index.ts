export interface RootState {
    product: any[];
    userProfile: UserProfile;
};

export interface LoginFormInputs {
    email: string;
    password: string;
}

export interface Option {
    title: string;
}

export interface OptionGroup {
    label: string;
    options: Option[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    rating: number;
    sale: string;
};

export interface User {
    id: string;
    name: string;
    email: string;
    numberPhone: string;
    birthday: string;
    avatarUrl: string;
};

export interface userForm {
    name: string;
    email: string;
    birthday: string;
    numberPhone: string;
    avatarUrl: string;
    password?: string;
    role?: string;
}

export interface updateUserPropsItem {
    name: string;
    email: string;
    numberPhone: string;
    birthday: string;
    avatarUrl: string;
}

export interface updateUserProps {
    id: string;
    body: updateUserPropsItem;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    birthday: string;
    numberPhone: string;
    avatarUrl: string;
};

export interface RegisterFormInputs {
    name: string;
    email: string;
    numberPhone: string;
    birthday: string;
    avatarUrl: string;
    role?: string;
    password: string;
}
