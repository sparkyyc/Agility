import gql from "graphql-tag"

export default gql`
  query FetchTeam {
    allTeams {
      nodes {
        title: name
        id
        description
        peopleByTeamId {
          nodes {
            id
            firstName
            lastName
          }
        }
        teamSkillsByTeamId {
          nodes {
            id
            skillBySkillId {
              skillName
              id
            }
          }
        }
      }
    }
  }
`
