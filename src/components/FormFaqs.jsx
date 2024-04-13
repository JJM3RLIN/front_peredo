import { useContext } from "react"
import {useNavigate} from "react-router-dom"
import UserContext from "../context/UserContext"
import { alertError, alertSuccess } from "../helpers/alertas"
const FormFaqs = ({faq, setFaq}) => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(faq)
        let url = `/api/faq/${faq.hasOwnProperty('id')  ? "actualizar" : "crear" }`

        
        if([faq.pregunta, faq.respuesta].includes('')) {
            alertError('Los campos de pregunta y respuesta son obligatorios')
            return
        }
        const formData = new FormData();
        formData.append("pregunta", faq.pregunta)
        formData.append("respuesta", faq.respuesta)
        formData.append("file", faq.file)
        if(faq.hasOwnProperty('id')){
            formData.append("ruta", faq.file_ruta??null)
            formData.append("id", faq.id)
        }
        const request = await fetch(url, {
            method:  'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
            body: formData
        })
        const response = await request.json()
        alertSuccess(response.mensaje)
        setTimeout(() => {
            navigate("/home")
          }, 2000)


    }
  return (
    <div className='px-3 py-5 flex flex-col items-center justify-center w-full h-full'>
        
        <form onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-3 bg-indigo-900 rounded-lg p-5 shadow-lg"
        >  
        <h1 className='text-center text-5xl text-white font-semibold mb-5'>{faq?.id ? "Actualizar" : "Crear"} FAQ</h1>
        <input type="text" placeholder="Escribe la pregunta"  
        className="rounded-md px-3 py-1 outline-none bg-slate-200 text-xl w-full"
        value={faq.pregunta}
        onChange={(e) => setFaq({...faq, pregunta: e.target.value.trim()})}
        />
        <textarea placeholder="Escribe la respuesta"
        className="rounded-md px-3 py-1 outline-none bg-slate-200 text-xl h-40 w-full"
        value={faq.respuesta}
        onChange={(e) => setFaq({...faq, respuesta: e.target.value.trim()   })}
        />
        <input type="file" accept="image/jpg audio/mp3 video/mp4" onChange={e=>setFaq({...faq, file:e.target.files[0]})} />
        {
                  faq.file_ruta != null ? faq.file_ruta.split('.').pop() === 'mp4' ? (  
                    <video src={`/uploads/${faq.file_ruta }`} controls className=""></video>
                  ) : faq.path_file && ffaq.file_ruta.split('.').pop() === 'mp3' ? (
                    <audio src={`/uploads/${faq.file_ruta }`} controls className=""></audio>
                  ) : 
                    (
                      <img
                        src={`/uploads/${faq.file_ruta}`}
                        alt={faq.pregunta}
                        className="w-40 h-40"
                      />
                    )
                   :null
                  
                  }
        <button type="submit"
        className="bg-indigo-600 text-white font-medium text-xl px-10 py-2 rounded-lg hover:scale-95 transition-all ease-in-out duration-300 w-full"
        >{faq?.id ? "Actualizar" : "Crear"}</button>
    </form>
    </div>
  )
}

export default FormFaqs