import gql from "graphql-tag";

export default gql`
  query FetchTeammates($id: Int!) {
    personById(id: $id) {
      id
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
    }
  }
`;
