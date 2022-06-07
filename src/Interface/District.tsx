export interface d {
    id: number;
    name: string;
}

export type districts = d[];

export interface district extends d {
    wards: {
        id: number;
        districtId: number;
        district: string;
        name: string;
    }[];
}

export const emptyDistrict: district = { id: -1, name: "", wards: [] } 