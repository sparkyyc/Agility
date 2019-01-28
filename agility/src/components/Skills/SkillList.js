import React from 'react'
import { Loader, Input, Card, Divider } from 'semantic-ui-react'

const SkillList = props => {
  const renderSkills = nodes => {
    return nodes.map(node => (
      <Card fluid key={node.id} header={node.title} onClick={() => props.setActiveSkill(node)} />
    ))
  }

  if (!props.skills || !props.skills.nodes) return <Loader active />

  return (
    <div>
      <Input fluid size="large" icon="search" placeholder="Search" />

      <Divider />

      <Card.Group>{renderSkills(props.skills.nodes)}</Card.Group>
    </div>
  )
}

export default SkillList
