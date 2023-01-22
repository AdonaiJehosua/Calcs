import { OrdersTable } from "../../../../components/OrdersTable"
import {FETCH_ORDERS} from '../../../../graphQL/queries/orderQueries'

export const AllOrders = () => {
    return (
        <>
            <OrdersTable query={FETCH_ORDERS} queryVar={'orders'}/>
        </>
    )
}