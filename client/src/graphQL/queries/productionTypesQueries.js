import {gql} from "@apollo/client";

export const FETCH_PRODUCTION_TYPES = gql`
    query {
        productionType {
            id
            productionType
            description
        }
    }
`