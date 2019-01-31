import gql from "graphql-tag"

export default gql`
  query FetchTeams {
    allTeams {
      nodes {
        name
        id
      }
    }
  }
`
