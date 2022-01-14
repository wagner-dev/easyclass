type DayName = "monday" | "tuesday" | "wednesday" | "thursday" | "friday"
export interface DayConfig {
    matter: string,
    beginning: string,
    end: string,
    code: string
}
export type Schedule = {
    [dayName in DayName | string]: DayConfig[]
}

interface Authorization {
    username?: string,
    email: string,
    password: string
}

export interface Config {
    schedule: Schedule,
    authorization: Authorization
}