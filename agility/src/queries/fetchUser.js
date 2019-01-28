import gql from "graphql-tag"

export default gql`
  query FetchUser($id: Int!) {
    personById(id: $id) {
      id
      firstName
      lastName
      userPictureUrl
      position
      teamId
      teamLead
      email
    }
  }
`
