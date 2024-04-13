import { useState } from "react";
import {useNavigate} from "react-router-dom";
import FormCredentials from "../components/credentials/FormCredentials";
import { alertSuccess, alertError } from "../helpers/alertas";
import URL_API from "../helpers/URL_API";
const CreateAccount = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({email:"", nombre:"", password:""})
    const onSubmit = async () => {

    if(Object.values(credentials).includes("")){
      alertError("Debes llenar todos los campos")
      return
    }
    const request = await fetch(`${URL_API}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials), 
  })
  const response = await request.json()
  if(response.error){
      alertError("Ocurrio un error al crear la cuenta")
      return
  }
    alertSuccess("Cuenta creada exitosamente")
    setTimeout(() => {
      navigate("/")
    }, 2000)
  }
  return (
    <FormCredentials encabezado={"Crea una cuenta"} btnTxt={"Crear cuenta"} fnRequest={onSubmit}>
    <div className="mb-3">
      <input
        type="email"
        id="email"
        placeholder="Ej.correo@correo.com"
        className="rounded-md px-3 py-1 outline-none bg-slate-200 text-xl"
        onChange={(e) => {
          setCredentials({ ...credentials, email: e.target.value.trim() });
        }}
      />
    </div>
    <div className="mb-3">
    <input
        type="text"
        id="nombre"
        placeholder="Escribe tu nombre"
        className="rounded-md px-3 py-1 outline-none bg-slate-200 text-xl"
        onChange={(e) => {
          setCredentials({ ...credentials, nombre: e.target.value.trim() });
        }}
      />
    </div>
    <div className="mb-3">
      <input
        type="password"
        id="password"
        placeholder="Contraseña"
        className="rounded-md px-3 py-1 outline-none bg-slate-200 text-xl"
        onChange={(e) => {
          setCredentials({
            ...credentials,
            password: e.target.value.trim(),
          });
        }}
      />
    </div>
  </FormCredentials>
  )
}

export default CreateAccount