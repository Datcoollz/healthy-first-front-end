export interface shop {
    id?: number;
    name: string;
    address: string;
    ward: number | 0;
    district: number | 0;
    phone_number: string;
    is_product: boolean;
    is_seller: boolean;
    certificates?: {
        id: number,
        time: string,
        type: number,
        shop_id: number,
        valid_until: string,
        shop: string,
    }[];
}

export interface s {
    id: number;
    name: string;
    address: string;
    ward: number;
    district: number;
    phone_number: string;
    is_product: boolean;
    is_seller: boolean;
    certificates: {
        id: number;
        time: string;
        type: number;
        shop_id: number;
        valid_until: Date;
    }[];
}

export type shops = s[];

export const emptyShop: shop = {
    name: "", address: "", ward: -1, district: -1,
    phone_number: "", is_product: false, is_seller: false,
};

export const emptyS: s = {
    id: -1,
    name: "", address: "", ward: -1, district: -1,
    phone_number: "", is_product: false, is_seller: false,
    certificates: []
}