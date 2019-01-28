import gql from "graphql-tag"

export default gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      id
      email
      lastName
      firstName
    }
  }
`
