import React from "react"
import {
  Rating,
  Header,
  Popup,
  Grid,
  Card,
  Feed,
  Divider,
  Icon
} from "semantic-ui-react"

class TeamNeeds extends React.Component {
  randomColor() {
    const colors = [
      "red",
      "orange",
      "yellow",
      "olive",
      "green",
      "teal",
      "blue",
      "violet",
      "purple",
      "pink",
      "brown",
      "grey",
      "black"
    ]

    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
  }

  renderSkillCards = () => {
    return this.props.teamInfo.teamSkillsByTeamId.nodes.map(skill => {
      return (
        <Card key={skill.skillBySkillId.id} color={this.randomColor()}>
          <Card.Content>
            <Card.Header>{skill.skillBySkillId.skillName}</Card.Header>
            <Card.Description>
              {skill.skillBySkillId.description}
            </Card.Description>
          </Card.Content>
        </Card>
      )
    })
  }

  render() {
    console.log(this.props)
    return <div>{this.renderSkillCards()}</div>
  }
}

export default TeamNeeds
