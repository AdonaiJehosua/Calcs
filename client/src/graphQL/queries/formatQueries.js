import {gql} from "@apollo/client";

export const FETCH_FORMATS = gql`
    query {
        formats {
            id
            formatName
            dimensions {
                longSide
                shortSide
            }
            area
        }
    }
`