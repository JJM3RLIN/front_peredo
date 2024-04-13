import { useState } from "react"
import Header from "../components/Header"
import FormFaqs from "../components/FormFaqs"
const CrearFaq = () => {
    const [faq, setFaq] = useState({
        pregunta: '',
        respuesta: '',
        file:null
    })
  return (
    <>
        <Header />
        <FormFaqs faq={faq} setFaq={setFaq}/>
    </>
  )
}

export default CrearFaq