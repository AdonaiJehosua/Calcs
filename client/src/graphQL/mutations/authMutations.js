import {gql} from "@apollo/client";

export const AUTH = gql`
mutation ($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
        id
        userName
        token
        roles
    }
}`