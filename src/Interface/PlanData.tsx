export interface activities {
    id: number,
    planId: number,
    plan: {
        planId: number,
        activities: string[]
    },
    shopId: number,
    result?: boolean,
    startTime: Date,
    endTime: Date,
    currentStep: 1
}

export interface plan {
    planId: number,
    activities:
    {
        id: number,
        planId: number,
        shopId: number,
        result?: boolean,
        startTime: Date,
        endTime: Date,
        currentStep: number
    }[]
}

export type plans = plan[]