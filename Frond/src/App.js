import React, { useEffect } from "react";
import './App.css';
import {Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import Products from "./components/Products/Products";
import AboutUs from "./views/AboutUs/AboutUs";
import Contact from "./views/Contact/Contact";
import DevTeam from './views/DevTeam/devTeam.jsx'
import FAQs from "./views/FAQs/FAQs"
import Catalogo from "./views/Catalogo/Catalogo.jsx";
import Chatbot from "react-chatbot-kit";
import Form from "./views/Form/Form";
import Profile from "./views/Profile/MiPerfil.jsx";
import Configs from "./components/ChatBot/Configs";
import MessageParser from "./components/ChatBot/MessageParser";
import Detail from "../src/views/Detail/Detail";
import Favoritos from "../src/views/Favoritos/Favoritos"
import Dashboard from "./components/Dashboard/Dashboard";
import axios from "axios"
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import AddToCart from "./views/Cart/AddToCart";
import Carrito from "./views/Cart/Carrito";
import { useAuth0 } from "@auth0/auth0-react";
import { productosSinPag, syncFavoritesWithAPI } from "./redux/actions";
import { useDispatch} from "react-redux";

import { useParams } from "react-router-dom"; 
//para no repetir el puerto:(se está configurando una URL base que se utilizará como prefijo para todas las peticiones realizadas con Axios) 
axios.defaults.baseURL = "http://localhost:3001/"



// import ActionProvider from "./components/ChatBot/ActionProvider";


function App () {
  const location = useLocation()
  const dispatch = useDispatch()
  const {user, isAuthenticated} = useAuth0()

  useEffect(()=>{
    dispatch(productosSinPag())
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(syncFavoritesWithAPI(user.email));
    }
  }, [user]);
  const params = useParams();

  return (
    <div>
      {
            location.pathname !== "/" ? <Navbar /> : null
         }
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/devTeam" element={<DevTeam />} />
        <Route path="/form" element={<Form />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favoritos" element={<Favoritos />} />
        {/* Esta era la ruta anterior <Route path="/catalogo/detail/:id" element={<Detail />} /> */}
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/itemadded/:id" element={<AddToCart />} />
        <Route path="/carrito/:id" element={<Carrito />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/dashboard" element = {<Dashboard/>}/>

      </Routes>
      <div className="chatbot-container">
        <Chatbot
          config={Configs}
          messageParser={MessageParser}
          // actionProvider={ActionProvider}
        />
      </div>
      {
            location.pathname !== "/" ? <Footer /> : null
         }
    </div>
  );
}

export default App;