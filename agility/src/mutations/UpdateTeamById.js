import gql from "graphql-tag"

export default gql`
  mutation UpdateTeamById($id: Int!, $description: String) {
    updateTeamById(
      input: { id: $id, teamPatch: { description: $description } }
    ) {
      team {
        id
      }
    }
  }
`
