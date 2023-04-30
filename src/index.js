import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import ErrorComponent from './components/ErrorComponent';
import HotelStoreAgent from './views/HotelStoreAgent';
import HotelStoreUser from './views/HotelStoreUser';
import Login from './components/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import AdministrarHoteles from './components/AdministrarHoteles';
import Reservas from './components/Reservas';
import 'react-toastify/dist/ReactToastify.css'
import AgregarHotel from './components/hotel/AgregarHotel';
import EditarHotel from './components/hotel/EditarHotel';
import ReservacionUsuario from './views/ReservacionUsuario';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route index element={<HotelStoreUser/>} />
            <Route path='login' element={<Login/>} />
            <Route path='reservacionusuario' element={<ReservacionUsuario/>} />
            <Route element={<Auth/>}>
              <Route path='admin' element={<HotelStoreAgent/>} >
                <Route element={<AdministrarHoteles/>} >
                  <Route index element={<AgregarHotel/>} />
                  <Route path='editarhotel' element={<EditarHotel/>} />
                </Route>
                <Route path='reservas' element={<Reservas/>} />
              </Route>
            </Route>
            
            <Route path='*' element={<ErrorComponent/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
