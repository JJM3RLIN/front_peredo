import { useState } from "react"
import UserContext from "./UserContext"
const UserProvaider = ({children}) => {
    const [user, setUser] = useState({id: "", nombre: "", email: "", token: ""})
  return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvaider