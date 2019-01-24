import gql from 'graphql-tag'

export default gql`
    mutation CreateRating($ratingFor: Int!, $ratingBy: Int!, $skillId: Int!, $rating: Int!){
        createRating(input: { rating: { ratingFor: $ratingFor, ratingBy: $ratingBy, skillId: $skillId, rating: $rating }}){
            rating{
            rating
            ratingBy
            }
        }
    }
`