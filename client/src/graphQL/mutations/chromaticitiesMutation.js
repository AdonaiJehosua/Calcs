import {gql} from "@apollo/client";

export const ADD_CHROMATICITY = gql`
    mutation ($front: Int!, $back: Int!) {
        message: addChromaticity (front: $front, back: $back)
    }
`

export const DELETE_CHROMATICITY = gql`
    mutation ($id: ID!) {
        message: deleteChromaticity (id: $id)
    }
`