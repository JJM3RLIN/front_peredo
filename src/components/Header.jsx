import { Nav } from "./Nav"
import { Link } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../context/UserContext"
const Header = () => {
  const {user} = useContext(UserContext)
  return (
    <header className="bg-indigo-950 flex justify-between items-center px-5 py-3 mb-3">
        <h1 className="text-white text-2xl">Bienvenido! <span className="font-bold">{user.nombre}</span></h1>
        <Nav />
        <Link to="/"
        className="bg-indigo-700 text-white font-semibold px-3 py-1 rounded-lg hover:scale-95 transition-all ease-in-out duration-300"
        >Cerrar sesión</Link>
    </header>
  )
}

export default Header