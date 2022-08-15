import {gql} from "@apollo/client";

export const UNIT_SUBSCRIPTION = gql`
    subscription Subscription {
        unitAdded {
            id
            fullName
            abbreviatedName
        }
    }
`

