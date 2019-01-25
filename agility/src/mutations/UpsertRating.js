import gql from "graphql-tag"

export default gql`
  mutation UpsertRating(
    $ratingFor: Int!
    $ratingBy: Int!
    $skillId: Int!
    $rating: Int!
  ) {
    upsertRating(
      input: {
        ratingfor: $ratingFor
        ratingby: $ratingBy
        skillid: $skillId
        rating1: $rating
      }
    ) {
      rating {
        id
        ratingFor
        ratingBy
        skillId
        rating
      }
    }
  }
`
