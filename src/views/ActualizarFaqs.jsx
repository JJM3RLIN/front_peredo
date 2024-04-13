import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Header from '../components/Header'
import FormFaqs from '../components/FormFaqs'

const ActualizarFaqs = () => {
    const {id} = useParams()
    const [faq, setFaq] = useState({
        id: '',
        pregunta: '',
        respuesta: '',
        file:null,
        nombreFile: ''
    })
    useEffect(() => {
        const getFaq = async () => {
            const response = await fetch(`/api/faq/${id}`)
            const data = await response.json()
            setFaq({id: data.id, pregunta: data.pregunta, respuesta: data.respuesta, file_ruta: data.path_file, file: null})
        }
        getFaq()
    }, [id])
  return (
    <>
        <Header />
        <FormFaqs faq={faq} setFaq={setFaq}/>
    </>
  )
}

export default ActualizarFaqs