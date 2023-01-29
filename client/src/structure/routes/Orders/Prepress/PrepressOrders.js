import { OrdersTable } from "../../../../components/OrdersTable"
import {FETCH_ORDERS_WITH_STATUS} from '../../../../graphQL/queries/orderQueries'

export const PrepressOrders = () => {
    return (
        <>
            <OrdersTable tableName={'Препресс'} query={FETCH_ORDERS_WITH_STATUS} queryVar={'ordersWithStatus'} variables={{status: 'prepress'}}/>
        </>
    )
}