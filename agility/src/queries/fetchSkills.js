import gql from 'graphql-tag'

export default gql`
    {
        allSkills{
            nodes{
            id
            title: skillName
            }
        }
    }
`