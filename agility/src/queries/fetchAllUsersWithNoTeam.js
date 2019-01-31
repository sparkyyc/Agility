import gql from "graphql-tag"

export default gql`
  query FetchAllUsers {
    allPeople {
      nodes {
        id
        firstName
        lastName
        email
        userPictureUrl
        position
        teamLead
        teamId
      }
    }
  }
`
