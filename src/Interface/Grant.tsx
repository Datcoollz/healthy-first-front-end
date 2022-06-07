export interface grant {
    id: number,
    userId: number,
    districtId?: number,
    wardId?: number
}

export type grants = grant[]