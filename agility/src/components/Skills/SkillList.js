import React from "react"
import { Loader, Input, Card, Divider } from "semantic-ui-react"

class SkillList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: "" }
  }

  renderSkills = nodes => {
    return nodes.map(node => {
      const title = node.title.toLowerCase()
      if (title.includes(this.state.value))
        return (
          <Card
            fluid
            key={node.id}
            header={node.title}
            onClick={() => this.props.setActiveSkill(node)}
          />
        )
    })
  }

  handleChange = (e, { value }) => {
    this.setState({ value })
  }

  render() {
    if (!this.props.skills || !this.props.skills.nodes) return <Loader active />

    return (
      <div>
        <Input
          fluid
          size="large"
          icon="search"
          placeholder="Search"
          value={this.state.value}
          onChange={this.handleChange}
        />

        <Divider />

        <Card.Group>{this.renderSkills(this.props.skills.nodes)}</Card.Group>
      </div>
    )
  }
}

export default SkillList
