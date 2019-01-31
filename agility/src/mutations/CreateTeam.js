import gql from "graphql-tag"

export default gql`
  mutation CreateTeam($name: String!, $description: String) {
    createTeam(input: { team: { name: $name, description: $description } }) {
      team {
        id
        name
      }
    }
  }
`
