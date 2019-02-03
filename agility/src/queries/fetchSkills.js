import gql from "graphql-tag"

export default gql`
  query FetchSkill {
    allSkills {
      nodes {
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
