import {gql} from "@apollo/client";

export const FETCH_PRODUCTION_TYPES = gql`
    query {
        productionTypes {
            id
            productionType
            description
        }
    }
`

export const FETCH_PRODUCTION_TYPES_WITH_STATUS = gql`
    query {
        productionTypes {
            id
            productionType
        }
    }
`