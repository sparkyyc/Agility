import React from "react"
import {
  Image,
  Segment,
  Header,
  Container,
  Grid,
  Item,
  Button,
  Label,
  Icon,
  Statistic
} from "semantic-ui-react"

import "./DashOverview.css"
import Avatar from "../Avatar"
import Chart from "./PillarChart"
import Pie from "./PillarPie"

class DashOverviewHeader extends React.Component {
  // **TODO**
  // show how many people voted on skill

  renderIsTeamLead() {
    return this.props.userInfo.teamLead ? (
      <Item.Extra className="userEmail">
        <Label as="a" color="blue" image>
          <Icon name="users" />
          Team Lead
          <Label.Detail>
            <Icon name="check" />
          </Label.Detail>
        </Label>
      </Item.Extra>
    ) : null
  }

  renderSkillAverage() {
    let totalSkill = 0
    let ratingsList = this.props.userInfo.ratingsByRatingFor.nodes
    for (let item of ratingsList) {
      totalSkill += item.rating
    }

    return (totalSkill / ratingsList.length).toFixed(2)
  }

  render() {
    const {
      id,
      firstName,
      lastName,
      userPictureUrl,
      position,
      ratingsByRatingFor,
      email
    } = this.props.userInfo

    return (
      <Grid columns="2">
        <Grid.Column width="8">
          <Item.Group>
            <Item style={{ fontSize: "1.5em" }}>
              <Item.Image size="small" rounded>
                <Avatar person={{ firstName, lastName, id, size: "5em" }} />
              </Item.Image>
              <Item.Content>
                <Item.Header>
                  {firstName} {lastName}
                </Item.Header>
                <Item.Meta>{position}</Item.Meta>
                {this.renderIsTeamLead()}
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width="8" verticalAlign="middle">
          <Pie ratings={ratingsByRatingFor} />
        </Grid.Column>
      </Grid>
    )
  }
}

export default DashOverviewHeader
