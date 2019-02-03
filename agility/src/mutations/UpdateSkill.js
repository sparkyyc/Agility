import gql from "graphql-tag"

export default gql`
  mutation updateSkill(
    $id: Int!
    $skillName: String
    $description: String
    $pillarId: Int
  ) {
    updateSkillById(
      input: {
        id: $id
        skillPatch: {
          skillName: $skillName
          description: $description
          pillarId: $pillarId
        }
      }
    ) {
      skill {
        id
        title: skillName
        description
        pillarId
        pillarByPillarId {
          title
        }
      }
    }
  }
`
