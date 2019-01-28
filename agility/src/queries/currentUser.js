import gql from "graphql-tag"

export default gql`
  {
    currentUser {
      email
      id
      firstName
      lastName
    }
  }
`
