export interface activities {
    id: number,
    planId: number,
    plan: {
        planId: number,
        activities: string[]
    },
    shopId: number,
    result?: boolean,
    startTime: string,
    endTime: string,
    currentStep: 1
}

export interface plan {
    planId: number,
    activities: activity[]
}

export type plans = plan[]

export interface activity {
    id: number,
    planId: number,
    shopId: number,
    result: boolean,
    startTime: string,
    endTime: string,
    currentStep: number
}

export interface a extends activity {
    plan: string
}