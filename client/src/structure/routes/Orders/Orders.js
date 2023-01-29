import { Outlet } from "react-router-dom"
import { OrderCreatingCard } from "./OrderCreatingCard"
import {useContext} from "react"
import {AuthContext} from "../../../context/AuthContext"

export const Orders = () => {
    const auth = useContext(AuthContext)


    return (
        <>
            {auth.roles === 'admin' && <OrderCreatingCard/>}
            
            <Outlet />
        </>
    )
}