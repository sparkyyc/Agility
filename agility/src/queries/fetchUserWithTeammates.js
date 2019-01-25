import gql from "graphql-tag";

export default gql`
  query FetchUserAndMates($id: Int!) {
    personById(id: $id) {
      id
      firstName
      lastName
      userPictureUrl
      position
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
          }
        }
      }
    }
  }
`;
