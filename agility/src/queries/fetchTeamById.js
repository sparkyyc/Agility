import gql from "graphql-tag"

export default gql`
  query fetchTeamById($id: Int!) {
    teamById(id: $id) {
      name
      description
      teamSkillsByTeamId {
        nodes {
          id
          skillBySkillId {
            id
            skillName
            description
          }
        }
      }
      peopleByTeamId {
        nodes {
          id
          firstName
          lastName
          userPictureUrl
          teamLead
          position
          email
          ratingsByRatingFor {
            nodes {
              rating
              ratingBy
              ratingFor
              skillBySkillId {
                id
                skillName
              }
            }
          }
        }
      }
    }
  }
`
