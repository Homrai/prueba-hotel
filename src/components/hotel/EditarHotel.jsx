import { useState } from "react";
import { Accordion, Modal, } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { habitacion } from "../../model/modelos";
import { ToastContainer, toast } from "react-toastify";
import { agregarHoteles } from "../../features/hotelSlice";
import { editarHotelesAPI } from "../../api/hoteles";

const EditarHotel = () => {
    const dispatch= useDispatch();
    const hoteles = useSelector(state=>state.hotel[0]);
    const [agregarHabitacion,setAgregarHabitacion]=useState(habitacion);
    const [editHoteles,setEditHoteles]=useState(hoteles);
    const [hotel,setHotel]=useState(editHoteles[0]);
    const [editarHabitacion,setEditarHabitacion]=useState(hotel.habitaciones[0]);
    const [show,setShow]=useState(false);
    const [loading,setLoading]=useState(false);


    const seleccionarHotel=(i)=>{
        setHotel(editHoteles[i]);
    }

    const handleOnChangeEditarhotel=(e)=>{
        const {name,value}=e.target;
        setHotel(old=>({...old,[name]:value}));
    }

    const handleOnChangeAgregarhabitacion=(e)=>{
        const {name,value}=e.target;
        setAgregarHabitacion(old=>({...old,[name]:value}));
    }
    
    const agregarHabitacionBoton = ()=>{
        const filtro = hotel.habitaciones.find(item=>item.numero===agregarHabitacion.numero);
        if(filtro!==undefined) return toast.error('Ya existe ese numero de habitacion en el hotel', {
            theme: "light",
            });
        setHotel(old=>({...old,"habitaciones":[...hotel.habitaciones,agregarHabitacion]}));
        setAgregarHabitacion(habitacion);
    }

    const activarModal = (i) =>{
        setShow(true);
        setEditarHabitacion(hotel.habitaciones[i]);
    }

    const handleOnChangeEditarhabitacion=(e)=>{
        const {name,value}=e.target;
        setEditarHabitacion(old=>({...old,[name]:value}));
    }

    const editarHabitacionBoton=()=>{
        let asd = [];
        hotel.habitaciones.map(item=>{
            if(item.numero===editarHabitacion.numero){
                asd.push(editarHabitacion);
                return
            }
            asd.push(item)
        });
        setHotel(old=>({...old,"habitaciones":asd}));
        setShow(false);
    }
    const guardarCambios=async ()=>{
        setLoading(true);
        let arrayHoteles = [];
        editHoteles.map(item=>{
            if(item.id===hotel.id){
                return arrayHoteles.push(hotel);
            }
            return arrayHoteles.push(item);
        })
        setEditHoteles(arrayHoteles);
        dispatch(agregarHoteles(arrayHoteles));
        localStorage.setItem("hoteles",JSON.stringify(arrayHoteles));
        const res = await editarHotelesAPI(hotel.id, hotel);
        toast.success("Se ha editado con exito", {
            theme: "light",
            });
        setLoading(false);
    }

  return (
    <div className="row">
        <div className="col-sm-4 col-12">
            {editHoteles.map((item,index)=>(
                <div key={"edicionDeHoteles"+index} onClick={()=>seleccionarHotel(index)} className=" p-1 text-center mt-2 border border-2 rounded bg-dark text light">
                    <h4>
                        {"Hotel: "+item.nombre}
                    </h4>
                </div>
            ))}
        </div>
        <div className="col-sm-8 col-12 text-dark bg-light rounded border border-dark border-3 mt-2 d-flex flex-column">
            <h5 className="mt-2">Editar Informacion del Hotel</h5>
            <div>
                <label htmlFor="nombre">Editar Nombre: </label>
                <input id="nombre" type="text" name="nombre" value={hotel.nombre} onChange={handleOnChangeEditarhotel} className="ms-2 mt-2 rounded" />
            </div>
            <div>
                <label htmlFor="ciudad">Editar Ciudad: </label>
                <input id="ciudad" type="text" name="ciudad" value={hotel.ciudad} onChange={handleOnChangeEditarhotel} className="ms-2 mt-2 rounded" />
            </div>
            <div>
                <label htmlFor="direccion">Editar Direccion: </label>
                <input id="direccion" type="text" name="direccion" value={hotel.direccion} onChange={handleOnChangeEditarhotel} className="ms-2 mt-2 rounded" />
            </div>
            <div>
                <label htmlFor="habilitado" >{hotel.habilitado?"Habilitado: ":"Deshabilitado: "}</label>
                <button className={` ms-3 btn py-0 ${hotel.habilitado?"btn-success":"btn-danger"}`} onClick={()=>setHotel(old=>({...old,"habilitado":!hotel.habilitado}))}>{hotel.habilitado?"Activo":"Inactivo"}</button>
            </div>
            <Accordion flush className="mt-2 btn btn-dark">
            <Accordion.Item eventKey="1">
                    <Accordion.Header>Agregar habitacion</Accordion.Header>
                    <Accordion.Body>
                        <div  className=" mt-2 border border-dark border-2 rounded bg-info p-3">
                            <div>
                                <label htmlFor="nombre">Numero habitacion: </label>
                                <input id="nombre" type="text" name="numero" value={agregarHabitacion.numero} onChange={handleOnChangeAgregarhabitacion} className=" ms-2 rounded" />
                            </div> 
                            <div>
                                <label htmlFor="precio">Editar Precio: </label>
                                <input id="precio" type="number" name="costo_base" value={agregarHabitacion.costo_base} onChange={handleOnChangeAgregarhabitacion} className="ms-2 rounded" />
                            </div> 
                            <div>
                                <label htmlFor="impuestos">Impuestos: </label>
                                <input id="impuestos" type="number" name="impuestos" value={agregarHabitacion.impuestos} onChange={handleOnChangeAgregarhabitacion} className="ms-2 rounded" />
                            </div>
                            <div>
                                <label htmlFor="tipo">Tipo: </label>
                                <input id="tipo" type="text" name="tipo" value={agregarHabitacion.tipo} onChange={handleOnChangeAgregarhabitacion} className="ms-2 rounded" />
                            </div>
                            <div>
                                <label htmlFor="ubicacion">Ubicacion: </label>
                                <input id="ubicacion" type="text" name="ubicacion" value={agregarHabitacion.ubicacion} onChange={handleOnChangeAgregarhabitacion} className="ms-2 rounded" />
                            </div>
                            <button className="btn btn-success" onClick={agregarHabitacionBoton}>Agregar</button>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Editar habitaciones</Accordion.Header>
                    <Accordion.Body>
                        <div className="d-flex flex-row flex-wrap justify-content-around">
                            {hotel.habitaciones.map((item,index)=>(
                                <div key={"EditarHabitaciones"+index} onClick={()=>activarModal(index)}
                                className="col-3 bg-dark text-light rounded border border-2 border-secondary">
                                    <div>{item.numero}</div>
                                </div>
                            ))}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <button className="btn btn-success my-2" disabled={loading} onClick={guardarCambios}>{loading?"Loading...":"Guardar Cambios"}</button>
        </div>
    <ToastContainer position="top-center" autoClose={3000} />

        <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Editar habitacion numero: {editarHabitacion.numero}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div  className=" mt-2 border border-dark border-2 rounded bg-warning p-3">
                            <div>
                                <label htmlFor="precio1">Editar Nombre: </label>
                                <input id="precio1" type="number" name="costo_base" value={editarHabitacion.costo_base} onChange={handleOnChangeEditarhabitacion} className="ms-2 rounded" />
                            </div> 
                            <div>
                                <label htmlFor="impuestos1">Impuestos: </label>
                                <input id="impuestos1" type="number" name="impuestos" value={editarHabitacion.impuestos} onChange={handleOnChangeEditarhabitacion} className="ms-2 rounded" />
                            </div>
                            <div>
                                <label htmlFor="tipo1">Tipo: </label>
                                <input id="tipo1" type="text" name="tipo" value={editarHabitacion.tipo} onChange={handleOnChangeEditarhabitacion} className="ms-2 rounded" />
                            </div>
                            <div>
                                <label htmlFor="ubicacion1">Ubicacion: </label>
                                <input id="ubicacion1" type="text" name="ubicacion" value={editarHabitacion.ubicacion} onChange={handleOnChangeEditarhabitacion} className="ms-2 rounded" />
                            </div>
                            <div>
                                <label htmlFor="habilitado" >{editarHabitacion.habilitado?"Habilitado: ":"Deshabilitado: "}</label>
                                <button className={` ms-3 btn py-0 ${editarHabitacion.habilitado?"btn-success":"btn-danger"}`} onClick={()=>setEditarHabitacion(old=>({...old,"habilitado":!editarHabitacion.habilitado}))}>{editarHabitacion.habilitado?"Activo":"Inactivo"}</button>
                            </div>
                        </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-success" onClick={editarHabitacionBoton}>Editar</button>                
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default EditarHotel
