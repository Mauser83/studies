import { createContext, useReducer, useContext } from 'react'

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return action.payload
        case "LOGOUT":
            return null
        default:
            return state
    }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, null)

    return (
        <UserContext.Provider value={[user, userDispatch]}>
        {props.children}
        </UserContext.Provider>
    )
}

export default UserContext

export const useUserValue = () => {
    const user = useContext(UserContext)
    return user[0]
}

export const useUserDispatch = () => {
    const user = useContext(UserContext)
    return user[1]
}