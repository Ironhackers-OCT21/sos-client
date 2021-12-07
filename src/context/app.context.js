import { createContext, useState } from "react";

const UserContext = createContext()

function UserProviderWrapper(props){
    let name = 'Manish'

    const [user, setUser] = useState(null)

    return (
        <UserContext.Provider value={{name, user, setUser}}>
            {props.children} 
        </UserContext.Provider>
    )
}

export {UserContext, UserProviderWrapper} 