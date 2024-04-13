import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormCredentials from "../components/credentials/FormCredentials";
import UserContext from "../context/UserContext";
import { alertError } from "../helpers/alertas";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { setUser } = useContext(UserContext)
  const onSubmit = async () => {
    if(Object.values(credentials).includes("")){
      alertError("Debes llenar todos los campos")
      return
    }

    const request = await fetch(`/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials), 
    })
    const response = await request.json()
    if(response.error){
        alertError("Verifica que las credenciales sean correctas o que la cuenta exista")
        return
    }
    setUser(response)
    navigate("/home")
    }
  return (
    <FormCredentials encabezado={"Iniciar sesión"} btnTxt={"Iniciar sesión"} fnRequest={onSubmit}>
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
  );
};

export default Login;
