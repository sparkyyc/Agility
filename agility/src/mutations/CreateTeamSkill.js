import gql from "graphql-tag"

export default gql`
  mutation TeamSkillAdd($teamId: Int!, $skillId: Int!) {
    createTeamSkill(
      input: { teamSkill: { teamId: $teamId, skillId: $skillId } }
    ) {
      teamSkill {
        id
      }
    }
  }
`
