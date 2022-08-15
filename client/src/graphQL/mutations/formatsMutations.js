import {gql} from "@apollo/client";

export const ADD_FORMAT = gql`
    mutation ($formatName: String!, $dimensions: DimensionsInput!) {
        message: addFormat (formatName: $formatName, dimensions: $dimensions)
    }
`

export const DELETE_FORMAT = gql`
    mutation ($id: ID!) {
        message: deleteFormat (id: $id)
    }
`