import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.jpg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/userSlice';
import { obtenerFecha } from '../utils/fechas';
import { Accordion } from 'react-bootstrap';

const HotelStoreUser = () => {
    const { fechaMinima } = obtenerFecha();
    const reserva={
        fechaEntrada: fechaMinima,
        fechaSalida: fechaMinima,
        personas:"",
        ciudad:""
    }
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const hotel = useSelector(state=>state.hotel);
    const user = useSelector(state=>state.user[0]);
    const [usuario,setUsuario]=useState(user);
    const [hoteles,setHoteles]=useState(hotel);
    const [hotelesMostrar,setHotelesMostrar]=useState([]);
    const [ciudades,setCiudades]=useState([]);
    const [reservacion,setReservacion]=useState(reserva);
    //const [datosReserva,setDatosReserva]=useState({});

    const filtrarCiudades=(datos)=>{
        let city = datos.filter(item=>{
            let hab=item.habitaciones.filter(a=>a.habilitado===true);
            item.habitaciones=hab;
            return item
        });
        city = city.filter(item=>item.habitaciones.length!==0);
        city = city.map(item=>item.ciudad);
        city = new Set(city);
        city=[...city];
        setCiudades(city);
    };

    useEffect(()=>{
        setHoteles(JSON.parse(localStorage.getItem("hoteles")));
        filtrarCiudades(JSON.parse(localStorage.getItem("hoteles")));
    },[hotel]);

    useEffect(()=>{
        setUsuario(user);
    },[user]);

    const handleOnChangeForm=(e)=>{
        const {name,value}=e.target;
        setReservacion(old=>({...old,[name]:value}));        
    }

    const cerrarSesion=()=>{
        dispatch(logout(""));
        setUsuario("");
        navigate("/")
    }

    const buscar=()=>{
        let {ciudad}=reservacion;
        let busquedaHoteles=hoteles.filter(item=>item.ciudad===ciudad);
        busquedaHoteles=busquedaHoteles.filter(item=>item.habilitado===true);
        busquedaHoteles=busquedaHoteles.map(item=>{
            let hab=item.habitaciones.filter(a=>a.habilitado===true);
            item.habitaciones=hab;
            return item
        })
        setHotelesMostrar(busquedaHoteles);
    };

    const iniciarFormulario=(nombre,elemento)=>{
        let objetoReserva={};
        objetoReserva.hotelNombre=nombre;
        objetoReserva.numeroHabitacion=elemento.numero;
        objetoReserva.numeroPersonas=reservacion.personas;
        objetoReserva.fechaInicio=reservacion.fechaEntrada;
        objetoReserva.fechaSalida=reservacion.fechaSalida;
        objetoReserva.costo_base=elemento.costo_base;
        objetoReserva.impuestos=elemento.impuestos;
        objetoReserva.valorTotal=Number(elemento.costo_base)+Number(elemento.impuestos);
        navigate("/reservacionusuario", {state:objetoReserva})
    }

  return (
    <div>
        <div className="navbar navbar-dark bg-dark d-flex">
            <div to="/" className="d-flex text-light ms-3">
                <h1>Travel</h1>
                <img src={logo} className='rounded-circle ms-2' width={50} alt="logo travel" />
            </div>
            {usuario==="agente"?<button className="btn btn-success me-3" onClick={cerrarSesion}>Cerrar Sesion</button>:<Link to="/login" className="btn btn-success me-3">Iniciar sesion</Link>}            
            
        </div>
        <div className="row">
            <div className="col-md-4 col-12 d-flex flex-column bg-info px-4 pb-3">
                <label className='my-2' htmlFor="fechaInicio" >Fecha entrada: </label>
                <input min={fechaMinima} className='rounded px-2 ms-2' type="date" id='fechaInicio' name="fechaEntrada" value={reservacion.fechaEntrada} onChange={handleOnChangeForm} />
                <label className='my-2' htmlFor="fechSalida">Fecha salida: </label>
                <input min={fechaMinima}  className='rounded px-2 ms-2' type="date" id='fechSalida' name="fechaSalida" value={reservacion.fechaSalida} onChange={handleOnChangeForm} />
                <label className='my-2' htmlFor="personas">Personas: </label>
                <select className='rounded px-2 ms-2' type="range" id='personas' name="personas" value={reservacion.personas} onChange={handleOnChangeForm} >
                    <option defaultValue={""} ></option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                </select>
                <label className='my-2' htmlFor="ciudad">Ciudad: </label>
                <select className='rounded px-2 ms-2' type="range" id='ciudad' name="ciudad" value={reservacion.ciudad} onChange={handleOnChangeForm} >
                    <option defaultValue={"item"}></option>
                    {ciudades.map((item,index)=>(
                        <option key={"ciudad"+index} value={item}>{item}</option>
                    ))}
                </select>
                <button className='mt-2 btn btn-outline-warning' onClick={buscar}>Buscar</button>                
            </div>
            <Accordion flush className="mt-2 col-md-8 px-4 col-12 listaHoteles">
            {hotelesMostrar.map((item,index)=>(
                <Accordion.Item  key={"inicioHoteles"+index}  eventKey={index}>
                    <Accordion.Header><h4>{"Hotel: "+item.nombre}</h4></Accordion.Header>
                    <Accordion.Body>
                        <div className="text-dark">
                            <h5 className='text-decoration-underline'>Habitaciones disponibles</h5>
                            <div className="d-flex justify-content-around">
                                {item.habitaciones.map((element,i)=>(
                                    <div key={"habitacionesBuscar"+i} onClick={()=>iniciarFormulario(item.nombre,element)} className="border border-2 border-danger rounded py-1 px-5 bg-dark text-light">
                                        <h6>{element.numero}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                ))}
                
            </Accordion>
        </div>
    </div>
  )
}

export default HotelStoreUser
