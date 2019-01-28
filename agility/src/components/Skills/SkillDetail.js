import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const SkillDetail = ({ skill }) => {
  if (!skill) return null

  return (
    <Card raised fluid key={skill.id}>
      <Card.Content header={skill.title} />
      <Card.Content description="A description" />
      <Card.Content extra>
        <Icon name="user" />4 People have this skill
      </Card.Content>
    </Card>
  )
}

export default SkillDetail
