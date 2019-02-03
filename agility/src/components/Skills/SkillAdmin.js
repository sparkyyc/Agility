import React from "react"
import { graphql } from "react-apollo"
import { Card, Button, Label, Form } from "semantic-ui-react"
import UpdateSkill from "../../mutations/UpdateSkill"

class SkillAdmin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editClicked: false,
      name: this.props.skill.title,
      description: this.props.skill.description,
      pillar: this.props.skill.pillarId
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.skill.id !== this.props.skill.id) {
      this.setState({
        editClicked: false,
        name: nextProps.skill.title,
        description: nextProps.skill.description,
        pillar: nextProps.skill.pillarId
      })
    }
    return null
  }

  onSubmit = (event, data) => {
    event.preventDefault()
    this.props
      .mutate({
        variables: {
          id: this.props.skill.id,
          skillName: this.state.name,
          description: this.state.description,
          pillarId: this.state.pillar
        }
      })
      .then(res => {
        console.log(res.data.updateSkillById.skill)
        this.setState({
          editClicked: !this.state.editClicked
        })
        this.props.setActiveSkill(res.data.updateSkillById.skill)
      })
  }

  renderForm() {
    if (this.state.editClicked) {
      let options = this.props.pillars.nodes.map(pillar => {
        return {
          key: pillar.id,
          text: pillar.title,
          value: pillar.id,
          description: pillar.description
        }
      })
      return (
        <Card
          raised
          fluid
          key={this.props.skill.id}
          style={{ marginLeft: "20px" }}
        >
          <Card.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Skill name"
                  placeholder="Skill name"
                  value={this.state.name}
                  onChange={(e, { value }) => this.setState({ name: value })}
                />
                <Form.Select
                  fluid
                  label="Pillar"
                  value={this.state.pillar}
                  options={options}
                  placeholder="Choose a pillar"
                  onChange={(e, { value }) => this.setState({ pillar: value })}
                />
              </Form.Group>
              <Form.TextArea
                label="Description"
                placeholder="Provide a description of this skill..."
                value={this.state.description}
                onChange={(e, { value }) =>
                  this.setState({ description: value })
                }
              />
              <Button
                type="submit"
                icon="save"
                content="Save"
                onClick={this.onSubmit}
              />
            </Form>
          </Card.Content>
        </Card>
      )
    } else {
      let pillar = this.props.skill.pillarId
        ? this.props.skill.pillarByPillarId.title
        : "none"
      const desc = this.props.skill.description
      const title = this.props.skill.title

      return (
        <Card
          raised
          fluid
          key={this.props.skill.id}
          style={{ marginLeft: "20px" }}
        >
          <Card.Content>
            <h2>{title}</h2>
            <Label color="teal" ribbon>
              {pillar}
            </Label>
          </Card.Content>
          <Card.Content description={desc} />
          <Card.Content extra>
            <Button
              icon="edit"
              content="Edit"
              onClick={e =>
                this.setState({ editClicked: !this.state.editClicked })
              }
            />
          </Card.Content>
        </Card>
      )
    }
  }

  render() {
    if (!this.props.skill) return null
    console.log(this.props)
    return <div>{this.renderForm()}</div>
  }
}

export default graphql(UpdateSkill)(SkillAdmin)
