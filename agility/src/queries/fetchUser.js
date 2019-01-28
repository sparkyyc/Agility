import gql from "graphql-tag";

export default gql`
  query FetchUser($id: Int!) {
    personById(id: $id) {
      id
      firstName
      lastName
      userPictureUrl
      position
      email
      ratingsByRatingFor {
        nodes {
          rating
          skillBySkillId {
            skillName
          }
        }
      }
    }
  }
`;
