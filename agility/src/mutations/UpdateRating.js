import gql from 'graphql-tag'

export default gql`
    mutation UpdateRating($id: Int!, $rating: Int!){
        updateRatingById(input: {id: $id, ratingPatch: {rating: $rating}}){
            rating {
            rating
            }
        }
    }
`