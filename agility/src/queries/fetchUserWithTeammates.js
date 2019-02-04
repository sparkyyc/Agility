import gql from "graphql-tag"

export default gql`
  query FetchUserAndMates($id: Int!) {
    personById(id: $id) {
      id
      firstName
      lastName
      userPictureUrl
      position
      email
      teamLead
      teamByTeamId {
        id
        name
        peopleByTeamId {
          nodes {
            id
            firstName
            lastName
            position
            userPictureUrl
            email
          }
        }
      }
      ratingsByRatingFor {
        nodes {
          id
          ratingFor
          ratingBy
          skillId
          rating
          skillBySkillId {
            id
            skillName
            pillarId
            pillarByPillarId {
              title
            }
          }
        }
      }
    }
  }
`
