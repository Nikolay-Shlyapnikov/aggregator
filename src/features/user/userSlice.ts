import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ROLE, User} from "./types";

const initialState:User= {
   token:'',
    role:ROLE.GUEST,
    firstname: '',
    surname: '',
    middlename: ''
}


export const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        setUser:(state, action:PayloadAction<User>) => {
            return state = action.payload
        },
        updateUser:(state, action:PayloadAction<Partial<User>>) => {
            return state = {...state, ...action.payload}
        },
        deleteUser:(state, action:PayloadAction<User>) => {
           state = initialState
        },
    }
})

export const {setUser,updateUser, deleteUser} = userSlice.actions
export default userSlice.reducer

