import { createSlice } from "@reduxjs/toolkit";

const initialState=[];

const reservasSlice = createSlice({
    name:"reserva",
    initialState,
    reducers:{
        addReserva:(state,action)=>{
            state[0]=action.payload;
        },
    }
});

export const {addReserva}= reservasSlice.actions;

export default reservasSlice.reducer;