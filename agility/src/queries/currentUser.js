import gql from "graphql-tag"

export default gql`
  query CurrentUser {
    currentUser {
      email
      id
      firstName
      lastName
    }
  }
`
