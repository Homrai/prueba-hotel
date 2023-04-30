import { Link, Outlet } from 'react-router-dom';

const AdministrarHoteles = () => {
  return (
    <div className="bg-info px-3 text-light py-3">
        <h1 className="text-decoration-underline">Administracion Hoteles</h1>
        <div className="d-flex justify-content-around">
            <Link to="/admin" className='btn btn-success' >Agregar hotel</Link>
            <Link to="editarhotel" className='btn btn-success' >Editar hotel</Link>
        </div>
        <Outlet/>
    </div>
  )
}

export default AdministrarHoteles
