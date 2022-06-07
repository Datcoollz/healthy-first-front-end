export interface certificate {
    id: number;
    time: string;
    type: number;
    shop_id: number;
    valid_until: string;
    shop: {
        id: number,
        name: string,
        address: string,
        ward: number,
        district: number,
        phone_number: string,
        is_product: boolean,
        is_seller: boolean,
        certificates: string[]
    }
}

export type certificates = certificate[]