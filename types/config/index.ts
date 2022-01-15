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

interface FindWordInChat {
    keyword: string[]
}

interface Preference {
    find_word_in_chat: FindWordInChat 
}

export interface Config {
    schedule: Schedule,
    authorization: Authorization,
    preference: Preference
}