import { OrdersTable } from "../../../../components/OrdersTable"
import {FETCH_ORDERS_WITH_STATUS} from '../../../../graphQL/queries/orderQueries'

export const PressOrders = () => {
    return (
        <>
            <OrdersTable tableName={'Пресс'} query={FETCH_ORDERS_WITH_STATUS} queryVar={'ordersWithStatus'} variables={{status: 'press'}}/>
        </>
    )
}