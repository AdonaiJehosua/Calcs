import { gql } from "@apollo/client";

export const ADD_ORDER = gql`
    mutation ($number1c: Int!, $status: String!, $description: String!, $productionType: String!, $finishDate: CustomDate!) {
        message: addOrder(number1c: $number1c, status: $status, description: $description, productionType: $productionType, finishDate: $finishDate)
    }
`