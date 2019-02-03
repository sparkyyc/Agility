import gql from "graphql-tag"

export default gql`
  {
    allPillars {
      nodes {
        id
        title
        description
      }
    }
  }
`
