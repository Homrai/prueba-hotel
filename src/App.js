import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { buscarHoteles } from "./api/hoteles";
import { buscarReservas } from "./api/reservas";

function App() {
  let datos = localStorage.getItem("hoteles");
  if (datos!==undefined) {
    datos = JSON.parse(localStorage.getItem("hoteles"));
  }
  let reservas = localStorage.getItem("hoteles");
  if (reservas!==undefined) {
    reservas = JSON.parse(localStorage.getItem("reservas"));
  }
  const traerDatos=async()=>{
    if (datos===null || datos.length===0) {
      const res = await buscarHoteles();
      localStorage.setItem("hoteles", JSON.stringify(res[0].hoteles));  
    }
    if (reservas===null || reservas.length===0) {
      const res = await buscarReservas();
      localStorage.setItem("reservas", JSON.stringify(res[0].reservas));  
    }
}
  useEffect(()=>{
  traerDatos();
  // eslint-disable-next-line
  },[]);
  return (
    <div className="">
      <Outlet/>
    </div>
  );
}

export default App;
