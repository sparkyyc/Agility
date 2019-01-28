import gql from "graphql-tag"

export default gql`
  {
    allTeams {
      nodes {
        name
        id
      }
    }
  }
`
