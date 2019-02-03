import gql from "graphql-tag"

export default gql`
  mutation deleteTeamSkill($id: Int!) {
    deleteTeamSkillById(input: { id: $id }) {
      teamSkill {
        id
      }
    }
  }
`
