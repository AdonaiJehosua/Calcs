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