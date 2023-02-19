import { gql } from "@apollo/client";

export const ADD_ORDER = gql`
    mutation ($number1c: Int!, $status: String!, $description: String!, $productionType: String!, $finishDate: CustomDate!) {
        message: addOrder(number1c: $number1c, status: $status, description: $description, productionType: $productionType, finishDate: $finishDate)
    }
`

export const UPDATE_ORDER_STATUS = gql`
    mutation ($updateOrderStatusId: ID!, $status: OrderStatus!) {
        message: updateOrderStatus(id: $updateOrderStatusId, status: $status)
}
`