import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { agregarHoteles } from '../features/hotelSlice';
import { addReserva } from '../features/reservasSlice';



const Auth = () => {
    const dispatch=useDispatch();
    const datosHotelRedux= useSelector(state=>state.hotel);
    const datosReservasRedux= useSelector(state=>state.reserva);
    const datos = JSON.parse(localStorage.getItem("hoteles"));
    const reservas = JSON.parse(localStorage.getItem("reservas"));
    if (datosHotelRedux.length===0) {
        dispatch(agregarHoteles(datos));
    }
    if (datosReservasRedux.length===0) {
        dispatch(addReserva(reservas));
    }
    const usuario = useSelector(state=>state.user);
    if (usuario[0]==="agente") {
        return <Outlet/>
    } else {
        return <Navigate to="/login"/>
    }
}

export default Auth
