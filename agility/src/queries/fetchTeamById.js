import gql from "graphql-tag"

export default gql`
  query fetchTeamById($id: Int!) {
    teamById(id: $id) {
      name
      description
      peopleByTeamId {
        nodes {
          id
          firstName
          lastName
          userPictureUrl
          teamLead
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
