import { OrdersTable } from "../../../../components/OrdersTable"
import {FETCH_ORDERS_WITH_STATUS} from '../../../../graphQL/queries/orderQueries'

export const PostpressOrders = () => {
    return (
        <>
            <OrdersTable tableName={'Постпресс'} query={FETCH_ORDERS_WITH_STATUS} queryVar={'ordersWithStatus'} variables={{status: 'postpress'}}/>
        </>
    )
}