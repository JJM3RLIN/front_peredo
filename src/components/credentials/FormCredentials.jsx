import { Link, useLocation } from "react-router-dom"
const FormCredentials = ({children, encabezado, btnTxt, fnRequest}) => {
  const location = useLocation()
    const handleSubmit = async (e) => {
        e.preventDefault()
       fnRequest()
    }
  return (
    <main className="bg-gradient-to-b from-gray-900  to-indigo-900 h-screen flex flex-col justify-center items-center">
    <section  className="bg-indigo-900 rounded-lg px-5 py-12 shadow-xl shadow-slate-900">
        <h1 className="text-center mb-14 text-4xl font-bold text-white">{encabezado}</h1>
        <form className="flex flex-col items-center justify-center gap-3" onSubmit={handleSubmit}>
           {children}
        <button
        type="submit"
        className="bg-indigo-600 text-white font-medium text-xl px-10 py-2 rounded-lg hover:scale-95 transition-all ease-in-out duration-300 "
        >
       {btnTxt}
      </button>
        </form>
    </section>
    {
        location.pathname === "/" && (
          <section>
          <p className="text-white text-center mt-5">¿No tienes cuenta? <Link to="/create-account" className="text-indigo-600">Registrate</Link></p>
      </section>
        )
    }
 
</main>
  )
}

export default FormCredentials