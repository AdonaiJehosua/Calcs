import {gql} from "@apollo/client";

export const FETCH_CHROMATICITIES = gql`
    query {
        chromaticities {
            id
            name
        }
    }
`