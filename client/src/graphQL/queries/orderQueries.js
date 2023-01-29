import {gql} from "@apollo/client";

export const FETCH_ORDERS = gql`
    query {
        orders {
            number1c
            id
            status
            description
            finishDate
            productionType {
                productionType
                }
            startDate
        }
    }
`

export const FETCH_ORDERS_WITH_STATUS = gql`
    query ($status: OrderStatus!) {
        ordersWithStatus(status: $status) {
            id
            number1c
            status
            description
            productionType {
                productionType
            }
            startDate
            finishDate
        }
    }
`