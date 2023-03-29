import { OrdersTable } from "../../../../components/OrdersTable"
import {FETCH_ORDERS_WITH_STATUS} from '../../../../graphQL/queries/orderQueries'

export const ComplitedOrders = () => {
    return (
        <>
            <OrdersTable tableName={'Завершенные'} query={FETCH_ORDERS_WITH_STATUS} queryVar={'ordersWithStatus'} variables={{status: 'complited'}}/>
        </>
    )
}