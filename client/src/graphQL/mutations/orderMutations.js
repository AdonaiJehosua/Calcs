import { gql } from "@apollo/client";

export const ADD_ORDER = gql`
    mutation ($number1C: Int!, $status: String!, $description: String!, $productionType: String!, $finishDate: CustomDate!) {
        message: addOrder(number1c: $number1C, status: $status, description: $description, productionType: $productionType, finishDate: $finishDate)
    }
`