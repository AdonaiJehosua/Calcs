import {gql} from "@apollo/client";

export const FETCH_UNITS = gql`
    query {
        units {
            id
            fullName
            abbreviatedName
        }
    }
`