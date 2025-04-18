import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "./queries"
import { useApolloClient } from "@apollo/client"


const Login = ({ show, setError, setToken, setPage }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const client = useApolloClient()


    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
            setTimeout(() => {
               setError(null) 
            }, 5000)
        }
    })

    useEffect(() => {
        if ( result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem("library-user-token", token)
            client.refetchQueries({
                include: ["me"]
            })
            setPage("authors")
            setUsername("")
            setPassword("")
        }
    }, [result.data])

    const submit = async (event) => {
        event.preventDefault()

        login({ variables: { username, password }})
    }

    if (!show) {
        return null
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username <input value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login