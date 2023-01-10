import {gql} from "@apollo/client";

export const ADD_PRODUCTION_TYPE = gql`
    mutation ($productionType: String!, $description: String!) {
        message: addProductionType (productionType: $productionType, description: $description)
    }
`

export const DELETE_PRODUCTION_TYPE = gql`
    mutation ($id: ID!) {
        message: deleteProductionType (id: $id)
    }
`