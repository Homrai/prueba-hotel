import { createSlice } from "@reduxjs/toolkit";

const initialState=[];

const hotelSlice = createSlice({
    name:"hotel",
    initialState,
    reducers:{
        addHotel:(state,action)=>{

        },
        agregarHoteles:(state,action)=>{
            state[0]=action.payload;
        },
        editarHotel:(state,action)=>{

        }
    }
});

export const {editarHotel,agregarHoteles}= hotelSlice.actions;

export default hotelSlice.reducer;