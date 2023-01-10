import { Outlet } from "react-router-dom";
import { OrderCreatingCard } from "./OrderCreatingCard";

export const Orders = () => {
    return (
        <>
            <OrderCreatingCard/>
            <Outlet />
        </>
    )
}