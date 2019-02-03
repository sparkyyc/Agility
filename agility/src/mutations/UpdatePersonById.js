import gql from "graphql-tag"

export default gql`
  mutation UpdatePerson(
    $id: Int!
    $firstName: String
    $lastName: String
    $userPictureUrl: String
    $position: String
    $teamId: Int
    $teamLead: Boolean
  ) {
    updatePersonById(
      input: {
        id: $id
        personPatch: {
          firstName: $firstName
          lastName: $lastName
          userPictureUrl: $userPictureUrl
          position: $position
          teamId: $teamId
          teamLead: $teamLead
        }
      }
    ) {
      person {
        firstName
      }
    }
  }
`
