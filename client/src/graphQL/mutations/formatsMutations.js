import {gql} from "@apollo/client";

export const ADD_FORMAT = gql`
    mutation ($formatName: String!, $dimensions: InputDimensions!) {
        message: addFormat (formatName: $formatName, dimensions: $dimensions)
    }`