import React from 'react'
import { Card, Label } from 'semantic-ui-react'

const SkillDetail = ({ skill }) => {
  if (!skill) return null

  return (
    <Card raised fluid key={skill.id}>
      <Card.Content >
        <h2>{skill.title}</h2>
        <Label color='teal' ribbon>
          Pillar
        </Label>
        </Card.Content>
      <Card.Content description={skill.description} />
      <Card.Content extra>
        {/* <Icon name="user" />4 People have this skill */}

      </Card.Content>
    </Card>
  )
}

export default SkillDetail
