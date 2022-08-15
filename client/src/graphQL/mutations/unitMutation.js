import {gql} from "@apollo/client";

export const ADD_UNIT = gql`
    mutation ($fullName: String!, $abbreviatedName: String!) {
        message: addUnit (fullName: $fullName, abbreviatedName: $abbreviatedName)
    }
`

export const DELETE_UNIT = gql`
    mutation ($id: ID!) {
        message: deleteUnit (id: $id)
    }
`