import { configureStore } from "@reduxjs/toolkit";
import usuariosSlice from "../features/userSlice";
import hotelesSlice from "../features/hotelSlice";
import reservasSlice from "../features/reservasSlice";

export const store = configureStore({
    reducer:{
        user:usuariosSlice,
        hotel:hotelesSlice,
        reserva:reservasSlice
    }
})