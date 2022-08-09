import {gql} from "@apollo/client";

export const FETCH_FORMATS = gql`
    query {
        formats {
            formatName
            dimensions {
                longSide
                shortSide
            }
        }
    }
`