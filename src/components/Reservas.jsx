import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux"

const Reservas = () => {
    const datos = useSelector(state=>state.reserva[0]);
    const [show,setShow]=useState(false);
    const [listaReservaciones,setListaReservaciones]=useState(datos);
    const [reservacion,setReservacion]=useState(listaReservaciones[0]);

    const mostrarReservacion=(index)=>{
      setReservacion(listaReservaciones[index]);
      setShow(true);
    }
  return (
    <div>
      <div className="m-sm-5 p-sm-5 p-2 text-light listaReservas">
          {listaReservaciones.map((item,index)=>(
            <div key={"listaReservaciones"+index} className=" mt-2 p-3 bg-dark rounded border border-danger border-3" onClick={()=>mostrarReservacion(index)}>
              <h5>Reservacion id: {item.id}</h5>
              <h5>Nombre hotel: {item.hotel}</h5>
              <h5>Numero habitacion: {item.numeroHabitacion}</h5>
            </div>
          ))}
      </div>
      <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Reservacion ID: {reservacion.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div  className=" mt-2 border border-dark border-2 rounded bg-warning p-3"> 
                  <h6>Nombre cliente: {reservacion.nombre_contacto_emergencia}</h6> 
                  <h6>Telefono cliente: {reservacion.telefono_contacto_emergencia}</h6> 
                  <h6>Numero personas: {reservacion.numero_personas}</h6>                            
                  <h6>Precio base habitacion: {reservacion.costo_base}</h6>                            
                  <h6>Impuesto: {reservacion.impuestos}</h6>                            
                  <h6>Valor total: {reservacion.valorTotal}</h6>  
                  <h6>Fecha entrada: {reservacion.fecha_inicio}</h6>  
                  <h6>Fecha salida: {reservacion.fech_entrega}</h6>  
                </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default Reservas
