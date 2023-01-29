import {useCallback, useEffect, useState} from "react";
const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    // const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null)
    const [roles, setRoles] = useState(null)

    const login = (jwtToken, id, userName, roles) => {
        setToken(jwtToken)
        setUserId(id)
        setUserName(userName)
        setRoles(roles)

        // localStorage.setItem(storageName, JSON.stringify({
        //     userId: id, token: jwtToken, userName: userName, roles: roles
        // }))
    }


    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserName(null)
        setRoles(null)

        // localStorage.removeItem(storageName)
    }, [])

    // useEffect(() => {
    //     const data = JSON.parse(localStorage.getItem(storageName))
    //     if (data && data.token) {
    //         login(data.token, data.userId)
    //     }
    //     setReady(true)
    // }, [login])

    return {login, logout, token, userId, userName, roles}
}