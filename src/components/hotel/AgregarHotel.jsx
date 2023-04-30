import { useState } from 'react'
import { hotelObjeto } from '../../model/modelos';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { agregarHoteles } from '../../features/hotelSlice';
import { agregarHotelesAPI } from '../../api/hoteles';
const AgregarHotel = () => {
    const hoteles= useSelector(state=>state.hotel[0]);
    const dispatch = useDispatch();
    const [agregarHotel,setAgregarHotel]=useState(hotelObjeto);
    const [loading,setLoading]=useState(false);

    const handleOnChangeAddHotel=(e)=>{
        const {name,value}=e.target;
        setAgregarHotel(old=>({...old,[name]:value}));
        setAgregarHotel(old=>({...old,"id":String(hoteles.length+1)}));
    }

    const agregarHotelBoton=async()=>{
        setLoading(true);
        if (agregarHotel.nombre==="" || agregarHotel.ciudad==="" || agregarHotel.direccion==="") return toast.error('Porfavor rellene todos los campos', {
            theme: "light",
            });
        const filtro = hoteles.find(item=>item.nombre.localeCompare(agregarHotel.nombre, undefined, { sensitivity: 'base' }) ===0);
        if(filtro!==undefined) return toast.error('Nombre de hotel ya en uso, porfavor cambielo', {
            theme: "light",
            });
        let arrHotel = [...hoteles,agregarHotel]
        localStorage.setItem("hoteles", JSON.stringify(arrHotel));
        dispatch(agregarHoteles(arrHotel));
        setAgregarHotel(hotelObjeto);
        const res = await agregarHotelesAPI(arrHotel);
        toast.success(res.res, {
            theme: "dark",
        });
        if (res.res) {
            setLoading(false)            
        }
    }
  return (
    <div>
        <div id="add_hotel_collapse" className='pt-3'>
            <label htmlFor="hotel-nombre">Nombre Hotel:</label>
            <input id='hotel-nombre' type="text" name='nombre' value={agregarHotel.nombre} onChange={handleOnChangeAddHotel} className='input-group rounded mb-1' />
            <label htmlFor="hotel-ciudad">Ciudad:</label>
            <input id='hotel-ciudad' type="text" name='ciudad' value={agregarHotel.ciudad} onChange={handleOnChangeAddHotel} className='input-group rounded mb-1' />
            <label htmlFor="hotel-direccion">Direccion:</label>
            <input id='hotel-direccion' type="text" name='direccion' value={agregarHotel.direccion} onChange={handleOnChangeAddHotel} className='input-group rounded mb-1' />
            <button className='btn btn-success' disabled={loading} onClick={agregarHotelBoton}>{loading?"Loading...":"Agregar"}</button>
    </div>
    <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}

export default AgregarHotel
