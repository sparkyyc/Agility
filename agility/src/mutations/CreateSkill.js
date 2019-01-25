import gql from 'graphql-tag'

export default gql`
    mutation CreateSkill($skillName: String!){
        createSkill(input: { skill: { skillName: $skillName } }){
            skill{
            id
            skillName
            }
        }
    }
`