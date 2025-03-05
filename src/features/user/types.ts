export interface User {
    firstname?: string
    middlename?: string
    surname?: string
    token?: string
    role?: ROLE
    email?: string
    phone?: string
}

export enum ROLE {
    USER    ,
    ADMIN   ,
    GUEST
}