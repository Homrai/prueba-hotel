import { createSlice } from "@reduxjs/toolkit";

const initialState=[];

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state,action)=>{
            state[0]=action.payload;
        },
        logout:(state,action)=>{
            state[0]="";
        }
    }
});

export const {login,logout}= userSlice.actions;

export default userSlice.reducer;