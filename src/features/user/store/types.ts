export interface User {
  token: string
  role: ROLE
  email: string
  isConfirmed: boolean
}

export enum ROLE {
  USER,
  ADMIN,
  GUEST,
  AUTHOR,
}

export type Credentials = {
  email: string
  password: string
}
