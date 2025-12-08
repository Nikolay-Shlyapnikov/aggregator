import { PROFILE_MODES } from '../components/ProfileModes/const'

export interface User {
  token: string
  role: ROLE
  profileMode: PROFILE_MODES
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
