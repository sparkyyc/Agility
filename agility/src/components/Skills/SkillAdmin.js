import React from "react"
import { Card, Button, Label, Form } from "semantic-ui-react"

class SkillAdmin extends React.Component {
renderForm(){
    return(
        <Card raised fluid key={this.props.skill.id} style={{ marginLeft: "20px" }}>
        <Card.Content >
        
        </Card.Content>
      </Card>
    )
}

  render() {
    if (!this.props.skill) return null
    const pillar = this.props.skill.pillar ? this.props.skill.pillar : "none"
    return (
      <Card raised fluid key={this.props.skill.id} style={{ marginLeft: "20px" }}>
        <Card.Content >
        <h2>{this.props.skill.title}</h2>
        <Label color='teal' ribbon>
          {pillar}
        </Label>
        </Card.Content>
        <Card.Content description={this.props.skill.description} />
        <Card.Content extra>
          <Button icon="edit" content="Edit" />
        </Card.Content>
      </Card>
    )
  }
}

export default SkillAdmin
