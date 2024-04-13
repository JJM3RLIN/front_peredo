import { useContext } from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Login from "./views/Login";
import CreateAccount from "./views/CreateAccount";
import Home from "./views/Home";
import UserContext from "./context/UserContext";
import ActualizarFaqs from "./views/ActualizarFaqs";
import CrearFaq from "./views/CrearFaq";
function App() {
const {user} = useContext(UserContext)
  
  return (
  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/home" element={user.nombre ? <Home />:<Navigate to="/" />} />
        <Route path="/crear" element={user.nombre ? <CrearFaq />:<Navigate to="/" />} />
        <Route path="/actualizar/:id" element={user.nombre ? <ActualizarFaqs />:<Navigate to="/" />} />
      </Routes>

  )
}

export default App
