import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from '../img/logo.jpg';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';

const HotelStoreAgent = () => {
    const navigate= useNavigate();
    const dispatch=useDispatch();
    const cerrarSesion=()=>{
        dispatch(logout(""));
        navigate("/")
    }
    const navegarInicio=()=>{
        navigate("/");
    }
  return (
    <div >
    <div className="navbar navbar-dark bg-dark d-flex">
        <div className="d-flex text-light ms-3">
            <h1  onClick={navegarInicio}>Travel</h1>
            <img  onClick={navegarInicio} src={logo} className='rounded-circle ms-2' width={50} alt="logo travel" />
            <Link to={"/admin"} className='align-self-center ms-2 text-light'>Admi hoteles</Link>
            <Link to={"reservas"} className='align-self-center ms-2 text-light'>Reservaciones</Link>
        </div>            
        <button className="btn btn-success me-3" onClick={cerrarSesion}>Cerrar Sesion</button>
    </div>
    <Outlet/>

</div>
  )
}

export default HotelStoreAgent
