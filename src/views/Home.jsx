import { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { alertSuccess } from "../helpers/alertas";
const Home = () => {
  const [faqs, setFaqs] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const getFaqs = async () => {
      const response = await fetch("/api/faq", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setFaqs(data);
    };
    getFaqs();
  }, []);

  const handleEliminar = async (id) => {
    const response = await fetch(`/api/faq/eliminar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    const filtrados = faqs.filter((faq) => faq.id !== id);
    alertSuccess(data.mensaje);
    setFaqs(filtrados);
  };
  return (
    <>
      <Header />
      <main className="px-3 py-5 flex flex-col items-center justify-center">
        <h1 className="text-center font-semibold text-4xl text-zinc-800 mb-3">
          Frequently Asked Questions(FAQ)
        </h1>
        <ul className="w-full">
          {faqs.length === 0 ? (
            <p>No hay faqs</p>
          ) : (
            faqs.map((faq) => (
              <li className="flex gap-3">
                <Link
                  className="mb-2 w-full"
                  to={`/actualizar/${faq.id}`}
                  key={faq.id}
                >
                  <div className="flex items-center gap-5 border-l-4 border-indigo-800 bg-indigo-700 bg-opacity-5 px-3 py-4">
                    <h2 className="text-3xl font-semibold text-indigo-800">
                      Q.
                    </h2>
                    <p className="text-zinc-800">{faq.pregunta}</p>
                  </div>
                  <div className="flex items-center gap-5 border-l-4 border-slate-600 bg-slate-500 bg-opacity-5 px-3 py-4">
                    <h2 className="text-3xl font-semibold text-slate-600">
                      A.
                    </h2>
                    <p className="text-slate-600">{faq.respuesta}</p>
                  </div>
                </Link>
                <div
                className="flex flex-col justify-center items-center gap-3"
                >
                  {
                  faq.path_file != null ? faq.path_file.split('.').pop() === 'mp4' ? 
                  (  
                    <video src={`/uploads/${faq.path_file}`} controls className=""></video>
                  ) 
                  :  faq.path_file.split('.').pop() === 'mp3' ? 
                  (
                    <audio src={`/uploads/${faq.path_file}`} controls className=""></audio>
                  ) : faq.path_file.split('.').pop() === 'jpg' || faq.path_file.split('.').pop() === 'jpeg' ?
                   (  
                      <img
                        src={`/uploads/${faq.path_file}`}
                        alt={faq.pregunta}
                        className="w-40 h-40 "
                      />
                    
                  ) : null :null
                  
                  }
                  <button 
                  className="bg-red-600 text-white font-medium text-xl px-10 py-2 rounded-lg hover:scale-95 transition-all ease-in-out duration-300 "
                  onClick={() => handleEliminar(faq.id)}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </main>
    </>
  );
};

export default Home;
