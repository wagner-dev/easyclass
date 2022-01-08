type DayName = "monday" | "tuesday" | "wednesday" | "thursday" | "friday"
type DayConfig = {
    matter: string,
    beginning: string,
    end: string,
    code: string
}
type Schedule = {
    [dayName in DayName | string]: DayConfig[]
}

type Authorization = {
    username?: string,
    mail: string,
    password: string
}

export type Config = {
    schedule: Schedule,
    authorization: Authorization
}