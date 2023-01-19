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