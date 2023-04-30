import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../features/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [log,setLog]=useState({usuario:"admin",pass:"admin"});
  
  const handleOnChangeLogin=(e)=>{
    const {name,value}=e.target;
    setLog(old=>({...old,[name]:value}));
  };

  const enviar =()=>{
    if (log.usuario==="" || log.pass==="") return toast.error('rellente todos los campos', {
      theme: "light",
      });
    if (log.usuario!=="admin" && log.pass!=="admin") return toast.error('usuario o contraseña invalidos', {
      theme: "light",
      });
      dispatch(login("agente"));
      navigate("/admin");
  }

  return (
    <div className='container mt-5 bg-warning text-light p-5 text-center border border-5 border-dark rounded-5'>
      <h1>Iniciar sesion</h1>
      <input type="text" className='input-group rounded my-2' placeholder='Ingrese usuario' name='usuario' value={log.usuario} onChange={handleOnChangeLogin} />
      <input type="password" className='input-group rounded my-2' placeholder='Ingrese password' name='pass' value={log.pass} onChange={handleOnChangeLogin} />
      <button className="btn btn-success mt-4" onClick={enviar}>Iniciar sesion</button>
      <ToastContainer position="top-center" autoClose={3000} />

    </div>
  )
}

export default Login
