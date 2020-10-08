import React, {useEffect, useState} from 'react'
import {useMutation} from "@apollo/client";
import {LOGIN} from "../queries";

const Login = ({ show, setToken, setPage }) => {
    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])
    const [login, {data}] = useMutation(LOGIN, {
        refetchQueries: [{query: ALL_BOOKS}, {query: ALL_AUTHORS}],
        onError: error => console.log(error)
    })
    const myStorage = window.localStorage;
    useEffect(() => {
        if (data) {
            setToken(data.login.value)
            myStorage.setItem('current-user', data.login.value)
            setPage(null)
        }
    }, [data])
    if (!show) {
        return null
    }

    const loginUser = async (event) => {
        event.preventDefault()
        await login({variables: {username, password}})
        setUsername('')
        setPassword('')
    }
    return(
        <div className="loginForm">
            <form onSubmit={loginUser}>
                username <input id="username" value={username} onChange={({ target }) => setUsername(target.value)} />
                password <input id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
                <button>login</button>
            </form>
        </div>
    )
}

export default Login