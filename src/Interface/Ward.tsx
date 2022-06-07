export interface ward {
    id: number;
    districtId: number;
    name: string;
}

export type wards = ward[];

export const emptyWard : ward = {id: -1, districtId: -1, name: ""} 