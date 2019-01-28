import gql from "graphql-tag"

export default gql`
  query FetchTeam {
    allTeams {
      nodes {
        name
        id
      }
    }
  }
`
