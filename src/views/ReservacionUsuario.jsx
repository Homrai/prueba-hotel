import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import nextId from "react-id-generator";
import { ToastContainer, toast } from "react-toastify";
import { agregarReservasAPI } from "../api/reservas";

const ReservacionUsuario = () => {
    const location = useLocation(); 
    const reservas = JSON.parse(localStorage.getItem("reservas"));
    const [reservaData,setReservaData]=useState(location.state);
    const [formularioPersonas,setFormularioPersonas]=useState([]);
    const [loading,setLoading]=useState(false);
    const initialReserva={
        id:nextId(),
        nombre_contacto_emergencia:"",
        telefono_contacto_emergencia:"",
        numero_personas:reservaData.numeroPersonas,
        formulario_personas:[],
        hotel:reservaData.hotelNombre,
        numeroHabitacion:reservaData.numeroHabitacion,
        impuestos:reservaData.impuestos,
        costo_base:reservaData.costo_base,
        valorTotal:reservaData.valorTotal,
        fecha_inicio:reservaData.fechaInicio,
        fech_entrega:reservaData.fechaSalida,
    };

    const [formularioReserva,setFormularioReserva]=useState(initialReserva);

    const agregarFormularios=()=>{
        let formulario=[];
        for (let i = 0; i < reservaData.numeroPersonas; i++) {
            let formularioasd={
                id:i,
                nombres:"",
                fecha_nacimiento:"",
                genero:"",
                tipo_documento:"",
                numero_documento:"",
                email:"",
                telefono:"",
            };
            formulario.push(formularioasd);
        }
        let form = formulario.map((item,index)=>{
            item.id=index;
            return item
        });
        setFormularioPersonas(form);
    }
    useEffect(()=>{
        agregarFormularios();
    },[])

    const handleOnChangePersona=(e)=>{
        const {name,value,dataset}=e.target;
        let personas=formularioPersonas;
        let form =personas[dataset.id];
        form[name]=value;
        personas[dataset.id]=form;
        setFormularioPersonas([...personas]);
    }

    const handleOnChangeReserva=(e)=>{
        const {name,value}=e.target;
        setFormularioReserva(old=>({...old,[name]:value}));
    }

    const completarRegistro= async ()=>{
        if(formularioReserva.nombre_contacto_emergencia==="" || formularioReserva.telefono_contacto_emergencia===""){
            return toast.error('porfavor rellene todos los campos del formulario', {
                theme: "light",
                });
        }

        const filtro2 = formularioPersonas.filter((item)=>{
            if(item.nombres==="" || item.fecha_nacimiento==="" || item.genero==="" || item.tipo_documento==="" || item.numero_documento==="" || item.email==="" || item.telefono===""){
                return item
            }
        });
        if (filtro2.length!==0) {
            return toast.error('porfavor rellene todos los campos dentro del formulario de las personas', {
                theme: "light",
                });
        }
        setLoading(true);
        let formularioCompleto=formularioReserva;
        formularioCompleto.formulario_personas=formularioPersonas;
        let reservacion = reservas;
        reservacion.push(formularioCompleto);
        const res = await agregarReservasAPI(formularioCompleto);
        toast.success(res.res, {
            theme: "light",
            });
        setLoading(false);
        localStorage.setItem("reservas", JSON.stringify(reservacion));         
    }


  return (
    <div className="container bg-warning rounded mt-sm-5 border border-3 border-dark p-3 d-flex flex-column">
        <h1 className="text-center">Formulario de Reservacion</h1>
        <div>
            <label htmlFor="hotel">Hotel: </label>
            <input type="text" disabled className="rounded ms-3" id="hotel" value={reservaData.hotelNombre} />
        </div>
        <div>
            <label htmlFor="numeroHabitacion">Habitacion numero: </label>
            <input type="text" disabled className="rounded ms-3" id="numeroHabitacion" value={reservaData.numeroHabitacion} />
        </div>
        <Accordion flush className="mt-2 px-4 ">
        {formularioPersonas.map((item,index)=>(
                <Accordion.Item  key={"formulario"+index}  eventKey={index}>
                    <Accordion.Header><h4>Datos persona: {index+1}</h4></Accordion.Header>
                    <Accordion.Body>
                        <div className="text-dark">
                            <label htmlFor="nombre">Nombres y apellidos</label>
                           <input className="rounded ms-3 input-group" type="text" id="nombre" data-id={index} name="nombres" placeholder="Ingrese nombres y apellidos" value={item.nombres} onChange={handleOnChangePersona} />
                        </div>
                        <div className="text-dark">
                            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                           <input className="rounded ms-3 input-group" type="date" id="fechaNacimiento" data-id={index} name="fecha_nacimiento" placeholder="Ingrese Fecha de Nacimiento" value={item.fecha_nacimiento} onChange={handleOnChangePersona} />
                        </div>
                        <div className="text-dark">
                            <label htmlFor="genero">Genero</label>
                            <select className="rounded ms-3 mt-2" type="range" id="genero" name="genero" data-id={index} value={item.genero} onChange={handleOnChangePersona} >
                                    <option defaultValue=""></option>
                                    <option value="femenino">Femenino</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="otro">Otro</option>
                            </select>
                        </div>
                        <div className="text-dark">
                            <label htmlFor="doc">Tipo documento</label>
                            <select className="rounded ms-3 mt-2" type="range" id="doc" name="tipo_documento" data-id={index} value={item.tipo_documento} onChange={handleOnChangePersona} >
                                    <option defaultValue=""></option>
                                    <option value="CC">CC</option>
                                    <option value="CE">Cedula extrangeria</option>
                                    <option value="otro">Otro</option>
                            </select>
                        </div>
                        <div className="text-dark">
                            <label htmlFor="numero_documento">Numero Documento</label>
                           <input className="rounded ms-3 input-group" type="number" id="numero_documento" data-id={index} name="numero_documento" placeholder="Ingrese numero de documento" value={item.numero_documento}  onChange={handleOnChangePersona}/>
                        </div>
                        <div className="text-dark">
                            <label htmlFor="email">Email</label>
                           <input className="rounded ms-3 input-group" type="email" id="email" name="email" data-id={index} placeholder="Ingrese email" value={item.email} onChange={handleOnChangePersona} />
                        </div>
                        <div className="text-dark">
                            <label htmlFor="telefono">Numero telefono</label>
                           <input className="rounded ms-3 input-group" type="tel" id="telefono" name="telefono" data-id={index} placeholder="Ingrese telefono" value={item.telefono} onChange={handleOnChangePersona} />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                ))}
                
            </Accordion>
            <div className="text-dark">
                <label htmlFor="nombre_contacto_emergencia">Nombre contacto emergencia</label>
                <input className="rounded ms-1 input-group" type="text" id="nombre_contacto_emergencia" name="nombre_contacto_emergencia" placeholder="Ingrese nombre contacto emergencia" value={reservaData.nombre_contacto_emergencia}  onChange={handleOnChangeReserva}/>
            </div>
            <div className="text-dark">
                <label htmlFor="telefono_contacto_emergencia">Telefono contacto emergencia</label>
                <input className="rounded ms-1 input-group" type="tel" id="telefono_contacto_emergencia" name="telefono_contacto_emergencia" placeholder="Ingrese telefono contacto emergencia" value={reservaData.telefono_contacto_emergencia} onChange={handleOnChangeReserva} />
            </div>
            <button disabled={loading} className="btn btn-success m-2" onClick={completarRegistro}>{loading?"Loading...":"Completar registro"}</button>
            <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}

export default ReservacionUsuario
