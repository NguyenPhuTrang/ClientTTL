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

export interface ProductColor {
    label: string;
    value: string;
    thumbnail?: string;
}

export interface ProductShipping {
    isFreeShip: boolean;
    estimatedDelivery: string;
}

export interface Product {
    id?: string;
    _id?: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    image?: string;
    images?: string[];
    rating: number;
    totalRatings?: number;
    totalSold?: number;
    sale: number;
    condition?: 'New' | 'Used';
    colors?: ProductColor[];
    sizes?: string[];
    categoryId?: string | null;
    shipping?: ProductShipping;
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