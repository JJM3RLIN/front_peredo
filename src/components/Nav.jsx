import { Link } from "react-router-dom"

export const Nav = () => {
  return (
    <nav>
        <ul className="flex gap-7 text-white text-md font-semibold">
            <li className="hover:scale-90 ease-in-out duration-500">
                <Link to="/home">Inicio</Link>
            </li>
            <li className="hover:scale-90 ease-in-out duration-500">
                <Link to="/crear">Crear</Link>
            </li>
        </ul>
    </nav>
  )
}
