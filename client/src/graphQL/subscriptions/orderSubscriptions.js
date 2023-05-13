import { gql } from "@apollo/client";

export const ORDER_ADDED = gql`
    subscription orderAdded {
        orderAdded {
            creator {
                id
                userName
            }
        id
        status
        }
    }
`

export const ORDER_UPDATE = gql`
    subscription orderUpdate {
        orderUpdate {
            id
            status
            creator {
                id
                userName
            }
        }
    }
`
